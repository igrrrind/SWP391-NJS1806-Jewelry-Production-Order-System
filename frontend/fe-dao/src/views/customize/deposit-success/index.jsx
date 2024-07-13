import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePostTransaction } from '@/hooks/transactionHooks';
import { usePutOrder } from '@/hooks/orderHooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRightFromLine } from 'lucide-react';
import { useAllOrderItems } from '@/hooks/orderItemHooks';
import { usePostDesign } from '@/hooks/designHooks';

const DepositSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updatedTransaction, updatedOrder } = location.state || {};
  const { orderItems } = useAllOrderItems(updatedOrder);
  const { postDesign, error: designError } = usePostDesign();
  const { postTransaction, response: transactionResponse, error: transactionError } = usePostTransaction();
  const { updateOrder, response: orderResponse, error: orderError } = usePutOrder();

  const [transactionPosted, setTransactionPosted] = useState(false);

  useEffect(() => {
    if (updatedOrder?.status === 3) {
      return;
    }

    if (updatedTransaction && !transactionPosted) {
      postTransaction(updatedTransaction);
      setTransactionPosted(true);
    }
  }, [updatedTransaction, updatedOrder, transactionPosted]);

  useEffect(() => {
    if (transactionResponse) {
      updateOrder(updatedOrder);
    }
  }, [transactionResponse, updatedOrder]);

  useEffect(() => {
    if (orderResponse) {
      orderItems.forEach(item => {
        const design = {
          "orderCustomId": item.orderItemId,
          "orderId": item.orderId,
          "description": "Describe the idea behind your design. Give the customer additional insight.",
          "isCompleted": false
        };
        postDesign(design);
      });
    }
  }, [orderResponse, orderItems]);

  useEffect(() => {
    if (transactionError || orderError) {
      toast.error(`Error: ${transactionError?.message || orderError?.message}`);
      navigate(`/customize/deposit-failed?errMsg=${transactionError?.message || orderError?.message}`);
    }
  }, [transactionError, orderError, navigate]);

  return (
    <div className="p-8 mx-auto text-center">
      <h1 className="cormorant-garamond-bold text-2xl mb-4">Deposit Successful</h1>
      <div className="mb-4">
        <p className='text-sm'>Our Design Staff will contact you shortly to ask about your design queries.</p>
      </div>

      <div className="mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center mx-auto">Next Step &nbsp; <ArrowRightFromLine /></Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Congrats! Now sit back and relax.</DialogTitle>
              <DialogDescription>
                Design and production will take a while. Be sure to keep in touch with us on our fanpage.
              </DialogDescription>
            </DialogHeader>
            <div className="grid items-center gap-4">
              <h1>What you can do:</h1>
              <p>Check your Design Tab! It will update with any new design changes. Confirm your design once you're happy with it.</p>
            </div>
            <DialogFooter>
              <Link to="/account/orders"><Button type="submit">I understand!</Button></Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DepositSuccessPage;
