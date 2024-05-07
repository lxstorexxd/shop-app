"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Heading from "@/components/heading";
import PopularList from "@/components/PopularProductList";
import PopularComments from "@/components/PopularComments";
import SliderNews from "@/components/SliderNews";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="px-4">
        <section className="py-8">
          <SliderNews />
        </section>
        <section>
          <PopularList />
        </section>
        <section>
          <Heading title="Отзывы товаров" />
          <PopularComments />
        </section>
      </main>
      <Footer />
    </>
  );
}
