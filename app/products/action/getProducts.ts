"use server";
import prisma from "@/lib/prisma";
import { FiltersProps } from "@/types";

const getProducts = async ({
  skip,
  take,
  filters,
}: {
  skip: number;
  take: number;
  filters: FiltersProps;
}) => {
  const productItems = await prisma.product.findMany({
    skip: skip,
    take: take,
    include: {
      imageUrl: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
    where: {
      price: {
        gte: filters.price.min,
        lte: filters.price.max,
      },
      category: {
        name: {
          in: filters.category,
        },
      },
    },
    orderBy: {
      [filters.sort.title]: filters.sort.method,
    },
  });

  const totalCount = await prisma.product.count();
  const maxPrice = await prisma.product.findFirst({
    select: {
      price: true,
    },
    orderBy: {
      price: "desc",
    },
  });

  const products = {
    products: productItems,
    stats: { maxPrice: maxPrice?.price ?? 0, totalCount: totalCount },
  };
  return products;
};

export { getProducts };
