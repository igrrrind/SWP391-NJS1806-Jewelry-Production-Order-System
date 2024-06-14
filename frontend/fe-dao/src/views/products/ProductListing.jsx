import React from 'react';
import ProductCard from './ProductCard.jsx';
import { useNavigate } from 'react-router-dom';

const ProductListing = ({products}) => {

  const navigate = useNavigate();


  const handleProductClick = (productId, productName) => {
    const formattedName = productName.toLowerCase().replace(/\s+/g, '-'); // Format product name
    navigate(`/products/${productId}/${formattedName}`);
  };

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 container">
          {products.map(product =>(
          <ProductCard key={product.productId} product={product}/>
          ))}       
          
      </div>
    </div>
  );
};

export default ProductListing;
