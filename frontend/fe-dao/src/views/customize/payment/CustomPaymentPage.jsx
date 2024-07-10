import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/utils/formatPrice"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import { useShipmentByOrderId } from "@/hooks/shipmentHooks";
import { initiatePayment } from "@/hooks/paymentHooks";
import { generateNumericTransactionId } from "@/hooks/generateRandomId";


const CustomPaymentPage = () => {
    const [shippingFee, setShippingFee] = useState(0)
    const location = useLocation();
    const { order, quote } = location.state || {};
    const { shipment } = useShipmentByOrderId(order);
    const [url, setUrl] = useState(null)
    const [deposit, setDeposit] = useState(0)

    useEffect(() => {
        if (shipment) {
            setShippingFee(shipment.shipmentFee)
        } 
        setDeposit(Math.floor((quote.quoteTotalPrice + shippingFee)/2))

    },[shipment])


    useEffect( () => {

        const preparePaymentUrl = async () => {
            const transactionId = generateNumericTransactionId(quote.orderId);
            const paymentUrl = await initiatePayment(deposit*100, `Pacifa Deposit #${quote.orderId}`, transactionId, "customize/deposit-confirm");
            setUrl(paymentUrl);
        }
        preparePaymentUrl()

    },[quote, shippingFee,deposit])
    
    
    const handlePlaceDeposit = () => {    
        if (url) window.location.href = url;
    };


    if (!order) return <div>Hacker</div>
    return (
        <div>
            <Card className="w-1/2 mx-auto my-8">
                <CardHeader>
                    <CardTitle>
                        <p className="cormorrant-garamond-medium">Deposit For Custom Order #{order.orderId} </p>
                    </CardTitle>
                    <CardDescription>
                        <p>You will be required to pay a 50% deposit in order to start the design and production. 
                            Shipping cost will persist from your initial request and be added to the total cost.</p>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between">
                        <p>Quote Total</p>
                        <p>{formatPrice(quote.quoteTotalPrice)}đ</p>
                    </div>
                    {order.isShipment &&
                    <div className="flex justify-between">
                        <p>Shipping Fee</p>
                        <p>{formatPrice(shippingFee)} đ</p>
                    </div>
                    }
                    <Separator/>
                    <div className="flex justify-between">
                        <p>Total</p>
                        <p>{formatPrice(quote.quoteTotalPrice + shippingFee)} đ</p>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                        <p>DEPOSIT (50%)</p>
                        <p>{formatPrice(deposit)} đ</p>
                    </div>

                    <div className="mt-4 flex flex-col items-center ">
                        <Button className="" onClick={handlePlaceDeposit}>Place Deposit</Button>
                        <div className="text-sm flex mt-4 items-center "> You'll be redirected to the &nbsp; <span><img className="h-4" src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR.png" alt="vnpay logo" /></span> &nbsp; Gateway</div>
                    </div>


                </CardContent>

            </Card>


        </div>
    )

}
export default CustomPaymentPage

//this page recalls the shippping information, adds the shipment fee with the quote


