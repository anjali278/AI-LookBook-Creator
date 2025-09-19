import React, { useState } from 'react';
import { PhotoIcon, MagnifyingGlassPlusIcon } from './IconComponents';
import FullScreenViewer from './FullScreenViewer';

interface CanvasProps {
  generatedImages: string[];
  isLoading: boolean;
  loadingCount: number;
}

const LoadingSkeleton: React.FC = () => (
    <div className="relative aspect-square bg-stone-200 rounded-lg shadow-sm animate-pulse-bg">
      <div className="absolute inset-0 flex items-center justify-center">
        <PhotoIcon className="w-12 h-12 text-stone-400" />
      </div>
    </div>
);

const Canvas: React.FC<CanvasProps> = ({ generatedImages, isLoading, loadingCount }) => {
  const hasImages = generatedImages.length > 0;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="p-4 sm:p-8 lg:p-12 w-full h-full">
        <h2 className="text-4xl font-bold font-serif text-stone-900 mb-2">Generated Looks</h2>
        <p className="text-stone-600 mb-8">Your creative concepts brought to life. Click any image to view and edit.</p>
        
        { !hasImages && !isLoading && (
            <div className="flex flex-col items-center justify-center flex-1 text-center text-stone-500 border-2 border-dashed border-stone-300 rounded-lg min-h-[400px] p-8">
                <PhotoIcon className="w-16 h-16 mb-4 text-stone-300"/>
                <h3 className="text-xl font-medium font-serif text-stone-700">Your canvas awaits inspiration.</h3>
                <p className="mt-2 text-md max-w-md">Once you've selected a product and scene, your AI-generated lookbooks will magically appear here.</p>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading && Array.from({ length: loadingCount }).map((_, i) => <LoadingSkeleton key={`loader-${i}`} />)}
            {generatedImages.map((image, index) => (
            <div 
                key={index} 
                className="group relative cursor-pointer overflow-hidden rounded-lg bg-stone-900 shadow-lg transition-shadow duration-300 hover:shadow-2xl border border-stone-200"
                onClick={() => setSelectedImage(image)}
                role="button"
                aria-label={`View generated look ${index + 1}`}
            >
                <img 
                    src={image} 
                    alt={`Generated look ${index + 1}`} 
                    className="aspect-square w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-50" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0">
                    <MagnifyingGlassPlusIcon className="w-12 h-12 text-white/80 mb-2" />
                    <h3 className="text-white font-semibold text-lg drop-shadow-md">View & Edit</h3>
                    <p className="text-stone-300 text-sm">Look {index + 1}</p>
                </div>
            </div>
            ))}
        </div>
        <FullScreenViewer imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
};

export default Canvas;