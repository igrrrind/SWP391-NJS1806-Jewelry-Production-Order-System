import FirebaseImage from "@/components/custom/fire-base-image"
import { Separator } from "@/components/ui/separator";
import React, { useState } from 'react';


const ProductDetailsPage = () => {

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleAddToCart = () => {
        console.log(`Added ${quantity} items to cart`);
    };

    const handleBuyNow = () => {
        console.log('Proceed to checkout');
    };

    return(
        <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <div className="mb-4">
              <FirebaseImage path="products/thumbnails/bracelet.png" alt="bracelet"
                className="w-full h-auto rounded-lg">
            </FirebaseImage>
            </div>
            <div className="flex space-x-2">
              <img src="path_to_thumbnail1" alt="Thumbnail 1" className="w-20 h-20 rounded-lg" />
              <img src="path_to_thumbnail2" alt="Thumbnail 2" className="w-20 h-20 rounded-lg" />
              <img src="path_to_thumbnail3" alt="Thumbnail 3" className="w-20 h-20 rounded-lg" />
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <h1 className="text-3xl font-bold mb-2 cormorant-garamond-medium">Golden Butterfly Charm</h1>
            <p className="text-xl mb-2 text-stone-500">1,000,000 VND</p>
            {/*<p className="text-yellow-500 mb-4">★★★★★ 28 đánh giá</p>*/}

            <Separator className="mb-6 mt-6" />

            <div>
                <label htmlFor="description" className="block text-lg font-medium mb-2">Description</label>


            </div>

            <div className="mb-4">
              <label htmlFor="size" className="block text-lg font-medium mb-2">Kích cỡ</label>
              <select id="size" className="w-full border border-gray-300 rounded-lg p-2">
                <option>Size 5</option>
                <option>Size 6</option>
                <option>Size 7</option>
                <option>Size 8</option>
                <option>Size 9</option>
                <option>Size 10</option>
                <option>Size 11 (Pre-order)</option>
                <option>Size 12 (Pre-order)</option>
                <option>Size 13 (Pre-order)</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-lg font-medium mb-2">Số lượng</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                min="1"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900"
              >
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
              >
                Mua ngay
              </button>
            </div>
            <div className="mt-6">
              <details className="mb-4">
                <summary className="text-lg font-medium">Mô tả</summary>
                <p className="mt-2">Chi tiết về sản phẩm...</p>
              </details>
              <details className="mb-4">
                <summary className="text-lg font-medium">Chính sách bảo hành</summary>
                <p className="mt-2">Thông tin về chính sách bảo hành...</p>
              </details>
              <details className="mb-4">
                <summary className="text-lg font-medium">Hướng dẫn bảo quản sản phẩm</summary>
                <p className="mt-2">Hướng dẫn bảo quản...</p>
              </details>
            </div>
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