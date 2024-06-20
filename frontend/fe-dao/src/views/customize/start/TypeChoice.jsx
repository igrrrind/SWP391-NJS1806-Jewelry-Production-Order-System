
import necklacesImage from '../../../assets/necklace.png'; // Replace with the correct image path
import earringsImage from '../../../assets/earrings.png';
import braceletsImage from '../../../assets/bracelet.png';
import ringsImage from '../../../assets/rings.png';
import charmsImage from '../../../assets/charm.png';

const jewelryTypes = [
    { name: 'Ring', imageUrl: ringsImage, link: '#' },
    { name: 'Bracelet', imageUrl: braceletsImage, link: '#' },
    { name: 'Earrings', imageUrl: earringsImage, link: '#' },
    { name: 'Necklace', imageUrl: necklacesImage, link: '#' },
    { name: 'Charm', imageUrl: charmsImage, link: '#' },
];

const TypeChoice = () => {
    return (
        <>
        <h2 className="text-xl font-light mb-6 mt-2 text-center">Select jewellery type:</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jewelryTypes.map((jewelry) => (
                        <div key={jewelry.name} className="bg-white p-4 rounded-lg hover:cursor-pointer hover:shadow-lg transition">
                            <div className="relative">
                                <img src={jewelry.imageUrl} alt={jewelry.name} className="w-full h-56 object-cover rounded-lg" />
                                <a href={jewelry.link} className="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center">
                                    +
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