
import {
  ChevronLeft,

  Image,

  PlusCircle,

  Upload,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import React, { useState } from 'react';
import ImageUpload from "@/components/custom/image-upload"

const AddProduct = () => {
  const [formData, setFormData] = useState({
    product_id: '',
    product_type_id: '',
    product_name: '',
    product_description: '',
    inStock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your submission logic here
    console.log(formData);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit
        </CardDescription>
      </CardHeader>
      <CardContent>



        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              defaultValue="Gamer Gear Pro Controller"
            />
          </div>


          <div className="grid gap-3">
            <Label htmlFor="description">Jewelery Type</Label>
            <Select>
                          <SelectTrigger
                            id="type"
                            aria-label="Select Type"
                          >
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Necklace">Necklace</SelectItem>
                            <SelectItem value="Bracelet">Bracelet</SelectItem>
                            <SelectItem value="Charm">Charm</SelectItem>
                            <SelectItem value="Ring">Ring</SelectItem>
                            <SelectItem value="Earrings">Earrings</SelectItem>
                          </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
              className="min-h-32"
            />
          </div>


          <div className="grid gap-3">
            <Label htmlFor="description">Thumbnail</Label>
          <ImageUpload msg="Upload one image file as the product thumbnail"/>
          </div>




        </div>
      </CardContent>
    </Card>
  );
};

export default AddProduct;


