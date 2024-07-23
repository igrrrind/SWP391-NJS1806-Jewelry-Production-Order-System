import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import necklacesImage from '../../../assets/necklace.png'; 
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";
import { formatLink, formatName } from "@/utils/formatLinks";
import { useAllOrderItems } from "@/hooks/orderItemHooks";
import { Link, useNavigate } from "react-router-dom";
import { useTransactionByOrderId } from "@/hooks/transactionHooks";
import { useShipmentByOrderId } from "@/hooks/shipmentHooks";
import { useQuoteByOrderId } from "@/hooks/quoteHooks";
import { getJewelrySizeLabel } from "@/utils/typeToUnit";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import QuoteItem from "./QuoteItem";
import { ref,listAll, getDownloadURL } from "firebase/storage";
import DesignLightbox from "./DesignLightbox";
import { storage } from "@/services/Firebase";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { usePutOrder } from "@/hooks/orderHooks";
import { fetchImageUrl } from "@/utils/fetchImageUrl";
import FirebaseImage from "@/components/custom/fire-base-image";
import { useDesignById } from "../../../hooks/designHooks";
import { useAllProductions, usePostProduction, useProductionById } from "../../../hooks/productionHooks";
import { usePostProduct } from "../../../hooks/productsHooks";


const OrderCard = ({ order, userDetails }) => {
  const navigate = useNavigate();
  const { orderItems } = useAllOrderItems(order);
  const { transaction } = useTransactionByOrderId(order);
  const { shipment } = useShipmentByOrderId(order);
  const { quote } = useQuoteByOrderId(order);
  const { production }= useProductionById(order.orderId)
  const {updateOrderStatus} = usePutOrder()
  const [designOrderId, setDesignOrderId] = useState();
  const {postProduction} = usePostProduction();

  const {design} = useDesignById(designOrderId)

  useEffect(() => {
    if (orderItems.length > 0) {
      console.log(orderItems)
      setDesignOrderId(orderItems[0].orderItemId)
    }
  },[orderItems])

  const stages = ["Quote", "Design", "Production", "Shipment"];

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);


  const fetchDesignImages = async (orderItemId) => {
    const designFolderRef = ref(storage,`designs/${orderItemId}`);
    const imageRefs = await listAll(designFolderRef);
    const imageUrls = await Promise.all(imageRefs.items.map((imageRef) => getDownloadURL(imageRef)));
    setLightboxImages(imageUrls);
    setIsLightboxOpen(true);
  };

 
  /*
  useEffect(()=> {
    if (orderItems) {
      console.log(orderItems[0])
    }
  },[orderItems])
  */
  const handleQuoteAccept = () => {
    navigate(`/customize/payment`, { state: { order, quote } })
  }

  const handleDesignApproval = async () => {
      await updateOrderStatus(order, 5)
      const production = {
        orderId: order.orderId,
        startDate: new Date().toISOString().slice(0,10),
        productionStatusId: 1
      }
      await postProduction(production)
      alert("Design Approved. Track your production.")

      navigate(0)
  }

  const handleDisproval = async () => {
    alert("Design Approved. Track your production.")
    navigate(0)
}

  return (
    
    <Card className="shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="px-6 py-4 bg-stone-100 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Order placed</span>
            <span className="font-semibold text-gray-900">{formatDate(order.orderDate)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Total</span>
            <span className="font-semibold text-gray-900">{order.orderTotal} VND</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Custom</span>
            <span className="font-semibold text-gray-900">{order.isCustom ? "Yes" : "No"}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-semibold text-gray-900">Order # {order.orderId}</span>
            <div className="flex space-x-2 text-sm">
              {order.isShipment && <a href="google.com" className="text-green-600 font-semibold hover:underline">TRACK YOUR SHIPMENT</a>}
              <span className="text-gray-500">|</span>
              <a href="google.com" className={` ${transaction &&  "text-green-600"} font-semibold hover:underline`}>VIEW INVOICE</a>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
      {order.isCustom ? 
      <>
                   
        <div className="font-semibold mb-4 flex justify-between">
          <div>
            Status: &nbsp; 
            <Badge variant='outline' className={`text-md ${order.statusDetail === "Completed" ? "bg-green-100 text-green-900" : "bg-yellow-100 text-yellow-900"}`}>{order.statusDetail}</Badge>
          </div>


          <div>
            Payment:&nbsp; 
            <Badge variant='outline' className={`text-md ${order.paymentStatusName === "Completed" ? "bg-green-100 text-green-900" : "bg-yellow-100 text-yellow-900"}`}>{order.paymentStatusName}</Badge>
          </div>
        </div>
        <div className="flex overflow-x-auto">
            
        {orderItems.map((item,index) => (
          <div className="p-4 border border-stone-200 rounded-lg w-full" key={item.orderItemId}>   

           
            <div className="text-center font-bold text-xl underline">Order Details</div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl italic cormorant-garamond-medium">{index+1}. [ Custom <span className=""> {item.typeName} ]  {item.metalTypeName}  - {item.gemstoneColor} {item.gemstoneType} Mounting -  {getJewelrySizeLabel(item.typeName, item.size)} </span> </p>  
              </div>
              <Popover modal="true">
                  <PopoverTrigger asChild>
                    <Button variant="default">Description</Button>
                  </PopoverTrigger>
                  <PopoverContent  className="w-80" side="left">
                    <div className="grid gap-4">
                       <p className="text-sm">{item.requestDescription}</p>
                    </div>
                  </PopoverContent>
                </Popover>
            </div>
          </div>
        ))}
        
        </div>

        <Tabs className="mt-2 ">
          <TabsList className="w-full">
            {stages.map((stage) => (
              <TabsTrigger key={stage} value={stage} >
                {stage}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="Quote">
            {quote && orderItems[0] && order.statusId>1 ? (
              <div className="space-y-4 flex flex-col ">
              <QuoteItem quote={quote} orderItem={orderItems[0]}  userDetails={userDetails}/>
              <Button className="h-16" onClick={handleQuoteAccept} disabled={design !== undefined && design !== null} >
                <div className="flex-col">
                  <div className="text-lg">Accept Quote</div>
                  <div className="text-xs">You'll be taken to the payment page</div>
                </div>
              </Button>

              <Button className="h-16 mt-4" variant="destructive">
                <div className="flex-col">
                  <div className="text-lg">Cancel Quote</div>
                  <div className="text-xs">Your order will be cancelled</div>
                </div>
              </Button>

              </div>
            ) : (
              <div className="h-[128px] border-dotted border-2 flex align-middle items-center justify-center">
                <p className="italic">Your quote is being processed by our staff. <a href="tel:0938562745" className="text-blue-600">Contact us</a> if you do not receive a quote within 24 hours.</p>
              </div>
            )}
          </TabsContent>


          <TabsContent value="Design">
            {order.statusId > 2 && design ? (
              <div className="flex flex-col items-center border border-muted border-dashed my-4">
                <h1 className="font-medium">We're working on your design!</h1> 
                <p className="text-muted-foreground text-sm">Designated completion date: {formatDate(design.designatedCompletion)}</p>      
                <Separator className="m-2"/>
              </div>      
            ) : 
              <div className="h-[128px] border-dotted border-2 flex align-middle items-center justify-center">
                The design phase is not yet reached for this order.
              </div>
            
            }

            {order.statusId >= 4 && (
              <>
                {orderItems.map((item, index) => (
                  <div key={item.orderItemId} className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold">Order Item {index + 1}</p>
                    <Button onClick={() => fetchDesignImages(item.orderItemId)}>View Design</Button>
                  </div>
                ))}
                <Lightbox
                   slides={lightboxImages.map((url) => ({
                    src: url,
                }))}
                  open={isLightboxOpen}
                  close={() => setIsLightboxOpen(false)}
                />
                <div className="flex justify-center space-x-4">
                <Button onClick={handleDesignApproval}>Approve Design</Button>
                <Button onClick={handleDisproval}>Disprove Design</Button>
                </div>
              </>
            )}
          </TabsContent>


          {/* PRODUCTION */}
          <TabsContent value="Production">
          {order.statusId > 4 && production ? (
              <div className="flex flex-col items-center border border-muted border-dashed my-4">
                <h1 className="font-medium">Track the production process</h1> 
                <p className="text-muted-foreground text-sm">State of production: {production.productionStatusName}</p>      
                <Separator className="m-2"/>
              </div>      
            ) : 
              <div className="h-[128px] border-dotted border-2 flex align-middle items-center justify-center">
                The production phase is not yet reached for this order.
              </div>
            
            }
          </TabsContent>



          <TabsContent value="Shipment">
            {shipment ? (
              <div>
                <div><span className="font-light">Shipment ID:</span> {shipment.shipmentId}</div>
                <div><span className="font-light">Shipment Date:</span> {formatDate(shipment.shipmentDate)}</div>
                <div><span className="font-light">Shipping Address:</span> {shipment.shippingAddress}</div>
                <div><span className="font-light">Province:</span> {shipment.shippingProvince}</div>
                <div><span className="font-light">District:</span> {shipment.shippingDistrict}</div>
                <div><span className="font-light">Shipping Fee:</span> {shipment.shippingFee}</div>
              </div>
            ) : (
              <div>Shipment details not available yet.</div>
            )}
          </TabsContent>
        </Tabs>

        </>
        : (
            <>
                <div className="font-semibold mb-4 flex justify-between">
                  <div>
                    Status: &nbsp; 
                    <Badge variant='outline' className={`text-md ${order.statusDetail === "Completed" ? "bg-green-100 text-green-900" : "bg-yellow-100 text-yellow-900"}`}>{order.statusDetail}</Badge>
                  </div>


                  <div>
                    Payment:&nbsp; 
                    <Badge variant='outline' className={`text-md ${order.paymentStatusName === "Completed" ? "bg-green-100 text-green-900" : "bg-yellow-100 text-yellow-900"}`}>{order.paymentStatusName}</Badge>
                  </div>
                </div>

                {orderItems.map(item => (
                    <div className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4" key={item.orderFixedItemId}>
                        <div className="flex space-x-6">
                            <div className="overflow-hidden rounded-lg border border-gray-300 w-32 h-32">
                                <FirebaseImage path={`products/thumbnails/${item.productId}`} alt={item.productName}/>
                            </div>
                            <div className="flex flex-col justify-between">
                                <div>
                                    <div className="text-lg font-semibold text-gray-800">{item.productName}</div>
                                    <div className="text-gray-600">{item.productStock.metalTypeName} | {item.productStock.gemstoneType} - {item.productStock.gemstoneColor} | {item.productStock.size}</div>
                                </div>
                                <div>
                                    <div className="text-gray-800"><span className="font-light">Price:</span> {item.unitPrice}</div>
                                    <div className="text-gray-800"><span className="font-light">Quantity:</span> {item.quantity}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                            <Link to={formatLink(item.productId, formatName(item.productName))} className="text-sm text-white bg-black px-3 py-2 rounded-md hover:bg-gray-800 mb-4">View Listing</Link>
                            <p className="text-lg font-semibold text-gray-900 text-center">{item.subtotal} đ</p>
                        </div>
                    </div>
                ))}
            </>
        )}
    </CardContent>
</Card>
);
}

export default OrderCard;


/*
{orderItems.map(item => (
          <div className="" key={item.orderItemId}>   

           

            <div className="">
                <div className="overflow-hidden rounded-lg border border-black w-48 h-48 mb-2">
                <img src={necklacesImage} alt="custom item" className="w-full h-full object-cover" />
                </div>
                <p className="text-center text-xl italic cormorant-garamond-medium">[ Custom <span className="">{item.typeName}</span> ]</p>  
            </div>
          </div>
        ))}



<div className="col-span-1 mx-12 ">
              <div className="font-normal text-lg">
                Your Choices 
              </div>

              <div className="font-normal text-">
                <span className="font-bold">METAL</span>: {item.metalTypeName} 
              </div>
              <div className="font-normal text-">
              <span className="font-bold">GEMSTONE</span>: {item.gemstoneType}
              </div>
              <div className="font-normal text-l">
              <span className="font-bold">GEM COLOR</span>: {item.gemstoneColor}
              </div>
              <div className="font-bold text-l">
                {getJewelrySizeLabel(item.typeName, item.size)}
              </div>
              
            
            </div>*/