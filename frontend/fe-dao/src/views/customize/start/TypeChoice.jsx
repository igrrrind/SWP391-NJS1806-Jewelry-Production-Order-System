
import necklacesImage from '../../../assets/necklace.png'; // Replace with the correct image path
import earringsImage from '../../../assets/earrings.png';
import braceletsImage from '../../../assets/bracelet.png';
import ringsImage from '../../../assets/rings.png';
import charmsImage from '../../../assets/charm.png';
import { useState } from 'react';
import { Check } from 'lucide-react';

const jewelryTypes = [
    { name: 'Ring', imageUrl: ringsImage, link: '#' },
    { name: 'Bracelet', imageUrl: braceletsImage, link: '#' },
    { name: 'Earrings', imageUrl: earringsImage, link: '#' },
    { name: 'Necklace', imageUrl: necklacesImage, link: '#' },
    { name: 'Charm', imageUrl: charmsImage, link: '#' },
];

const   TypeChoice = ({selectedJewelryType,setSelectedJewelryType}) => {


    return (
        <>
        {/*<div>{selectedChoice}</div> */}
        <h2 className="text-xl font-light mb-6 mt-2 text-center">Select jewellery type:</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {jewelryTypes.map((jewelry) => (
                        <div key={jewelry.name} className="bg-white  rounded-lg hover:cursor-pointer transition" 
                        onClick={()=> {selectedJewelryType === jewelry.name? setSelectedJewelryType("") : setSelectedJewelryType(jewelry.name) }}>
   
                            <div className="relative overflow-hidden rounded-lg">
                                <img src={jewelry.imageUrl} alt={jewelry.name} className={`w-full h-64 object-cover rounded-lg hover:scale-110 transition ${selectedJewelryType === jewelry.name ? 'opacity-50' : ``}`}  />
                                <a href={jewelry.link} className="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full flex justify-center ">
                                    {selectedJewelryType === jewelry.name? <Check/>: <>+</>}
                                </a>
                            </div>
                            <p className="text-center mt-4 font-light">{jewelry.name}</p>
                        </div>
                    ))}
                </div>
        </>
    )
}

export default TypeChoice