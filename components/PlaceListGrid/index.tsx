import React, { useContext } from "react";
import Link from "next/link";
import ProductCardSlider from "../SwiperSliders/ProductCardSlider";
import { CartContext } from "@/components/CartContext";

import { Button, Skeleton, Tooltip } from "@nextui-org/react";
import Icon from "@/lib/IconSprite";
import FormatPrice from "@/utils/FormatPrice";
import type { ProductProps } from "@/types";

const SkeletonCart = () => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="w-full max-w-sm rounded-lg overflow-hidden shadow-md bg-white p-4 lg:p-5"
          >
            <Skeleton className="w-full aspect-square rounded-lg"></Skeleton>
            <div className="space-y-2 my-4">
              <Skeleton className="w-11/12 h-4 rounded-lg"></Skeleton>
              <Skeleton className="w-1/2 h-4 rounded-lg"></Skeleton>
            </div>
            <div>
              <Skeleton className="w-1/3 h-4 bg-gray-400 rounded-full"></Skeleton>
            </div>
          </div>
        ))}
    </>
  );
};

const PlaceListGrid = ({
  value,
  isLoading,
}: {
  value: ProductProps[];
  isLoading: boolean;
}) => {
  const { addToCart } = useContext(CartContext);

  return (
    <>
      {!isLoading && !value.length && (
        <div className="w-full flex flex-col gap-4 justify-center items-center py-8">
          <span className="text-xl">Товары по данному запросу не найдены</span>
        </div>
      )}
      <div className="max-w-7xl grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mx-auto">
        {isLoading && <SkeletonCart />}
        {!isLoading &&
          value.map((data) => (
            <Link
              key={data.id}
              className="relative flex w-full flex-none flex-col gap-3 hover:scale-[1.005]"
              href={`/products/${data.handle}`}
            >
              <Tooltip content="В избранное">
                <Button
                  size="sm"
                  isIconOnly
                  radius="full"
                  className="absolute right-3 top-3 z-20 bg-background/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
                >
                  <Icon name="heart" size={18} className="fill-white" />
                </Button>
              </Tooltip>

              <div className="relative w-full aspect-square overflow-hidden rounded-md">
                <ProductCardSlider
                  autoplayDelay={5000}
                  images={data.imageUrl}
                />
              </div>
              <div className="mt-1 flex flex-col gap-2 px-2 pb-2">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="text-large font-medium text-default-700">
                    {data.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Icon name="star" size={24} className="fill-yellow-400" />
                    <span className="text-large text-default-500">
                      {data.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <p className="text-large font-medium text-default-500">
                  {FormatPrice(data.price)} ₽
                </p>
                <Button
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(data);
                  }}
                >
                  В корзину
                </Button>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export { PlaceListGrid };
