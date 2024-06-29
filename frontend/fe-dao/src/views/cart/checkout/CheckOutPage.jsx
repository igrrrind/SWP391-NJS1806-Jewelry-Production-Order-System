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




    const cart = useSelector(state => state.cart);
    const navigate = useNavigate();
    const [url, setUrl] = useState(null);
    const [error, setError] = useState(null);
    const {provinces} = useAllProvince();
    const [towns, setTowns] = useState(null);

    const isDeliveryValid = deliveryMethod === 'inPerson' || 
                        (deliveryMethod === 'byShipment' && shippingAddress && city && town);

    useEffect(() => {
        if (city) {
            const province = provinces.find(prov => prov.Name === city);
            if (province) {
                setTowns(province.District);
            }
            console.log(towns)
        }
    }, [city, provinces]);






    useEffect(() => {
        handlePaymentMethodChange("vnpay")

        const preparePaymentUrl = async () => {
            try {
                const paymentUrl = await initiatePayment(cart.total * 10000, "Test", "1232984");
                setUrl(paymentUrl);
            } catch (error) {
                console.error('Error preparing payment URL:', error.message);
                setError('Error preparing payment URL. Please try again.');
            }
        };

        preparePaymentUrl();
    }, [cart.total]);

    
    const handlePlaceOrder = () => {
        if (paymentMethod !="vnpay") {
    
        if (!url) {
            console.error('Payment URL is not available');
            setError('Payment URL is not available. Please try again.');
            return;
        }
        //open url
        const tempTab = window.open(url, "_blank", "noopener,noreferrer");
            if (!tempTab) {
                console.error('Failed to open new tab. The popup might have been blocked.');
                setError('Failed to open new tab. Please allow popups for this site in your browser settings.');
                return;
            }

        const checkTempTabClosed = setInterval(() => {
                if (tempTab.closed) {
                    clearInterval(checkTempTabClosed);
                    window.focus();
                }
            }, 1000);
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

                    <Button size="lg"  variant="outline" className="rounded-none border-black bg-zinc-900 pt-6 pb-6 text-white w-full" onClick={handlePlaceOrder} disabled={!isDeliveryValid}>PLACE ORDER</Button>

                </div>


             
            </div>


        </div>
    )
}


export default CheckOutPage