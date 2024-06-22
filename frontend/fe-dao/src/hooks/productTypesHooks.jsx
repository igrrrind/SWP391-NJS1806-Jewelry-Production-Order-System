import axios from 'axios';
import { useEffect, useState } from 'react';

export function useGetAllProductTypes(){
    const [productTypes, setProductTypes] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchProductsTypes = async () => {    
        try {
            setLoading(true);
            const response = await axios.get('https://localhost:7112/api/Product/type');
            setProductTypes(response.data);
            } catch (error) {
            console.error('Error fetching products:', error);
            } finally {
            setLoading(false);
            }
        }; 
        fetchProductsTypes();
    }, []);

    return {productTypes, loading}
}