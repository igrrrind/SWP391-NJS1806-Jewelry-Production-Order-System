import FirebaseImage from "@/components/custom/fire-base-image"
import placeholder from "../../assets/placeholder.png"
import { useNavigate } from "react-router-dom";
import { formatLink, formatName } from "@/utils/formatLinks";
import { formatPrice } from "@/utils/formatPrice";
import { ArrowRightIcon } from "lucide-react";

const ProductCard = ({product, onClick}) =>{

    const imagePath = `products/thumbnails/${product.productId}`
    

    const formattedName = formatName(product.productName)
    const formattedLink = formatLink(product.productId,formattedName)


    return (
        <a href={formattedLink} 
            onClick={(e) => { e.preventDefault();onClick(formattedLink);}}>
        <div className="bg-white min-w-full h-80 overflow-hidden cursor-pointer">
            <div className="max-w-full aspect-w-4 aspect-h-3">
                    <img src={placeholder} alt="meanigfultext" className="top-0 left-0 w-full h-full object-cover"></img>
                    <FirebaseImage path={imagePath} alt={product.productName}/>            
            </div>
            <div className="py-2">
                <div>{product.productName}</div>
                <div className="font-bold">₫ {formatPrice(product.lowestPrice)}</div>
                <div className="flex text-sm items-center hover:text-stone-600 transition"> See all options &nbsp;<ArrowRightIcon className="w-4"/> </div>
            </div>
        </div>
        </a>
  
    )

}

//onClick={() => handleProductClick(1, "HEART DROP")

export default ProductCard 