
import React from 'react';
import { LoadingSpinnerIcon } from './icons/LoadingSpinnerIcon';

interface SubmitButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, isLoading, isDisabled }) => {
  const disabled = isLoading || isDisabled;
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 transition-all duration-300
        ${
          disabled
            ? 'bg-sky-300 cursor-not-allowed'
            : 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-300'
        }
      `}
    >
      {isLoading ? (
        <>
          <LoadingSpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          Đang gửi...
        </>
      ) : (
        'Gửi Hồ Sơ'
      )}
    </button>
  );
};
