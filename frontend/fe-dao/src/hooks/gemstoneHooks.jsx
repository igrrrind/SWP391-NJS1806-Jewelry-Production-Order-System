import axios from "axios";
import { useEffect, useState } from "react";

export function useGetAllGemstones(){
    const [gemstones, setGemstones ] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchGemstones = async () => {    
        try {
            setLoading(true);
            const response = await axios.get('https://localhost:7112/api/Gemstone');
            setGemstones(response.data);
            } catch (error) {
            console.error('Error fetching products:', error);
            } finally {
            setLoading(false);
            }
        }; 
        fetchGemstones();
    }, []);

    return {gemstones, loading}
}