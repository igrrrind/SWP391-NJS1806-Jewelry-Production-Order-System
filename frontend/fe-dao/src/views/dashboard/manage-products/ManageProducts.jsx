import { useState, useEffect } from 'react';
import ProductTable from './ProductTable';

const ManageProductsPage = () => {

    const [products, setProducts] = useState([]);

   
    

    useEffect(() => {
      // Function to fetch order data from the API, map to collumns
      const fetchProducts = async () => {
          try {
              const response = await fetch('/data.json'); 
              const data = await response.json();
              const processedData = processData(data);
              setProducts(processedData);
              console.log(processedData);
          } catch (error) {
              console.error('Error fetching resources:', error);
          }
      };

      fetchProducts();
      }, []);

      const processData = (data) => {
        return data.Product.map(product => {
            const productTypes = data.Product_Types.find(pt => pt.product_type_id === product.product_type_id);

            return {
                ...product,
                product_type: productTypes.type_name
            }

        })

      }


    return (
        <main className="p-4 xl:flex flex-1 xl:space-x-4">
                <div className="flex-1">
                     <ProductTable products={products} />
                </div>
        </main>
    )
} 

export default ManageProductsPage;