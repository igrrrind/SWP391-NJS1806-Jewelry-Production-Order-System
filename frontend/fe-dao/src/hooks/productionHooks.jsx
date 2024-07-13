import axios from 'axios';
import { useEffect, useState } from 'react';

export function useAllProductions(){
    const [productions, setProductions] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchProductions = async () => {    
        try {
            setLoading(true);
            const response = await axios.get('https://localhost:7112/api/Product/type');
            setProductions(response.data);
            } catch (error) {
            console.error('Error fetching products:', error);
            } finally {
            setLoading(false);
            }
        }; 
        fetchProductions();
    }, []);

    return {productions, loading}
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