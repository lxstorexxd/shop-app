"use client";

import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { CartItem, ProductProps } from "@/types";

export const CartContext = createContext<{
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  addToCart: (productToAdd: ProductProps) => void;
}>({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productToAdd: ProductProps) => {
    const existingCartItem = cart.find(
      (item) => item.product.id === productToAdd.id
    );

    if (existingCartItem) {
      const updatedCart = cart.map((item) =>
        item.product.id === productToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      const newCartItem: CartItem = {
        id: productToAdd.id,
        quantity: 1,
        product: productToAdd,
      };
      setCart([...cart, newCartItem]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
