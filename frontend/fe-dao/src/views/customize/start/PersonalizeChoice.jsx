
import { useState } from 'react';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';
import { Input } from '@/components/ui/input';


const metals = [
    { metalId: '1', metalName: 'Gold 12K'},
    { metalId: '2', metalName: 'Gold 32K'},
    { metalId: '3', metalName: 'Gold 64K'},
    { metalId: '4', metalName: 'Gold 80K'},
    { metalId: '5', metalName: 'Gold 25K'},
];

const gemstones = [
    { gemstoneId: '1', gemstoneType: 'Saphire'},
    { gemstoneId: '2', gemstoneType: 'Saphire'},
    { gemstoneId: '3', gemstoneType: 'Saphire'},
    { gemstoneId: '4', gemstoneType: 'Saphire'},
    { gemstoneId: '5', gemstoneType: 'Saphire'},
];

const   PersonalizeChoice = ({selectedMetal,setSelectedMetal,selectedGemstone,setSelectedGemstone,selectedSize,setSelectedSize}) => {


    return (
        <>
        {/*<div>{selectedChoice}</div> */}
        <h2 className="text-xl font-light mb-6 mt-2 text-center">Personalize your jewelery</h2>
        <h2 className="text-stone-700 font-light mb-6 mt-2 text-center">Ring</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="col-span-1 text-center px-4 space-y-6 flex flex-col">
                        <div><label htmlFor='metal' className='text-lg'>Metal</label></div>
                        <div className='italic text-stone-600'>A key factor in both its appearance and durability.</div>
                        <div>Choose from a variety of metals to find the perfect match for your style and needs.</div>
                                          
                    </div>



                    <div className="col-span-1 text-center px-4 space-y-6 flex flex-col">
                        <div><label htmlFor='gemstone' className='text-lg'>Gemstone</label></div>
                        <div className='italic text-stone-600'>A gemstone to add color, sparkle, and personal significance to your ring.</div>
                        <div>Each gemstone has its unique properties and symbolism.</div>
                                      
                    </div>




                    <div className="col-span-1 text-center px-4 space-y-6 flex flex-col">
                        <div><label htmlFor='size' className='text-lg'>Ring Size</label></div>
                        <div className='italic text-stone-600'>The correct ring size is essential for comfort and wearability.</div>
                        <div>Use this ring <a className="underline text-blue-900" href="https://shopee.vn/blog/cach-do-size-nhan-nu/" target="_blank">size chart</a> or measure an existing ring to ensure a perfect fit.</div>
                                          
                    </div>  
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

                    <div className="col-span-1 text-center px-4 space-y-6 flex flex-col">  
                            <div>           
                            <Select onValueChange={value => setSelectedMetal(value)} value={selectedMetal}>
                                <SelectTrigger className=" border w-full border-stone-800"
                                    id="gemstone"
                                    aria-label="Select metal">
                                    
                                    <SelectValue placeholder="Select metal" />
                                </SelectTrigger>
                                
                                <SelectContent>    
                                {metals.map((metal) => (                    
                                    <SelectItem value={metal.metalId.toString()} key={metal.metalId} >
                                    <p className="text-md">{metal.metalName}</p>
                                    </SelectItem>      
                                ))} 
                                </SelectContent>                           
                            </Select>
                            </div>
                    </div>

                    <div className="col-span-1 text-center px-4 space-y-6 flex flex-col">  
                            <div>
                            <Select  onValueChange={value => setSelectedGemstone(value)} value={selectedGemstone}>
                                <SelectTrigger className=" border w-full border-stone-800"
                                    id="gemstone"
                                    aria-label="Select gemstone">
                                    
                                    <SelectValue placeholder="Select gemstone" />
                                </SelectTrigger>
                                
                                <SelectContent>    
                                {gemstones.map((gemstone) => (                    
                                    <SelectItem value={gemstone.gemstoneId.toString()} key={gemstone.gemstoneId} >
                                    <p className="text-md">{gemstone.gemstoneType} - {gemstone.color}</p>
                                    </SelectItem>      
                                ))} 
                                </SelectContent>                           
                            </Select>
                            </div>
                    </div>

                    <div className="col-span-1 text-center px-4 space-y-6 flex flex-col">  
                            <div>
                                <Input 
                                    type="number" 
                                    placeholder="Choose a size" 
                                    className='border-black' 
                                    value={selectedSize} 
                                    onChange={e => setSelectedSize(e.target.value)}> 
                                    </Input>
                            </div>
                    </div>

                    
                </div>


                
        </>
    )
}

export default PersonalizeChoice