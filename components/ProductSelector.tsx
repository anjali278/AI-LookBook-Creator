import React, { useState } from 'react';
import { Product } from '../types';
import { CheckCircleIcon, GridIcon, SearchIcon, MagnifyingGlassPlusIcon } from './IconComponents';
import ImagePreviewModal from './ImagePreviewModal';

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelectProduct: (product: Product) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ products, selectedProduct, onSelectProduct }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <div className="flex items-center gap-3 mb-1">
        <GridIcon className="w-6 h-6 text-stone-700" />
        <h2 className="text-2xl font-semibold font-serif text-stone-800">Select a Product</h2>
      </div>
      <p className="text-sm text-stone-500 mb-4">Choose an item to place in your scene.</p>
      
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-stone-400" />
        </span>
        <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 transition font-sans"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[40vh] overflow-y-auto pr-2 -mr-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className={`relative group cursor-pointer overflow-hidden rounded-lg border-2 bg-white transition-all duration-200 ${
                selectedProduct?.id === product.id
                  ? 'border-emerald-500 shadow-lg'
                  : 'border-stone-200 hover:border-emerald-400 hover:shadow-md'
              }`}
            >
              <div className="relative aspect-square bg-stone-50">
                  <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                   {selectedProduct?.id === product.id && (
                      <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1 text-white shadow-md">
                          <CheckCircleIcon className="w-5 h-5" />
                      </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setPreviewImage(product.imageUrl); }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white/80 text-stone-800 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm"
                      aria-label="Zoom image"
                    >
                      <MagnifyingGlassPlusIcon className="w-6 h-6"/>
                    </button>
                  </div>
              </div>

              <div className="p-2 border-t border-stone-100">
                  <h3 className="font-semibold text-sm text-stone-800 truncate" title={product.name}>{product.name}</h3>
                  <p className="text-xs text-stone-500">{product.category}</p>
              </div>
            </div>
          ))
        ) : (
            <div className="col-span-full text-center text-stone-500 py-8">
              <p>No products found.</p>
            </div>
        )}
      </div>
      <ImagePreviewModal imageUrl={previewImage} onClose={() => setPreviewImage(null)} />
    </section>
  );
};

export default ProductSelector;