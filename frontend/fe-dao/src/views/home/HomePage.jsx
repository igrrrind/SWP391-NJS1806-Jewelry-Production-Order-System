import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import necklacesImage from '../../assets/necklace.png'; // Replace with the correct image path
import earringsImage from '../../assets/earrings.png';
import braceletsImage from '../../assets/bracelet.png';
import ringsImage from '../../assets/rings.png';
import charmsImage from '../../assets/charm.png';
import ProductCard from "../products/ProductCard";
import { Link, useNavigate } from "react-router-dom";

const categories = [
    { id: 1, title: 'Necklaces', image: necklacesImage },
    { id: 2, title: 'Earrings', image: earringsImage },
    { id: 3, title: 'Bracelets', image: braceletsImage },
    { id: 4, title: 'Rings', image: ringsImage },
    { id: 5, title: 'Charms', image: charmsImage },
];


const HomePage = () => {
    const navigate = useNavigate();

    const handleBrowse = () => {
        navigate('/products')
    }

    const handleCustomRedirect = () => {
        navigate('/customize')
    }


    return (
        <>
        <div className="flex items-center justify-center bg-zinc-900 text-white p-10 h-[500px]">
        
            <div className="flex-2 flex-row text-center lg:mx-6 max-w-1/3">
               <h1 className="text-6xl mb-4 cormorant-garamond-regular">Get a quote for custom jewellery</h1>                <p className="text-xl mb-6 font-sans">Buy jewellery made for you and your loved ones</p>
                    <div className="flex justify-center gap-10">
                        <Button size="lg"  variant="outline" className="rounded-none bg-zinc-900 pt-6 pb-6" onClick={handleCustomRedirect}>CREATE MY JEWELLERY</Button>
                        <Button size="lg" variant="outline" className="rounded-none bg-zinc-900 pt-6 pb-6" onClick={handleBrowse}>BROWSE OUR DESIGNS</Button>
                </div>
            </div>
       </div>

       <div className="container mx-auto px-4 py-20 w-full">
            <div className="text-center mb-8">
                <h1 className="text-5xl cormorant-garamond-regular">Shop by category</h1>
                <p className="my-4 text-3xl text-gray-600 cormorant-garamond-regular italic">
                    Indulge in what we offer
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 my-20">
                {categories.map((category) => (
                    <Link to={`/products/${category.title.toLowerCase()}`}>
                    <div className="max-w-sm mx-auto hover:cursor-pointer" key={category.id}>
                        <div className="aspect-1  overflow-hidden">
                        <img src={category.image} alt={category.title} className="w-full object-cover drop-shadow-md hover:scale-105 " />
                        </div>
                        <h2 className="mt-4 text-center text-xl cormorant-garamond-regular text-gray-800  hover:text-orange-500">{category.title}</h2>
                    </div>   
                    </Link>              
                ))}

            </div>
            
        </div>

       </>
    )
}

export default HomePage