import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

function CheckOutDetails({
    provinces,
    towns,
    shippingAddress,
    city,
    town,
    deliveryMethod,
    paymentMethod,
    onShippingAddressChange,
    onCityChange,
    onTownChange,
    onDeliveryMethodChange,
    onPaymentMethodChange
}) {


    const { currentUser, userDetails } = useAuth();

    const handleChoice = (event) => {
        onDeliveryMethodChange(event.target.value);
    };

    const handlePayment = (event) => {
        onPaymentMethodChange(event.target.value);
    };

    if (!provinces || !Array.isArray(provinces)) return <p>No provinces found</p>;

    return (
        <>
            <div className="mb-8">
                <h1 className="cormorant-garamond-regular text-3xl mb-4">How would you like to receive your order?</h1>
                <Separator className="mt-4 mb-4" />
                
                <div className="flex space-x-8">
                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id="byShipment"
                            name="deliveryMethod"
                            value="byShipment"
                            checked={deliveryMethod === "byShipment"}
                            onChange={handleChoice}
                        />
                        <Label htmlFor="byShipment">By Shipment</Label>
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

                <Separator className="mt-4 mb-4" />
                <div className="grid gap-3">
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="shippingAddress">Shipping address</Label>
                        <Input
                            className="w-2/3"
                            type="text"
                            id="shippingAddress"
                            placeholder="Shipping address"
                            value={shippingAddress}
                            onChange={(e) => onShippingAddressChange(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="city">Province/City</Label>
                        {/* 
                        <Input
                            className="w-2/3"
                            type="text"
                            id="city"
                            placeholder="City"
                            value={city}
                            onChange={(e) => onCityChange(e.target.value)}
                            required
                        /> */}
                        <Select onValueChange={value => onCityChange(value)} value={city}>
                                <SelectTrigger className=" border w-2/3 border-stone-800"
                                    id="province/city"
                                    aria-label="Select province/city">
                                    
                                    <SelectValue placeholder="Select province/city" />
                                </SelectTrigger>
                                
                                <SelectContent>    
                                {provinces.map((province) => (
                                        <SelectItem value={province.Name} key={province.Name}>
                                            <p className="text-md">{province.Name}</p>
                                        </SelectItem>
                                ))}
                                </SelectContent>                           
                        </Select>
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                        <Label htmlFor="town">District/Town</Label>
                        <Select onValueChange={value => onTownChange(value)} value={town} disabled={!city}>
                                <SelectTrigger className=" border w-2/3 border-stone-800"
                                    id="town"
                                    aria-label="Select district/town">
                                    
                                    <SelectValue placeholder="Select district/town" />
                                </SelectTrigger>
                                
                                <SelectContent>    
                                {towns && towns.map((town) => (
                                        <SelectItem value={town.FullName} key={town.FullName}>
                                            <p className="text-md">{town.FullName}</p>
                                        </SelectItem>
                                ))}
                                </SelectContent>                           
                        </Select>
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
            
            {paymentMethod &&
            <div className="mb-8">
                <h1 className="cormorant-garamond-regular text-3xl mb-4">Payment Method</h1>
                <Separator className="mt-4 mb-4" />
                <div className="grid gap-3">
                    <div className="flex space-x-8 mb-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="vnpay"
                                name="paymentMethod"
                                value="vnpay"
                                checked={paymentMethod === "vnpay"}
                                onChange={handlePayment}
                            />
                            <Label htmlFor="vnpay">Via VNPAY</Label>
                        </div>
                        {deliveryMethod === "byShipment" ? 
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
                    {paymentMethod === "vnpay" && 
                    <div className="border p-2 bg-gray-100 text-sm font-bold flex items-center">
                        When you click on Place Order, you will be redirected to &nbsp;&nbsp;<span><img className="h-4" src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR.png" alt="vnpay logo" /></span>.
                    </div>
                    }
                </div>
            </div> }
        </>
    );
}

export default CheckOutDetails;
