import React from 'react';
import ProductCard from './ProductCard.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const ProductListing = ({products}) => {

  const navigate = useNavigate();


  const handleProductClick = (formattedLink) => {
    navigate(formattedLink);
  };

  const handleTestClick = () => {
    navigate(`/products/1/heart-charm`);
  };


  return (
    <div className="py-10">
      <p className='mb-2'>Found <span className="font-bold">{products.length}</span> designs matching your search.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products? products.map(product =>(
          <ProductCard key={product.productId} product={product} onClick={handleProductClick}/>
          )) : ""}           
      </div>
    </div>
  );
};

export default ProductListing;
