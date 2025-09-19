
import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This function assumes the base64 strings do not include the data URI prefix.
const cleanBase64 = (base64String: string): string => {
    return base64String.split(',')[1] || base64String;
};

export async function generateLookbookImage(
    sceneImageBase64: string,
    productImageBase64: string,
    styleDescription: string,
    numberOfImages: number,
    productCustomization: string
): Promise<string[]> {
    try {
        const cleanedSceneBase64 = cleanBase64(sceneImageBase64);
        const cleanedProductBase64 = cleanBase64(productImageBase64);

        const prompt = `
        You are an expert interior designer. Your task is to realistically place the provided product image into the background scene image.
        The final composite image must adhere to the following style description: "${styleDescription}".
        
        ${productCustomization ? `Crucially, apply the following modifications to the product itself: "${productCustomization}".` : ''}

        Key instructions:
        1.  **Seamless Integration:** Blend the product naturally into the scene.
        2.  **Realism:** Pay close attention to lighting, shadows, perspective, and scale to make the product look like it truly belongs in the room.
        3.  **No "Sticker" Effect:** The output should be a photorealistic composition, not a simple copy-paste.
        4.  **Maintain Scene Integrity:** The original scene should remain recognizable, with the new product added as a key element.
        `;
        
        const generateSingle = async (): Promise<string | null> => {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image-preview',
                contents: {
                    parts: [
                        {
                            inlineData: {
                                data: cleanedSceneBase64,
                                mimeType: 'image/jpeg',
                            },
                        },
                        {
                            inlineData: {
                                data: cleanedProductBase64,
                                mimeType: 'image/jpeg',
                            },
                        },
                        { text: prompt },
                    ],
                },
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });

            // The model can return multiple parts, we need to find the image part.
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                }
            }
            
            // If no image part is found
            return null;
        };

        const promises = Array.from({ length: numberOfImages }, () => generateSingle());
        const results = await Promise.all(promises);
        
        const validImages = results.filter((img): img is string => img !== null);
        
        if (validImages.length < numberOfImages) {
            console.warn(`Could only generate ${validImages.length} out of ${numberOfImages} requested images.`);
        }

        return validImages;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate image variations with Gemini API.");
    }
}