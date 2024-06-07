import React from 'react';
import ProductCard from './ProductCard.jsx';

const ProductListing = () => {
  return (
    <div className="p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <ProductCard/><ProductCard/><ProductCard/><ProductCard/><ProductCard/>
          
      </div>
    </div>
  );
};

export default ProductListing;
