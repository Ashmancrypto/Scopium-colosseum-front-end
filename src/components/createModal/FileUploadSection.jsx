import React from 'react';
import { Image, File } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const FileUploadSection = ({ state, handlers, disabled = false }) => {
  const { isDark } = useTheme();
  
  return (
    <>
      {/* File Upload Area */}
      <div>
        <div className={`relative border-2 border-dashed rounded-lg p-10 text-center transition-colors ${
          isDark 
           ? `border-gray-500 bg-gray-700/70 ${!disabled ? 'hover:border-gray-400' : ''}` 
            : `border-gray-300 bg-gray-100/50 ${!disabled ? 'hover:border-gray-400' : ''}`
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <label htmlFor="coinImage" className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
            <input
              id="coinImage"
              type="file"
              accept="image/*"
              onChange={!disabled ? handlers.handleCoinImageChange : undefined}
              disabled={disabled}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            
            {state.coinImage ? (
              <div className="space-y-3">
                <div className={`w-28 h-28 mx-auto rounded-lg overflow-hidden border-2 transition-colors duration-300 ${
                  isDark ? 'border-gray-500' : 'border-gray-300'
                }`}>
                  <img 
                    src={state.coinImage} 
                    alt="Coin preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className={`text-sm font-medium transition-colors duration-300 ${
                  isDark ? 'text-[#F7F7F7]' : 'text-gray-800'
                }`}>{state.imageName}</p>
                {!disabled && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handlers.removeCoinImage();
                    }}
                    className={`text-xs transition-colors ${
                      isDark 
                        ? 'text-pink-400 hover:text-pink-300' 
                        : 'text-pink-600 hover:text-pink-700'
                    }`}
                  >
                    Replace image
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className={`w-14 h-14 mx-auto rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isDark ? 'bg-gray-700/90' : 'bg-gray-200'
                }`}>
                  <Image className={`w-7 h-7 transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <p className={`font-medium mb-1 text-sm transition-colors duration-300 ${
                    isDark ? 'text-[#F7F7F7]' : 'text-gray-800'
                  }`}>Select image to upload</p>
                  <p className={`text-xs transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-700'
                  }`}>Or drag and drop it here</p>
                </div>
                <div className={`text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors inline-block ${
                  isDark 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-pink-500 hover:bg-pink-600'
                }`}>
                  Choose Image
                </div>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* File Requirements */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 text-xs transition-colors duration-300 ${
        isDark ? 'text-gray-400' : 'text-gray-700'
      }`}>
        <div className="flex items-start space-x-2">
          <File className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`} />
          <div>
            <p className={`font-medium mb-1 transition-colors duration-300 ${
              isDark ? 'text-[#F7F7F7]' : 'text-gray-800'
            }`}>File size and type</p>
            <ul className="space-y-1">
              <li>• image - max 15mb, ".gif" or ".png" recommended</li>
            </ul>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Image className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`} />
          <div>
            <p className={`font-medium mb-1 transition-colors duration-300 ${
              isDark ? 'text-[#F7F7F7]' : 'text-gray-800'
            }`}>Resolution and aspect ratio</p>
            <ul className="space-y-1">
              <li>• image - 400x400, 1000px+ if square recommended</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploadSection;