import { Button } from "@/components/ui/button"
import { useOrderById } from "@/hooks/orderHooks"
import { useParams } from "react-router-dom"

export const OrderSucessPage = () => {
    const {orderId} = useParams()
    const {order} = useOrderById(orderId);

    return (
 
            <div className="m-8 flex justify-center">        
                <div className="flex flex-col justify-center items-center">
                    <h1 className="cormorant-garamond-bold text-2xl mb-4">Order placed!</h1>
                    <Button  variant="outline" className="rounded-none border-black bg-zinc-900 pt-6 pb-6 text-white">                        
                        VIEW ORDER DETAILS
                    </Button>
                </div>
        </div>
    )
}
