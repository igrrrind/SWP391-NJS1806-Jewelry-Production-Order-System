import { useState } from 'react';

const useCheckoutDetails = () => {
    const [shippingAddress, setShippingAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("byShipment");
    const [paymentMethod, setPaymentMethod] = useState("");

    const handleShippingAddressChange = (address) => {
        setShippingAddress(address);
    };

    const handleCityChange = (city) => {
        setCity(city);
    };

    const handleStateChange = (state) => {
        setState(state);
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
        state,
        deliveryMethod,
        paymentMethod,
        handleShippingAddressChange,
        handleCityChange,
        handleStateChange,
        handleDeliveryMethodChange,
        handlePaymentMethodChange
    };
};

export default useCheckoutDetails;
