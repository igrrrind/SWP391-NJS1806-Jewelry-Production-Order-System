import { useAllActiveProducts, useAllProducts } from "@/hooks/productsHooks"
import ProductListing from "./ProductListing"
import { useGetAllProductTypes } from "@/hooks/productTypesHooks";
import { useEffect, useState } from "react";
import ProductSearchBar from "./search/ProductSearchBar";

const sortOptions = [ "Most relevant", "Highest Price", "Lowest Price"]

const ProductPage = ({ title, description, productTypeKey }) => {
    const { productTypes, loading: typesLoading } = useGetAllProductTypes();
    const [productTypeId, setProductTypeId] = useState(null);
    const [searchParams, setSearchParams] = useState({});
    const [sortOption, setSortOption] = useState('')





    useEffect(() => {
        console.log(productTypeKey);
        console.log(productTypes);

    

        // Check if productTypes and productTypeKey are defined and set productTypeId
        if (productTypes && productTypeKey) {
            const productType = productTypes.find(pt => productTypeKey.includes(pt.typeName.toLowerCase()));
            if (productType) {
                setSearchParams({...searchParams, productTypeId: productType.productTypeId});
            } 
        } else {
            setProductTypeId("all")
        }
    }, [productTypeKey, productTypes]);

    // Only call useAllActiveProducts if productTypeId is confirmed
    const { products, loading: productsLoading } = useAllActiveProducts(searchParams);

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === "Highest Price") {
            return b.lowestPrice - a.lowestPrice;
        } else if (sortOption === "Lowest Price") {
            return a.lowestPrice - b.lowestPrice;
        }
        return 0; // Default is "Most relevant", no sorting
    });



    return (
        <div className="container">
            <div className="container flex flex-col gap-4 p-10">
                <h1 className="text-3xl text-center cormorant-garamond-regular">{title}</h1>
                <p className="text-center text-gray-500">{description}</p>
            </div>
            <ProductSearchBar 
                productTypes={productTypes}
                sortOptions={sortOptions}
                sortOption={sortOption}
                setSortOption={setSortOption}
            />
            {(typesLoading || productsLoading) ? (
                <div className="p-10">Loading...</div>
            ) : (
                <ProductListing products={products} />
            )}
        </div>
    );
};

export default ProductPage;