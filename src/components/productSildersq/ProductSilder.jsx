"use client";
import style from "./style.module.css";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { FreeMode, Thumbs } from "swiper/modules";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
export default function ProductSilder({
  productImage1,
  productImage2,
  productImage3,
  productImage4,
  productImage5,
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className={style.div}>
      <Swiper
           style={{
            '--swiper-navigation-color': '#080707',
            '--swiper-pagination-color': '#000000',
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
      >
        <SwiperSlide className={style.SwiperSlide}>
          <img src={productImage1} alt="" />
        </SwiperSlide>
        <SwiperSlide className={style.SwiperSlide}>
        {productImage1?<img src={productImage1} alt="" />:"" }
        </SwiperSlide>
        <SwiperSlide className={style.SwiperSlide}>
        {productImage2?<img src={productImage2} alt="" />:""

}
        </SwiperSlide>
        <SwiperSlide className={style.SwiperSlide}>
        {productImage3?<img src={productImage3} alt="" />:""

}
        </SwiperSlide>
        <SwiperSlide className={style.SwiperSlide}>
        {productImage4?<img src={productImage4} alt="" />:""}
        </SwiperSlide>
        <SwiperSlide className={style.SwiperSlide}>
        {productImage5?<img src={productImage5} alt="" />:""}
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={style.mySwiper2}
      >
      
        <SwiperSlide className={style.SwiperSlide2}>
        {productImage1?<img src={productImage1} alt="" />:"" }

        </SwiperSlide>{" "}
        <SwiperSlide className={style.SwiperSlide2}>
          {productImage2?<img src={productImage2} alt="" />:""

          }
        </SwiperSlide>{" "}
        <SwiperSlide className={style.SwiperSlide2}>
        {productImage3?<img src={productImage3} alt="" />:""

}
          
        </SwiperSlide>
        <SwiperSlide className={style.SwiperSlide2}>
        {productImage4?<img src={productImage4} alt="" />:""}
    
        </SwiperSlide>
        <SwiperSlide className={style.SwiperSlide2}>
          {productImage5?<img src={productImage5} alt="" />:""}
     
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
