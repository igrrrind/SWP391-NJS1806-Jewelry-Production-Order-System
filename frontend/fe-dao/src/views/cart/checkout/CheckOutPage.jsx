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
    const navigate = useNavigate();
    const [url, setUrl] = useState(null);
    const [error, setError] = useState(null);
    const { provinces } = useAllProvince();
    const [towns, setTowns] = useState(null);
    const [order, setOrder] = useState(null);
    const {postOrder, response} = usePostOrder(); 

    const isDeliveryValid = deliveryMethod === 'inPerson' || 
                            (deliveryMethod === 'byShipment' && shippingAddress && city && town);

                         

    useEffect(() => {
        if (city) {
            const province = provinces.find(prov => prov.Name === city);
            if (province) {
                setTowns(province.District);
            }
            console.log(towns);
        }
    }, [city, provinces]);

    useEffect(() => {
        handlePaymentMethodChange("vnpay");
    
        const preparePaymentUrl = async () => {
            const transactionId = generateNumericTransactionId();
    
            // Create the order in the database
            const newOrder = {
                customerId: currentCustomer?.customerId,
                orderDate: new Date().toISOString().slice(0, 10),
                statusId: deliveryMethod === "byShipment" ? 7 : 6,  // pick up from store or awaiting shipment
                paymentStatusId: 1, // pending 
                isShipment: deliveryMethod === "byShipment",
                isCustom: false,
                orderTotal: cart.total,
                transactionId: transactionId
            };
            console.log(newOrder)
            setOrder(newOrder);
            try {
                const paymentUrl = await initiatePayment(cart.total * 100, `Pacifa Payment ${transactionId}`, transactionId);
                setUrl(paymentUrl);
            } catch (error) {
                console.error('Error preparing payment URL:', error.message);
                setError('Error preparing payment URL. Please try again.');
            }
        };
    
        preparePaymentUrl();
    }, [cart.total, deliveryMethod, currentCustomer]);
    


    const handlePlaceOrder = async () => {    
        try {
            await postOrder(order);
            console.log("Order placed successfully!");

            if (paymentMethod !== "vnpay") {
                
            } 
            
            else {
                window.location.href = url;
            }
        } catch (error) {
            console.error('Error creating order:', error.message);
            setError('Error creating order. Please try again.');
            tempTab.close(); // Close the temporary tab if there is an error
        }
    };


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
                        <span>{(item.quantity) * item.price} VND</span>                     
                    </div> 
                )
                })
               }        

                    <Separator className="mt-4 mb-4"/>

                    <div className="total flex text-lg flex-row justify-between font-bold mb-4">                  
                            <span className="" >TOTAL</span>
                            <span>{cart.total} VND</span>
                                      
                    </div> 

                    <Button size="lg"  variant="outline" className="rounded-none border-black bg-zinc-900 pt-6 pb-6 text-white w-full" onClick={handlePlaceOrder} disabled={!isDeliveryValid}>PLACE ORDER</Button>

                </div>

                {error && <div>{error}</div>}        
            </div>
            


        </div>
    )
}


export default CheckOutPage