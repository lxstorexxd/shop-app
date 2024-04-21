import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import type { Error } from "@/types";

const NotFoundPage = ({ error }: { error?: Error }) => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="max-w-sm text-center space-y-8">
        <h1 className="text-2xl md:text-4xl text-gray-900">
          {error?.message.title || "Неизвестная ошибка"}
        </h1>
        <p className="text-lg text-default-400 text-balance leading-6">
          {error?.message.description ||
            "Попробуйте обновить страницу. В случае очередной неудачи, обратитесь к администратору системы"}
        </p>
        <div className="flex flex-col gap-2">
          <Button color="primary" onPress={() => router.back()}>
            Вернуться назад
          </Button>
          <Button variant="flat" onPress={() => router.push("/products")}>
            Главное меню
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
