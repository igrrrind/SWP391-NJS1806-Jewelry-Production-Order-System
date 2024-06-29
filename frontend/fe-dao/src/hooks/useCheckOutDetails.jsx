import { useState } from 'react';

const useCheckoutDetails = () => {
    const [shippingAddress, setShippingAddress] = useState("");
    const [city, setCity] = useState("");
    const [town, setTown] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("byShipment");
    const [paymentMethod, setPaymentMethod] = useState("");

    const handleShippingAddressChange = (address) => {
        setShippingAddress(address);
    };

    const handleCityChange = (city) => {
        setCity(city);
    };

    const handleTownChange = (town) => {
        setTown(town);
    };

    const handleDeliveryMethodChange = (method) => {
        setDeliveryMethod(method);
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    return {
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
    };
};

export default useCheckoutDetails;
