// hooks.js
import axios from 'axios';
import { useState, useEffect } from 'react';

export function useAllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://localhost:7112/api/Product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);
  return { products, loading };
}

export function useAllActiveProducts(productTypeId) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchAllActiveProducts = async () => {
      if (!productTypeId) return
 
      try {
        setLoading(true);
        const productTypeQuerry = productTypeId==="all" ? `` :`&ProductTypeId=${productTypeId}`;
        console.log(productTypeQuerry)
        const response = await axios.get(`https://localhost:7112/api/Product?IsActive=true${productTypeQuerry}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllActiveProducts();
  }, [productTypeId]);
  return { products, loading };
}


export function useProductById(id) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7112/api/Product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductById();
  }, []);
  return { product, loading };
}

export function usePostProduct(product) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!product) return;

    const postProduct = async () => {
      product.isActive = true; // Add any default values to the product here
      setLoading(true);
      try {
        const res = await axios.post('https://localhost:7112/api/Product/Create', product); 
        setResponse(res.data);
        console.log(res);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    postProduct();
  }, [product]);

  return { response, loading, error };
}





