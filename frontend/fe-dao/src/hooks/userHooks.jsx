import axios from "axios";
import { useEffect, useState } from "react";

export function usePostUser(user) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
      if (!user) return;
  
      const postUser = async () => {
        setLoading(true);
        try {
          const res = await axios.post('https://localhost:7112/api/Users', user); // Change to your API endpoint
          setResponse(res.data);
          console.log(res);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      postUser();
    }, [user]);
  
    return { response, loading, error };
  }



export function useUserById(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserById = async () => {
      if (!id) {
        setLoading(false)
        return;
      }
      
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7112/api/Users/${id.uid}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserById();
  }, [id]);
  return { user, loading };
}


export function useAllUsers(querry) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let getRolen = ''
        if (querry !== ''){
          getRolen = `/GetRole${querry}`
        }
        console.log(getRolen)
        
        const response = await axios.get(`https://localhost:7112/api/Users${getRolen}?pageSize=20`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [querry]);
  return { users, loading };
}


export function useUserCustomerbyId(id) {
  const [userCustomer, setUserCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCustomerbyId = async () => {
      if (!id) return
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7112/api/Users/Customer/${id}`);
        setUserCustomer(response.data);
      } catch (error) {
        console.error('Error fetching user customer info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCustomerbyId();
  }, [id]);
  return { userCustomer, loading };
}


export function usePutUser()  {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (user) => {
      setLoading(true);
      try {
          console.log(user)
          const res = await axios.put(`https://localhost:7112/api/Users/${user.uid}`, user);
          setResponse(res.status);
          //console.log(res.status)
      } catch (err) {
          setError(err);
      } finally {
          setLoading(false);
      }
  };

  return { updateUser, response, loading, error };

}
