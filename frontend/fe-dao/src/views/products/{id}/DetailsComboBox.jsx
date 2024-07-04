import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import QuantityButton from "@/components/custom/quantity-button";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";




  const DetailProductBuy = ({ product, productStockEntries }) => {
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [quantity, setQuantity] = useState(0);

    const handleSelectedEntry = (value) => {
      console.log(value);
      const variant = productStockEntries.find((entry) => entry.productStockId === parseInt(value, 10));
      setSelectedEntry(variant);
    };

    useEffect(() => {
      console.log(selectedEntry);
    }, [selectedEntry]);

    const dispatch = useDispatch();

    const handleAddToCart = () => {
      dispatch(addToCart({
        ...product,
        ...selectedEntry,
        quantity: quantity,
      }))
      alert("Added!")
    }
  

  // Extract unique sizes

  return (
          <>
            <h1 className="text-3xl font-bold mb-2 cormorant-garamond-medium">{product.productName}</h1>
            <p className="text-xl mb-2 text-stone-500">1,000,000 VND</p>
            {/*<p className="text-yellow-500 mb-4">★★★★★ 28 đánh giá</p>*/}

            <Separator className="mb-6 mt-6" />

            <div className="mb-6">
              <label htmlFor="description" className="block text-lg  mb-2">DESCRIPTION</label>
              <div className="text-gray-700">
                {product.productDescription}
              </div>
            </div>

            <div className="mb-4">
                <label htmlFor="chooseVariant" className="block text-lg  mb-2">TYPE</label>
                <Select onValueChange={(value) =>handleSelectedEntry(value)}>
                  <SelectTrigger className="pt-6 pb-6 border border-stone-800"
                    id="chooseVariant"
                    aria-label="Select Variant">
                      
                    <SelectValue placeholder="Select Variant" />
                  </SelectTrigger>
                  
                  <SelectContent>    
                  {productStockEntries.map((entry) => (                    
                    <SelectItem value={entry.productStockId.toString()} key={entry.productStockId} >
                      <p className="text-md font-semibold">{entry.metalTypeName} - {entry.gemstoneType} - {entry.size}</p>
                    </SelectItem>      
                  ))} 
                  </SelectContent>                           
                </Select>
            </div>

            

            <div className="mb-4 mt-6 flex h-12">
              <QuantityButton stock={selectedEntry ? selectedEntry.stockQuantity : 1} disabled={!selectedEntry} onValueChange={setQuantity} />

              <Button variant="outline" 
                className="w-full h-full ml-6 p-4 rounded-none border-black"
                onClick={handleAddToCart} disabled={!selectedEntry}
              >Add to cart &nbsp; <ShoppingCart/>
              </Button>
            </div>

            <div className="mb-4 mt-6 h-18">
              <Button variant="default" className="w-full h-full p-4 border rounded-none border-black" disabled={!selectedEntry}>Place Order Now</Button>
            </div>

            
            
            <div className="mt-6">
              <details className="mb-4">
                <summary className="text-lg font-light ">DETAILS</summary>
                <p className="mt-2">Lorem ipsum</p>
              </details>
              <details className="mb-4">
                <summary className="text-lg font-light">CUSTOMER POLICY</summary>
                <p className="mt-2">Thông tin về chính sách bảo hành...</p>
              </details>
              <details className="mb-4">
                <summary className="text-lg font-light ">RETURNS AND EXCHANGES</summary>
                <p className="mt-2">Hướng dẫn bảo quản...</p>
              </details>
            </div>
          </>

    )
    

}

export default DetailProductBuy

/*NOTES
Render:

SIZE
- Chain length if necklace (cm)
- Diameter if bracelet
- Ring Size (mm) if ring
- dont render if earing or charm

GEMSTONE
- RENDER BASED ON COLOR 


*/

