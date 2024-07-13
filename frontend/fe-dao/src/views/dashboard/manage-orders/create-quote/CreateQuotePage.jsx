import { useAllOrderItems } from "@/hooks/orderItemHooks";
import OrderDetails from "../OrderDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useOrderById } from "@/hooks/orderHooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePostQuote } from "@/hooks/quoteHooks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTransactionByOrderId } from "@/hooks/transactionHooks";
import { useShipmentByOrderId } from "@/hooks/shipmentHooks";
import MetalRateCalculator from "@/components/custom/metal-rate";
import { formatPrice } from "@/utils/formatPrice";
import { GemstoneRate } from "@/components/custom/gemstone-rate";

const CreateQuotePage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { order } = useOrderById(orderId);
    const { orderItems} = useAllOrderItems(order);
    const { transaction } = useTransactionByOrderId(order);
    const { shipment } = useShipmentByOrderId(order);
    
    const { postQuote, response } = usePostQuote();

    useEffect(() => {
        if (order) {
            console.log(order);
        }
    }, [order]);


    const [totalCost, setTotalCost] = useState(0);

    const calculateTotalCost = () => {
        const metalCost = watch('metalCost') || 0;
        const caratPrice = watch('caratPrice') || 0;
        const caratCost = watch('caratCost') || 0;
        const productionCost = watch('productionCost') || 0;

        const total =  Number(metalCost) + Number(caratPrice) + Number(caratCost) + Number(productionCost);
        setTotalCost(total);
    };

    useEffect(() => {
        calculateTotalCost();
    }, [watch('metalWeight'), watch('metalCost'), watch('caratPrice'), watch('caratCost'), watch('productionCost')]);



    const onSubmit = (data) => {
        console.log(data);
        postQuote(data);
    };

    useEffect(() => {
        if (response) {
            navigate("/dashboard/manage-orders");
            // Trigger toast notification
            toast.success(`Quote sent successfully for order #${orderId}`);
        }
    }, [response]);

    return (
        <div>
            <main className="flex-1 p-4 xl:flex xl:space-x-4 overflow-auto">    
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Create Quote</CardTitle>
                        <CardDescription>Create a quote. Once submitted, you won't be able to edit. The assigned manager will be responsible for finalizing the quote</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-8 text-sm">
                            <div className="flex-1">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className=''>
                                    <input type="hidden" value={orderId} {...register("orderId")} />
                                    <input type="hidden" value={new Date().toISOString().slice(0, 10)} {...register("createdDate")} />                   
                                        <Label htmlFor="metalWeight">Metal Weight (g)
                                            <div className='text-stone-600 text-sm font-light mt-1 mb-2'>Use the customer budget or an existing product as reference</div>
                                        </Label>
                                        <Input 
                                            type="number" 
                                            placeholder="Choose a valid amount" 
                                            className='border-black' 
                                            {...register("metalWeight", { 
                                                required: "Metal Weight is required",
                                                validate: value => value > 0 || "Metal Weight must be valid"
                                            })}
                                        />
                                        {errors.metalWeight && <p className="text-red-500 text-xs mt-1">{errors.metalWeight.message}</p>}
                                    </div>
                                    <div className='mt-4'>
                                        <Label htmlFor="metalCost">Metal Cost (VND)
                                            <div className='text-stone-600 text-sm font-light mt-1 mb-2'>Reference the price list to set the most appropriate cost</div>
                                        </Label>
                                        <Input 
                                            type="number" 
                                            placeholder="Choose a valid amount" 
                                            className='border-black' 
                                            {...register("metalCost", { 
                                                required: "Metal Cost is required",
                                                validate: value => value > 0 || "Metal Cost must be valid"
                                            })}
                                        />
                                        {errors.metalCost && <p className="text-red-500 text-xs mt-1">{errors.metalCost.message}</p>}
                                    </div>
                                    <div className='mt-4'>
                                        <Label htmlFor="caratPrice">Carat Price (VND)
                                            <div className='text-stone-600 text-sm font-light mt-1 mb-2'>Rate of which we sell our gemstones per carat. Referenced from the custom choice</div>
                                        </Label>
                                        <Input 
                                            type="number" 
                                            placeholder="Choose a valid amount" 
                                            className='border-black' 
                                            {...register("caratPrice", { 
                                                required: "Carat Price is required",
                                                validate: value => value >= 0 || "Carat Price must be valid"
                                            })}
                                        />
                                        {errors.caratPrice && <p className="text-red-500 text-xs mt-1">{errors.caratPrice.message}</p>}
                                    </div>
                                    <div className='mt-4'>
                                        <Label htmlFor="caratCost">Carat Cost (VND)
                                            <div className='text-stone-600 text-sm font-light mt-1 mb-2'>A recommended budget for your gemstone.</div>
                                        </Label>
                                        <Input 
                                            type="number" 
                                            placeholder="Choose a valid amount" 
                                            className='border-black' 
                                            {...register("caratCost", { 
                                                required: "Carat Cost is required",
                                                validate: value => value >= 0 || "Carat Cost must be valid"
                                            })}

                                        />
                                        {errors.caratCost && <p className="text-red-500 text-xs mt-1">{errors.caratCost.message}</p>}
                                    </div>

                                    <div className='mt-4'>
                                        <Label htmlFor="caratCost">Production Cost (VND)
                                            <div className='text-stone-600 text-sm font-light mt-1 mb-2'>Includes raw material logistics, labor costs, design costs </div>
                                        </Label>
                                        <Input 
                                            type="number" 
                                            placeholder="Choose a valid amount" 
                                            className='border-black' 
                                            {...register("productionCost", { 
                                                required: "Production Cost is required",
                                                validate: value => value > 0 || "Production Cost must be valid"
                                            })}
                                        />
                                        {errors.productionCost && <p className="text-red-500 text-xs mt-1">{errors.productionCost.message}</p>}
                                    </div>

                                    <div className='mt-8'>
                                        <p className=" font-bold"> QUOTE TOTAL: đ <span>{formatPrice(totalCost)}</span>
                                        </p>
                                        <Input
                                            type="hidden" 
                                            className='border-black' 
                                            value ={totalCost}
                                            {...register("quoteTotalPrice")}
                                           
                                        />
                                    </div>

                                    

                                    <Button type="submit" className="mt-6 text float-right">Submit for approval</Button>
                                </form>   
                            </div>                
                            <div className="border border-black p-4">
                                <GemstoneRate/>
                                <MetalRateCalculator/>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="relative"> 

                    <div className="w-full relative z-0">
                        <OrderDetails order={order} orderItems={orderItems} transaction={transaction} shipment={shipment} ></OrderDetails>
                    </div>
                </div> 
            </main>
        </div>
    );
};

export default CreateQuotePage;
