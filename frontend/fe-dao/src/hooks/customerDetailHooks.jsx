import axios from "axios";
import { useEffect, useState } from "react";

export function useCustomerDetailsById(id) {
    const [customerDetails, setCustomerDetails] = useState([]);
    const [loading, setLoading] = useState(true);

   
  
    useEffect(() => {
      const fetchCustomerDetailsById = async () => {
        if (!id) {
          setLoading(false)
          return;
        }
        
        try {
          setLoading(true);
          const response = await axios.get(`https://localhost:7112/api/CustomerDetails/${id.uid}`);
          setCustomerDetails(response.data);
        } catch (error) {
          console.error('Error fetching customer details:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCustomerDetailsById();
    }, [id]);
    return { customerDetails, loading };
}

export function usePostCustDetails(details) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!details) return;
  
      const postDetails= async () => {
        setLoading(true);
        try {
          const res = await axios.post('https://localhost:7112/api/CustomerdDetails', details); // Change to your API endpoint
          setResponse(res.data);
          console.log(res);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      postDetails();
    }, [details]);
  
    return { response, loading, error };
  }