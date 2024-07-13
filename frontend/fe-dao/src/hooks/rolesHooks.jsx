import axios from 'axios';
import { useEffect, useState } from 'react';

export function useAllRoles(){
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAllRoles = async () => {    
        try {
            setLoading(true);
            const response = await axios.get('https://localhost:7112/api/Role');
            setRoles(response.data);
            } catch (error) {
            console.error('Error fetching roles:', error);
            } finally {
            setLoading(false);
            }
        }; 
        fetchAllRoles();
    }, []);

    return {roles, loading}
}