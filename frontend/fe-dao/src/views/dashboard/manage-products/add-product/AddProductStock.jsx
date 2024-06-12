import { useForm } from "react-hook-form"

import { PlusCircle, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import ImageUpload from "@/components/custom/image-upload"



const AddProductStock = ({metals,gemstones,productReference,onSubmit}) => {

    const thumbnailPath = "products/thumbnails";
    const productThumbnailName = `${productReference}`;


    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [stocktabs, setStocktabs] = useState([]);

    const addStocktabs = () => {
      setStocktabs([...stocktabs, { id: stocktabs.length }]);
    };

    const deleteStocktabs = (id) => {
      setStocktabs(stocktabs.filter(stocktab => stocktab.id !== id));
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
            <ImageUpload msg="Upload one image file as the product thumbnail" uploadPath={thumbnailPath} uploadFileName={productThumbnailName}/>
        </div> 

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

          <form onSubmit={handleSubmit(onSubmit)}>
  
            {stocktabs.map((stocktab =>
            <TableRow key={stocktab.id}>
              <TableCell className="font-semibold">{stocktab.id}</TableCell>
              
              <TableCell>
                <Label htmlFor="stock-1" className="sr-only">
                  Stock
                </Label>
                <Input id="stock-1" type="number" defaultValue="100"               
                {...register('stock', { required: true })}
                />
              </TableCell>

              <TableCell>
                <Label htmlFor="price-1" className="sr-only">
                  Price
                </Label>
                <Input id="price-1" type="number" defaultValue="99.99"               
                {...register('price', { required: true })}
                />
              </TableCell>

              <TableCell>
                <Label htmlFor="size-1" className="sr-only">
                  Size
                </Label>
                <Input id="size-1" type="number" defaultValue="99.99"               
                {...register('price', { required: true })}
                />    
              </TableCell>

              <TableCell>
              <Label htmlFor="metal" className="sr-only" >Metal</Label>
              
              <Controller
              name="metal"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    id="metal"
                    aria-label="Select Metal">
                      
                    <SelectValue placeholder="Select Metal" />
                  </SelectTrigger>
                  
                  <SelectContent>    
                  {metals.map((metal) => (                    
                    <SelectItem value={metal.metalId.toString()} key={metal.metalId}>
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
                name="gemstone"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        id="gemstone"
                        aria-label="Select Gemstone"
                      >
                        <SelectValue placeholder="Select Gemstone" />
                      </SelectTrigger>
                      
                      <SelectContent >   
                      {gemstones.map(gemstone => (                     
                        <SelectItem  key={gemstone.gemstoneId} value={gemstone.gemstoneId.toString()}>{gemstone.gemstoneType} - {gemstone.color}</SelectItem>       
                      ))}
                      </SelectContent>
                                
                  </Select>
                )}
                />
              </TableCell>

              <TableCell>
                <Button variant="outline" onClick={() => deleteStocktabs(stocktab.id)}>
                  <Trash className="h-4 w-4" ></Trash>
                </Button>
              </TableCell>

            </TableRow>

            ))}





          </form>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button size="sm" variant="ghost" className="gap-1" onClick={addStocktabs}>
          <PlusCircle className="h-3.5 w-3.5" />
          Add Variant
        </Button>
      </CardFooter>
    </Card>
    )

}



export default AddProductStock;



