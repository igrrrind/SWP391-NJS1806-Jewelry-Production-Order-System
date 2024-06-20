import { Separator } from "@/components/ui/separator"
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import necklacesImage from '../../../assets/necklace.png'; 
import { Badge } from "@/components/ui/badge"
 
 
 const OrderCard = () => {
    return (           
            <Card>
                          <CardHeader className="px-10 bg-stone-100" >
                            <div className="flex items-center justify-between rounded-lg">
                                    <div className="flex flex-col">
                                        <span className="text-gray-500">Order placed</span>
                                        <span className="font-medium">June 3, 2024</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-500">Total</span>
                                        <span className="font-medium">600,000 VND</span>
                                    </div>

                                    
                                    <div className="flex flex-col">
                                        <span className="text-gray-500">Custom</span>
                                        <span className="font-medium">No</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="font-medium">Order # 12837</span>
                                        <div className="flex space-x-2">
                                            <a href="google.com" className="text-green-600 hover:underline">Track your shipment</a>
                                            <span className="text-gray-300">|</span>
                                            <a href="google.com" className="text-green-600 hover:underline">View invoice</a>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2 p-8">
                                <div className="font-semibold mb-4 flex justify-center">
                                    <Badge variant='outline' className='text-md bg-purple-100 text-purple-900'> Pending delivery...</Badge>
                                </div>
                                
                                <div className="fixed-order-row flex space-x-8">
                                    <div className="overflow-hidden rounded-lg border border-black w-48 h-48 ">
                                        <img src={necklacesImage} alt="necklace" className="w-full h-full object-cover"></img>
                                    </div>

                                    <div className="font-semibold text-lg">
                                        <div>Charming Gold Necklace - THE COLLECTION</div>
                                        <div className="font-normal text-lg">Gold | No Mounting | 50cm </div>
                                        <div>&nbsp;</div>
                                        <div>&nbsp;</div>
                                        <div><span className="font-light">Price:</span> 10000đ</div>
                                        <div><span className="font-light">Quantity:</span> 2</div>
                                        


                                    </div>

                                    <div className="font-semibold text-lg flex items-end self-end top-64">
                                        <div><span className="font-light ">Subtotal:</span> 20000đ</div>
                                    </div>

                                    <div className="font-semibold text-lg flex flex-col justify-between">
                                    <Button>View this item's listing</Button>
                                    </div>

                                    

                                </div>
                            </CardContent>


                        </Card>
        ) 
}

export default OrderCard