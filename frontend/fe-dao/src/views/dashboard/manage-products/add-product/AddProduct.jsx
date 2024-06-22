import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"
import ImageUpload from "@/components/custom/image-upload"


const  AddProduct = ({productTypes, onSubmit, isSubmitted}) => {

  //const thumbnailPath = "products/thumbnails"
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>
          Name and describe your product
        </CardDescription>
      </CardHeader>
      <CardContent>

      <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isSubmitted}>
      <div className="grid gap-6">
        
          <div className="grid gap-3">
            <Label htmlFor="productName">Name</Label>
            <Input
              id="productName"
              type="text"
              className="w-full"
              placeholder="Give it a name..."
              {...register('productName', { required: true })}
            />
            {errors.name && <span className="text-red-600">This field is required</span>}
          </div>


          <div className="grid gap-3">
            <Label htmlFor="productTypeId">Jewelery Type</Label>
            <Controller
              name="productTypeId"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger 
                    id="productTypeId"     
                    aria-label="Select Type">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>

                  <SelectContent>
                    {productTypes.productTypes.map(type => (
                      <SelectItem key={type.productTypeId} value={type.productTypeId.toString()}>
                        {type.typeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>                     
              )}
            />
            {errors.type && <span className="text-red-600">This field is required</span>}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="productDescription">Description</Label>
            <Textarea
              id="productDescription"
              placeholder="Provide a detailed description of the product."
              className="min-h-32"
              {...register('productDescription', { required: true })}
            />
            {errors.description && <span className="text-red-600">This field is required</span>}
          </div>

          {/*
          <div className="grid gap-3">
            <Label htmlFor="description">Thumbnail</Label>
            <ImageUpload msg="Upload one image file as the product thumbnail" uploadPath={thumbnailPath} uploadFileName={}/>
          </div> */}

          <div className="grid gap-3">
            <Button type="submit">Create Product</Button>
          </div>


        </div>
        </fieldset>
        </form>
      </CardContent>
      
    </Card>
  );
};

export default AddProduct;
