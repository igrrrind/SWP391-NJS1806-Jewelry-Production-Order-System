import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

export const PaymentSuccessPage = () => {
    const location = useLocation();
    const { confirmationResult } = location.state || {};

    if (!confirmationResult) {
        return (
            <div className="m-8 flex justify-center">
                <h1 className="cormorant-garamond-bold text-2xl mb-4 text-red-600">Error: No confirmation result found</h1>
            </div>
        );
    }

    return (
        <div className="m-8 flex justify-center">
            {confirmationResult.message === 'Payment successful' ? (
                <div className="flex flex-col justify-center items-center">
                    <h1 className="cormorant-garamond-bold text-2xl mb-4">Order placed!</h1>
                    <p className="mb-2">Your payment was successful. A copy of your receipt has been sent to your email</p>
                    <Button variant="outline" className="rounded-none border-black bg-zinc-900 pt-6 pb-6 text-white">
                        VIEW ORDER DETAILS
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <h1 className="cormorant-garamond-bold text-2xl mb-4 text-red-600">Something went wrong with your payment</h1>
                    <p className="mb-2">{confirmationResult.message}</p>
                    {confirmationResult.ErrorCode && <p className="mb-4">Error Code: {confirmationResult.ErrorCode}</p>}
                    <Button variant="outline" className="rounded-none border-black bg-zinc-900 pt-6 pb-6 text-white">
                        RETRY CHECKOUT
                    </Button>
                </div>
            )}
        </div>
    );
};