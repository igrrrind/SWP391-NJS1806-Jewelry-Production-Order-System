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
        const response = await axios.get('https://localhost:7169/api/Product');
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

export function useAllActiveProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllActiveProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://localhost:7169/api/Product/Active');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllActiveProducts();
  }, []);
  return { products, loading };
}


export function useProductById(id) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7169/api/Product/${id}`);
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




