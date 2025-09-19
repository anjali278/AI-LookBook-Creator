
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900">AI Lookbook Creator</h1>
        <p className="mt-1 text-md text-gray-600">
          Visualize products in any setting. Upload a scene, pick a product, and let AI create the perfect look.
        </p>
      </div>
    </header>
  );
};

export default Header;
