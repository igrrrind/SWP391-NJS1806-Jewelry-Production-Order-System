
const CustomSelect = ({options}) => {
    return (
        <div className="mb-4">
                <label htmlFor="chooseVariant" className="block text-lg  mb-2">TYPE</label>
                <Select onValueChange={(value) =>handleSelectedEntry(value)}>
                  <SelectTrigger className="pt-6 pb-6 border border-stone-800"
                    id="chooseVariant"
                    aria-label="Select Variant">
                      
                    <SelectValue placeholder="Select Variant" />
                  </SelectTrigger>
                  
                  <SelectContent>    
                  {options.map((option) => (                    
                    <SelectItem value={option.productStockId.toString()} key={entry.productStockId} >
                      <p className="text-md font-semibold">{entry.metalName} - {entry.gemstoneName} - {entry.size}</p>
                    </SelectItem>      
                  ))} 
                  </SelectContent>                           
                </Select>
        </div>
    )

}

