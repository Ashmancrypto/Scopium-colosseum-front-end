import { useState, useCallback, useRef } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  const addToast = useCallback((toast) => {
    const id = ++toastIdRef.current;
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      ...toast,
    };

    setToasts(prev => {
      const updated = [...prev, newToast];
      return updated;
    });

    // Auto remove toast after duration
    if (newToast.duration) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => {
      const updated = prev.filter(toast => toast.id !== id);
      return updated;
    });
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods for different toast types
  const success = useCallback((title, message, duration = 5000, options = {}) => {
    // Handle both old and new API formats
    if (typeof duration === 'object') {
      options = duration;
      duration = options.duration || 5000;
    }
    
    return addToast({
      type: 'success',
      title,
      message,
      duration,
      ...options,
    });
  }, [addToast]);

  const error = useCallback((title, message, duration = 8000, options = {}) => {
    // Handle both old and new API formats
    if (typeof duration === 'object') {
      options = duration;
      duration = options.duration || 8000;
    }
    
    return addToast({
      type: 'error',
      title,
      message,
      duration,
      ...options,
    });
  }, [addToast]);

  const warning = useCallback((title, message, duration = 6000, options = {}) => {
    // Handle both old and new API formats
    if (typeof duration === 'object') {
      options = duration;
      duration = options.duration || 6000;
    }
    
    return addToast({
      type: 'warning',
      title,
      message,
      duration,
      ...options,
    });
  }, [addToast]);

  const info = useCallback((title, message, duration = 4000, options = {}) => {
    // Handle both old and new API formats
    if (typeof duration === 'object') {
      options = duration;
      duration = options.duration || 4000;
    }
    
    return addToast({
      type: 'info',
      title,
      message,
      duration,
      ...options,
    });
  }, [addToast]);

  // Transaction-specific toast methods
  const transactionPending = useCallback((txHash, duration = null, options = {}) => {
    // Handle both old and new API formats
    if (typeof duration === 'object') {
      options = duration;
      duration = options.duration || null;
    }
    
    return addToast({
      type: 'info',
      title: 'Transaction Pending',
      message: 'Your transaction is being processed on the blockchain.',
      txHash,
      duration,
      ...options,
    });
  }, [addToast]);

  const transactionSuccess = useCallback((title, message, txHash, duration = 10000, options = {}) => {
    // Handle both old and new API formats
    if (typeof duration === 'object') {
      options = duration;
      duration = options.duration || 10000;
    }
    
    return addToast({
      type: 'success',
      title: title || 'Transaction Successful',
      message: message || 'Your transaction has been confirmed on the blockchain.',
      txHash,
      duration,
      ...options,
    });
  }, [addToast]);

  const transactionError = useCallback((message, txHash, duration = 12000, options = {}) => {
    // Handle both old and new API formats
    if (typeof duration === 'object') {
      options = duration;
      duration = options.duration || 12000;
    }
    
    return addToast({
      type: 'error',
      title: 'Transaction Failed',
      message: message || 'Your transaction could not be completed.',
      txHash,
      duration,
      ...options,
    });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    success,
    error,
    warning,
    info,
    transactionPending,
    transactionSuccess,
    transactionError,
  };
};