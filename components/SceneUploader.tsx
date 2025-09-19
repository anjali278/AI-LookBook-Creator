import React, { useState, useCallback, ChangeEvent } from 'react';
import { fileToBase64 } from '../utils/imageUtils';
import { ImageIcon } from './IconComponents';

interface SceneUploaderProps {
  onImageUpload: (base64: string) => void;
}

const SceneUploader: React.FC<SceneUploaderProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setPreview(base64);
      onImageUpload(base64);
    }
  }, [onImageUpload]);

  return (
    <section>
       <div className="flex items-center gap-3 mb-1">
        <ImageIcon className="w-6 h-6 text-stone-700" />
        <h2 className="text-2xl font-semibold font-serif text-stone-800">Upload a Scene</h2>
      </div>
      <p className="text-sm text-stone-500 mb-4">Provide an image of your room or desired setting.</p>
      <div className="mt-1 flex justify-center p-6 border-2 border-stone-300 border-dashed rounded-md">
        <div className="space-y-2 text-center w-full">
          {preview ? (
            <img src={preview} alt="Scene preview" className="w-full max-h-80 rounded-md object-contain" />
          ) : (
             <div className="flex flex-col items-center">
                <ImageIcon className="mx-auto h-12 w-12 text-stone-400" />
            </div>
          )}
          <div className="flex text-sm justify-center text-stone-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
            >
              <span>Upload a file</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*"/>
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-stone-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </section>
  );
};

export default SceneUploader;