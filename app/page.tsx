"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <NavBar />
      <section className="px-4">{session?.user.id}</section>
      <Footer />
    </>
  );
}
