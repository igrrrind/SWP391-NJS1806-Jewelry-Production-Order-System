import placeholder from "../../assets/placeholder.png"

const ProductCard = () =>{
    return(
        <div className="bg-white shadow-lg rounded-lg min-w-full overflow-hidden cursor-pointer" >
            <div className="relative pb-2/3" style={{ paddingBottom: '80%' }}>
                 <img src={placeholder} alt="meanigfultext" className="absolute top-0 left-0 w-full h-full object-cover"></img>
            </div>
            <div className="p-5">
                <div>HEART DROP</div>
                <div className="font-bold">$200.00</div>
            </div>
        </div>
  
    )

}

export default ProductCard 