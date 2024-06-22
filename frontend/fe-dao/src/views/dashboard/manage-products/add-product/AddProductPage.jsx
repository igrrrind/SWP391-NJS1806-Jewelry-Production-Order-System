import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import axios from "axios";
import AddProductStock from "./AddProductStock";
import { useGetAllProductTypes } from "@/hooks/productTypesHooks";
import { useGetAllMetals } from "@/hooks/metalHooks";
import { useGetAllGemstones } from "@/hooks/gemstoneHooks";


const AddProductPage = () => {
    //get all types, all gemstones, all metals
    const [newProductId, setNewProductId] =  useState([]);
    const [isCreated, setIsCreated] = useState(false);

    const productTypes = useGetAllProductTypes()
    const metals = useGetAllMetals()
    const gemstones = useGetAllGemstones()


    //HANDLING PRODUCT DATA SUBMISSION

    const handleSubmit = (data) => {
        console.log(data);
        data.isActive = true;

        console.log(data);
        axios.post('https://localhost:7112/api/Product/Create', data)
        
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

    const handleStockSubmit= (data) => {
      console.log(data)
    }



    return (
        <>
            <AddProduct productTypes={productTypes} onSubmit={handleSubmit} isSubmitted={isCreated}/>
            {isCreated &&  <AddProductStock metals={metals} gemstones={gemstones} productReference={newProductId} onSubmit={handleStockSubmit}></AddProductStock>}
           
            {/*<AddProductStock metals={metals} gemstones={gemstones} productReference={newProductId}></AddProductStock>*/}
        </>
    )
}

export default AddProductPage