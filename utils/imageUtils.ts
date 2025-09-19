export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const imageUrlToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    if (!response.ok) {
        // A simple proxy can help with CORS issues during development
        // For example: `https://cors-anywhere.herokuapp.com/${url}`
        // Note: Public proxies are not suitable for production.
        console.error(`CORS issue might be preventing image fetch. Consider using a proxy for URL: ${url}`);
        throw new Error(`Failed to fetch image. Status: ${response.status} ${response.statusText}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};