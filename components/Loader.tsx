
import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg text-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mb-4"></div>
      <p className="text-lg font-semibold text-gray-700">{message}</p>
    </div>
  );
};

export default Loader;
