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
import { useEffect } from "react"
import { useProductById } from "../../../../../hooks/productsHooks"


const  EditProduct = ({productTypes, onSubmit, productId}) => {

  const { product } = useProductById(productId)

  //const thumbnailPath = "products/thumbnails"
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm();

  const formData = watch();

  useEffect(() => {
    console.log("Form data changed:", formData);
  }, [formData]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>
          Name and describe your product
        </CardDescription>
      </CardHeader>
      <CardContent>
      {product &&
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6">
        
          <div className="grid gap-3">
          <input type="hidden" defaultValue={product.productId} 
                                     {...register("productId", {})} />
            <Label htmlFor="productName">Name</Label>
            <Input
              id="productName"
              type="text"
              defaultValue={product.productName}
              className="w-full"
              placeholder="Give it a name..."
              {...register("productName", { 
                required: "Product name is required",
               })}
            />
            {errors.productName && <span className="text-red-600">{errors.productName.message}</span>}
          </div>


          <div className="grid gap-3">
            <Label htmlFor="productTypeId">Jewelery Type</Label>
            <Controller
              name="productTypeId"
              defaultValue={parseInt(product.productTypeId)}
              control={control}
              rules={{ required: "Product type is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value && field.value.toString()}>
                  <SelectTrigger 
                    id="productTypeId"     
                    aria-label="Select Type">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>

                  <SelectContent>
                    {productTypes.map(type => (
                      <SelectItem key={type.productTypeId} value={type.productTypeId.toString()}>
                        {type.typeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>                     
              )}
            />
            {errors.productTypeId && <span className="text-red-600">{errors.productTypeId.message}</span>}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="productDescription">Description</Label>
            <Textarea
              defaultValue={product.productDescription}
              id="productDescription"
              placeholder="Provide a detailed description of the product."
              className="min-h-32"
              {...register("productDescription", { 
                required: "Product description is required",
                minLength: value => value.split(' ').length >= 100 || "Product description must be over 100 words"
              })}
            />
            {errors.productDescription && <span className="text-red-600">{errors.productDescription.message}</span>}
          </div>

          {/*
          <div className="grid gap-3">
            <Label htmlFor="description">Thumbnail</Label>
            <ImageUpload msg="Upload one image file as the product thumbnail" uploadPath={thumbnailPath} uploadFileName={}/>
          </div> */}

          <div className="grid gap-3">
            <Button type="submit">Update Product</Button>
          </div>


        </div>
        </form>
      }
      </CardContent>
      
    </Card>
  );
};

export default EditProduct;
