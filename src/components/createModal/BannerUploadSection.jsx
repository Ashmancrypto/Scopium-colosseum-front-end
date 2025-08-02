import React from 'react';
import { Upload, Image, File, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const BannerUploadSection = ({ state, handlers, disabled = false }) => {
  const { isDark } = useTheme();

  return (
    <div>
      <button
        type="button"
        onClick={() => !disabled && state.setShowBannerUpload(!state.showBannerUpload)}
        disabled={disabled}
        className={`flex items-center text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark
            ? 'text-green-400 hover:text-green-300'
            : 'text-pink-600 hover:text-pink-700'
          }`}
      >
        <Image className="w-4 h-4 mr-2" />
        Add banner <span className={`ml-1 font-normal ${isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>(optional)</span>
        {state.showBannerUpload ? (
          <ChevronUp className="w-4 h-4 ml-2" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-2" />
        )}
      </button>

      {/* Banner Upload Section - Expandable */}
      {state.showBannerUpload && (
        <div className={`mt-4 space-y-4 p-4 rounded-lg border transition-colors duration-300 ${isDark
            ? 'bg-gray-700/70 border-gray-500'
            : 'bg-gray-50 border-gray-200'
          }`}>
          <h4 className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-[#F7F7F7]' : 'text-gray-800'
            }`}>Upload banner</h4>
          <p className={`text-xs leading-relaxed transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-600'
            }`}>
            This will be shown on the coin page in addition to the coin image. Images or animated gifs up to 5mb,
            3:1 / 1500x500px original. You can only do this when creating the coin, and it cannot be changed later.
          </p>

          {/* Banner Upload Area */}
          <div className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDark
              ? `border-gray-500 bg-gray-600/70 ${!disabled ? 'hover:border-gray-400 hover:bg-gray-600/90' : ''}`
              : `border-gray-400 bg-white ${!disabled ? 'hover:border-gray-500 hover:bg-gray-50' : ''}`
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <label htmlFor="bannerImage" className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
              <input
                id="bannerImage"
                type="file"
                accept="image/*"
                onChange={!disabled ? handlers.handleBannerImageChange : undefined}
                disabled={disabled}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />

              {state.bannerImage ? (
                <div className="space-y-3">
                  <div className={`w-full max-w-xs h-24 mx-auto rounded-lg overflow-hidden border-2 transition-colors duration-300 ${isDark ? 'border-gray-500' : 'border-gray-300'
                    }`}>
                    <img
                      src={state.bannerImage}
                      alt="Banner preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-[#F7F7F7]' : 'text-gray-900'
                    }`}>{state.bannerName}</p>
                  {!disabled && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handlers.removeBannerImage();
                      }}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove file
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-gray-500/90' : 'bg-gray-200'
                    }`}>
                    <Upload className={`w-6 h-6 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'
                      }`} />
                  </div>
                  <div>
                    <p className={`font-medium mb-1 text-sm transition-colors duration-300 ${isDark ? 'text-[#F7F7F7]' : 'text-gray-900'
                      }`}>Upload file...</p>
                  </div>
                  <div className={`text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors inline-block ${isDark
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-pink-500 hover:bg-pink-600'
                    }`}>
                    Select file
                  </div>
                </div>
              )}
            </label>
          </div>

          {/* Banner Requirements */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 text-xs transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
            <div className="flex items-start space-x-2">
              <File className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'
                }`} />
              <div>
                <p className={`font-medium mb-1 transition-colors duration-300 ${isDark ? 'text-[#F7F7F7]' : 'text-gray-800'
                  }`}>File size and type</p>
                <ul className="space-y-1">
                  <li>• image - max 5mb, ".gif" or ".png" recommended</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Image className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'
                }`} />
              <div>
                <p className={`font-medium mb-1 transition-colors duration-300 ${isDark ? 'text-[#F7F7F7]' : 'text-gray-800'
                  }`}>Resolution and aspect ratio</p>
                <ul className="space-y-1">
                  <li>• 3:1 aspect ratio, 1500x500px recommended</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerUploadSection;