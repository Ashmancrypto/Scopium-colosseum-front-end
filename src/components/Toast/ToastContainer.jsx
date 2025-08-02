import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ toast, onRemove }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-l-green-500';
      case 'error':
        return 'border-l-red-400';
      case 'warning':
        return 'border-l-yellow-400';
      case 'info':
      default:
        return 'border-l-blue-400';
    }
  };

  const getProgressBarColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-400';
      case 'warning':
        return 'bg-yellow-400';
      case 'info':
      default:
        return 'bg-blue-400';
    }
  };

  return (
   <div className={`bg-gray-700/95 backdrop-blur-md border border-gray-700 ${getBorderColor()} border-l-4 rounded-lg shadow-2xl p-4 mb-3 min-w-80 max-w-md animate-slide-in`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white mb-1">
                {toast.title}
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {toast.message}
              </p>
              {toast.txHash && (
                <div className="mt-2">
                  <a
                    href={`https://solscan.io/tx/${toast.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-pink-400 hover:text-pink-300 underline font-medium"
                  >
                    View Transaction →
                  </a>
                </div>
              )}
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="flex-shrink-0 ml-3 text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700/50 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress bar for auto-dismiss */}
      {toast.duration && (
        <div className="mt-3 w-full bg-gray-700/50 rounded-full h-1">
          <div 
            className={`h-1 rounded-full transition-all ease-linear ${getProgressBarColor()}`}
            style={{
              width: '100%',
              animation: `shrink ${toast.duration}ms linear forwards`
            }}
          />
        </div>
      )}
    </div>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  if (!toasts || toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-[9999] space-y-2">
      {toasts.filter(Boolean).map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;