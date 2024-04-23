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
  const MinPriceAndMaxPrice = await prisma.product.aggregate({
    _min: {
      price: true,
    },
    _max: {
      price: true,
    },
  });

  const totalCount = await prisma.product.aggregate({
    _count: {
      _all: true,
    },
    where: {
      price: {
        gte: filters.rangePrice.min,
        lte: filters.rangePrice.max,
      },
      category: {
        name: {
          in: filters.category,
        },
      },
    },
  });

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
        gte: filters.rangePrice.min,
        lte: filters.rangePrice.max,
      },
      category: {
        name: {
          in: filters.category,
        },
      },
      rating: {
        gte: filters.rating,
        lt: filters.rating ? filters.rating + 1 : undefined,
      },
    },
    orderBy: {
      [filters.sort.title]: filters.sort.method,
    },
  });

  const result = {
    totalCount: totalCount._count._all,
    maxPrice: MinPriceAndMaxPrice._max.price ?? 1,
    minPrice: MinPriceAndMaxPrice._min.price ?? 0,
    products: productItems,
  };

  return result;
};

export { getProducts };
