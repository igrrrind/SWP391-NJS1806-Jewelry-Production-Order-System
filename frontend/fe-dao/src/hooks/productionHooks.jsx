import axios from 'axios';
import { useEffect, useState } from 'react';

export function useAllProductions(){
    const [productions, setProductions] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchProductions = async () => {    
        try {
            setLoading(true);
            const response = await axios.get('https://localhost:7112/api/ProductionTrackings');
            setProductions(response.data);
            } catch (error) {
            console.error('Error fetching productions:', error);
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


  export function useAllProductionStatuses(){
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchProductionStatuses = async () => {    
        try {
            setLoading(true);
            const response = await axios.get('https://localhost:7112/api/ProductionStatus');
            setStatuses(response.data);
            } catch (error) {
            console.error('Error fetching production statuses:', error);
            } finally {
            setLoading(false);
            }
        }; 
        fetchProductionStatuses();
    }, []);

    return {statuses, loading}
}



export function usePutProduction()  {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProductionStatus = async (production, productionStatusId) => {
      setLoading(true);
      try {
          const updatedProduction = { ...production, productionStatusId };

          console.log('Updating production:', updatedProduction);

          const res = await axios.put(`https://localhost:7112/api/ProductionTrackings/${production.productionStatusId}`, updatedProduction);
          setResponse(res.data.data);
      } catch (err) {
          setError(err);
      } finally {
          setLoading(false);
      }
  };

  return { updateProductionStatus, response, loading, error };
};