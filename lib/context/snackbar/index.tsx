'use client';

import { createContext, useState, ReactNode, useCallback } from 'react';
import { Snackbar, SnackbarType } from '@/components/snackbar';

interface SnackbarItem {
  id: number;
  message: string;
  type: SnackbarType;
}

interface SnackbarContextType {
  show: (message: string, type: SnackbarType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

  const show = useCallback((message: string, type: SnackbarType, duration?: number) => {
    const id = Date.now();
    setSnackbars(prev => [...prev, { id, message, type }]);
  }, []);

  const remove = useCallback((id: number) => {
    setSnackbars(prev => prev.filter(s => s.id !== id));
  }, []);

  const value = {
    show,
    success: (message: string, duration?: number) => show(message, 'success', duration),
    error: (message: string, duration?: number) => show(message, 'error', duration),
    info: (message: string, duration?: number) => show(message, 'info', duration),
    warning: (message: string, duration?: number) => show(message, 'warning', duration),
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {snackbars.map(snack => (
          <Snackbar
            key={snack.id}
            message={snack.message}
            type={snack.type}
            onClose={() => remove(snack.id)}
          />
        ))}
      </div>
    </SnackbarContext.Provider>
  );
};