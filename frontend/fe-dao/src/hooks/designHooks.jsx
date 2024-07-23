import axios from "axios";
import { useEffect, useState } from "react";

export function useAllDesigns(){
    const [designs, setDesigns ] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchDesigns = async () => {    
        try {
            setLoading(true);
            const response = await axios.get('https://localhost:7112/api/Design');
            setDesigns(response.data);
            } catch (error) {
            console.error('Error fetching designs:', error);
            } finally {
            setLoading(false);
            }
        }; 
        fetchDesigns();
    }, []);

    return {designs, loading}
}



export function useDesignById(id){
    const [design, setDesign ] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchDesignById = async () => {    
        try {
            if (!id) return
            setLoading(true);
            const response = await axios.get(`https://localhost:7112/api/Designs/${id}`);
            setDesign(response.data);
            } catch (error) {
            console.error('Error fetching design:', error);
            } finally {
            setLoading(false);
            }
        }; 
        fetchDesignById();
    }, [id]);

    return {design, loading}
}


export function usePostDesign() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
      const postDesign = async (design) => {
        setLoading(true);
        try {
          const res = await axios.post('https://localhost:7112/api/Designs', design); 
          setResponse(res.data);
          console.log(res);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

    return { postDesign, response, loading, error };
}



export function usePutDesign() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    const updateDesign = async (design) => {
      setLoading(true);
      try {
        design.designatedCompletion = design.designatedCompletion.toISOString().substring(0, 10)
        const res = await axios.put(`https://localhost:7112/api/Designs/${design.designId}`, design); 
        setResponse(res.data);
        console.log(res);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

  return { updateDesign, response, loading, error };
}


