import React, { useEffect } from 'react';
import { CloseIcon } from './IconComponents';

interface ImagePreviewModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!imageUrl) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-preview-title"
    >
      <div
        className="relative bg-white rounded-lg shadow-xl p-4 max-w-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-3 flex-shrink-0">
            <h2 id="image-preview-title" className="text-lg font-semibold text-stone-800">Product Preview</h2>
            <button
                onClick={onClose}
                className="p-2 rounded-full text-stone-500 hover:bg-stone-100 hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                aria-label="Close viewer"
            >
                <CloseIcon className="w-6 h-6" />
            </button>
        </div>
        <div className="overflow-auto flex-1">
            <img src={imageUrl} alt="Product preview" className="w-full h-auto object-contain rounded" />
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;