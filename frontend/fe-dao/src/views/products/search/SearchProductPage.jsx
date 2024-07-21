import { useAllActiveProducts, useAllProducts } from "@/hooks/productsHooks"
import { useGetAllProductTypes } from "@/hooks/productTypesHooks";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductListing from "../ProductListing";
import ProductSearchBar from "./ProductSearchBar";


const SearchProductPage = () => {
    const {search} = useSearchParams()
    const { productTypes, loading: typesLoading } = useGetAllProductTypes();
    // Only call useAllActiveProducts if productTypeId is confirmed
    const { products, loading: productsLoading } = useAllActiveProducts();
    



    return (
        <>
            <div className="container flex flex-col gap-4 p-10">
                <h1 className="text-3xl text-center cormorant-garamond-regular">Products Search</h1>
                <p className="text-center text-gray-500">You've got great taste</p>
            </div>
            <ProductSearchBar productTypes={productTypes}/>
            {(typesLoading || productsLoading) ? (
                <div className="p-10">Loading...</div>
            ) : (
                <ProductListing products={products} />
            )}
        </>
    );
};

export default SearchProductPage;