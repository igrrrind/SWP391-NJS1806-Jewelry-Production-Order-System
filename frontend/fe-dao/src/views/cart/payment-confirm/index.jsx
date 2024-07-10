import { Button } from '@/components/ui/button';
import { usePaymentConfirm } from '@/hooks/paymentHooks';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentConfirm = () => {
    const { confirmationResult, error } = usePaymentConfirm();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location.search) {
            navigate('/cart/order-success');
        }

        if (error) {
            navigate(`/cart/payment-error?errMsg=${error.message}`);
        }

        if (confirmationResult) {
            
            navigate(`/dashboard/payment-success`, { state: { confirmationResult } });
        }
    }, [confirmationResult, error, location.search, navigate]);

    if (!confirmationResult && !error) {
        return (
            <div className="mb-8 flex flex-col justify-center mx-auto">
                <h1 className="cormorant-garamond-bold text-2xl mb-4">Processing Payment Confirmation...</h1>
                <div className="spinner mb-4"></div> {/* Add a loading spinner animation */}
                <p className="text-gray-600">Please wait while we confirm your payment...</p>
            </div>
        );
    }

    return null;
};


export default PaymentConfirm;