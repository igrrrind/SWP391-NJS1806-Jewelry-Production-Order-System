import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePostTransaction } from '@/hooks/transactionHooks';
import { usePutOrder } from '@/hooks/orderHooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowRightFromLine } from 'lucide-react';

const DepositSuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const { updatedTransaction, updatedOrder } = location.state || {};

    useEffect(() => {
        if (updatedOrder.status === 3) {
            return (
                <>You already confirmed the transaction for this order</>
            )
        }
    }, [updatedOrder]);

    const { postTransaction, response: transactionResponse, error: transactionError } = usePostTransaction();
    const { updateOrder, response: orderResponse, error: orderError } = usePutOrder();

    useEffect(() => {
        if (updatedTransaction && updatedOrder) {
            postTransaction(updatedTransaction);
        }
    }, [updatedTransaction, postTransaction, updatedOrder]);

    useEffect(() => {
        if (transactionResponse) {
            updateOrder(updatedOrder);
        }
    }, [transactionResponse, updateOrder, updatedOrder]);

    useEffect(() => {
        if (transactionError || orderError) {
            toast.error(`Error: ${transactionError?.message || orderError?.message}`);
            navigate(`/customize/deposit-failed?errMsg=${transactionError?.message || orderError?.message}`);
        }
    }, [orderResponse, transactionError, orderError, navigate, updatedOrder]);

    return (
        <div className="p-8 mx-auto text-center">
            <h1 className="cormorant-garamond-bold text-2xl mb-4">Deposit Successful</h1>
            <div className="mb-4">
                <p className='text-sm'>Our Design Staff will contact you shortly to ask about your design querries.</p>                
            </div>

            <div className="mb-4">
            <Dialog>
                <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center mx-auto">Next Step &nbsp; <ArrowRightFromLine/></Button>

                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Congrats! Now sit back and relax.</DialogTitle>
                    <DialogDescription>
                       Design and production will take a while. Be sure to keep in touch with us on out fanpage.
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
