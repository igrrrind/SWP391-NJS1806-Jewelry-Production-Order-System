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

export function useAllActiveProducts({
  productTypeId,
  searchKeyword,
  isActive = true,
  sortBy,
  isDescending,
  pageNumber,
  pageSize = 16,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllActiveProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (productTypeId) params.append('ProductTypeId', productTypeId);
        if (searchKeyword) params.append('SearchKeyWord', searchKeyword);
        if (isActive !== undefined) params.append('IsActive', isActive);
        if (sortBy) params.append('SortBy', sortBy);
        if (isDescending !== undefined) params.append('IsDescending', isDescending);
        if (pageNumber) params.append('PageNumber', pageNumber);
        if (pageSize) params.append('PageSize', pageSize);

        console.log(params.toString())

        const response = await axios.get(`https://localhost:7112/api/Product?${params.toString()}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllActiveProducts();
  }, [productTypeId, searchKeyword, isActive, sortBy, isDescending, pageNumber, pageSize]);

  return { products, loading };
}


export function useProductById(id) {
  const [product, setProduct] = useState(null);
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



export function usePutProduct()  {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const updateProduct = async (product) => {
      console.log(product)
      
      setLoading(true);
      try {
          const res = await axios.put(`https://localhost:7112/api/Product/Update`, product); 
      } catch (err) {
          setError(err);
      } finally {
          setLoading(false);
      }
  };

  return { updateProduct, response, loading, error };
};





