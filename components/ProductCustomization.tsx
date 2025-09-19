import React from 'react';
import { Product } from '../types';
import { AdjustmentsHorizontalIcon } from './IconComponents';

interface ProductCustomizationProps {
  selectedProduct: Product | null;
  customization: string;
  onCustomizationChange: (value: string) => void;
}

const ProductCustomization: React.FC<ProductCustomizationProps> = ({
  selectedProduct,
  customization,
  onCustomizationChange,
}) => {
  if (!selectedProduct) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center gap-3 mb-1">
        <AdjustmentsHorizontalIcon className="w-6 h-6 text-stone-700" />
        <h2 className="text-2xl font-semibold font-serif text-stone-800">Customize Product</h2>
      </div>
      <p className="text-sm text-stone-500 mb-4">
        Describe any changes you'd like to make to the "{selectedProduct.name}".
      </p>
      <textarea
        rows={2}
        className="w-full p-2 border border-stone-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 transition font-sans"
        placeholder={`e.g., Change color to navy blue, make it out of wood...`}
        value={customization}
        onChange={(e) => onCustomizationChange(e.target.value)}
      />
    </section>
  );
};

export default ProductCustomization;
