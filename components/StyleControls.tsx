import React from 'react';
import { SparklesIcon, LoadingSpinner, PaintBrushIcon } from './IconComponents';

interface StyleControlsProps {
  styleDescription: string;
  onStyleChange: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  disabled: boolean;
  numVariations: number;
  onNumVariationsChange: (num: number) => void;
}

const StyleControls: React.FC<StyleControlsProps> = ({ 
  styleDescription, 
  onStyleChange, 
  onGenerate, 
  isLoading, 
  disabled,
  numVariations,
  onNumVariationsChange
}) => {
  const variationOptions = [1, 2, 3, 4];

  return (
    <section>
      <div className="flex items-center gap-3 mb-1">
        <PaintBrushIcon className="w-6 h-6 text-stone-700" />
        <h2 className="text-2xl font-semibold font-serif text-stone-800">Describe the Vibe</h2>
      </div>
      <p className="text-sm text-stone-500 mb-4">Tell the AI the style or mood you're aiming for.</p>
      <textarea
        rows={3}
        className="w-full p-2 border border-stone-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 transition font-sans"
        placeholder="e.g., modern, minimalist, natural light..."
        value={styleDescription}
        onChange={(e) => onStyleChange(e.target.value)}
      />
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold font-serif text-stone-800">Number of Variations</h3>
        <p className="text-sm text-stone-500 mb-4">Choose how many different options to generate.</p>
        <div className="grid grid-cols-4 gap-2">
            {variationOptions.map((num) => (
                <button
                    key={num}
                    onClick={() => onNumVariationsChange(num)}
                    className={`text-center py-2 px-2 border rounded-md transition-all text-sm font-semibold ${
                        numVariations === num
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50 hover:border-emerald-400'
                    }`}
                    aria-pressed={numVariations === num}
                >
                    {num}
                </button>
            ))}
        </div>
      </div>
      
      <button
        onClick={onGenerate}
        disabled={isLoading || disabled}
        className={`mt-6 w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-300 disabled:cursor-not-allowed transition-colors ${
          isLoading ? 'animate-pulse' : ''
        }`}
      >
        {isLoading ? (
          <>
            <LoadingSpinner className="w-5 h-5 mr-3" />
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 mr-3" />
            Generate Lookbook{numVariations > 1 ? 's' : ''}
          </>
        )}
      </button>
    </section>
  );
};

export default StyleControls;
