"use server";
import prisma from "@/lib/prisma";

const getProduct = async ({ handle }: { handle: string }) => {
  const productItem = await prisma.product.findUnique({
    where: {
      handle: handle,
    },
    include: {
      imageUrl: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });

  return productItem;
};

export { getProduct };
