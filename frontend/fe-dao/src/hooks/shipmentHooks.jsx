import axios from "axios";
import { useState, useEffect } from "react";

export function usePostShipment() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postShipment = async (shipment) => {
        setLoading(true);
        try {
            const res = await axios.post('https://localhost:7112/api/Shipments', shipment); 
            setResponse(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { postShipment, response, loading, error };
}

export function useShipmentByOrderId(order) {
    const [shipment, setShipment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShipmentByOrderId = async () => {
            if (!order) {
                setLoading(false);
                return;
            }

            try {
                setShipment(null)
                setLoading(true);
                const response = await axios.get(`https://localhost:7112/api/Shipments/${order.orderId}`);
                setShipment(response.data);
            } catch (error) {
                console.error('Error fetching Shipment', error);
            } finally {
                setLoading(false);
            }
        };

        fetchShipmentByOrderId();
    }, [order]);

    return { shipment, loading };
}


export function useShipmentTracking() {
    const [shipment, setShipment] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchShipmentOrderId = async (orderId) => {
        if (!orderId) {
            setLoading(false);
            return;
        }

        try {
            setShipment(null)
            setLoading(true);
            const response = await axios.get(`https://localhost:7112/api/Shipments/${orderId}`);
            return response.data
        } catch (error) {
            console.error('Error fetching Shipment', error);
        } finally {
            setLoading(false);
        }
    };

    return { fetchShipmentOrderId, loading };
}
