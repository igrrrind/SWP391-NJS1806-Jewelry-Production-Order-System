import { Button } from '@/components/ui/button';
import { usePaymentConfirm } from '@/hooks/paymentHooks';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentConfirm = () => {
    const { confirmationResult, error } = usePaymentConfirm();
    const navigate = useNavigate()

    const location = useLocation();
    if(!location.search){
        navigate('/cart/payment-sucess')
    }

    if (error) {
        navigate(`/cart/payment-error?errMsg=${error.message}`)

    }

    if (!confirmationResult) {
        return (
            <div className="mb-8 flex flex-col justify-center mx-auto">
                <h1 className="cormorant-garamond-bold text-2xl mb-4">Processing Payment Confirmation...</h1>
                <div className="spinner mb-4"></div> {/* Add a loading spinner animation */}
                <p className="text-gray-600">Please wait while we confirm your payment...</p>
            </div>
        );
    }

    return (
        <div className="m-8 flex justify-center">
            {confirmationResult.message === 'Payment successful' ? (
                <div className="flex flex-col justify-center items-center">
                    <h1 className="cormorant-garamond-bold text-2xl mb-4">Order placed!</h1>
                    <p className="mb-2 ">Your payment was successful. A copy of your receipt has been sent to your email</p>
                    <Button  variant="outline" className="rounded-none border-black bg-zinc-900 pt-6 pb-6 text-white">                        
                        VIEW ORDER DETAILS
                    </Button>
                </div>
            ) : (
                <div className="flex c justify-center">
                    <h1 className="cormorant-garamond-bold text-2xl mb-4 text-red-600">Something went wrong with your payment</h1>
                    <p className="mb-2">{confirmationResult.message}</p>
                    {confirmationResult.ErrorCode && <p className="mb-4">Error Code: {confirmationResult.ErrorCode}</p>}
                    <Button  variant="outline" className="rounded-none border-black bg-zinc-900 pt-6 pb-6 text-white">
                        RETRY CHECKOUT
                    </Button>

                </div>
            )}
        </div>
    );
};

export default PaymentConfirm;