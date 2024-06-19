import FirebaseImage from "@/components/custom/fire-base-image"
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from 'react';
import ProductGallery from "./ProductGallery";
import DetailProductBuy from "./DetailSelectionBox";
import RingConfigurator from "./DetailsComboBox";
import DetailsComboBox from "./DetailsComboBox";


const productStockEntries = [
  {   
      productStockId: 1,
      productId: 1,
      gemstoneName: 'Ruby',
      metalName: 'Gold',
      size: 6,
      stockQuantity: 10,
      price: 199.99
  },
  {
      productStockId: 2,
      productId: 1,
      gemstoneName: 'Sapphire',
      metalName: 'Gold',
      size: 7,
      stockQuantity: 5,
      price: 209.99
  },
  {
      productStockId: 3,
      productId: 1,
      gemstoneName: 'Ruby',
      metalName: 'Silver',
      size: 8,
      stockQuantity: 20,
      price: 299.99
  },
  {
      productStockId: 4,
      productId: 1,
      gemstoneName: 'Emerald',
      metalName: 'Platinum',
      size: 9,
      stockQuantity: 15,
      price: 399.99
  },
  {
      productStockId: 5,
      productId: 1,
      gemstoneName: 'Sapphire',
      metalName: 'Platinum',
      size: 10,
      stockQuantity: 8,
      price: 149.99
  }
];

const product = 
{ productId: 2,
   productTypeId: 2, 
   productTypeName: "necklace",
   productName: "Golden Butterfly Charm", 
   productDescription: 
   "A beautiful specimen of a jewelry. Crafted from the mountains of Rvier.", 
   isActive: true 
  }
;





const ProductDetailsPage = () => {
    /*
      const sizeOptions = productStockEntries.map(p => p.size);
      const metalOptions = productStockEntries.map(m => m.metal_nameI
      const gemstoneOptions = productStockEntries.map(g => g.gemstoneName);
    */
    

    

    

    return(
        <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row">

          <div className="md:w-1/2">
            <ProductGallery/>
          </div>

          <div className="md:w-1/2 md:pl-10">
              <DetailsComboBox product={product} productStockEntries={productStockEntries} /> 
            
          </div>
            
        </div>
      </div>
    )
}

export default ProductDetailsPage 




/* <div className="container">
                <FirebaseImage path="products/thumbnails/bracelet.png" alt="bracelet"></FirebaseImage>
                <div className="product-details"></div>                       
            </div> */