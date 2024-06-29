import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import axios from "axios";
import AddProductStock from "./AddProductStock";
import { useGetAllProductTypes } from "@/hooks/productTypesHooks";
import { useGetAllMetals } from "@/hooks/metalHooks";
import { useGetAllGemstones } from "@/hooks/gemstoneHooks";
import { usePostProduct } from "@/hooks/productsHooks";
import { useNavigate } from "react-router-dom";
import { usePostProductStocks } from "@/hooks/productStockHooks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AddProductPage = () => {

    const navigate = useNavigate();


    //get all types, all gemstones, all metals
    const [newProductId, setNewProductId] =  useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const [addedProduct, setAddedProduct] = useState(null);
    const [addedProductStocks, setAddedProductStocks] = useState(null);

    const {response, loading, error} = usePostProduct(addedProduct)

    const result = usePostProductStocks(addedProductStocks)



    const productTypes = useGetAllProductTypes()
    const metals = useGetAllMetals()
    const gemstones = useGetAllGemstones()

    //HANDLING PRODUCT DATA SUBMISSION

    const handleSubmit = (data) => {
        console.log(data)
        setAddedProduct(data);
    }

    const handleStockSubmit= (data) => {
        console.log(data)
        console.log("heres the data")
        setAddedProductStocks(data.stocktabs)
  
    }


    useEffect(() => {
        if (response) {
          console.log(response)
          setNewProductId(response.productId); // Assume the response contains the new product ID
          setIsCreated(true);
        }
      }, [response]);

    useEffect(() => {
    if (result.response) {
      console.log(result.response);
      navigate("/dashboard/manage-products");

      // Trigger toast notification
      toast.success('Post successful!');
    }
  }, [result]);


    



    return (
        <main className="flex-1 p-4 xl:flex xl:space-x-4 overflow-auto">    
            <AddProduct productTypes={productTypes.productTypes} onSubmit={handleSubmit} isSubmitted={isCreated}/>
            {isCreated &&  <AddProductStock metals={metals} gemstones={gemstones} productReference={newProductId} onSubmit={handleStockSubmit}></AddProductStock>}   
        </main>
    )
}

export default AddProductPage