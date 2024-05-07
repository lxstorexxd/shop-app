"use client";
import { Suspense } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Heading from "@/components/heading";
import Loading from "@/components/Loading";
import ProductCatalog from "./ProductCatalog";

const ProductsPage = () => {
  return (
    <>
      <NavBar />
      <section className="relative px-4 min-h-screen">
        <Heading title="Продукция" descriptions="Каталог товаров" />

        <Suspense fallback={<Loading />}>
          <ProductCatalog />
        </Suspense>
      </section>
      <Footer />
    </>
  );
};

export default ProductsPage;
