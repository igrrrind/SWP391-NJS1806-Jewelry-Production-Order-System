import { useState, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { storage } from '@/services/Firebase';
import { ImageUpIcon, TrashIcon } from 'lucide-react'; 

const ImageUploadComponent = ({ refresh, mainDirectory, subfolder, onUpload}) => {
  const [images, setImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const fileInputRef = useRef(null); // Ref for file input element

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);

    // Generate preview URLs for the selected images
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls(previewUrls);
  };

  const handleUpload = async () => {
    const uploadPromises = images.map(async (image) => {
      const storageRef = ref(storage, `${mainDirectory}/${subfolder}/${image.name}`);
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      return { url: downloadURL, name: image.name };
    });

    const uploadedImages = await Promise.all(uploadPromises);
    console.log('Uploaded images:', uploadedImages);
    setImagePreviewUrls([]); 
    setImages([]);
    alert('Images uploaded successfully!');
    if (onUpload) {
      onUpload();
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    const updatedPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index);
    setImagePreviewUrls(updatedPreviewUrls);

    // Create a new DataTransfer object
    const dataTransfer = new DataTransfer();
    updatedImages.forEach((file) => dataTransfer.items.add(file));

    // Update the file input with the remaining files
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  return (
    <div className="upload-container">
      {/* Image Upload Box */}
      <div className="flex justify-center mb-4">
        <div className="relative border border-gray-300 rounded-lg h-40 w-80 flex overflow-x-scroll">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="opacity-0 absolute inset-0 z-10 cursor-pointer"
          />
          <div className="text-gray-500 m-auto flex items-center">
            <ImageUpIcon className="h-8 w-12"/>
            Click or drag to upload.
          </div>
        </div>
      </div>

      {/* Image Display Panel */}
      <div className="flex space-x-5 px-40 overflow-x-auto whitespace-nowrap">
        {imagePreviewUrls.map((url, index) => (
          <div key={index} className="relative border border-gray-300 rounded-lg overflow-hidden flex-shrink-0 w-1/4">
            <img src={url} alt={`Image Preview ${index + 1}`} className="object-cover h-40 w-full" />
            <button
              className="absolute top-0 right-0 m-2 p-1 bg-gray-800 text-white rounded-full hover:bg-gray-600"
              onClick={() => handleDeleteImage(index)}
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <div className="flex justify-center mt-4">
        <Button onClick={handleUpload} variant="default">
          Upload Images
        </Button>
      </div>
    </div>
  );
};

export default ImageUploadComponent;
