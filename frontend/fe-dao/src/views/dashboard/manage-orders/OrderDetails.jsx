import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Info, MailIcon, Send, User, User2 } from "lucide-react";
//import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTableRowigger, Separator } from "@radix-ui/react-dropdown-menu";
//import { Copy, CreditCard, MoreVertical, TableRowuck } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/formatDate";
import { usePutOrder } from "@/hooks/orderHooks";
import { useState } from "react";


const OrderDetails = ({order, orderItems, quote, shipment, transaction}) => {
    if (!order) {
      return (
        <div>
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <CardTitle className=" justify-center items-center gap-2 text-lg">
                  Select an Order
                  <CardDescription>Details will appear here.</CardDescription>

                </CardTitle>
              </CardHeader>
           </Card>
        </div>
      );
    }

    if (order.isCustom){
      return (
        <div>
            <CustomCard order={order} orderItems={orderItems} quote={quote} shipment={shipment} transaction={transaction}/>         
        </div>
      )
    } else if (!order.isCustom)
    return(
        <div>
            <FixedCard order={order} orderItems={orderItems} shipment={shipment} transaction={transaction}/>         
        </div>
    )

}

export default OrderDetails


//CUSTOM CARD


const CustomCard = ({order, orderItems, quote, shipment, transaction}) =>{
    const  navigate = useNavigate();
    const {updateOrder} = usePutOrder()
    const [newOrder, setNewOrder] = useState(null)
  
    const handleCreateQuote = () => {
       navigate(`/dashboard/create-quote/${order.orderId}`)
    }

    const handleQuoteApproval = () => {
      const { orderId, customerId, orderDate, paymentStatusId, isShipment, isCustom, orderTotal } = order;
      const updatedOrder = {
          orderId: orderId,
          customerId: customerId,
          orderDate: orderDate,
          statusId: 2, // Approving quote updates the statusId to 2
          paymentStatusId: paymentStatusId,
          isShipment: isShipment,
          isCustom: isCustom,
          orderTotal: orderTotal
      };

      setNewOrder(updatedOrder);
      updateOrder(updatedOrder)
          .then(response => {
              alert("Quote Approved.")
              console.log('Order updated successfully', response);
              navigate(0)
          })
          .catch(error => {
              // Handle error if needed
              console.error('Error updating order', error);
          });
    };

    const handleQuoteEdit= () => {
      navigate(`/dashboard/edit-quote/${order.orderId}`)      
    }

    const handleQuoteSend= () => {
      //allows admin to download the quote and send to the user
    }


    return (
      <Card className="overflow-hidden border-blue-700" x-chunk="dashboard-05-chunk-4">
              <CardHeader>
                <div className="border-b pb-2 mb-4">
                  <h2 className=" font-semibold">Order #{order.orderId}</h2>
                  <p className="text-gray-500">{order.orderDate}</p>
                </div>
                <div className="mb-4 flex flex-col items-center">
                  <h3 className="font-semibold">Order Details</h3>
                  <p className="text-gray-500 text-sm">Hover to view additional information</p>
                </div>
                <div className="flex justify-between pt-4 items-center">
                  <p className="text-gray-700 text-sm font-semibold">Type: <Badge variant="secondary">{order.isCustom ? "Custom": "Sale"}</Badge></p>
                  <p className="text-gray-700 text-sm font-semibold">Status: <Badge>{order.statusDetail}</Badge></p>
                </div>
              </CardHeader>
              <CardContent>
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="text-left border-b">
                      <TableHead className="pl-0 w-20">TYPE</TableHead>
                      <TableHead className="py-2 w-8">SPECS.</TableHead>
                      <TableHead className="py-2">EST.UNIT PRICE</TableHead>
                      <TableHead className="py-2">QTY.</TableHead>
                      <TableHead className="px-0"><p className="text-right">EST. SUBTOTAL</p></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.length !== 0 ? orderItems.map(item => (<>
                    <TableRow className="border-b " key={item.orderItemId}>
                        <TableCell className="px-0 flex flex-col items-center">
                          <p className=" text-left">{item.typeName}</p>
                          <p className="text-xs text-left">Custom</p>
                        </TableCell>
                        <TableCell className="py-2">
                        <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              to="/dashboard/manage-users"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                              <Info className="h-5 w-5" />
                              <span className="sr-only">Customers</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="flex flex-col items-center">{item.metalTypeName} - {item.gemstoneType} <p>Size {item.size}</p></TooltipContent>
                        </Tooltip>
                        </TooltipProvider>
                      
                        </TableCell>
                        <TableCell className="py-2">{item.unitPrice}</TableCell>
                        <TableCell className="py-2">x {item.quantity}</TableCell>
                        <TableCell className="text-right px-0">{item.subtotal}</TableCell>
                    </TableRow>
                    <TableRow>
                       <TableCell colSpan="4"><p className="text-ellipsis overflow-hidden whitespace-nowrap w-80">{item.requestDescription}</p></TableCell>


                    </TableRow>
                    </>
                    )): <TableRow><TableCell colSpan="5">Nothing here yet</TableCell></TableRow> }
                  </TableBody>
                </Table>
                <Separator className="mb-4"/>
                <div className="flex justify-between mb-4">
                  <p className="text-gray-700 font-semibold">SHIPMENT FEE</p>
                  <p className="text-sm">{shipment?.shippingFee}</p>
                </div>
                <div className="flex justify-between mb-4">
                  <p className="text-gray-700 font-semibold">ACTUAL TOTAL</p>
                  <p className="text-gray-700 font-semibold">{order.orderTotal > 0 ? order.orderTotal : <div className="text-red-700">Quote NF</div>}</p>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  *Currency is VND
                </div>
                <div className="p-2">
                    
                </div>
                <Separator className="mb-2"/>

                <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger><div className="flex justify-between w-full pr-3"><div>Pricing Quote</div><div></div></div></AccordionTrigger>
                    <AccordionContent className=" flex justify-between">
                      {quote ? (
                      <div className="space-y-2">
                        <p className="font-semibold">Quote #{quote.quoteId}</p>
                        <p className="text-sm text-foreground">Date of Creation: {formatDate(quote.createdDate)}</p>
                        <div className="p-2"></div>
                        <div className="">
                          <Table className="w-full">
                            <TableHeader>
                              <TableRow> 
                                <TableHead className="pl-0 w-20">METAL WEIGHT(g)</TableHead>
                                <TableHead className="py-2">METAL COST</TableHead>
                                <TableHead className="py-2 ">CARAT PRICE</TableHead>
                                <TableHead className="py-2 ">CARAT COST</TableHead>
                                <TableHead className="px-0"><p className="text-right">PROD. COST</p></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="pl-0">{quote.metalWeight}</TableCell>
                                <TableCell>{quote.metalCost}</TableCell>
                                <TableCell>{quote.caratPrice}</TableCell>
                                <TableCell>{quote.caratCost}</TableCell>
                                <TableCell className="text-right px-0">{quote.productionCost}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <Separator/>
                          <div className="flex justify-between mb-4 mt-4">
                            <p className="text-gray-700 font-semibold">QUOTE TOTAL</p>
                            <p className="text-sm">{quote.quoteTotalPrice}</p>
                          </div>
                        </div>
                        <div className="flex justify-center space-x-4">
                          <Button onClick={handleQuoteEdit}><Edit/></Button>
                          <Button disabled={order.statusId !== 1} onClick={handleQuoteApproval}>{order.statusId === 1 ? "APPROVE QUOTE" : "QUOTE APPROVED"}</Button>
                          <Button><Send/></Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <p>Awaiting quote...</p>
                        <Button onClick={handleCreateQuote}>CREATE QUOTE</Button>
                      </div>
                    )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                </div>

                <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1" >
                  <AccordionTrigger><div className="flex justify-between w-full pr-3"><div>Shipment Info</div><div>{shipment?<Badge variant={"outline"}>{shipment.isShipping? "Sent For Shipping" : "Awaiting Shipment" }</Badge>: "Not Applicable"}</div></div></AccordionTrigger>
                  <AccordionContent className=" flex justify-between">
                    <div className="space-y-1">
                      {shipment?
                          <>
                            <p className="font-semibold">#{shipment.shipmentId} - <span className="text-sm font-bold text-green-700 underline">Delivered date: {shipment.shipmentDate}</span>
                            </p>
                            <p>Address Line: {shipment.shippingAddress}</p>
                            <p>Province/City: {shipment.shippingProvince}</p>
                            <p>District/Town: {shipment.shippingDistrict}</p>
                          </>
                          :
                          <>
                            Customer will pick product up at store.
                          </>
                        }
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                </div>
                <div className="">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Contact Info</AccordionTrigger>
                      <AccordionContent className="space-y-1">
                        <p className="font-semibold">Customer #{order.customerId}</p>
                        <p>Mr./ Mrs. <span className="font-medium" >{order.firstName} {order.lastName}</span></p>        
                        <p>Email: <a href={`mailto:${order.email}`} className="hover:underline">{order.email}</a></p>
                        <p>Phone: <a href={`tel:${order.phone}`}>{order.phone}</a></p>
                        <p>More Info</p>
                        <Button><User/></Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="mb-4">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                    <AccordionTrigger><div className="flex justify-between w-full pr-3"><div>Transaction Info</div><Badge variant={"outline"}>{order.paymentStatusName}</Badge></div></AccordionTrigger>
                      <AccordionContent className="space-y-1">
                      {transaction.length > 0 ? (
                        transaction.map((t) => (
                          <div key={t.transactionId}>
                            <div className="flex">
                              <p className="italic opacity-70">
                                <span className="font-semibold">TID #{t.transactionId}  - </span>
                                <span className="text-sm font-bold text-green-700 underline"> {t.transactionDate}</span>
                                <span className="font-medium"> - Payment Method "{t.paymentType}"</span>
                                <span className="font-medium"> - {t.transactionTotal}đ</span>
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (<>
                        <p>Pending payment...</p>
                        <Link to={`/dashboard/create-transaction/${order.orderId}`}><Button>Create a Transaction for COD or In Person Payment</Button></Link>
                        </>
                      )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>            
            </Card>
    )
}

const FixedCard = ({order, orderItems, shipment, transaction}) => {
  return (
    <Card className="overflow-hidden border-red-600" x-chunk="dashboard-05-chunk-4">
              <CardHeader>
                <div className="border-b pb-2 mb-4">
                  <h2 className=" font-semibold">Order #{order.orderId}</h2>
                  <p className="text-gray-500">{order.orderDate}</p>
                </div>
                <div className="mb-4 flex flex-col items-center">
                  <h3 className="font-semibold">Order Details</h3>
                  <p className="text-gray-500 text-sm">Hover to view additional information</p>
                </div>
                <div className="flex justify-between pt-4 items-center">
                  <p className="text-gray-700 text-sm font-semibold">Type: <Badge variant="secondary">{order.isCustom ? "Custom": "Sale"}</Badge></p>
                  <p className="text-gray-700 text-sm font-semibold">Status: <Badge>{order.statusDetail}</Badge></p>
                </div>
              </CardHeader>
              <CardContent>
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="text-left border-b">
                      <TableHead className="pl-0 w-20">ITEM</TableHead>
                      <TableHead className="py-2 w-8">VARIANT</TableHead>
                      <TableHead className="py-2">U.PRICE</TableHead>
                      <TableHead className="py-2">QTY.</TableHead>
                      <TableHead className="px-0"><p className="text-right">SUBTOTAL</p></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>

                  {orderItems.length !== 0 ? orderItems.map(item => (
                    <TableRow className="border-b " key={item.orderFixedItemId}>
                      <TableCell className="px-0 flex flex-col items-center">
                        <p className=" text-left">{item.productName}</p>
                        <p className="text-xs text-left">ID: {item.productId}</p>
                      </TableCell>
                      <TableCell className="py-2"><div className="w-full flex justify-center"><Info/></div></TableCell>
                      <TableCell className="py-2">{item.unitPrice}</TableCell>
                      <TableCell className="py-2">x {item.quantity}</TableCell>
                      <TableCell className="text-right px-0">{item.subtotal}</TableCell>
                    </TableRow>
                    )): <TableRow><TableCell colSpan="5">Nothing here yet</TableCell></TableRow> }
                    
                  </TableBody>
                </Table>
                <Separator className="mb-4"/>
                {shipment ?
                <div className="flex justify-between mb-4">
                  <p className="text-gray-700 font-semibold">Shipment Fee</p>
                  <p className="text-sm">{shipment?.shippingFee}</p>
                </div>
                : ""
                }
                <div className="flex justify-between mb-4">
                  <p className="text-gray-700 font-semibold">TOTAL</p>
                  <p className="text-gray-700 font-semibold">{order.orderTotal}</p>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  *Currency is VND
                </div>
                <Separator className="mb-2"/>

                <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger><div className="flex justify-between w-full pr-3"><div>Shipment Info</div><div>{shipment?<Badge variant={"outline"}>{shipment.isShipping? "Sent For Shipping" : "Awaiting Shipment" }</Badge>: "Not Applicable"}</div></div></AccordionTrigger>
                    <AccordionContent className=" flex justify-between">
                      <div className="space-y-1">
                      {shipment?
                        <>
                          <p className="font-semibold">#{shipment.shipmentId} - <span className="text-sm font-bold text-green-700 underline">Delivered date: {shipment.shipmentDate}</span>
                          </p>
                          <p>Address Line: {shipment.shippingAddress}</p>
                          <p>Province/City: {shipment.shippingProvince}</p>
                          <p>District/Town: {shipment.shippingDistrict}</p>
                        </>
                        :
                        <>
                          Customer will pick product up at store.
                        </>
                      }
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                </div>
                <div className="">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Contact Info</AccordionTrigger>
                      <AccordionContent className="space-y-1">
                        <p className="font-semibold">Customer #{order.customerId}</p>
                        <p>Mr./ Mrs. <span className="font-medium" >{order.firstName} {order.lastName}</span></p>        
                        <p>Email: <a href={`mailto:${order.email}`} className="hover:underline">{order.email}</a></p>
                        <p>Phone: <a href={`tel:${order.phone}`}>{order.phone}</a></p>
                        <p>More Info</p>
                        <Button><User/></Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="mb-4">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                    <AccordionTrigger><div className="flex justify-between w-full pr-3"><div>Transaction Info</div><div><Badge variant={"outline"}>{order.paymentStatusName}</Badge></div></div></AccordionTrigger>
                      <AccordionContent className="space-y-1">
                        {transaction.length > 0 ? (
                          transaction.map((t) => (
                            <div key={t.transactionId}>
                              <div className="flex">
                                <p className="italic opacity-70">
                                  <span className="font-semibold">TID #{t.transactionId}  - </span>
                                  <span className="text-sm font-bold text-green-700 underline"> {t.transactionDate}</span>
                                  <span className="font-medium"> - Payment Method "{t.paymentType}"</span>
                                  <span className="font-medium"> - {t.transactionTotal}đ</span>
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (<>
                          <p>Pending payment...</p>
                          <Link to={`/dashboard/create-transaction/${order.orderId}`}><Button>Create a Transaction for COD or In Person Payment</Button></Link>
                          </>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>            
            </Card>
  )
}

