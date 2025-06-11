import { toast as sonnerToast } from 'sonner';

interface ToastOptions {
  id?: string | number;
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, options);
  },

  error: (message: string, options?: ToastOptions) => {
    return sonnerToast.error(message, options);
  },

  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(message, options);
  },

  info: (message: string, options?: ToastOptions) => {
    return sonnerToast.info(message, options);
  },

  loading: (message: string, options?: ToastOptions) => {
    return sonnerToast.loading(message, options);
  },

  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return sonnerToast.promise(promise, options);
  },

  dismiss: (id?: string | number) => {
    return sonnerToast.dismiss(id);
  },
};
