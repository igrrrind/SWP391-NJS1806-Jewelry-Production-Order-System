import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import MyInformation from "./MyInformation"
import { Separator } from "@/components/ui/separator"
import CheckOutDetails from "./CheckOutDetails"

const CheckOutPage = () => {

    const handlePlaceOrder=() => {}
    const cart = useSelector(state => state.cart )

    return (
        <div className="lg:flex  justify-between lg:space-x-8 container mt-8 ">

                <div className="w-full grid gap-8 mb-8">
                    <div className="w-full border border-stone-700 p-8">
                        <MyInformation></MyInformation>
                    </div>

                    <div className="w-full border border-stone-700 p-8">
                        <CheckOutDetails></CheckOutDetails>
                    </div>
                </div>
                

                <div className="border border-stone-700 min-w-[500px] h-fit p-8">
                <h1 className="cormorant-garamond-regular text-3xl">Order Total</h1>
                <Separator className="mt-4 mb-4"/>
                <div>
                {cart?.list?.map (item => {
                return (
                    <div className="checkout-item flex flex-row justify-between mb-2" key={item.productStockId}>             
                        <div>
                            <span className="font-bold" > x {item.quantity +1 } &nbsp; </span>
                            <span>{item.productName}</span>
                        </div>
                        <span>{(item.quantity+1) * item.price} VND</span>                     
                    </div> 
                )
                })
               }        

                    <Separator className="mt-4 mb-4"/>

                    <div className="total flex text-lg flex-row justify-between font-bold mb-4">                  
                            <span className="" >TOTAL</span>
                            <span>{cart.total} VND</span>
                                      
                    </div> 

                    <Button size="lg"  variant="outline" className="rounded-none border-black bg-zinc-900 pt-6 pb-6 text-white w-full" onClick={handlePlaceOrder}>PLACE ORDER</Button>

                </div>


             
            </div>


        </div>
    )
}


export default CheckOutPage