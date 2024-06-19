import { Separator } from "@/components/ui/separator";
import { useCallback, useState } from "react";

const sizeLabels = {
  ring: "Size",
  necklace: "Chain Length (cm)",
  charm: "Diameter",
  bracelet: "Diameter",
  earring: "",
};

const SizeLabel = ({ productType }) => {
  let label = sizeLabels[productType] || "No label";

  return (
    <label htmlFor="size" className="block text-lg font-medium mb-2">
      {label}
    </label>
  );
};

const DetailProductBuy = ({ product, productStockEntries }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [selectedGemstone, setSelectedGemstone] = useState(null);

  const handleSelectSize = useCallback((size) => {
    setSelectedSize(size);
  }, []);

  const boxStyle = useCallback(
    (option) => {
      if (selectedSize === option) {
        return 'w-12 h-12 flex items-center justify-center border-2 border-white-900 rounded-lg text-white bg-stone-700 cursor-pointer';
      }
      return 'w-12 h-12 flex items-center justify-center border rounded-lg text-gray-800 bg-white cursor-pointer hover:bg-gray-100';
    },
    [selectedSize]
  );

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  // Extract unique sizes
  const uniqueSizes = [...new Set(productStockEntries.map(entry => entry.size))];

  return (
    <>
            <h1 className="text-3xl font-bold mb-2 cormorant-garamond-medium">{product.productName}</h1>
            <p className="text-xl mb-2 text-stone-500">1,000,000 VND</p>
            {/*<p className="text-yellow-500 mb-4">★★★★★ 28 đánh giá</p>*/}

            <Separator className="mb-6 mt-6" />

            <div className="mb-6">
              <label htmlFor="description" className="block text-lg font-medium mb-2">Description</label>
              <div className="text-gray-700">
                {product.productDescription}
              </div>
            </div>

            <div className="mb-4">
              <SizeLabel productType={product.productTypeName} />

              <div className="flex space-x-2">
                {uniqueSizes.map((size) => (
                  <button key={size} onClick={() => handleSelectSize(size)}>
                    <label className={boxStyle(size)}>
                      {size}
                    </label>
                  </button>
                ))}
              </div>
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
          </>

    )
    

}

export default DetailProductBuy

/*NOTES
Render:

SIZE
- Chain length if necklace (cm)
- Diameter if bracelet
- Ring Size (mm) if ring
- dont render if earing or charm

GEMSTONE
- RENDER BASED ON COLOR 


*/

