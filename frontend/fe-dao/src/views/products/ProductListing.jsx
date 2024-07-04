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
    <div className="p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 container">
          {products? products.map(product =>(
          <ProductCard key={product.productId} product={product} onClick={handleProductClick}/>
          )) : ""} 
          <Button onClick={handleTestClick}>Test product</Button>      
          
      </div>
    </div>
  );
};

export default ProductListing;
