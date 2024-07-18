import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const ImageSlider = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(()=>{
    console.log(thumbsSwiper)
  },[thumbsSwiper])

  const goToSlideByUrl = () => {
    const index = images.indexOf(slideUrl);
    if (index !== -1 && mainSwiper) {
      mainSwiper.slideTo(index);
    } else {
      alert('Slide not found');
    }
  };

  return (
    <> {images &&
    <div>
        <Swiper style={{'--swiper-navigation-color': '#','--swiper-pagination-color': '#'}} 
            spaceBetween={10} 
            navigation={true} 
            thumbs={{  swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }} 
            className="mySwiper2"
            modules={[Thumbs, Navigation]}

        >

            {images.map((url) => (
            <SwiperSlide key={url}>
                <img src={url} alt="gallery" />
            </SwiperSlide>
            ))}
        </Swiper>

        <Swiper 
            onSwiper={setThumbsSwiper} 
            spaceBetween={10} 
            slidesPerView={4} 
            freeMode={true} 
            watchSlidesProgress
            className="mt-4"
            modules={[Thumbs, FreeMode]}
        >

            {images.map((url) => (
            <SwiperSlide key={url}>
                <img src={url} alt="gallery" />
            </SwiperSlide>
            ))}
        </Swiper>
    </div>
    }
    </>
  );
};

export default ImageSlider;
