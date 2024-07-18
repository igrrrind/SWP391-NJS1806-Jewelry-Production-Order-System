import React, { useEffect, useState } from 'react';
import ProductGallery from "./ProductGallery";
import DetailsComboBox from "./DetailsComboBox";
import { useParams } from 'react-router-dom';
import { useProductById } from '@/hooks/productsHooks';
import { useProductStocksById } from '@/hooks/productStockHooks';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { fetchImageUrl } from '@/utils/fetchImageUrl';
import { storage } from '@/services/Firebase';
import BreadCrumbNav from '@/components/custom/breadcrumbNav';

const ProductDetailsPage = () => {
    const { productId } = useParams();

    const { product, loading: productLoading } = useProductById(productId);
    const { productStocks, loading: productStocksLoading } = useProductStocksById(productId);

    const isLoading = productLoading || productStocksLoading;

    const [galleryImages, setGalleryImages] = useState([]);

    useEffect(() => {
      const fetchGalleryImages = async () => {
        const galleryFolderRef = ref(storage,`products/gallery/p${productId}`);
        const imageRefs = await listAll(galleryFolderRef);
        const imageUrls = await Promise.all(imageRefs.items.map((imageRef) => getDownloadURL(imageRef)));
        const thumbnailUrl = await fetchImageUrl(`products/thumbnails/${productId}`)

        setGalleryImages([thumbnailUrl,...imageUrls]);
      };

      fetchGalleryImages()
    },[productId])



    return (
      <div className="container mx-auto px-20 mt-10">
        <BreadCrumbNav/>
        {isLoading ? (
          <div></div>
        ) : (
          <div className="flex flex-col md:flex-row">
            <div className="md:w-5/12">
              <ProductGallery productId={productId} gallery={galleryImages}/>
            </div>

            <div className="md:w-7/12 md:pl-10 ">
              <DetailsComboBox product={product} productStockEntries={productStocks}/>
            </div>
          </div>
        )}
      </div>
    );
  }

export default ProductDetailsPage; 




/* <div className="container">
                <FirebaseImage path="products/thumbnails/bracelet.png" alt="bracelet"></FirebaseImage>
                <div className="product-details"></div>                       
            </div> */