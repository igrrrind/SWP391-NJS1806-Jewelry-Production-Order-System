import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/utils/formatDate';
import { Calendar, CheckCircle, MapPin, Package, PackageIcon, PackageSearchIcon, Truck } from 'lucide-react';
import React from 'react';

const ResultsTracking = ({ result,setResult}) => {
    const {
        isShipping,
        orderId,
        shipmentDate,
        shipmentId,
        shippingAddress,
        shippingDistrict,
        shippingFee,
        shippingProvince
    } = result;

    return (
        <div className="w-[800px] mx-auto bg-white border  overflow-hidden mt-5">
            <div className="p-4">
                <p className='font-bold'>Your order is...</p>
                <Separator className="my-3"/>
                {isShipping ?
                <div className='h-24 flex space-x-2 items-center'>
                <Truck className='h-12 w-12' strokeWidth={1}/> 
                 <div>
                    <p className='text-2xl font-semibold'>Out For Delivery</p> 
                    <p className='font-ligh'>Estimated delivery date: {formatDate(shipmentDate)}</p>
                 </div>
                 
                </div>
                :
                <div className='h-24 flex space-x-2 items-center'>
                    <PackageIcon className='h-12 w-12' strokeWidth={1}/> 
                     <div>
                        <p className='text-2xl font-semibold'>Awaiting Shipment </p> 
                        <p className='font-ligh'>Estimated delivery date: {formatDate(shipmentDate)}</p>
                     </div>
                </div>
                }
                {new Date().toISOString < shipmentDate ? 
                <p>Your order is currently in transit. If you have any concerns or believe this information is inaccurate, please contact us at <a className='font-bold underline' href="tel:0938562745">0938 562 745</a>.</p>
                :
                <p>We apologize for the delay in your shipment. Please contact our support team for further assistance at <a className='font-bold underline' href="tel:0938562745">0938 562 745</a>.</p>
                }
                <Button onClick={() => setResult(null)} className="rounded-none border-black border hover:text-black hover:bg-white mt-4" >RETURN</Button>
            </div>
        </div>
    );
};

export default ResultsTracking