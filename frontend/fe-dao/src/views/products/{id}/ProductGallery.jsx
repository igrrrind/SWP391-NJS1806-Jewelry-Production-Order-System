import FirebaseImage from "@/components/custom/fire-base-image"

const ProductGallery = () => {
    return (
        <>
            <div className="mb-4 h-[40rem] overflow-hidden relative">
              <FirebaseImage path="products/thumbnails/bracelet.png" alt="bracelet"></FirebaseImage>
            </div>
            <div className="flex space-x-2">
              <img src="path_to_thumbnail1" alt="Thumbnail 1" className="w-20 h-20 rounded-lg" />
              <img src="path_to_thumbnail2" alt="Thumbnail 2" className="w-20 h-20 rounded-lg" />
              <img src="path_to_thumbnail3" alt="Thumbnail 3" className="w-20 h-20 rounded-lg" />
            </div>
        </>
    )
}

export default ProductGallery