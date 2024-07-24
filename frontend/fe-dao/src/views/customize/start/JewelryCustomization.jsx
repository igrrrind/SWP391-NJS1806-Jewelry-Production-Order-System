import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ProgressBarUtil from '@/components/custom/progress-bar';
import TypeChoice from './TypeChoice';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PersonalizeChoice from './PersonalizeChoice';
import DescribeYourDesign from './DescribeYourDesign';
import ImageUpload from '@/components/custom/image-upload';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import MyInformation from '@/views/cart/checkout/MyInformation';
import useCheckoutDetails from '@/hooks/useCheckOutDetails';
import CheckOutDetails from '@/views/cart/checkout/CheckOutDetails';
import { Input } from '@/components/ui/input';
import { usePostCustomOrder, usePostOrder } from '@/hooks/orderHooks';
import CompletedRequest from './CompletedRequest';
import { useAllProvince } from '@/hooks/provinceApiHooks';
import { useAuth } from '@/contexts/AuthContext';


const productTypes = [
    { "productTypeId": 1, "productTypeName": "Ring" },
    { "productTypeId": 2, "productTypeName": "Necklace" },
    { "productTypeId": 3, "productTypeName": "Earrings" },
    { "productTypeId": 4, "productTypeName": "Charm" },
    { "productTypeId": 5, "productTypeName": "Bracelet" }
  ]



const JewelryCustomization = () => {
    //fetch data
    const provinces = useAllProvince()
    const [towns, setTowns] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedJewelryType, setSelectedJewelryType] = useState("");

    const {currentCustomer} = useAuth()

    const handleSetJewelry = (obj) => {
        const selectedType = productTypes.find(type => type.productTypeName === obj);  
        setSelectedJewelryType(selectedType.productTypeId);
        setSelectedJewelryTypeName(selectedType.productTypeName);
        console.log(selectedJewelryTypeName)      
    };

    const [selectedJewelryTypeName, setSelectedJewelryTypeName] = useState("");
    const [selectedMetal, setSelectedMetal] = useState(null);
    const [selectedGemstone, setSelectedGemstone] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [description, setDescription] = useState("");
    const [isStepValid, setIsStepValid] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState("");
    const [order, setOrder] = useState(null);
    const [customItem,setCustomItem] = useState(null);

    const {
        shippingAddress,
        city,
        town,
        deliveryMethod,
        paymentMethod,
        handleShippingAddressChange,
        handleCityChange,
        handleTownChange,
        handleDeliveryMethodChange,
        handlePaymentMethodChange
    } = useCheckoutDetails();

    const {postOrder, response:orderResponse, loading, error } = usePostOrder();
    const {postCustomOrder, response:csResponse, loading:csl, error:cse} = usePostCustomOrder();




    useEffect(() => {
        if (city) {
            const province = provinces.provinces.find(prov => prov.Name === city);
            if (province) {
                setTowns(province.District);
            }
            console.log(towns)
        }
    }, [city, provinces]);

    const isDeliveryValid = deliveryMethod === 'inPerson' || 
                        (deliveryMethod === 'byShipment' && shippingAddress && city && town);


    useEffect(() => {
        validateStep(currentStep);
    }, [currentStep, selectedJewelryType, selectedMetal, selectedGemstone, selectedSize, description, selectedQuantity, isDeliveryValid]);

    const validateStep = (step) => {
        switch (step) {
            case 1:
                setIsStepValid(!!selectedJewelryType);
                break;
            case 2:
                setIsStepValid(!!selectedMetal && !!selectedGemstone && !!selectedSize);
                break;
            case 3:
                setIsStepValid(!!description);
                break;
            case 4:
                setIsStepValid(!!selectedQuantity && selectedQuantity > 0 && isDeliveryValid);
                break;    
            default:
                setIsStepValid(true);
                break;
        } 
    };

    const nextStep = () => {
        if (isStepValid) {
            setCurrentStep((prevStep) => Math.min(prevStep + 1, 5));
        }
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    };

    const handleChanges = (number) => {
        setCurrentStep(number);
    };

    const handleSubmit = () => {
        /*
        if (isStepValid && currentStep === 4){
            nextStep();
        }

        */
        if (isStepValid && currentStep === 4) {
            const newOrder = {
                customerId: currentCustomer.customerId,
                orderDate: new Date().toISOString().slice(0, 10),
                statusId: 1,
                paymentStatusId: 1,
                isShipment: deliveryMethod === "byShipment",
                isCustom: true,
                orderTotal: 0
            };
            setOrder(newOrder);
        }
    };

    useEffect(() => {
        if (order) {
            (async () => {
                await postOrder(order);
            })();
        }
    }, [order]);
    
    useEffect(() => {
        if (orderResponse) {
            console.log(orderResponse)
            const newCustomOrderItem = {
                orderId: orderResponse.orderId,
                productTypeId: selectedJewelryType,
                gemstoneId: selectedGemstone.gemstoneId,
                metalId: selectedMetal.metalId,
                size: selectedSize,
                unitPrice: 0,
                quantity: selectedQuantity,
                requestDescription: description,
                subtotal: selectedQuantity * 0
            };
            setCustomItem(newCustomOrderItem);
        }
    }, [orderResponse, selectedJewelryType, selectedGemstone, selectedMetal, selectedSize, description, selectedQuantity]);

    useEffect(() => {
        if (customItem) {
            (async () => {
                await postCustomOrder(customItem);
            })();
        }
    }, [customItem]);

    useEffect(() => {
        if (csResponse) {
            console.log('Custom item has been set:');
            nextStep();
        }
    }, [csResponse]);




    return (
        <div className="min-h-screen pt-8 flex flex-col items-center mb-12">
            <header className="w-full text-black text-center flex flex-row justify-between max-w-5xl">
                <Button className="bg-white text-black px-6 pr-2 rounded-none hover:bg-white transition" onClick={prevStep} disabled={currentStep === 1}>
                    <ChevronLeft /> PREVIOUS
                </Button>
                <h1 className="text-2xl cormorant-garamond-medium text-center">Customize & Personalize</h1>
                <Button className="bg-white text-black px-6 py-2 w-[100px] rounded-none hover:bg-white transition hover:text-stone-700" onClick={nextStep} disabled={!isStepValid || currentStep === 5}>
                    NEXT <ChevronRight />
                </Button>
            </header>

            {error && <div>There was an error in your submission. {error}</div>}

            <div className="w-full max-w-5xl bg-white p-6 rounded-lg mt-8">
                <ProgressBarUtil currentStep={currentStep} />
                <div className="flex justify-around items-center mb-8">
                    <div className="flex items-center">
                        <span className={`text-${currentStep >= 1 ? 'green-600' : 'gray-400'}`}>Select Jewelry</span>
                    </div>
                    <div className="flex items-center">
                        <span className={`text-${currentStep >= 2 ? 'green-600' : 'gray-400'}`}>Personalization Options</span>
                    </div>
                    <div className="flex items-center">
                        <span className={`text-${currentStep >= 3 ? 'green-600' : 'gray-400'}`}>Describe your design</span>
                    </div>
                    <div className="flex items-center">
                        <span className={`text-${currentStep >= 4 ? 'green-600' : 'gray-400'}`}>Finalize your order</span>
                    </div>
                    <div className="flex items-center">
                        <span className={`text-${currentStep >= 5 ? 'green-600' : 'gray-400'}`}>Complete</span>
                    </div>
                </div>

                {currentStep === 1 && (
                    <TypeChoice
                        selectedJewelryType={selectedJewelryTypeName}
                        setSelectedJewelryType={handleSetJewelry}
                    />
                )}

                {currentStep === 2 && (
                    <PersonalizeChoice
                        selectedMetal={selectedMetal}
                        setSelectedMetal={setSelectedMetal}
                        selectedGemstone={selectedGemstone}
                        setSelectedGemstone={setSelectedGemstone}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        selectedJewelryTypeName={selectedJewelryTypeName}
                    />
                )}

                {currentStep === 3 && (
                    <DescribeYourDesign
                        description={description}
                        setDescription={setDescription}
                    />
                )}

                {currentStep === 4 && (
                    <>
                        
                        <h2 className="text-xl font-light mb-6 mt-10 text-center">Finalize Your Order</h2>

                        <div className='grid gap-4 grid-cols-2'>
                            <div className="col-span-1 ">
                                <div>
                                    <Label htmlFor="description" className="text-lg">Here's what you chose:</Label>
                                    <div className='space-y-2 mt-2 text-stone-600 w-[400px]'>
                                        <div className='flex justify-between'>
                                            <div>
                                                <span className='font-medium'>Type: </span>{selectedJewelryTypeName}
                                            </div>
                                            <span><button className='hover:text-blue-700 italic text-stone-400 text-sm transition' onClick={() => handleChanges(1)}>Make changes</button></span>
                                        </div>

                                        <div className='flex justify-between'>
                                            <div>
                                                <span className='font-medium'>Metal Base: </span>{selectedMetal.metalTypeName} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                            </div>
                                            <span><button className='hover:text-blue-700 italic text-stone-400 text-sm transition' onClick={() => handleChanges(2)}>Make changes</button></span>
                                        </div>

                                        <div className='flex justify-between'>
                                            <div>
                                                <span className='font-medium'>Gemstone: </span>{selectedGemstone.gemstoneType} - {selectedGemstone.color} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                            </div>
                                            <span><button className='hover:text-blue-700 italic text-stone-400 text-sm transition' onClick={() => handleChanges(2)}>Make changes</button></span>
                                        </div>

                                        {selectedSize && (
                                            <div className='flex justify-between'>
                                                <div>
                                                    <span className='font-medium'>Size: </span>{selectedSize}
                                                </div>
                                                <span><button className='hover:text-blue-700 italic text-stone-400 text-sm transition' onClick={() => handleChanges(2)}>Make changes</button></span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className=''>
                                <Label htmlFor="description" className="text-lg">Design Description: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span><button className='hover:text-blue-700 italic text-stone-400 text-sm transition' onClick={() => handleChanges(3)}>Make changes</button></span>
                                </Label>
                                <div className='text-stone-600 text-xs mt-1 mb-2 p-3 border border-stone-300 bg-stone-200'>{description}</div>
                            </div>



                        </div>
                        <div className='mt-8'>
                            <Label htmlFor="description" className="text-lg">Upload any relevant images:</Label>
                            <div className='text-stone-600 text-sm mt-1 mb-2'>Whether it be a sketch or a 3D design, upload any kind of file you think that would help us help you</div>
                            <ImageUpload  msg={`Upload 1 or more images to help us see your vision.`} />
                        </div> 

                        <div className='mt-8'>
                                <Label htmlFor="description" className="text-lg">Item Quantity
                                <div className='text-stone-600 text-sm font-light mt-1 mb-2'>Multiple pieces of jewelry, or just one? We've got you covered!</div>
                                </Label>
                                <Input 
                                    type="number" 
                                    placeholder="Pick an amount" 
                                    className='border-black' 
                                    value={selectedQuantity} 
                                    onChange={e => setSelectedQuantity(e.target.value)}> 
                                    </Input>
                        </div>

                        <Separator className="my-8" />

                        

                        <MyInformation />

                        <Separator className="my-8" />


                        <CheckOutDetails
                        towns={towns}
                        provinces={provinces.provinces}
                        shippingAddress={shippingAddress}
                        city={city}
                        town={town}
                        deliveryMethod={deliveryMethod}
                        paymentMethod={paymentMethod}
                        onShippingAddressChange={handleShippingAddressChange}
                        onCityChange={handleCityChange}
                        onTownChange={handleTownChange}
                        onDeliveryMethodChange={handleDeliveryMethodChange}
                        onPaymentMethodChange={handlePaymentMethodChange}
                    />
                    </>
                )}

                {currentStep === 5 && <CompletedRequest/>}

                <div className="mt-8 flex justify-center">
                    {currentStep !==5 &&
                    <Button className=" text-white px-6 py-2 rounded-none border border-black" onClick={currentStep === 4 ? handleSubmit : nextStep} disabled={!isStepValid || currentStep === 5}>
                        {currentStep === 4? <>REQUEST A QUOTE</> :  <>SUBMIT</> }
                    </Button>
                    }
                    <div></div>               
                </div>
            </div>
        </div>
    );
};

export default JewelryCustomization;
