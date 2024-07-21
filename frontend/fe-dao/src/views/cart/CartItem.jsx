import FirebaseImage from '@/components/custom/fire-base-image';
import QuantityButton from '@/components/custom/quantity-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { updateQuantity } from '@/redux/slice/cartSlice';
import { formatPrice } from '@/utils/formatPrice';
import { getJewelrySizeLabel } from '@/utils/typeToUnit';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const CartItem = ({ item, onRemove}) => {

  const [itemQuantity, setItemQuantity] = useState(item?.quantity)
  const [showDialog, setShowDialog] = useState(false);


  const dispatch = useDispatch();

  useEffect(()=> {
      dispatch(updateQuantity({productStockId: item.productStockId, quantity: itemQuantity}))
  },[itemQuantity])

  const handleDelete = () => {
    setShowDialog(true);
  };

  const handleConfirmDelete = () => {
    onRemove(item.productStockId);
    setShowDialog(false);
  };

  const handleCancelDelete = () => {
    setShowDialog(false);
  };

  

  

  return (
    <div className="flex justify-between mb-4">

      <div className="flex align-top space-x-6">

        <div className='image-wrapper h-36 aspect-1 overflow-hidden relative '>
                <FirebaseImage path={`products/thumbnails/${item.productId}`} alt="bracelet"></FirebaseImage>
        </div>

        <div className='flex flex-col justify-between'>
            <span className="font-medium block text-lg ">{item.productName}</span>
            <span className="text-gray-600 text-lg italic ml-2 mb-6">{item.metalTypeName} - {item.gemstoneType} - {getJewelrySizeLabel(item.productType,item.size)}</span>
            <div className='flex items-center space-x-4'>
              <QuantityButton 
                chosenQuantity={itemQuantity} 
                stock={item.stockQuantity} 
                onValueChange={setItemQuantity} 
                allowDelete={true}
                onDelete={handleDelete}>            
              </QuantityButton>
              {itemQuantity === item.stockQuantity && <p className='text-red-500 italic text-sm'>Reached stock limit</p>}
            </div>
        </div>

      </div>

      <div className="flex align-top space-x-6">
        <div>
            <span className="text-gray-600 mr-4 text-lg"> {formatPrice(item.price)} VND</span>
        </div>
        
            <button
                    className=" hover:text-stone-800 text-gray-400 border-none px-4 py-2  cursor-pointer "
                    onClick={handleDelete}
            >
            <Trash2 />
            </button>
      </div>

      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this item from your cart?</p>
            <DialogFooter>
              <Button onClick={handleCancelDelete} variant="default">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} variant="destructive">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CartItem;
