import { useState, useEffect } from 'react';
import ProductTable from './ProductTable';

const ManageProductsPage = () => {

    const [products, setProducts] = useState([]);

   
    

    useEffect(() => {
      // Function to fetch order data from the API, map to collumns
      const fetchProducts = async () => {
          try {
              const response = await fetch('https://localhost:7169/api/Product'); 
              const data = await response.json();
              setProducts(data);
              console.log(data);
          } catch (error) {
              console.error('Error fetching resources:', error);
          }
      };

      fetchProducts();
      }, []);

    return (
        <main className="p-4 xl:flex flex-1 xl:space-x-4">
                <div className="flex-1">
                     <ProductTable products={products} />
                </div>
        </main>
    )
} 

export default ManageProductsPage;