import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import React, { useState } from 'react';
import ImageUpload from "@/components/custom/image-upload"
import { Form } from "@/components/ui/form"


const AddProduct = ({productTypes,onSubmit,isSubmitted}) => {
  const {register, handleSubmit, formState: { errors } } = useForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit
        </CardDescription>
      </CardHeader>
      <CardContent>

      <Form>
      <form onSubmit={onSubmit(handleSubmit)}>
      <fieldset disabled={isSubmitted}>
      <div className="grid gap-6">
        
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              placeholder="Give it a name..."
              {...register('name', { required: true })}
            />
            {errors.name && <span>This field is required</span>}
          </div>


          <div className="grid gap-3">
            <Label htmlFor="type">Jewelery Type</Label>
            <Select {...register('type', { required: true })}
>
                          <SelectTrigger
                            id="type"
                            aria-label="Select Type"
                          >
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          {productTypes.map(type => (
                          <SelectContent key={type.productTypeId} >                        
                            <SelectItem value={type.productTypeId}>{type.productTypeName}</SelectItem>       
                          </SelectContent>
                          ))}
            </Select>
            {errors.type && <span>This field is required</span>}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
              className="min-h-32"
              {...register('description', { required: true })}
            />
            {errors.description && <span>This field is required</span>}
          </div>


          <div className="grid gap-3">
            <Label htmlFor="description">Thumbnail</Label>
          <ImageUpload msg="Upload one image file as the product thumbnail"/>
          </div>

          <div className="grid gap-3">
            <Button>Create Product</Button>
          </div>

        </div>
        </fieldset>
        </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddProduct;









