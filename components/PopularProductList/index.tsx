import { Button } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, EffectFade } from "swiper/modules";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { ProductProps } from "@/types";
import { getPopularProducts } from "@/action/get-popular-products";
import Icon from "@/lib/IconSprite";

const PopularList = () => {
  const [products, setProducts] = useState<ProductProps[]>();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchPopularProducts() {
      const popularProducts = await getPopularProducts();
      setProducts(popularProducts);
    }

    fetchPopularProducts();
  }, []);

  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      spaceBetween={20}
      slidesPerView={4}
      autoplay={{ delay: 10000 }}
      style={{
        maskImage:
          "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 4%, rgba(0,0,0,1) 96%, rgba(0,0,0,0) 100%);",
      }}
    >
      {products &&
        products.map((product, index) => (
          <SwiperSlide key={index} className="!m-0">
            <div className="relative flex w-64 max-w-full flex-none scroll-ml-6 flex-col gap-3 rounded-sm p-4 bg-transparent snap-start">
              <Button
                variant="flat"
                isIconOnly
                size="sm"
                radius="full"
                className="absolute right-6 top-6 z-20"
              >
                <Icon name="star" size={18} className="fill-secondary" />
              </Button>
              <div className="relative flex h-52 max-h-full w-full flex-col items-center justify-center overflow-visible rounded-lg">
                <div className="w-full h-full blur-[1px]">
                  <img
                    src={product.imageUrl?.[0]?.url}
                    className="w-full h-full object-cover"
                  />
                </div>
                <img
                  className="block absolute top-0 left-0 w-full h-full object-contain"
                  src={product.imageUrl?.[0]?.url}
                  alt={product.title}
                />
              </div>
              <div className="flex flex-col gap-3 px-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-medium font-medium text-default-700 line-clamp-1 text-balance flex-1 text-left">
                    {product.title}
                  </h3>
                  <p className="text-medium font-semibold text-default-500">
                    {product.price} ₽
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    color="primary"
                    radius="lg"
                    fullWidth
                    onPress={() => addToCart(product)}
                  >
                    Добавить
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default PopularList;
