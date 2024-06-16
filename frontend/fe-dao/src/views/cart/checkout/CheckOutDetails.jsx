import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

    const handleChoice = (event) => {
        setDeliveryMethod(event.target.value);
    };

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
                <h1 className="cormorant-garamond-regular text-3xl mb-4">Shipping Details</h1>
                <Separator className="mt-4 mb-4"/>
                <div className="grid gap-3">
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="shippingAddress">Shipping address</Label>
                        <Input className="w-2/3" type="text" id="shippingAddress" placeholder="Shipping address" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="city">City</Label>
                        <Input className="w-2/3" type="text" id="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="state">State</Label>
                        <Input className="w-2/3" type="text" id="state" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input className="w-2/3" type="text" id="zipCode" placeholder="ZIP Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
                    </div>
                </div>
            </div>
            : 

            <div className="mb-8">
                <h1 className="cormorant-garamond-regular text-3xl mb-4">Pickup Location</h1>
                <Separator className="mt-4 mb-4"/>
                <div className="grid gap-3">
                    <span>MARIGOLD MALL</span>
                </div>
            </div>
            
            }

            <div className="mb-8">
                <h1 className="cormorant-garamond-regular text-3xl mb-4">Billing Information</h1>
                <Separator className="mt-4 mb-4"/>
                <div className="grid gap-3">
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input className="w-2/3" type="text" id="cardName" placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="cardNumber">Debit / Credit Card Number</Label>
                        <Input className="w-2/3" type="text" id="cardNumber" placeholder="Debit / Credit Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="expirationDate">Expiration Date (MM/YY)</Label>
                        <Input className="w-2/3" type="text" id="expirationDate" placeholder="MM/YY" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input className="w-2/3" type="text" id="cvv" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="billingZipCode">ZIP Code</Label>
                        <Input className="w-2/3" type="text" id="billingZipCode" placeholder="ZIP Code" value={billingZipCode} onChange={(e) => setBillingZipCode(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="billingAddress">Billing Address</Label>
                        <Input className="w-2/3" type="text" id="billingAddress" placeholder="Billing Address" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} required />
                    </div>
                    <div className="flex items-center space-x-3">
                        <Checkbox id="sameAsShipping" checked={sameAsShipping} onChange={(e) => setSameAsShipping(e.target.checked)} />
                        <Label htmlFor="sameAsShipping">Same as Shipping Address</Label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckOutDetails;
