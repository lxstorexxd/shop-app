import Icon from "@/lib/IconSprite";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";

const Footer = () => {
  const isShopOpen =
    new Date() >= new Date(new Date().setHours(7, 30, 0)) &&
    new Date() <= new Date(new Date().setHours(21, 30, 0));

  const { status } = useSession();
  return (
    <footer className="bg-primary text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="font-medium text-xl">ЛИС</span>
          <div className="w-px h-10 bg-gray-400 mx-3"></div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-sm text-gray-200">
              <span
                className={`w-2 h-2 rounded-full m-2 ${
                  isShopOpen ? "bg-green-500" : "bg-rose-500"
                }`}
              ></span>
              <span className="font-normal">
                {isShopOpen ? "Открыто" : "Закрыто"} • С 07:30 до 21:30
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-200">
              <Icon name="geolocation" size={24} className="fill-white" />
              <span>Бокситогорская улица, 33, Санкт-Петербург</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end">
          {status === "authenticated" && (
            <Button
              color="danger"
              variant="light"
              size="sm"
              onPress={() => signOut()}
            >
              Выйти из системы
            </Button>
          )}
          <p className="text-sm">© 2024 Orexxd. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
