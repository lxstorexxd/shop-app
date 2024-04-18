"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Scrollbar, EffectFade } from "swiper/modules";
import { ImageUrl } from "@/types";
import "./style.css";

const ProductCardSlider = ({
  autoplayDelay = 5000,
  images,
}: {
  autoplayDelay: number;
  images?: ImageUrl[];
}) => {
  return (
    <Swiper
      className="swiper-container"
      scrollbar={{ draggable: true, el: ".swiper-scrollbar", hide: false }}
      modules={[Scrollbar, Autoplay, EffectFade]}
      effect="fade"
      autoplay={{
        delay: autoplayDelay,
        disableOnInteraction: true,
      }}
      loop={images && images.length > 1}
    >
      <div className="swiper-wrapper">
        {images && images.length > 0 ? (
          images?.map((data, idx) => (
            <SwiperSlide key={idx}>
              <div className="w-full h-full blur-sm">
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
      </div>
      <div className="swiper-scrollbar"></div>
    </Swiper>
  );
};

export default ProductCardSlider;
