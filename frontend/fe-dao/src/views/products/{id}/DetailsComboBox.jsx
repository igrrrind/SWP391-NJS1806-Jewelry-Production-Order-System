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
import { Phone, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, willExceedStock } from "@/redux/slice/cartSlice";
import { formatPrice } from "@/utils/formatPrice";
import { Link } from "react-router-dom";
import { getJewelrySizeLabel, getJewelrySizeName } from "@/utils/typeToUnit";




const DetailProductBuy = ({ product, productStockEntries }) => {
    const phone = "0938562745"
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [displayPrice, setDisplayPrice] = useState(product.lowestPrice);
    const [quantity, setQuantity] = useState(0);

    const handleSelectedEntry = (value) => {
      console.log(value);
      const variant = productStockEntries.find((entry) => entry.productStockId === parseInt(value, 10));
      setSelectedEntry(variant);
    };

    useEffect(() => {
      if (selectedEntry) {
      console.log(selectedEntry);
      setDisplayPrice(selectedEntry.price)
      }
    }, [selectedEntry]);

    const dispatch = useDispatch();

    const stockExceeded = useSelector(state => 
      selectedEntry ? willExceedStock(state, selectedEntry.productStockId, quantity, selectedEntry.stockQuantity) : false
    );

    const handleAddToCart = () => {
      if (!stockExceeded) {
          dispatch(addToCart({
              ...product,
              ...selectedEntry,
              quantity: quantity,
          }));
          alert("Item added to cart!");
      } else {
          alert("Amount exceed stock");
      }
    }
    /*
    const handleAddToCart = () => {
      dispatch(addToCart({
        ...product,
        ...selectedEntry,
        quantity: quantity,
      }))
      alert("Added!")
    }

    */
  

  // Extract unique sizes

  return (
          <>
            <h1 className="text-3xl font-bold mb-2 cormorant-garamond-medium">{product.productName}</h1>
            <p className="text-xl mb-2 text-stone-500">₫ {displayPrice}</p>
            {/*<p className="text-yellow-500 mb-4">★★★★★ 28 đánh giá</p>*/}

            <Separator className="mb-6 mt-6" />

            <div className="mb-6">
              <label htmlFor="description" className="block text-lg  mb-2">DESCRIPTION</label>
              <div className="text-gray-700">
                {product.productDescription}
              </div>
            </div>

            <div className="mb-4">
                <label htmlFor="chooseVariant" className="block text-lg mb-2">READY IN-STORE {selectedEntry && <span className="text-sm text-foreground text-right"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Purchase limit: {selectedEntry.stockQuantity} qty</span>}</label> 

                <Select onValueChange={(value) =>handleSelectedEntry(value)}>
                  <SelectTrigger className="pt-6 pb-6 border border-stone-800"
                    id="chooseVariant"
                    aria-label="Select Variant">
                      
                    <SelectValue placeholder="Select Variant" />
                  </SelectTrigger>
                  
                  <SelectContent>    
                  {productStockEntries.map((entry) => (                    
                    <SelectItem value={entry.productStockId.toString()} key={entry.productStockId} >
                      <p className="text-md font-semibold">{entry.metalTypeName} - {entry.gemstoneType} - {getJewelrySizeLabel(product.productType, entry.size)}</p>
                    </SelectItem>      
                  ))} 
                  </SelectContent>                           
                </Select>
            </div>

            
            <div className="mb-4 mt-6 flex h-12">
              <div>
              <QuantityButton stock={selectedEntry ? selectedEntry.stockQuantity : 1} disabled={!selectedEntry} onValueChange={setQuantity} />
              </div>

              <Button variant="outline" 
                className="w-full h-full ml-6 p-4 rounded-none border-black"
                onClick={handleAddToCart} disabled={!selectedEntry}
              >Add to cart &nbsp; <ShoppingCart/>
              </Button>
            </div>

            <div className="mb-2 mt-6 h-18">
              <Button variant="default" className="w-full h-full p-4 border rounded-none border-black" disabled={!selectedEntry}>Place Order Now</Button>
            </div>

            <div className="mb-4 mt-4 h-18">
              <div className="text-center px-10 italic text-sm font-medium">Like the design?</div>
              <div className="text-center px-10 mb-4 text-sm">Contact our staff to have it personalised for you. </div>

              <div className="flex space-x-2">
                <a href={`tel:${phone}`}><Button variant="default" className="w-full h-14 p-4 border rounded-none  bg-white text-green-500 font-bold hover:bg-green-100" ><Phone/>&nbsp; {phone}</Button></a>
                <a href="https://zalo.me/0938562745"><Button variant="default" className="w-full h-14 p-4 border bg-white rounded-none text-blue-500 font-bold hover:bg-blue-100" >Message Zalo</Button></a>
                <a href="https://m.me/heal.ytocin" target="_blank"><Button variant="default" className="w-full h-14 p-4 border rounded-none bg-blue-400 text-white font-bold hover:bg-blue-700" >Message Facebook</Button></a>
              </div>
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

