"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ContextProvider } from "@/components/CartContext";

export async function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ContextProvider>{children}</ContextProvider>
    </NextUIProvider>
  );
}
