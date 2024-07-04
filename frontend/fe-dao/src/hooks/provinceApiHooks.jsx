import axios from 'axios';
import { useEffect, useState } from "react";

export function useAllProvince() {
    const [provinces, setProvinces] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/province.json');
                setProvinces(response.data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProvinces();
    }, []);

    useEffect(() => {
        if (provinces) {
            console.log(provinces);
        }
    }, [provinces]);

    
    return { provinces, loading };
}
