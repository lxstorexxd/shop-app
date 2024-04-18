"use client";
import { Suspense, useContext, useEffect, useState } from "react";

import NavBar from "@/components/NavBar";
import Rating from "@/components/Rating";
import Heading from "@/components/heading";
import Comments from "@/components/Comments";
import ProductPageSlider from "@/components/SwiperSliders/ProductPageSlider";
import { Button, Chip, Divider, Skeleton } from "@nextui-org/react";

import type { ProductProps } from "@/types";
import { getProduct } from "./action/getProduct";
import { CartContext } from "@/components/CartContext";
import Footer from "@/components/Footer";

export default function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductProps | null>();
  const [error, setError] = useState<{ status: boolean; message: string }>({
    status: true,
    message: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const fetchedProduct = await getProduct({
        handle: params.handle,
      });
      setLoading(false);
      if (!fetchedProduct) {
        setError({ status: false, message: "Product not found" });
        return;
      }
      setProduct(fetchedProduct);
    };
    fetchProduct();
  }, []);

  return (
    <>
      <NavBar />
      <section className="px-4 py-8">
        {loading && (
          <div className="relative max-w-xl lg:max-w-4xl flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mx-auto">
            <div>
              <Skeleton className="w-full aspect-square rounded-lg" />
              <div className="mt-4 flex gap-4">
                <Skeleton className="w-24 h-24 rounded-lg" />
                <Skeleton className="w-24 h-24 rounded-lg" />
                <Skeleton className="w-24 h-24 rounded-lg" />
              </div>
            </div>
            <div className="flex flex-col">
              <Skeleton className="w-full h-8 rounded-lg" />
              <div className="my-2 flex items-center gap-2">
                <Skeleton className="w-2/5 h-8 rounded-lg" />
              </div>
              <Skeleton className="w-1/4 h-8 rounded-lg" />
              <div className="mt-4">
                <Skeleton className="w-full h-24 rounded-lg" />
              </div>
              <div className="mt-6 flex flex-col gap-1">
                <Skeleton className="w-1/2 h-10 rounded-lg" />
              </div>
            </div>
          </div>
        )}
        {product && (
          <>
            <div className="relative max-w-xl lg:max-w-4xl flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mx-auto">
              <div>
                <Chip
                  variant="faded"
                  className="absolute left-3 top-3 z-20 py-4 bg-background/60 text-foreground/90 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
                >
                  Популярный
                </Chip>
                <ProductPageSlider images={product.imageUrl} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold tracking-tight">
                  {product.title}
                </h1>
                <div className="my-2 flex items-center gap-2">
                  <Rating
                    value={product.rating}
                    isDisable={true}
                    label={`${product.comments.length} Оценок`}
                  />
                </div>
                <p className="text-2xl font-semibold tracking-tight">
                  {product.price} ₽
                </p>
                <div className="mt-4">
                  <p
                    className="line-clamp-6 text-medium text-default-500"
                    title={product.description ?? ""}
                  >
                    {product.description}
                  </p>
                </div>
                <div>{/* Select ingredients */}</div>
                <div className="mt-6 flex flex-col gap-1">
                  <div className="mb-4 flex items-center gap-2 text-default-700">
                    <p className="text-small font-medium">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>

                  <div>{/* Select ingredients */}</div>

                  <Button
                    color="primary"
                    isDisabled={product.quantity < 1}
                    onPress={() => addToCart(product)}
                  >
                    Добавить в корзину
                  </Button>
                </div>
              </div>
            </div>
            <Divider className="max-w-4xl my-8 mx-auto" />
            <Comments value={product} />
          </>
        )}
        {!error?.status && (
          <div className="flex flex-col items-center">
            <Heading
              title="Продукт не обнаружен"
              descriptions="Попробуйте обновить страницу, или подобрать что-то другое в нашем меню."
            />
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
