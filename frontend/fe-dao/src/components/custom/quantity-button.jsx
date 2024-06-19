import React, { useEffect, useState } from 'react';

const QuantityButton = ({stock,disabled, onValueChange, chosenQuantity}) => {
  const [quantity, setQuantity] = useState(1);

  // Use useEffect to update the quantity if chosenQuantity changes
  useEffect(() => {
    if (chosenQuantity !== undefined) {
      console.log(chosenQuantity)
      setQuantity(chosenQuantity);
    }
  }, [chosenQuantity]);
 

  const handleIncrease = () => {
    console.log(stock)
    if (quantity < stock) {
      setQuantity(quantity + 1);
      if (onValueChange !== undefined) onValueChange(quantity)
    } 
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      if (onValueChange !== undefined) onValueChange(quantity)    } 
  };

  useEffect(() => {
    if (quantity >= stock ){
      setQuantity(stock)
    }
  }, [stock]);

  return (

      <div className="flex items-center ">
        <button
          className="px-3 py-2 h-full text-black border  border-stone-600 bg-white-700  hover:bg-gray-200"
          onClick={handleDecrease}
          disabled={disabled}
        >
          &ndash;
        </button>
        <button className="px-4 py-2 h-full text-black border  border-stone-600 bg-white-700" disabled>
          {quantity}
        </button>
        <button
          className="px-3 py-2 h-full text-black border  border-stone-600 bg-white-700  hover:bg-gray-200"
          onClick={handleIncrease}
          disabled={disabled}
        >
          +
        </button>
      </div>
  );
};

export default QuantityButton;
