import React, { useEffect, useState, useRef, WheelEvent, MouseEvent } from 'react';
import { CloseIcon, DownloadIcon, PlusIcon, MinusIcon, ArrowPathIcon } from './IconComponents';

interface FullScreenViewerProps {
  imageUrl: string | null;
  onClose: () => void;
}

const FullScreenViewer: React.FC<FullScreenViewerProps> = ({ imageUrl, onClose }) => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  const resetAll = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

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

  useEffect(() => {
    if (imageUrl) {
        resetAll();
    }
  }, [imageUrl]);


  if (!imageUrl) {
    return null;
  }

  const handleDownload = () => {
    const image = new Image();
    image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
            ctx.drawImage(image, 0, 0);
            const link = document.createElement('a');
            link.download = 'edited-lookbook-image.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };
    image.src = imageUrl;
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const scaleAmount = -e.deltaY * 0.001;
    setZoom(prev => Math.max(0.1, prev + scaleAmount));
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsPanning(true);
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsPanning(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="fullscreen-image-viewer"
    >
      <div
        className="relative bg-white rounded-lg shadow-xl w-full h-full max-w-7xl max-h-[95vh] flex flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          ref={imageContainerRef}
          className="flex-1 bg-stone-100 h-full flex items-center justify-center overflow-hidden"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
            <img 
              src={imageUrl} 
              alt="Full screen generated look" 
              className="max-w-full max-h-full object-contain transition-transform duration-100"
              style={{
                transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                cursor: isPanning ? 'grabbing' : 'grab'
              }}
            />
        </div>
        
        <aside className="w-[320px] flex-shrink-0 bg-stone-50 border-l border-stone-200 flex flex-col">
            <div className="p-6 border-b border-stone-200 flex justify-between items-center">
                <h2 id="fullscreen-image-viewer" className="text-xl font-semibold text-stone-800 font-serif">View & Edit</h2>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full text-stone-500 hover:bg-stone-200 hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    aria-label="Close viewer"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-stone-700 font-serif">Adjustments</h3>
                        <button onClick={resetAll} className="text-sm font-medium text-emerald-600 hover:text-emerald-800 flex items-center gap-1">
                            <ArrowPathIcon className="w-4 h-4" /> Reset
                        </button>
                    </div>
                    
                    <label className="block space-y-2">
                        <div className="flex justify-between text-sm font-medium text-stone-600">
                            <span>Brightness</span>
                            <span>{brightness}%</span>
                        </div>
                        <input type="range" min="0" max="200" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
                    </label>
                    <label className="block space-y-2">
                        <div className="flex justify-between text-sm font-medium text-stone-600">
                            <span>Contrast</span>
                            <span>{contrast}%</span>
                        </div>
                        <input type="range" min="0" max="200" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
                    </label>
                    <label className="block space-y-2">
                        <div className="flex justify-between text-sm font-medium text-stone-600">
                            <span>Saturation</span>
                            <span>{saturation}%</span>
                        </div>
                        <input type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
                    </label>
                </div>
                
                <div className="space-y-4">
                     <h3 className="text-lg font-semibold text-stone-700 font-serif">Zoom</h3>
                     <div className="flex items-center gap-2">
                        <button onClick={() => setZoom(z => z - 0.1)} className="p-2 border rounded-md bg-white hover:bg-stone-100 text-stone-600"><MinusIcon className="w-5 h-5"/></button>
                        <button onClick={() => setZoom(1)} className="flex-1 text-center py-2 px-2 border rounded-md text-sm font-semibold bg-white hover:bg-stone-100 text-stone-700">Reset</button>
                        <button onClick={() => setZoom(z => z + 0.1)} className="p-2 border rounded-md bg-white hover:bg-stone-100 text-stone-600"><PlusIcon className="w-5 h-5"/></button>
                     </div>
                </div>

            </div>

            <div className="p-6 border-t border-stone-200 bg-white">
                <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-md text-base font-semibold shadow-sm hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                    <DownloadIcon className="w-5 h-5" />
                    Download with Edits
                </button>
            </div>
        </aside>
      </div>
    </div>
  );
};

export default FullScreenViewer;