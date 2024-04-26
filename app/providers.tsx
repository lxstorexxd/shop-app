"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ContextProvider } from "@/components/CartContext";
import { Toaster } from "sonner";

export async function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ContextProvider>
        {children}
        <Toaster />
      </ContextProvider>
    </NextUIProvider>
  );
}
