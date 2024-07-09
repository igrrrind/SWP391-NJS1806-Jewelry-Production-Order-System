import { useAllActiveProducts, useAllProducts } from "@/hooks/productsHooks"
import ProductListing from "./ProductListing"
import { useGetAllProductTypes } from "@/hooks/productTypesHooks";
import { useEffect, useState } from "react";


const ProductPage = ({ title, description, productTypeKey }) => {
    const { productTypes, loading: typesLoading } = useGetAllProductTypes();
    const [productTypeId, setProductTypeId] = useState(null);

    useEffect(() => {
        console.log(productTypeKey);
        console.log(productTypes);

    

        // Check if productTypes and productTypeKey are defined and set productTypeId
        if (productTypes && productTypeKey) {
            const productType = productTypes.find(pt => productTypeKey.includes(pt.typeName.toLowerCase()));
            if (productType) {
                setProductTypeId(productType.productTypeId);
            } 
        } else {
            setProductTypeId("all")
        }
    }, [productTypeKey, productTypes]);

    // Only call useAllActiveProducts if productTypeId is confirmed
    const { products, loading: productsLoading } = useAllActiveProducts(productTypeId);



    return (
        <>
            <div className="container flex flex-col gap-4 p-10">
                <h1 className="text-3xl text-center cormorant-garamond-regular">{title}</h1>
                <p className="text-center text-gray-500">{description}</p>
            </div>
            {(typesLoading || productsLoading) ? (
                <div className="p-10">Loading...</div>
            ) : (
                <ProductListing products={products} />
            )}
        </>
    );
};

export default ProductPage;