import { Controller, useForm } from "react-hook-form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const SelectMock = ({productTypes}) => {

    const {control, formState: { errors } } = useForm();


    return (
            <Controller
                    name="type"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger 
                        id="type"     
                        aria-label="Select Type">
                          <SelectValue onBlur={field.onBlur} ref={field.ref} placeholder="Select Type"></SelectValue>
                        </SelectTrigger>

                        <SelectContent>
                          {productTypes.map(type => (
                            <SelectItem key={type.productTypeId} value={type.productTypeId}>
                              {type.typeName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>                     
                    )}
                  />
                )
                {errors.type && <span>This field is required</span>}

}

export default SelectMock