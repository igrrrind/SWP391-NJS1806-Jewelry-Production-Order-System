import { useEffect } from "react";
import AddProduct from "./AddProduct";


export default function AddProductPage() {
    //get all types, all gemstones, all metals
    const [productTypes, setProductTypes] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    

    useEffect(() => {
        // Function to fetch product types data from the API, map to collumns
        const fetchProductsTypes = async () => {
            try {
                const response = await fetch('https://localhost:7169/api/Product-Types/'); 
                const data = await response.json();
                setProductTypes(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };
        fetchProductsTypes();
    }, []);

    const handleSubmit = (data) => {
        axios.put('https://localhost:7169/productTypes', data)
            .then(response => {
                console.log('Product updated successfully:', response.data);
                setIsCreated(true);
                // Handle success (e.g., redirect or display a message)
            })
            .catch(error => {
                console.error('There was an error updating the product:', error);
                // Handle error
            });
    };



    return (
        <>
            <AddProduct productTypes={productTypes} onSubmit={handleSubmit} isSubmitted={isCreated}/>
            {isCreated &&  <AddProductStock  metals={metals} gemstones={gemstones}></AddProductStock>}
        </>
    )
}