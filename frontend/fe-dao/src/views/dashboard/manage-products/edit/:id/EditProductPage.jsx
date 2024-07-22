import { useEffect, useState } from "react";

import { useGetAllProductTypes } from "@/hooks/productTypesHooks";
import { useGetAllMetals } from "@/hooks/metalHooks";
import { useGetAllGemstones } from "@/hooks/gemstoneHooks";
import { usePostProduct } from "@/hooks/productsHooks";
import { useNavigate, useParams } from "react-router-dom";
import { usePostProductStocks } from "@/hooks/productStockHooks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useProductStocksById, usePutProductStocks } from "../../../../../hooks/productStockHooks";
import { usePutProduct } from "../../../../../hooks/productsHooks";
import EditProduct from "./EditProduct";
import EditProductStock from "./EditProductStock";
import GalleryUpload from "./GalleryUpload";




const EditProductPage = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const {productStocks} = useProductStocksById(id)
    const {productTypes} = useGetAllProductTypes()
    const {metals} = useGetAllMetals()
    const {gemstones} = useGetAllGemstones()


    //get all types, all gemstones, all metals
    const [newProductId, setNewProductId] =  useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const [addedProduct, setAddedProduct] = useState(null);
    const [addedProductStocks, setAddedProductStocks] = useState(null);
    const {updateProduct} = usePutProduct();
    const {updateProductStocks} = usePutProductStocks();



    

    //HANDLING PRODUCT DATA SUBMISSION

    const handleUpdate = async (data) => {
        console.log(data)
        await updateProduct(data);
        toast.success("Sucessfully Updated Product.")
    }

    const handleStockUpdate= async (data) => {
        console.log(data)
        await updateProductStocks(data.stocktabs);
        toast.success("Sucessfully Updated Stock.")
    }


    



    return (
        <main className="flex-1 p-4 xl:space-y-4 overflow-auto">    
            <EditProduct  productTypes={productTypes} onSubmit={handleUpdate} productId={id}/>
            {productStocks && <EditProductStock metals={metals} gemstones={gemstones} productReference={id} onSubmit={handleStockUpdate} currentStocksBatch={productStocks}/>}
            <GalleryUpload/>

        </main>
    )
}

export default EditProductPage





