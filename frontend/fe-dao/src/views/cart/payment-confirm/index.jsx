import { Button } from '@/components/ui/button';
import { usePaymentConfirm } from '@/hooks/paymentHooks';
import React from 'react';

const PaymentConfirm = () => {
    const { confirmationResult, error } = usePaymentConfirm();

    if (error) {
        return (
        <div className="m-8 flex justify-center items-center">
            <div className="mb-8">
                <h1 className="cormorant-garamond-bold text-2xl mb-4">Payment Error</h1>
                <p className="text-red-600 mb-4">There was an error processing your payment. Please try again later.</p>
                <p className="text-gray-600">Error Message: {error.message}</p>
            </div>
        </div>
        );
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
                    <p className="mb-2 font-semibold">Order ID: #{confirmationResult.orderId}</p>
                    <p className="mb-4 font-semibold">Transaction ID: #{confirmationResult.transactionId}</p>
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