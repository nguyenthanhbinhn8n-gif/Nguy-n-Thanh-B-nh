
import React from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIconSolid } from './icons/XCircleIconSolid';
import { InformationCircleIcon } from './icons/InformationCircleIcon';

interface StatusAlertProps {
  type: 'success' | 'error' | 'info';
  message: string;
}

const alertStyles = {
  success: {
    container: 'bg-green-100 border-green-400 text-green-800',
    icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
  },
  error: {
    container: 'bg-red-100 border-red-400 text-red-800',
    icon: <XCircleIconSolid className="h-5 w-5 text-red-500" />,
  },
  info: {
    container: 'bg-blue-100 border-blue-400 text-blue-800',
    icon: <InformationCircleIcon className="h-5 w-5 text-blue-500" />,
  },
};

export const StatusAlert: React.FC<StatusAlertProps> = ({ type, message }) => {
  const { container, icon } = alertStyles[type];

  return (
    <div className={`border-l-4 p-4 rounded-md ${container}`} role="alert">
      <div className="flex">
        <div className="py-1">
          {icon}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};
