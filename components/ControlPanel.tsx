import React from 'react';
import { Product } from '../types';
import ProductSelector from './ProductSelector';
import SceneUploader from './SceneUploader';
import StyleControls from './StyleControls';
import ProductCustomization from './ProductCustomization';

interface ControlPanelProps {
    products: Product[];
    selectedProduct: Product | null;
    onSelectProduct: (product: Product) => void;
    onImageUpload: (base64: string) => void;
    styleDescription: string;
    onStyleChange: (value: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
    isGenerateDisabled: boolean;
    error: string | null;
    numVariations: number;
    onNumVariationsChange: (num: number) => void;
    productCustomization: string;
    onProductCustomizationChange: (value: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    products,
    selectedProduct,
    onSelectProduct,
    onImageUpload,
    styleDescription,
    onStyleChange,
    onGenerate,
    isLoading,
    isGenerateDisabled,
    error,
    numVariations,
    onNumVariationsChange,
    productCustomization,
    onProductCustomizationChange
}) => {
  return (
    <aside className="w-full lg:w-[450px] flex-shrink-0 bg-white border-r border-stone-200 p-8 flex flex-col gap-10 lg:h-screen lg:overflow-y-auto">
        <header>
            <h1 className="text-4xl font-bold font-serif text-stone-900">AI Lookbook Creator</h1>
            <p className="mt-2 text-stone-600">
                Visualize products in any setting. Create the perfect look.
            </p>
        </header>

        <ProductSelector
            products={products}
            selectedProduct={selectedProduct}
            onSelectProduct={onSelectProduct}
        />
        <ProductCustomization 
            selectedProduct={selectedProduct}
            customization={productCustomization}
            onCustomizationChange={onProductCustomizationChange}
        />
        <SceneUploader onImageUpload={onImageUpload} />
        <StyleControls
            styleDescription={styleDescription}
            onStyleChange={onStyleChange}
            onGenerate={onGenerate}
            isLoading={isLoading}
            disabled={isGenerateDisabled}
            numVariations={numVariations}
            onNumVariationsChange={onNumVariationsChange}
        />
        {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        )}
    </aside>
  );
};

export default ControlPanel;