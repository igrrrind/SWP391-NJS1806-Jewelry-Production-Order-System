import { Button } from '@/components/ui/button';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const CompletedRequest = () => {
    return (
        <div className='container flex flex-col items-center mx-auto border-dashed border border-stone-400 p-6'>
        
        <DotLottieReact
      src="https://lottie.host/94a2521b-4845-45f9-be0a-6fb4d420b04d/eRfrBhsX4H.json"
      autoplay
      className='pointer-events-none w-24'
    />
        <h1 className='cormorant-garamond-medium text-xl mt-4'>Your order request has been sent. Our staff will contact you within the next 24 hours.</h1>
        <Button className="m-4">View Your Order</Button>

    </div>
    )
}

export default CompletedRequest