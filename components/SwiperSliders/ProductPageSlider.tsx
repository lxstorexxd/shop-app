"use client";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ImageUrl } from "@/types";
import "swiper/css/bundle";
import "./style.css";

const ProductPageSlider = ({ images }: { images?: ImageUrl[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
      <div className="relative h-full w-full flex-none">
        <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-sm">
          <Swiper
            className="swiper-container"
            loop={true}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs]}
          >
            {images && images.length > 0 ? (
              images?.map((data, idx) => (
                <SwiperSlide key={idx}>
                  <div className="w-full h-full blur-[2px]">
                    <img
                      src={data.url}
                      alt="slide"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <img className="swiper-img" src={data.url} alt="slide" />
                </SwiperSlide>
              ))
            ) : (
              <>
                <SwiperSlide>
                  <span className="text-sm">Изображение отсутствует</span>
                </SwiperSlide>
              </>
            )}
          </Swiper>
        </div>
        <div className="mt-4">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-container"
          >
            {images && images.length > 0
              ? images?.map((data, idx) => (
                  <SwiperSlide
                    className="relative !w-24 !h-24 overflow-hidden rounded-lg shadow-sm"
                    key={idx}
                  >
                    <div className="w-full h-full blur-[1px]">
                      <img
                        src={data.url}
                        alt="slide"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <img className="swiper-img" src={data.url} alt="slide" />
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductPageSlider;
