"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { User, Link } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getRandomComments } from "@/action/get-random-comments";
import { Comment } from "@/types";

export default function Home() {
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
    <>
      <NavBar />
      <section className="px-4">
        <div className="px-6 py-20 sm:py-32 lg:px-8 lg:py-40">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {chunksComment.map((chunk, index) => (
              <div
                key={index}
                className={`relative overflow-y-hidden max-h-[calc(100vh_-_200px)] ${resizeColumns[index]}`}
                style={{
                  maskImage:
                    "linear-gradient(0deg, #000 calc(100% - 20px), transparent), linear-gradient(0deg, #000 calc(100% - 20px), transparent)",
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
        </div>
      </section>

      <Footer />
    </>
  );
}
