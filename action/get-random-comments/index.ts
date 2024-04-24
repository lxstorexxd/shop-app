"use server";
import prisma from "@/lib/prisma";
import { Comment } from "@/types";

const getRandomComments = async () => {
  const chunks = (comments: Comment[], size: number) =>
    Array.from(new Array(Math.ceil(comments.length / size)), (_, i) =>
      comments.slice(i * size, i * size + size)
    );

  // const rawComments: any[] = await prisma.$queryRaw`
  //   SELECT "Comment".*, "User".*, "products".*
  //   FROM "Comment"
  //   JOIN "User" ON "Comment"."authorId" = "User"."id"
  //   JOIN "products" ON "Comment"."productId" = "products"."id"
  //   ORDER BY RANDOM()
  //   LIMIT 16
  // `;

  const rawComments: any[] = await prisma.comment.findMany({
    include: {
      author: true,
      product: true,
    },
    orderBy: {
      id: "desc",
    },
    take: 16,
  });

  return chunks(rawComments, 4);
};

export { getRandomComments };
