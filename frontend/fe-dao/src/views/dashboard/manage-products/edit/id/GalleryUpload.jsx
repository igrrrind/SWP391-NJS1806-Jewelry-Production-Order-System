import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ImageUploadComponent from "@/components/custom/images-upload";
import { Label } from "@/components/ui/label";

import FirebaseImage from "@/components/custom/fire-base-image";
import { storage } from "@/services/Firebase";
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

import { LucideTrash2 } from "lucide-react";
import { useEffect, useState } from "react";



const  GalleryUpload = ({id, handleRefresh}) => {

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Gallery Images</CardTitle>
        <CardDescription>
          Choose and select relevant images.
        </CardDescription>
      </CardHeader>
      <CardContent>
         <div>
            <ImageUploadComponent mainDirectory="products/gallery" subfolder={id} onUpload={handleRefresh} />
         </div>
         <div>
            <Label>Uploaded Images</Label>
            <UploadedGallery id={id} />
        </div>


    
      </CardContent>
      
    </Card>
  );
};

export default GalleryUpload;



const UploadedGallery = ({id}) => {

    const [ imageUrls, setImageUrls] = useState([])


    useEffect(() => {
        const storageRef = ref(storage, `products/gallery/${id}`);

        const fetchImages = async () => {
          try {
            const result = await listAll(storageRef);
            //console.log(result.items)
            if (result.items){
                const urlsArray = await Promise.all(result.items.map((imageRef) => getDownloadURL(imageRef)));
                //console.log(urlsArray)
                setImageUrls(urlsArray);
            }
          } catch (error) {
            console.error("Error fetching images: ", error);
          }
        };
    
        fetchImages();
    }, []);

    const handleDeleteImage = async (url) => {
        try {
          const imageRef = ref(storage, url);
          await deleteObject(imageRef);
          setImageUrls(prevImageUrls => prevImageUrls.filter(imageUrl => imageUrl !== url));
        } catch (error) {
          console.error("Error deleting image: ", error);
        }
      };
    



    return (
        <div className="border p-4 rounded-md text-center text-gray-500">
            <div className="flex overflow-x-auto whitespace-nowrap space-x-4 p-4">
            {imageUrls.length > 0 ?    
               (imageUrls.map((url, index) => (
                <div className="flex-col items-center w-1/5 flex-shrink-0 space-y-4" key={index}>
                    <div className="flex justify-center items-center h-48 overflow-hidden "><img src={url} alt={customId} className="object-cover"/></div>
                    <Button className="bg-red-600" onClick={() => handleDeleteImage(url)}><LucideTrash2/></Button>
                </div>
                )))
            : <div>No images have been uploaded yet</div>
            
            
            }
            </div>
        </div>
    )
}


