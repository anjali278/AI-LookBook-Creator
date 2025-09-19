import React, { useState, useCallback } from 'react';
import { Product } from './types';
import { PRODUCTS } from './constants';
import { generateLookbookImage } from './services/geminiService';
import { imageUrlToBase64 } from './utils/imageUtils';
import ControlPanel from './components/ControlPanel';
import Canvas from './components/Canvas';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [sceneImage, setSceneImage] = useState<string | null>(null);
  const [styleDescription, setStyleDescription] = useState<string>('A cozy, modern living room with natural light');
  const [productCustomization, setProductCustomization] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [numVariations, setNumVariations] = useState<number>(3);

  const handleGenerate = useCallback(async () => {
    if (!selectedProduct || !sceneImage) {
      setError('Please select a product and upload a scene image.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const productImageUrl = selectedProduct.imageUrl;
      // Convert product URL to Base64 if it's not already a data URI
      const productImageBase64 = productImageUrl.startsWith('data:')
        ? productImageUrl
        : await imageUrlToBase64(productImageUrl);

      const newImages = await generateLookbookImage(sceneImage, productImageBase64, styleDescription, numVariations, productCustomization);
      if (newImages.length > 0) {
        setGeneratedImages(prev => [...newImages, ...prev]);
      } else {
        setError('Failed to generate images. The model might not have returned any images.');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedProduct, sceneImage, styleDescription, numVariations, productCustomization]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-sans antialiased text-stone-800 bg-stone-100">
      <ControlPanel
        products={PRODUCTS}
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
        onImageUpload={setSceneImage}
        styleDescription={styleDescription}
        onStyleChange={setStyleDescription}
        onGenerate={handleGenerate}
        isLoading={isLoading}
        isGenerateDisabled={!selectedProduct || !sceneImage}
        error={error}
        numVariations={numVariations}
        onNumVariationsChange={setNumVariations}
        productCustomization={productCustomization}
        onProductCustomizationChange={setProductCustomization}
      />
      <main className="flex-1 lg:h-screen lg:overflow-y-auto">
        <Canvas 
            generatedImages={generatedImages} 
            isLoading={isLoading} 
            loadingCount={numVariations} 
        />
      </main>
    </div>
  );
};

export default App;