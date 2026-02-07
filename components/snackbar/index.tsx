'use client';

import { useEffect, useState } from 'react';

export type SnackbarType = 'success' | 'error' | 'info' | 'warning';

interface SnackbarProps {
  message: string;
  type: SnackbarType;
  duration?: number;
  onClose: () => void;
}

const bgColors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-yellow-500',
};

const icons = {
  success: (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zM374 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L221.1 315.2 169 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.8 7.5 18.8 7s13.4-4.1 17.5-9.8L379.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z"/>
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c9.4-9.4 24.6-9.4 33.9 0l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9z"/>
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/>
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zm0-192a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.6 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"/>
    </svg>
  ),
};

export const Snackbar = ({ message, type, duration = 3000, onClose }: SnackbarProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isEntered, setIsEntered] = useState(false);

  // 表示時：下からぴょこっと
  useEffect(() => {
    const enterTimer = setTimeout(() => {
      setIsEntered(true);
    }, 10); // transition を効かせるため少し遅らせる

    return () => clearTimeout(enterTimer);
  }, []);

  // 自動クローズ開始
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  // アニメ後に削除
  useEffect(() => {
    if (!isClosing) return;

    const timer = setTimeout(onClose, 300);
    return () => clearTimeout(timer);
  }, [isClosing, onClose]);

  return (
    <div
      className={`
        flex items-center gap-2 text-white font-bold text-sm p-3 rounded-lg shadow-lg
        transition-all duration-300 ease-out
        ${bgColors[type]}
        ${
          !isEntered
            ? 'opacity-0 translate-y-8'
            : isClosing
              ? 'opacity-0 translate-y-8'
              : 'opacity-100 translate-y-0'
        }
      `}
    >
      {icons[type]}
      {message}
    </div>
  );
};
