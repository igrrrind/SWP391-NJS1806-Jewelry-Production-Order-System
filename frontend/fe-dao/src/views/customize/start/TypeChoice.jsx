

import { Check } from 'lucide-react';
import { jewelryTypes } from '@/config/jewelryTypes';

const   TypeChoice = ({selectedJewelryType,setSelectedJewelryType}) => {

    return (
        <>
        {/*<div>{selectedChoice}</div> */}
        <h2 className="text-xl font-light mb-6 mt-2 text-center">Select jewellery type:</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {jewelryTypes.map((jewelry) => (
                        <button key={jewelry.name}  onClick={()=> {selectedJewelryType === jewelry.name? setSelectedJewelryType("") : setSelectedJewelryType(jewelry.name) }}>
                        <div key={jewelry.name} className="bg-white  rounded-lg hover:cursor-pointer transition">
   
                            <div className="relative overflow-hidden rounded-lg">
                                <img src={jewelry.imageUrl} alt={jewelry.name} className={`w-full h-64 object-cover rounded-lg hover:scale-110 transition ${selectedJewelryType === jewelry.name && 'opacity-50'}`}  />
                                <div className="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full flex justify-center ">
                                    {selectedJewelryType === jewelry.name? <Check/>: <>+</>}
                                </div>
                            </div>
                            <p className="text-center mt-4 font-light">{jewelry.name}</p>
                        </div>
                        </button>
                    ))}
                </div>
        </>
    )
}

export default TypeChoice