import React, { useState } from 'react';


import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button';
import ProgressBarUtil from '@/components/custom/progress-bar';
import TypeChoice from './TypeChoice';




const JewelryCustomization = () => {

    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 5)); 
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    };


    return (
        <div className="min-h-screen pt-8 flex flex-col items-center mb-12">
            <header className="w-full text-black text-center flex flex-row justify-around">
                    <Button className="bg-gray-800 text-white px-6 py-2 rounded-none hover:bg-gray-700 transition" onClick={prevStep} disabled={currentStep === 1}>
                        PREVIOUS
                    </Button>
                <h1 className="text-2xl cormorant-garamond-medium">Personalize Your Design</h1>
                    <Button className="bg-gray-800 text-white px-6 py-2 rounded-none hover:bg-gray-700 transition" onClick={nextStep} disabled={currentStep === 5}>
                        NEXT
                    </Button>
            </header>

            <div className="w-full max-w-5xl bg-white p-6 rounded-lg mt-8">
                <ProgressBarUtil currentStep={currentStep}/>
                <div className="flex justify-around  items-center mb-8">
                        <div className="flex items-center text-green-600">
                            <span>Select Jewelry</span>
                        </div>

                        <div className="flex items-center text-gray-400">
                            <span>Customization Options</span>
                        </div>

                        <div className="flex items-center text-gray-400">
                            <span>Describe your design</span>
                        </div>

                        <div className="flex items-center text-gray-400">
                            <span>Finalize your order</span>
                        </div>

                        <div className="flex items-center text-gray-400">
                            <span>Complete</span>
                        </div>
                </div>



                {currentStep === 1 && <TypeChoice/>}


                <div className="mt-8 flex justify-center">
                    <Button className="bg-gray-800 text-white px-6 py-2 rounded-none hover:bg-gray-700 transition" onClick={prevStep} disabled={currentStep === 1}>
                        PREVIOUS
                    </Button>
                    <Button className="bg-gray-800 text-white px-6 py-2 rounded-none hover:bg-gray-700 transition" onClick={nextStep} disabled={currentStep === 5}>
                        NEXT
                    </Button>
                    <div>
      </div>
                </div>
            </div>
        </div>
    );
};

export default JewelryCustomization;
