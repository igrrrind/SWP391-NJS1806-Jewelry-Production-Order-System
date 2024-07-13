import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import FirebaseImage from "@/components/custom/fire-base-image";

const ProductTable = ({products}) => {

    const navigate = useNavigate(); 
    const handleClick = () => navigate('/dashboard/add-product'); 



    return (
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Products</CardTitle>
                    <div className='flex justify-between align-middle'>
                    <CardDescription>
                        Create, edit and update existing products
                    </CardDescription>
                    <Button className="h-15 w-1/6 bg-stone-700" onClick={handleClick} >Create Product</Button>
                    </div>

                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead className="hidden sm:table-cell">Name</TableHead>
                                <TableHead className="hidden sm:table-cell">Thumbnail</TableHead>
                                <TableHead className="hidden sm:table-cell">Type</TableHead>
                                <TableHead className="hidden sm:table-cell">Description</TableHead>
                                <TableHead className="hidden sm:table-cell">Availability</TableHead>
                               {/* <TableHead className="hidden md:table-cell">Sales</TableHead> */}
                                <TableHead className="">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/*
                             <TableRow>
                                    <TableCell>
                                        <div className="font-medium">James Bond</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            agent007@hollywood.com
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">Custom</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant='outline'>
                                            Pending
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">27 May</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant='outline'>
                                            Unpaid
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">$745.34</TableCell>
                                    
                                    <TableCell>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View Attached Quote</DropdownMenuItem>
                                        <DropdownMenuItem>View Customer Info</DropdownMenuItem>
                                        <DropdownMenuItem>Waranty Certificate</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    </TableCell>
                                </TableRow>

    */}

                        {/*  mapping orders to table cells*/}

           

                            {products.map(product => (
                                <TableRow key={product.productId}>
                                    <TableCell>{product.productId}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{product.productName}</TableCell>
                                    <TableCell className="hidden sm:table-cell"><div><FirebaseImage path={`products/thumbnail/${product.productId}`} alt={product.productnName}/></div></TableCell>
                                    <TableCell className="hidden sm:table-cell">{product.productType}</TableCell>
                                    <TableCell className="hidden sm:table-cell overflow-hidden max-w-6">{product.productDescription}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant={product.isActive === 1 ? 'secondary' : 'outline'}>
                                            {product.isActive? "Active" : "Hidden"}
                                        </Badge>
                                    </TableCell>                                  {/*  <TableCell className="hidden sm:table-cell">{product.sales}</TableCell> */}
                                    
                                   
                                    <TableCell>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit Product Info & Stock</DropdownMenuItem>
                                        <DropdownMenuItem>Delete Product</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                

    )
} 


export default ProductTable