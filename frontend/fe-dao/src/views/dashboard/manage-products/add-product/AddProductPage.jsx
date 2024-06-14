import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import axios from "axios";
import AddProductStock from "./AddProductStock";


const AddProductPage = () => {
    //get all types, all gemstones, all metals
    const [productTypes, setProductTypes] = useState([]);
    const [metals, setMetals] = useState([]);
    const [gemstones, setGemstones] = useState([]);
    const [newProductId, setNewProductId] =  useState([]);
    const [isCreated, setIsCreated] = useState(false);


    useEffect(() => {
        // Function to fetch product types data from the API
        const fetchProductsTypes = async () => {    
          try {
            const response = await fetch('https://localhost:7169/api/Product/type');
            const data = await response.json();
            setProductTypes(data);
            console.log(productTypes);
          } catch (error) {
            console.error('Error fetching resources:', error);
          }
        }; 
        fetchProductsTypes();
    }, []);



    //FETCH THIS FOR CHOOSING PRODUCT STOCK
    

    useEffect(() => {
        // Function to fetch metals data from the API
        const fetchMetals = async () => {
          if (!isCreated) return; // Only fetch if isSubmitted is true
    
          try {
            const response = await fetch('https://localhost:7169/api/Metal');
            const data = await response.json();
            setMetals(data);
            console.log(data);
          } catch (error) {
            console.error('Error fetching resources:', error);
          }
        }; 
        fetchMetals();
    }, [isCreated]);

    useEffect(() => {
      // Function to fetch metals data from the API
      const fetchGemstones = async () => {
        if (!isCreated) return; // Only fetch if isSubmitted is true
        try {
          const response = await fetch('https://localhost:7169/api/Gemstone');
          const data = await response.json();
          setGemstones(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching resources:', error);
        }
      }; 
      fetchGemstones();
  }, [isCreated]);



    //HANDLING PRODUCT DATA SUBMISSION

    const handleSubmit = (data) => {
        console.log(data);
        data.isActive = true;

        console.log(data);
        axios.post('https://localhost:7169/api/Product/Create', data)
        
            .then(response => {
                console.log('Product created successfully:', response.data);
                setIsCreated(true);
                // Handle success (e.g., redirect or display a message)
                setNewProductId(response.data.productId)
            })
            .catch(error => {
                console.error('There was an error creating the product:', error);
                // Handle error
            });
            
     
    };



    return (
        <>
            {/*
            <AddProduct productTypes={productTypes} onSubmit={handleSubmit} isSubmitted={isCreated}/>
            {isCreated &&  <AddProductStock metals={metals} gemstones={gemstones} productReference={newProductId}></AddProductStock>}
            */}
            <AddProductStock metals={metals} gemstones={gemstones} productReference={newProductId}></AddProductStock>
        </>
    )
}

export default AddProductPage