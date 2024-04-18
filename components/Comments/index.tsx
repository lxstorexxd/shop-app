import {
  Button,
  User,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import Icon from "@/lib/IconSprite";
import Rating from "@/components/Rating";
import type { ProductProps, Comment } from "@/types";
import React, { useState } from "react";
import ModalAuthorization from "@/components//ModalAuthorization";
import { useSession } from "next-auth/react";
import { createComment } from "@/action/create-comment";

const Comments = ({ value }: { value: ProductProps }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<Comment[]>(value.comments);


  const handleCreateCommment = async (formData: FormData) => {
    console.log(session);
    if (session && session.user) {
      const newComment = await createComment({
        author: String(12),
        content: String(formData.get("comment")),
        rating: rating,
        totalRating: value.rating,
        productId: value.id,
      });
      setComments((prevComments) => [...prevComments, newComment]);
    } else {
      console.log("Сессия не определена, войдите в аккаунт повторно.");
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
                  <ModalHeader className="flex flex-col gap-1 pt-8">
                    <h1 className="text-large font-semibold">Оставте отзыв</h1>
                  </ModalHeader>
                  <ModalBody className="pb-8">
                    <form
                      action={handleCreateCommment}
                      className="flex flex-col gap-6"
                    >
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
