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
import OrderCard from "./OrderCard"


const OrdersPage = () => {
    return (
        <>
                <div className="cormorant-garamond-regular text-3xl">My Orders</div>
                <Separator className="my-4"/>
                <Tabs defaultValue="account" className="w-full space-y-6">
                    <TabsList className="grid w-[400px] grid-cols-2">
                        <TabsTrigger value="all">All Orders</TabsTrigger>
                        <TabsTrigger value="password">Completed Orders</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-10">
                        <OrderCard/>
                        
                    </TabsContent>



                    <TabsContent value="password">
                        <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                            Change your password here. After saving, you'll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                        </Card>

                        
                    </TabsContent>
            </Tabs>
                
        </>
    )

}


export default OrdersPage




