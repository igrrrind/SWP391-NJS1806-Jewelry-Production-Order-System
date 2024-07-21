import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ShipmentIllustration from '../../assets/delivery.webp';
import PackagesIllus from '../../assets/packages.webp';
import { Button } from "@/components/ui/button";

const SearchInterface = ({ setOrderId, handleSubmit, nothingFound }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <div className="mt-5 text-lg">
            <p>Track the delivery status of your package and estimated arrival date.</p>
            <img
                className="w-96 my-5 mx-auto"
                src={PackagesIllus}
                alt="a shipper"
                onLoad={() => setIsImageLoaded(true)}
                style={{ display: isImageLoaded ? 'block' : 'none' }}
            />
            {!isImageLoaded && <p>Loading image...</p>}
            {isImageLoaded && (
                <>
                    <div className="flex space-x-4">
                        <Input
                            onChange={(e) => setOrderId(e.target.value)}
                            className="text-lg border border-black rounded-none"
                            id="orderId"
                            type="text"
                            placeholder="Enter your order ID, e.g 1020"
                        />
                        <Button
                            onClick={handleSubmit}
                            className="rounded-none border-black border hover:text-black hover:bg-white"
                        >
                            TRACK ORDER
                        </Button>
                    </div>
                    {nothingFound && <p className='text-red-500 text-sm mt-2'>{nothingFound}</p>}
                </>
            )}
        </div>
    );
};

export default SearchInterface;
