import { useAllOrderItems } from "@/hooks/orderItemHooks";
import OrderDetails from "../OrderDetails";
import { useParams } from "react-router-dom";
import { useOrderById } from "@/hooks/orderHooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateQuotePage = () => {
    const id = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { order } = useOrderById(id);
    const { orderItems, loading: itemsLoad } = useAllOrderItems(order);

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission
    };

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
                                        <Label htmlFor="caratPrice">Carat Price
                                            <div className='text-stone-600 text-sm font-light mt-1 mb-2'>Rate of which we sell our gemstones per carat. Referenced from the custom choice</div>
                                        </Label>
                                        <Input 
                                            type="number" 
                                            placeholder="Choose a valid amount" 
                                            className='border-black' 
                                            {...register("caratPrice", { 
                                                required: "Carat Price is required",
                                                validate: value => value > 0 || "Carat Price must be valid"
                                            })}
                                        />
                                        {errors.caratPrice && <p className="text-red-500 text-xs mt-1">{errors.caratPrice.message}</p>}
                                    </div>
                                    <div className='mt-4'>
                                        <Label htmlFor="caratCost">Carat Cost
                                            <div className='text-stone-600 text-sm font-light mt-1 mb-2'>A recommended budget for your gemstone.</div>
                                        </Label>
                                        <Input 
                                            type="number" 
                                            placeholder="Choose a valid amount" 
                                            className='border-black' 
                                            {...register("caratCost", { 
                                                required: "Carat Cost is required",
                                                validate: value => value > 0 || "Carat Cost must be valid"
                                            })}
                                        />
                                        {errors.caratCost && <p className="text-red-500 text-xs mt-1">{errors.caratCost.message}</p>}
                                    </div>

                                    <div className='mt-4'>
                                        <Label htmlFor="caratCost">Production Cost
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

                                    

                                    <Button type="submit" className="mt-6 text float-right">Submit for approval</Button>
                                </form>   
                            </div>                
                            <div className="border border-black p-4">
                                <div>Current pricing info here</div>
                                <div>Current pricing info here</div>
                                <div>Current pricing info here</div>
                                <div>Current pricing info here</div>
                                <div>Current pricing info here</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="relative"> 
                    {/* Overlay div */}
                    <div className="absolute inset-0 z-10 opacity-10 bg-stone-400"></div>
                    <div className="w-full relative z-0">
                        <OrderDetails order={order} orderItems={orderItems}></OrderDetails>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateQuotePage;
