import { Button } from "@/components/ui/button"

export const PaymentSucessPage = () => {
    return(
            <div className="m-8 flex justify-center">        
                <div className="flex flex-col justify-center items-center">
                    <h1 className="cormorant-garamond-bold text-2xl mb-4">Order placed!</h1>
                    <p className="mb-2 ">Your payment was successful. A copy of your receipt has been sent to your email</p>
                    <Button  variant="outline" className="rounded-none border-black bg-zinc-900 pt-6 pb-6 text-white">                        
                        VIEW ORDER DETAILS
                    </Button>
                </div>
        </div>
    )
}
