import React, { useEffect, useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { PlusCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUpload from "@/components/custom/image-upload";

const EditProductStock = ({ metals, gemstones, productReference, onSubmit, currentStocksBatch }) => {
  const thumbnailPath = "products/thumbnails";
  const productThumbnailName = `${productReference}`;


  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
        stocktabs: []
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "stocktabs"
  });

  useEffect(() => {
    currentStocksBatch.forEach(stock => append(stock));
  }, [currentStocksBatch]);




  const addStocktab = () => {
    append({ productId: productReference, stockQuantity: '', price: '', size: '', metalId: '', gemstoneId: '' });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Product Stock & Variants</CardTitle>
        <CardDescription>
          Add product stock and save for future changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="m-10">
          <Label htmlFor="description">Thumbnail</Label>
          <ImageUpload msg="Upload one image file as the product thumbnail" uploadPath={thumbnailPath} uploadFileName={productThumbnailName} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">SKU</TableHead>
                <TableHead className="w-[150px]">Stock</TableHead>
                <TableHead className="w-[150px]">Price</TableHead>
                <TableHead className="w-[150px]">Size</TableHead>
                <TableHead className="">Metals</TableHead>
                <TableHead className="">Gemstones</TableHead>
                <TableHead className="">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell className="font-semibold">{index + 1}</TableCell>

                  <TableCell>
                    <Label htmlFor={`stock-${index}`} className="sr-only">Stock</Label>
                    <Input id={`stock-${index}`} type="number" defaultValue={field.stockQuantity}
                      {...register(`stocktabs.${index}.stockQuantity`, { required: true })}
                    />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor={`price-${index}`} className="sr-only">Price</Label>
                    <Input id={`price-${index}`} type="number" defaultValue={field.price}
                      {...register(`stocktabs.${index}.price`, { required: true })}
                    />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor={`size-${index}`} className="sr-only">Size</Label>
                    <Input id={`size-${index}`} type="number" defaultValue={field.size}
                      {...register(`stocktabs.${index}.size`, { required: true })}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                        name={`stocktabs.${index}.metalId`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field:value }) => (
                            <Select onValueChange={value.onChange} value={value.value && value.value.toString()}>
                            <SelectTrigger id={`metal-${index}`} aria-label="Select Metal">
                            <SelectValue placeholder="Select Metal" />
                            </SelectTrigger>
                            <SelectContent>
                            {metals.map(metal => (
                                <SelectItem key={metal.metalId} value={metal.metalId.toString()}>
                                {metal.metalTypeName}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                        name={`stocktabs.${index}.gemstoneId`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field:value }) => (
                            <Select onValueChange={value.onChange} value={value.value && value.value.toString()}>
                            <SelectTrigger id={`gemstone-${index}`} aria-label="Select Gemstone">
                            <SelectValue placeholder="Select Gemstone" />
                            </SelectTrigger>
                            <SelectContent>
                            {gemstones.map(gemstone => (
                                <SelectItem key={gemstone.gemstoneId} value={gemstone.gemstoneId.toString()}>
                                {gemstone.gemstoneType} - {gemstone.color}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        
                        )}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => remove(index)}>
                      <Trash className="h-4 w-4"></Trash>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {errors.stocktabs && <div>Some fields are still empty.</div>}

          <CardFooter className="justify-center border-t p-4">
            <Button size="sm" variant="ghost" className="gap-1" onClick={addStocktab}>
              <PlusCircle className="h-3.5 w-3.5" />
              Add Variant
            </Button>
          </CardFooter>
          <CardFooter className="justify-center border-t p-4 flex">
            <Button type="submit" size="sm" variant="" className="gap-1 bg-white text-black hover:text-white border-black border">
              Submit
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export default EditProductStock;
