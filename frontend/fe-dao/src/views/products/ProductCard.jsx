import FirebaseImage from "@/components/custom/fire-base-image"
import placeholder from "../../assets/placeholder.png"
import { useNavigate } from "react-router-dom";

const ProductCard = ({product}) =>{

    const imagePath = `products/thumbnails/${product.productId}`
    const navigate = useNavigate();
    const formattedName = product.productName.toLowerCase().replace(/\s+/g, '-');
    const formattedLink = `/products/${product.productId}/${formattedName}`

    const handleProductClick = () => {
        navigate(formattedLink);
    };

    return (
        <a href={formattedLink} onClick={() => handleProductClick()}>
        <div className="bg-white shadow-lg rounded-lg min-w-full overflow-hidden cursor-pointer">
            <div className="relative pb-2/3" style={{ paddingBottom: '80%' }}>
                    <img src={placeholder} alt="meanigfultext" className="absolute top-0 left-0 w-full h-full object-cover"></img>
                    <FirebaseImage path={imagePath} alt={product.productName} className="absolute top-0 left-0 w-full h-full object-cover"/>              
            </div>
            <div className="p-5">
                <div>{product.productName}</div>
                <div className="font-bold">View Details</div>
            </div>
        </div>
        </a>
  
    )

}

//onClick={() => handleProductClick(1, "HEART DROP")

export default ProductCard 