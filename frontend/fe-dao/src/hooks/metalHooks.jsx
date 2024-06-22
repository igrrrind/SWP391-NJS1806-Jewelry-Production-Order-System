import axios from "axios";
import { useEffect, useState } from "react";

export function useGetAllMetals(){
    const [metals, setMetals ] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchMetals = async () => {    
        try {
            setLoading(true);
            const response = await axios.get('https://localhost:7112/api/Metal');
            setMetals(response.data);
            } catch (error) {
            console.error('Error fetching products:', error);
            } finally {
            setLoading(false);
            }
        }; 
        fetchMetals();
    }, []);

    return {metals, loading}
}