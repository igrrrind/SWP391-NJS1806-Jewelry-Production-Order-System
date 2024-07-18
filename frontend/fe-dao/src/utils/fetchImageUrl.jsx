import { storage } from "@/services/Firebase";
import { getDownloadURL, ref } from "firebase/storage";


export async function fetchImageUrl (path) {
    const extensions = ['png', 'jpg', 'jpeg', 'webp']; // List of possible extensions
  
    let found = false;

    for (const ext of extensions) {
        if (found) break;
        const imageRef = ref(storage, `${path}.${ext}`);
        try {
            const url = await getDownloadURL(imageRef);
            return url
        } catch (error) {
            console.error("Error getting download URL", error);
            return ""
        }
    }
    
    if (!found) {
        console.error("No valid image found for the given base path.");
        return ''
    }
}