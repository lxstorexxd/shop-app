import { Button, Skeleton } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay } from "swiper/modules";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { getPopularProducts } from "@/action/get-popular-products";
import Icon from "@/lib/IconSprite";
import Rating from "@/components/Rating";

const PopularList = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchPopularProducts() {
      setLoading(true);
      const popularProducts = await getPopularProducts();
      setProducts(popularProducts);
      setLoading(false);
    }

    fetchPopularProducts();
  }, []);

  return (
    <div className="flex w-full max-w-7xl flex-col items-start gap-2 mx-auto">
      <div className="flex w-full max-w-full snap-x justify-start gap-0 px-6 py-5">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            880: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
          }}
          autoplay={{ delay: 10000 }}
          style={{
            maskImage:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 4%, rgba(0,0,0,1) 96%, rgba(0,0,0,0) 100%)",
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
                  <div className="flex flex-col gap-4 px-1">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-medium font-medium text-default-700 line-clamp-1 text-balance flex-1 text-left">
                          {product.title}
                        </h3>
                        <p className="text-medium font-semibold text-default-500">
                          {product.price} ₽
                        </p>
                      </div>
                      <div className="flex justify-start">
                        <Rating
                          value={product.rating}
                          isDisable
                          isCompact
                          label={`(${product.comments?.length})`}
                        />
                      </div>
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
      </div>
    </div>
  );
};

export default PopularList;
