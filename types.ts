import type { User, ImageUrl } from "@prisma/client";

export interface ProductProps {
  id: number;
  handle: string;
  title: string;
  price: number;
  discount: number;
  categoryId?: number;
  description?: string | null;
  rating: number;
  quantity: number;
  imageUrl?: ImageUrl[];
  comments: Comment[];
}

// Интерфейс для комментариев
export type Comment = {
  id: number;
  content: string;
  author: User;
  product?: ProductProps;
  authorId: string;
  productId: number;
  rating: number;
  createdAt: Date;
};

// Интерфейс для изображений продукта
export { ImageUrl };

// Интерфейс для элемента корзины
export interface CartItem {
  id: number;
  quantity: number;
  product: ProductProps;
}

// Интерфейс для фильтров
export interface FiltersProps {
  sort: {
    title: string;
    method: string;
  };
  totalPrice: {
    min: number;
    max: number;
  };
  rangePrice: {
    min: number;
    max: number;
  };
  rating?: number;
  category?: string[];
}

export interface Error {
  status: boolean;
  message: {
    title: string;
    description: string;
  };
}
