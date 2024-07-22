import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePostProductStocks(productStocks) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productStocks || productStocks.length === 0) return;

    const postProductStocks = async () => {
      setLoading(true);
      const tempResponses = [];
      for (const stock of productStocks) {
        try {
          const res = await axios.post('https://localhost:7112/api/Stock/AddNewStockItem', stock); // Change to your API endpoint
          tempResponses.push(res.data);
          console.log(res);
        } catch (err) {
          setError(err);
          break;
        }
      }
      setLoading(false);
      setResponse(tempResponses);
    };

    postProductStocks();
  }, [productStocks]);

  return { response, loading, error };
}


export function useProductStocksById(id) {
  const [productStocks, setProductStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductStocksById = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7112/api/Stock/${id}`);
        setProductStocks(response.data);
      } catch (error) {
        console.error('Error fetching product stocks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductStocksById();
  }, []);
  return { productStocks, loading };
}



export function usePutProductStocks() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    

    const updateProductStocks = async (productStocks) => {
      if (!productStocks || productStocks.length === 0) return;
      setLoading(true);
      const tempResponses = [];
      for (const stock of productStocks) {
        try {
          let res;

          if (!stock.productStockId) {
              res = await axios.post('https://localhost:7112/api/Stock/AddNewStockItem', stock); 
          } else {
              res = await axios.put('https://localhost:7112/api/Stock/Update', stock); 
          }          
          tempResponses.push(res.data);
        } catch (err) {
          setError(err);
          break;
        }
      }
      setLoading(false);
      setResponse(tempResponses);
    };

    

  return { updateProductStocks, response, loading, error };
}
