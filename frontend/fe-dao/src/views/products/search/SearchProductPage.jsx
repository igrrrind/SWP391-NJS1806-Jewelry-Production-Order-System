import { useAllActiveProducts, useAllProducts } from "@/hooks/productsHooks"

import { useGetAllProductTypes } from "@/hooks/productTypesHooks";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductListing from "../ProductListing";
import ProductSearchBar from "./ProductSearchBar";
import { PaginationBar } from "./PaginationBar";


const sortOptions = [ "Most relevant", "Highest Price", "Lowest Price"]



const SearchProductPage = () => {
    const { productTypes, loading: typesLoading } = useGetAllProductTypes();
    const [searchParams] = useSearchParams();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [searchParamsObj, setSearchParamsObj] = useState({});
    const [sortOption, setSortOption] = useState('')
     useEffect(() => {
        const search = searchParams.get('search') || '';
        const page = parseInt(searchParams.get('page'), 10) || 1;
        setSearchKeyword(search);
        setPageNumber(page);
        setSearchParamsObj({ searchKeyword: search, pageNumber: page });
    }, [searchParams]);

    const { products, loading: productsLoading } = useAllActiveProducts(searchParamsObj);

    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
        setSearchParamsObj((prev) => ({ ...prev, pageNumber: newPage }));
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === "Highest Price") {
            return b.lowestPrice - a.lowestPrice;
        } else if (sortOption === "Lowest Price") {
            return a.lowestPrice - b.lowestPrice;
        }
        return 0; // Default is "Most relevant", no sorting
    });



    return (
        <div className="container p-10">
            <div className="flex flex-col gap-4 p-10">
                <h1 className="text-3xl text-center cormorant-garamond-regular">Products Search</h1>
                <p className="text-center text-gray-500">You've got great taste</p>
            </div>
            <ProductSearchBar 
                productTypes={productTypes}
                searchKeyword={searchKeyword}
                sortOptions={sortOptions}
                sortOption={sortOption}
                setSortOption={setSortOption}
            />
        
            {(typesLoading || productsLoading) ? (
                <div className="p-10">Loading...</div>
            ) : 
            (<>
                    <ProductListing products={sortedProducts} />
                    <div className="mx-auto my-4">
                        <PaginationBar 
                            currentPage={pageNumber} 
                            totalPages={Math.ceil(products.length/16)} 
                            onPageChange={handlePageChange} 
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchProductPage;