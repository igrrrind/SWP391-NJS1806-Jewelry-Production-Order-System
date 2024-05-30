import { useState, useEffect } from 'react';
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

const ProductTable = ({products}) => {


    return (
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Products</CardTitle>
                    <div className='flex justify-between align-middle'>
                    <CardDescription>
                        Create, edit and update existing products
                    </CardDescription>
                    <Button className="h-15 w-1/6 bg-stone-700"  >Create Product</Button>
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



                        {/*  mapping orders to table cells*/}

           

                            {products.map(product => (
                                <TableRow key={product.product_id}>
                                    <TableCell>{product.product_id}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{product.product_name}</TableCell>
                                    <TableCell className="hidden sm:table-cell"><img src="https://www.google.com/imgres?q=jewelery&imgurl=http%3A%2F%2Fgiftyet.co.uk%2Fcdn%2Fshop%2Fcollections%2FCustom_925_silver_cat_necklance.jpg%3Fv%3D1691757165&imgrefurl=https%3A%2F%2Fgiftyet.co.uk%2Fcollections%2Fjewelry&docid=2Be1CHXWV-9OJM&tbnid=BU_nxMpu593OOM&vet=12ahUKEwjL3vHtt7KGAxURYvUHHVdfDZ4QM3oECBcQAA..i&w=691&h=692&hcb=2&ved=2ahUKEwjL3vHtt7KGAxURYvUHHVdfDZ4QM3oECBcQAA" /></TableCell>
                                    <TableCell className="hidden sm:table-cell">{product.product_type}</TableCell>
                                    <TableCell className="hidden sm:table-cell overflow-hidden max-w-6">{product.product_description}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant={product.inStock === 1 ? 'secondary' : 'outline'}>
                                            {product.inStock? "In Stock" : "Out of Stock"}
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
                                        <DropdownMenuItem>View Attached Quote</DropdownMenuItem>
                                        <DropdownMenuItem>View Customer Info</DropdownMenuItem>
                                        <DropdownMenuItem>Waranty Certificate</DropdownMenuItem>
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



const ManageProductsPage = () => {

    const [products, setProducts] = useState([]);

    

    useEffect(() => {
      // Function to fetch order data from the API, map to collumns
      const fetchProducts = async () => {
          try {
              const response = await fetch('/data.json'); 
              const data = await response.json();
              const processedData = processData(data);
              setProducts(processedData);
              console.log(processedData);
          } catch (error) {
              console.error('Error fetching resources:', error);
          }
      };

      fetchProducts();
      }, []);

      const processData = (data) => {
        return data.Product.map(product => {
            const productTypes = data.Product_Types.find(pt => pt.product_type_id === product.product_type_id);

            return {
                ...product,
                product_type: productTypes.type_name
            }

        })

      }


    return (
        <main className="p-4 xl:flex flex-1 xl:space-x-4">
                <div className="flex-1">
                     <ProductTable products={products} />
                </div>
        </main>
    )
} 

export default ManageProductsPage;