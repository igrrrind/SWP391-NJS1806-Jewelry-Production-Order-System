
import ImageUpload from '@/components/custom/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const   DescribeYourDesign = ({description,setDescription}) => {


    return (
        <>
        {/*<div>{selectedChoice}</div> */}
        <h2 className="text-xl font-light mb-6 mt-2 text-center">Describe & Upload a reference</h2>
                <div className="space-y-8">
                    <div>
                        <Label htmlFor="description" className="text-lg">Describe Your Design</Label>
                        <div className='text-stone-600 text-sm mt-1 mb-2'>Tell us everything from how you want it to look, your budget to how quickly you need to get it done. </div>
                        <Textarea
                            type="text" 
                            className="mt-2 h-64"  
                            placeholder="Eg. I want the earing to look like the image i uploaded, check it out, if you can make it out of 100% diamond."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>


                    
                </div>
        </>
    )
}

export default DescribeYourDesign