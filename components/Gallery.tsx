
import React from 'react';
import { PhotoIcon } from './IconComponents';

interface GalleryProps {
  generatedImages: string[];
  isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
    <div className="relative aspect-square bg-gray-300 rounded-lg animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <PhotoIcon className="w-12 h-12 text-gray-400" />
      </div>
    </div>
);


const Gallery: React.FC<GalleryProps> = ({ generatedImages, isLoading }) => {
  const hasImages = generatedImages.length > 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Generated Looks</h2>
      
      { !hasImages && !isLoading && (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
            <PhotoIcon className="w-16 h-16 mb-4 text-gray-300"/>
            <h3 className="text-lg font-medium text-gray-700">Your visual concepts will appear here.</h3>
            <p className="mt-1 text-sm">Follow the steps on the left to create your first look.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {isLoading && <LoadingSkeleton />}
        {generatedImages.map((image, index) => (
          <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden group relative">
            <img src={image} alt={`Generated look ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                 <a href={image} download={`lookbook-image-${index + 1}.png`} className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-white text-gray-800 rounded-md text-sm font-semibold shadow-lg">Download</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
