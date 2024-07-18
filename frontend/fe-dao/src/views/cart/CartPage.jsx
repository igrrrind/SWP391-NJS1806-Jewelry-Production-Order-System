import { Separator } from "@/components/ui/separator"
import CartItem from "./CartItem"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { removeFromCart } from "@/redux/slice/cartSlice"
import { formatPrice } from "@/utils/formatPrice"


function CartPage()  {
    const navigate = useNavigate();



    const cart = useSelector(state => state.cart )
    console.log(cart)

    const handleCheckOut = () => {
        navigate('/cart/checkout')
    }

    const dispatch = useDispatch();

    const handleRemoveFromCart = (productStockId) => {
        dispatch(removeFromCart({
          productStockId: productStockId
        }));
        alert("Removed!");
    };

    


    if (cart?.list.length == 0){
        return (
            (
                <div className="text-center mt-8 h-[400px]">
                    <p className="text-md text-gray-500 ">Nothing in your cart yet...</p>
                    <Button variant="default" className="mt-4">Continue Shopping</Button>
                </div>
            )
        )
    }


    //CHECK CART IF ITS EMPTY OR NOT, THEN RENDER THE SHOPPING CART
    return (
        <div className="lg:flex  justify-between lg:space-x-8 container mt-8">
            <div className="border border-stone-700 w-full p-8 mb-8">
                <h1 className="cormorant-garamond-regular text-3xl">Cart Review</h1>
                <Separator className="mt-4 mb-4"/>

                {cart?.list?.map (item => {
                return (
                    <div key={item.productStockId}>
                    <CartItem item={item} onRemove={handleRemoveFromCart}/>
                    <Separator className="mt-4 mb-4"/>
                    </div>
                )
                })
            }

            </div>

            <div className="border border-stone-700 min-w-[500px] h-fit p-8">
                <h1 className="cormorant-garamond-regular text-3xl">Order Total</h1>
                <Separator className="mt-4 mb-4"/>
                <div>
                {cart?.list?.map (item => {
                return (
                    <div className="checkout-item flex flex-row justify-between mb-2" key={item.productStockId}>             
                        <div>
                            <span className="font-bold" > x {item.quantity} &nbsp; </span>
                            <span>{item.productName}</span>
                        </div>
                        <span>{formatPrice((item.quantity) * item.price)} VND</span>                     
                    </div> 
                )
                })
               }
                      

                    
                    

                    <Separator className="mt-4 mb-4"/>

                    <div className="total flex text-lg flex-row justify-between font-bold mb-4">                  
                            <span className="" >TOTAL</span>
                            <span>{formatPrice(cart.total)} VND</span>
                                      
                    </div> 

                    <Button size="lg"  variant="outline" className="rounded-none border-black bg-zinc-900 pt-6 pb-6 text-white w-full" onClick={handleCheckOut}>PROCEED TO CHECK OUT</Button>

                </div>


             
            </div>
 
        </div>
    )

}


export default CartPage