// Import necessary functions from Firebase
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Adjust the path according to your file structure

// Function to get the download URL
export const getImageUrl = async ({ path }) => {
  const imageRef = ref(storage, path);
  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error getting download URL", error);
    return null;
  }
};

 