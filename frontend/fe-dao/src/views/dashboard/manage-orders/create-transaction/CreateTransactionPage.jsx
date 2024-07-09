import { useNavigate, useParams } from "react-router-dom";
import { useOrderById, usePutOrder } from "@/hooks/orderHooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePostTransaction } from "@/hooks/transactionHooks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTransactionPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { order } = useOrderById(orderId);
    const { postTransaction, response } = usePostTransaction();
    const {updateOrder, response:oResponse} = usePutOrder()

  
    useEffect(() => {
        if (order) {
            console.log(order);
        }
    }, [order]);

    const onSubmit = (data) => {
        console.log(data);
        postTransaction(data);
    };

    useEffect(() => {
        if (response) {
            const { orderId, customerId, orderDate, statusId, isShipment, isCustom, orderTotal } = order;
            const updatedOrder = {
                orderId: orderId,
                customerId: customerId,
                orderDate: orderDate,
                statusId: statusId,
                paymentStatusId: 2,
                isShipment: isShipment,
                isCustom: isCustom,
                orderTotal: orderTotal
            };
            updateOrder(updatedOrder)
        }
    }, [response, order]);

    useEffect(() => {
        if (oResponse) {
            navigate("/dashboard/manage-orders");
            // Trigger toast notification
            toast.success(`Transaction created successfully for order #${order.orderId}`);
        }
    }, [oResponse]);


    return (
        <div>
            <main className="flex-1 p-4 xl:flex xl:space-x-4 overflow-auto">    
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Create Transaction</CardTitle>
                        <CardDescription>Create a transaction for any COD or IN PERSON payment.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-8 text-sm">
                            <div className="flex-1">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <input type="hidden" defaultValue={orderId} {...register("orderId")} />
                                        <input type="hidden" defaultValue={new Date().toISOString().slice(0, 10)} {...register("transactionDate")} />
                                        <Label htmlFor="transactionTotal">Transaction Total (VND)</Label>
                                        <Input 
                                            defaultValue={order?.orderTotal}
                                            type="number" 
                                            placeholder="Enter the total amount" 
                                            className='border-black' 
                                            {...register("transactionTotal", { 
                                                required: "Transaction Total is required",
                                                validate: value => value > 0 || "Transaction Total must be valid"
                                            })}
                                        />
                                        {errors.transactionTotal && <p className="text-red-500 text-xs mt-1">{errors.transactionTotal.message}</p>}
                                    </div>
                                    <div className='mt-4'>
                                        <Label htmlFor="paymentType">Payment Type</Label>
                                        <Input 
                                            type="text" 
                                            placeholder="Enter payment type" 
                                            className='border-black' 
                                            {...register("paymentType", { 
                                                required: "Payment Type is required",
                                                validate: value => value.trim().length > 0 || "Payment Type must be valid"
                                            })}
                                        />
                                        {errors.paymentType && <p className="text-red-500 text-xs mt-1">{errors.paymentType.message}</p>}
                                    </div>
                                    <div className='mt-4'>
                                        <Label htmlFor="isDeposit">Is Deposit</Label>
                                        <Input 
                                            type="checkbox" 
                                            className='border-black' 
                                            {...register("isDeposit")}
                                        />
                                    </div>
                                    <Button type="submit" className="mt-6 text float-right">Create Transaction</Button>
                                </form>   
                            </div>                
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default CreateTransactionPage;
