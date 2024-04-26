"use server";
import prisma from "@/lib/prisma";

const getPopularProducts = async (count = 5) => {
  const popularProducts = await prisma.product.findMany({
    take: count,
    include: {
      imageUrl: true,
    },
    orderBy: {
      rating: "desc",
    },
  });
  return popularProducts;
};

export { getPopularProducts };
