import { useState } from 'react';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useGetAllMetals } from '@/hooks/metalHooks';
import { useGetAllGemstones } from '@/hooks/gemstoneHooks';
import { getJewelrySizeLabel, getJewelrySizeName, getSizeChartUrl } from '@/utils/typeToUnit';

const PersonalizeChoice = ({selectedMetal, setSelectedMetal, selectedGemstone, setSelectedGemstone, selectedSize, setSelectedSize, selectedJewelryTypeName}) => {
    const { metals } = useGetAllMetals();
    const { gemstones } = useGetAllGemstones();

    return (
        <>
            <h2 className="text-xl font-light mb-6 mt-2 text-center">Personalize your jewelry</h2>
            <h2 className="text-stone-700 font-light mb-6 mt-2 text-center">{selectedJewelryTypeName}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 text-center px-4 space-y-6 flex flex-col">
                    <div><label htmlFor='metal' className='text-lg'>Metal</label></div>
                    <div className='italic text-stone-600'>A key factor in both its appearance and durability.</div>
                    <div>Choose from a variety of metals to find the perfect match for your style and needs.</div>
                </div>

                <div className="col-span-1 text-center px-4 space-y-6 flex flex-col">
                    <div><label htmlFor='gemstone' className='text-lg'>Primary Gemstone</label></div>
                    <div className='italic text-stone-600'>A gemstone to add color, sparkle, and personal significance to your jewelry.</div>
                    <div>Each gemstone has its unique properties and symbolism.</div>
                </div>

                <div className="col-span-1 text-center px-4 space-y-6 flex flex-col">
                    <div><label htmlFor='size' className='text-lg'>{getJewelrySizeName(selectedJewelryTypeName)}</label></div>
                    <div className='italic text-stone-600'>The correct {selectedJewelryTypeName} size is essential for aesthetics, comfort, and wearability.</div>
                    <div>Use this <a className="underline text-blue-900" href={getSizeChartUrl(selectedJewelryTypeName)} target="_blank" rel="noopener noreferrer">size chart</a> or measure an existing {selectedJewelryTypeName} to ensure a perfect fit.</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                <div className="col-span-1 text-center px-4 space-y-6 flex flex-col">
                    <div>
                        <Select onValueChange={value => setSelectedMetal(metals.find(m => m.metalId === value))} value={selectedMetal?.metalId}>
                            <SelectTrigger className="border w-full border-stone-800" id="metal" aria-label="Select metal">
                                <SelectValue placeholder="Select metal" />
                            </SelectTrigger>
                            <SelectContent>
                                {metals.map((metal) => (
                                    <SelectItem value={metal.metalId} key={metal.metalId}>
                                        <p className="text-md">{metal.metalTypeName}</p>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="col-span-1 text-center px-4 space-y-6 flex flex-col">
                    <div>
                        <Select onValueChange={value => setSelectedGemstone(gemstones.find(g => g.gemstoneId === value))} value={selectedGemstone?.gemstoneId}>
                            <SelectTrigger className="border w-full border-stone-800" id="gemstone" aria-label="Select gemstone">
                                <SelectValue placeholder="Select gemstone" />
                            </SelectTrigger>
                            <SelectContent>
                                {gemstones.map((gemstone) => (
                                    <SelectItem value={gemstone.gemstoneId} key={gemstone.gemstoneId}>
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
                            onChange={e => setSelectedSize(e.target.value)}
                            id="size"
                            aria-label="Choose size"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PersonalizeChoice;
