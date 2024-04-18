"use server";

import prisma from "@/lib/prisma";

export async function createComment({
  author,
  content,
  rating,
  totalRating,
  productId,
}: {
  author: string;
  content: string;
  rating: number;
  totalRating: number;
  productId: number;
}) {
  // Создание нового комментария
  const newComment = await prisma.comment.create({
    data: {
      authorId: author,
      content: content,
      rating: rating,
      productId: productId,
    },
    include: {
      author: true,
    },
  });

  // Обновление рейтинга товара
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      rating: ((totalRating > 0 ? totalRating : rating) + rating) / 2,
    },
  });

  return newComment;
}
