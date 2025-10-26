import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* e& Logo - Left */}
        <div className="flex-shrink-0">
          <img 
            src="https://ik.imagekit.io/xtj3m9hth/image-remove1bg-preview%20(3).png?updatedAt=1761220721716" 
            alt="e& Logo" 
            className="h-10" 
          />
        </div>

        {/* Slogan - Center */}
        <div className="flex-grow text-center px-4 hidden sm:block">
          <h1 className="text-lg font-light text-gray-600 italic">
            More than a first impression. A lasting relationship
          </h1>
        </div>
        
        {/* Zoho One Logo - Right */}
        <div className="flex-shrink-0">
          <img 
            src="https://ik.imagekit.io/xtj3m9hth/image-removebg-preview%20(3).png?updatedAt=1761220721361" 
            alt="Zoho One Logo" 
            className="h-9" 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;