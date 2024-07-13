import { Button } from '@/components/ui/button';
import { useOrderById, usePutOrder } from '@/hooks/orderHooks';
import { usePaymentConfirm } from '@/hooks/paymentHooks';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DepositConfirm = () => {
    const { confirmationResult, error } = usePaymentConfirm();
    const navigate = useNavigate();
    const location = useLocation();
    const [orderId, setOrderId] = useState(null);
    const [transaction, setTransaction] = useState(null);
    const { order } = useOrderById(orderId);

    useEffect(() => {
        if (!location.search) {
            navigate('/');
        }

        if (error) {
            navigate(`/customize/deposit-failed?errMsg=${error.message}`);
        }
    }, [error, location, navigate]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const transactionNo = params.get('vnp_TxnRef');
        const orderId = transactionNo.slice(8); // Extract orderId from transactionNo
        console.log(orderId)
        setOrderId(orderId);

        const transactionTotal = parseFloat(params.get('vnp_Amount'));

        const transactionData = {
            orderId: orderId,
            transactionDate: new Date().toISOString().slice(0, 10), // Today's date
            transactionTotal: transactionTotal,
            paymentType: params.get('vnp_CardType') || 'Unknown',
            isDeposit: true
        };

        setTransaction(transactionData); // Set transaction state
    }, [location.search, setOrderId]);

    useEffect(() => {
        console.log(order, transaction, confirmationResult)
        if (order && transaction && confirmationResult) {
            const { orderId, customerId, orderDate, isShipment, isCustom } = order;

            // Update transaction with orderId
            const updatedTransaction = { ...transaction, orderId: orderId };

            const updatedOrder = {
                orderId: orderId,
                customerId: customerId,
                orderDate: orderDate,
                isShipment: isShipment,
                isCustom: isCustom,
                paymentStatusId: 3, //deposited orders
                statusId: 3, // design pending
                orderTotal: transaction.transactionTotal
            };

            navigate("/customize/deposit-success", { state: { updatedTransaction, updatedOrder } });
        }
    }, [order, transaction, confirmationResult, navigate]);






    if (!confirmationResult && !error) {
        return (
            <div className="mb-8 flex flex-col justify-center mx-auto">
                <h1 className="cormorant-garamond-bold text-2xl mb-4">Processing Deposit Confirmation...</h1>
                <div className="spinner mb-4"></div> {/* Add a loading spinner animation */}
                <p className="text-gray-600">Please wait while we confirm your deposit...</p>
            </div>
        );
    }

    return null;
};

export default DepositConfirm;
