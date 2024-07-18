import FirebaseImage from "@/components/custom/fire-base-image"
import ImageSlider from "@/components/custom/images-slider"

const ProductGallery = ({productId, gallery}) => {



    
    return (
        
            <div className="mb-4 h-auto relative">
                <ImageSlider images={gallery}/> 
      
            </div>
           
        
    )
}

export default ProductGallery