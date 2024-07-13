import React, { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/Firebase"; // Adjust the path according to your file structure

const FirebaseImage = ({path,alt}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const extensions = ['png', 'jpg', 'jpeg', 'webp']; // List of possible extensions


  useEffect(() => {
    const fetchAndSetImageUrl = async () => {
      let found = false;

      for (const ext of extensions) {
        if (found) break;
        const imageRef = ref(storage, `${path}.${ext}`);
        try {
          const url = await getDownloadURL(imageRef);
          setImageUrl(url);
          found = true
        } catch (error) {
          console.error("Error getting download URL", error);
        }
      }
      
      if (!found) {
        console.error("No valid image found for the given base path.");
      }
    };
    fetchAndSetImageUrl();
  }, [path]);

  return (
    <>
      {imageUrl ? (
        <img src={imageUrl} alt={alt} className="object-cover" />
      ) : (
        <div className="object-cover w-full h-full"></div>
      )}
    </>
  );
};


export default FirebaseImage;
