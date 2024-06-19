import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";

function CheckOutDetails() {
    const [shippingAddress, setShippingAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [billingZipCode, setBillingZipCode] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [sameAsShipping, setSameAsShipping] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState("shipment");
    const [paymentMethod, setPaymentMethod] = useState("vnpay");
    

    const handleChoice = (event) => {
        setDeliveryMethod(event.target.value);
    };


    const handlePayment = (event) => {
        setPaymentMethod(event.target.value);
    };

    const {currentUser} = useAuth();





    return (
        <>
            <div className="mb-8">
                <h1 className="cormorant-garamond-regular text-3xl mb-4">How would you like to receive your order?</h1>
                <Separator className="mt-4 mb-4"/>
                
                <div className="flex space-x-8">
                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id="shipment"
                            name="deliveryMethod"
                            value="shipment"
                            checked={deliveryMethod === "shipment"}
                            onChange={handleChoice}
                        />
                        <Label htmlFor="shipment">By Shipment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id="inPerson"
                            name="deliveryMethod"
                            value="inPerson"
                            checked={deliveryMethod === "inPerson"}
                            onChange={handleChoice}
                        />
                        <Label htmlFor="inPerson">In person</Label>
                    </div>
                </div>
            </div>


            {deliveryMethod !== "inPerson" ? 
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <h1 className="cormorant-garamond-regular text-3xl">Shipping Details</h1>
                    {currentUser && <h2 className="text-sm mt-2 text-right">Autofill with my information</h2>}
                </div>

                <Separator className="mt-4 mb-4"/>
                <div className="grid gap-3">
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="shippingAddress">Shipping address</Label>
                        <Input className="w-2/3" type="text" id="shippingAddress" placeholder="Shipping address" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="city">Province/City</Label>
                        <Input className="w-2/3" type="text" id="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="state">District/Town</Label>
                        <Input className="w-2/3" type="text" id="state" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
                    </div>
                </div>
            </div>
            : 

            <div className="mb-8">
                <h1 className="cormorant-garamond-regular text-3xl mb-4">Pickup Location</h1>
                <Separator className="mt-4 mb-4"/>
                <div className="grid gap-3 text-gray-700">
                    <span>VNUHCM STUDENT CULTURAL HOUSE</span>
                    <span>Lưu Hữu Phước, Đông Hoà, Dĩ An, Bình Duong </span>

                </div>
            </div>
            
            }

            <div className="mb-8">
                <h1 className="cormorant-garamond-regular text-3xl mb-4">Payment Method</h1>
                <Separator className="mt-4 mb-4"/>
                <div className="grid gap-3">

                    <div className="flex space-x-8 mb-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="zalopay"
                                name="paymentMethod"
                                value="vnpay"
                                checked={paymentMethod === "vnpay"}
                                onChange={handlePayment}
                            />
                            <Label htmlFor="vnpay">Via VNPAY</Label>
                        </div>

                        {deliveryMethod === "shipment"?
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="codPayment"
                                name="paymentMethod"
                                value="codPayment"
                                checked={paymentMethod === "codPayment"}
                                onChange={handlePayment}
                            />
                            <Label htmlFor="codPayment">Cash On Delivery</Label>
                        </div>
                        
                        :

                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="payment"
                                name="paymentMethod"
                                value="inPerson"
                                checked={paymentMethod === "inPerson"}
                                onChange={handlePayment}
                            />
                            <Label htmlFor="payment">Pay In Person</Label>
                        </div>
                        }
                        
                    </div>


                    {paymentMethod === "vnpay" ? 

                    <div className="border p-2 bg-gray-100 text-sm font-bold flex items-center">When you click on Place Order, you will be redirected to &nbsp; &nbsp;<span><img className="h-4" src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR.png" alt="vnpay logo"></img></span>.</div>



                    :
                    <>
                    
                    </>

                    }
                </div>
            </div>
        </>
    );
}

export default CheckOutDetails;
