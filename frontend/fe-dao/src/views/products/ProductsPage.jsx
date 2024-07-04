import { useAllActiveProducts, useAllProducts } from "@/hooks/productsHooks"
import ProductListing from "./ProductListing"


const ProductPage = ({title,description}) =>{

    const { products, loading } = useAllActiveProducts();


    return (
        <>  
            <div className="container flex flex-col gap-4 p-10">
                <h1 className="text-3xl text-center cormorant-garamond-regular">{title}</h1>
                <p className="text-center text-gray-500">{description}</p>
            </div>
            {loading? <div className="p-10">Loading...</div> : (
            <ProductListing products={products}> </ProductListing>
            )}
        </>
    )
}



export default ProductPage