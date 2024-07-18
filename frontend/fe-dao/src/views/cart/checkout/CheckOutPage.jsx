import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import MyInformation from "./MyInformation"
import { Separator } from "@/components/ui/separator"
import CheckOutDetails from "./CheckOutDetails"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { initiatePayment } from "@/hooks/paymentHooks"
import useCheckoutDetails from "@/hooks/useCheckOutDetails"
import { useAllProvince } from "@/hooks/provinceApiHooks"
import { v4 as uuidv4 } from 'uuid';
import { usePostOrder } from "@/hooks/orderHooks"
import { generateNumericTransactionId } from "@/hooks/generateRandomId"
import { useAuth } from "@/contexts/AuthContext"
import { calculateShipmentFeeByZone } from "@/config/shipmentFee"
import { usePostShipment } from "@/hooks/shipmentHooks"
import { usePostTransaction } from "@/hooks/transactionHooks"
import { formatPrice } from "@/utils/formatPrice"


const CheckOutPage = () => {
    const {
        shippingAddress,
        city,
        town,
        deliveryMethod,
        paymentMethod,
        handleShippingAddressChange,
        handleCityChange,
        handleTownChange,
        handleDeliveryMethodChange,
        handlePaymentMethodChange
    } = useCheckoutDetails();

    const {userDetails, currentUser, currentCustomer} = useAuth();

    const cart = useSelector(state => state.cart);
    const [url, setUrl] = useState(null);
    const [error, setError] = useState(null);
    const { provinces } = useAllProvince();
    const [towns, setTowns] = useState(null);
    const {postOrder, response} = usePostOrder(); 
    const [shipmentFee, setShipmentFee] = useState(0);
    const {postShipment} = usePostShipment();

    const isDeliveryValid = deliveryMethod === 'inPerson' || 
                            (deliveryMethod === 'byShipment' && shippingAddress && city && town);


    useEffect(()=>{
        handlePaymentMethodChange("vnpay")
    },[])
    
    useEffect(()=>{
        if (deliveryMethod ==="inPerson") setShipmentFee(0)
    },[deliveryMethod]) 
                         

    useEffect(() => {
        if (city) {
            if (deliveryMethod === "byShipment") setShipmentFee(calculateShipmentFeeByZone(city))
            const province = provinces.find(prov => prov.Name === city);
            if (province) {
                setTowns(province.District);
            }
            console.log(towns);
        }
    }, [city, provinces, deliveryMethod]);


    


    const handlePlaceOrder = async () => {            
        try {
            const order = {
                customerId: currentCustomer?.customerId,
                orderDate: new Date().toISOString().slice(0, 10),
                statusId: deliveryMethod === "byShipment" ? 7 : 6,  // pick up from store or awaiting shipment
                paymentStatusId: 1, // pending 
                isShipment: deliveryMethod === "byShipment",
                isCustom: false,
                orderTotal: cart.total + shipmentFee,
            }
            console.log(order)

            await postOrder(order);
            console.log(response);

        } catch (error) {
            console.error('Error creating order:', error.message);
            setError('Error creating order. Please try again.');
        }
    };

    useEffect(()=>{


        const handleSuccessfulOrder = async () => {
                const transactionId = generateNumericTransactionId(response.orderId);
                const paymentUrl = await initiatePayment(cart.total * 100, `Pacifa Payment ${transactionId}`, transactionId, "cart/payment-confirm");


                if (deliveryMethod === 'byShipment') {
                const shipmentDetails = {
                    orderId: response.orderId,
                    shipmentDate: "2024-01-01",  // Example date, replace with actual date logic if needed
                    shippingAddress: shippingAddress,  // Assuming shippingAddress is defined elsewhere
                    shippingProvince: city,  // Assuming city is defined elsewhere
                    shippingDistrict: town,  // Assuming town is defined elsewhere
                    isShipping: false,  // Example value, replace with actual logic if needed
                    shippingFee: shipmentFee  // Assuming shipmentFee is defined elsewhere
                };

                await postShipment(shipmentDetails)
                console.log(shipmentDetails)

                }

                if (paymentMethod !== "vnpay") {
                    navigate(`/cart/order-success/${response.orderId}`)
                } else {
                    window.location.href = paymentUrl;
                    console.log("Everything is fine.");
                }
        }
        if (response) handleSuccessfulOrder()


    },[response])
    

    return (
        <div className="lg:flex  justify-between lg:space-x-8 container mt-8 ">

                <div className="w-full grid gap-8 mb-8 scrollable-container">
                    <div className="w-full border border-stone-700 p-8">
                        <MyInformation></MyInformation>
                    </div>

                    <div className="w-full border border-stone-700 p-8">
                    <CheckOutDetails
                        provinces={provinces}
                        towns={towns}
                        shippingAddress={shippingAddress}
                        city={city}
                        town={town}
                        deliveryMethod={deliveryMethod}
                        paymentMethod={paymentMethod}
                        onShippingAddressChange={handleShippingAddressChange}
                        onCityChange={handleCityChange}
                        onTownChange={handleTownChange}
                        onDeliveryMethodChange={handleDeliveryMethodChange}
                        onPaymentMethodChange={handlePaymentMethodChange}
                    />
                    </div>
                </div>
                

                <div className="border border-stone-700 min-w-[500px] h-fit p-8 fixed-order-total">
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


                    {deliveryMethod === "byShipment" && city &&
                    <div className=" flex flex-row justify-between mb-4">                  
                            <div className="" >Shipment Fee</div>
                            <div>{formatPrice(shipmentFee)} VND</div>              
                    </div> 
                    }

                    <div className="total flex text-lg flex-row justify-between font-bold mb-4">                  
                            <div className="" >TOTAL</div>
                            <div>{formatPrice(cart.total + shipmentFee)} VND</div>
                                      
                    </div> 

                    <Button size="lg"  variant="outline" className="rounded-none border-black bg-zinc-900 pt-6 pb-6 text-white w-full" onClick={handlePlaceOrder} disabled={!isDeliveryValid}>PLACE ORDER</Button>

                </div>

                {error && <div>{error}</div>}        
            </div>
            


        </div>
    )
}


export default CheckOutPage