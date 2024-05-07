import { User, Link } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getRandomComments } from "@/action/get-random-comments";
import { Comment } from "@/types";

const PopularComments = () => {
  const [chunksComment, setChunksComment] = useState<Comment[][]>([
    [],
    [],
    [],
    [],
  ]);
  const resizeColumns = [
    "flex",
    "hidden sm:flex",
    "hidden md:flex",
    "hidden lg:flex",
  ];

  useEffect(() => {
    async function fetchComments() {
      const randomComments = await getRandomComments();
      setChunksComment(randomComments);
    }

    fetchComments();
  }, []);
  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {chunksComment.map((chunk, index) => (
        <div
          key={index}
          className={`relative overflow-y-hidden max-h-[calc(100vh_-_200px)] ${resizeColumns[index]}`}
          style={{
            maskImage:
              "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 4%, rgba(0,0,0,1) 96%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div className="flex flex-none w-full items-stretch gap-4 flex-col h-full animate-scrolling-banner-vertical">
            {chunk.map((data, index) => (
              <div
                key={index}
                className="flex flex-col gap-2.5 rounded-medium p-5 bg-content1 shadow-sm border border-solid border-default-200"
              >
                <div className="flex items-center gap-2">
                  <User
                    classNames={{ wrapper: "flex-1" }}
                    name={data.author.name}
                    description={
                      <Link
                        href={`/products/${data.product?.handle}`}
                        size="sm"
                        isExternal
                        className="leading-4 line-clamp-2"
                      >
                        О продукте {data.product?.title}
                      </Link>
                    }
                    avatarProps={{
                      src: data.author?.image ?? undefined,
                    }}
                  />
                </div>
                <p className="text-default-700 text-balance line-clamp-6">
                  {data.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularComments;
