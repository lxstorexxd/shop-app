import {
  Button,
  User,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Textarea,
  Divider,
  Link,
} from "@nextui-org/react";
import Icon from "@/lib/IconSprite";
import Rating from "@/components/Rating";
import type { ProductProps, Comment } from "@/types";
import React, { useEffect, useState } from "react";
import ModalAuthorization from "@/components//ModalAuthorization";
import { useSession } from "next-auth/react";
import { createComment } from "@/action/create-comment";

const Comments = ({ value }: { value: ProductProps }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rating, setRating] = useState(0);
  const { data: session, status, update } = useSession();
  const [comments, setComments] = useState<Comment[]>(value.comments);

  useEffect(() => {
    if (status === "authenticated" || status === "loading") update();
  }, []);

  const handleCreateCommment = async (formData: FormData) => {
    try {
      if (session && session.user.id) {
        const newComment = await createComment({
          author: session.user.id,
          content: String(formData.get("comment")),
          rating: rating,
          totalRating: value.rating,
          productId: value.id,
        });
        setComments((prevComments) => [...prevComments, newComment]);
      } else {
        console.log("Сессия не определена, войдите в аккаунт повторно.");
      }
    } catch (error) {
      console.log(
        "Ошибка создания комментария. Попробуйте войти в аккаунт повторно!"
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <header className="mb-8 flex flex-wrap justify-between gap-4 md:px-2">
        <div className="flex items-center gap-2">
          <h1 className="text-medium font-semibold md:text-large">Отзывы</h1>
          <div className="flex items-center gap-1">
            <Icon name="star" size={24} className="fill-yellow-500" />
            <span className="text-medium font-semibold md:text-large">
              {value.rating.toFixed(1)}
            </span>
            <span className="text-right text-small text-default-500 lg:text-medium">
              (Основано на {value.comments.length} отзывах)
            </span>
          </div>
        </div>
        <Button color="primary" variant="flat" onPress={onOpen}>
          Написать отзыв
        </Button>
        {!session ? (
          <ModalAuthorization isOpen={isOpen} onOpenChange={onOpenChange} />
        ) : (
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 pt-4">
                    <h1 className="text-2xl font-semibold">Оставте отзыв</h1>
                    <p className="text-base font-normal text-default-400">
                      Нам будет очень приятно узнать ваше мнение!
                    </p>
                  </ModalHeader>
                  <ModalBody className="pb-8">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleCreateCommment(new FormData(e.currentTarget));
                      }}
                      className="flex flex-col gap-4"
                    >
                      <div>
                        <User
                          name={session.user.name}
                          description={
                            <Link size="sm" isExternal>
                              {session.user.email}
                            </Link>
                          }
                          avatarProps={{
                            src: session.user.image,
                          }}
                        />
                      </div>
                      <Divider />
                      <div className="mr-auto">
                        <Rating
                          head="Рейтинг"
                          value={rating}
                          onValueChange={setRating}
                        />
                      </div>
                      <Textarea
                        label="Комментарий"
                        placeholder="Ваш комментарий..."
                        disableAnimation
                        classNames={{
                          input: "resize-y min-h-[40px]",
                        }}
                        name="comment"
                      />
                      <Button color="primary" onPress={onClose} type="submit">
                        Опубликовать
                      </Button>
                    </form>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </header>
      <div className="flex flex-col gap-4">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="rounded-medium bg-content1 p-5 shadow-small"
          >
            <div>
              <div className="flex items-center justify-between">
                <User
                  name={comment.author.name}
                  description={new Date(comment.createdAt).toLocaleString()}
                  avatarProps={{
                    src: comment.author.image ?? undefined,
                  }}
                />
                <Rating value={comment.rating} isDisable={true} isCompact />
              </div>
              <div className="mt-4 w-full">{comment.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
