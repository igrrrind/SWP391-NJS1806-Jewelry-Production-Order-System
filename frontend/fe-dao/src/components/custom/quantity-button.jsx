import React, { useEffect, useState } from 'react';

const QuantityButton = ({stock,disabled, onValueChange, chosenQuantity, allowDelete, onDelete}) => {
  const [quantity, setQuantity] = useState(1);

  // Use useEffect to update the quantity if chosenQuantity changes
  useEffect(() => {
    if (quantity !== undefined) {
      console.log(chosenQuantity)
      setQuantity(chosenQuantity);
    }
  }, []);


  useEffect(() => {
    onValueChange(quantity)
  }, [quantity, onValueChange]);
 

  const handleIncrease = () => {
    console.log(stock)
    setQuantity(prevQuantity => Math.min(prevQuantity + 1, stock));

  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    if (quantity == 1 && allowDelete) {
      onDelete(); // Call the onDelete callback
    }
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
