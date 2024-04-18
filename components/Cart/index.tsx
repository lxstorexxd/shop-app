import { Suspense, useContext } from "react";
import { CartContext } from "@/components/CartContext";
import ProductCardSlider from "@/components/SwiperSliders/ProductCardSlider";
import FormatPrice from "@/utils/FormatPrice";
import Icon from "@/lib/IconSprite";
import { CartItem } from "@/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function Cart() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { cart, setCart } = useContext(CartContext);

  return (
    <>
      <Button onClick={onOpen} color="primary" variant="flat">
        <Icon name="cart" size={24} className="fill-primary" />
        <span>
          {FormatPrice(
            cart.reduce(
              (accumulator: number, currentProduct: CartItem) =>
                accumulator +
                currentProduct.product.price * currentProduct.quantity,
              0
            )
          )}
          ₽
        </span>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        backdrop="blur"
        scrollBehavior="outside"
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl">Корзина</ModalHeader>
              <ModalBody>
                <div className="space-y-2">
                  {cart.map((data) => (
                    <div
                      key={data.id}
                      className="relative flex items-center gap-2 py-2 px-4 border-b border-solid border-zinc-300 rounded-lg"
                    >
                      <div className="relative w-16 h-16 shrink-0 overflow-hidden">
                        <ProductCardSlider
                          autoplayDelay={5000}
                          images={data.product.imageUrl}
                        />
                      </div>
                      <div className="product-details">
                        <div className="text-base md:text-lg line-clamp-2">
                          {data.product.title}
                        </div>
                        <div className="text-base font-semibold">
                          {FormatPrice(data.product.price)}₽
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className="flex items-center justify-center border border-solid border-zinc-300 rounded-full overflow-hidden">
                          <button
                            className="text-gray-500 px-2 py-0.5 md:px-3 md:py-1 bg-gray-100 hover:bg-gray-200"
                            onClick={() => {
                              setCart((prevProducts) => {
                                const updatedProducts = prevProducts.map(
                                  (item) => {
                                    if (item.id === data.id) {
                                      return {
                                        ...item,
                                        quantity: item.quantity - 1,
                                      };
                                    }
                                    return item;
                                  }
                                );

                                return updatedProducts.filter(
                                  (item) => item.quantity > 0
                                );
                              });
                            }}
                          >
                            -
                          </button>

                          <input
                            type="number"
                            className="mx-2 text-sm w-4 text-center"
                            value={data.quantity}
                            readOnly
                          />
                          <button
                            className="text-gray-500 px-2 py-0.5 md:px-3 md:py-1 bg-gray-100 hover:bg-gray-200"
                            onClick={() => {
                              setCart((prevProducts) => {
                                return prevProducts.map((item) => {
                                  if (item.id === data.id) {
                                    return {
                                      ...item,
                                      quantity: item.quantity + 1,
                                    };
                                  }
                                  return item;
                                });
                              });
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <button
                          className="absolute -top-0.5 -right-0.5 leading-none border border-solid border-zinc-300 w-5 h-5 rounded-full bg-white"
                          onClick={() => {
                            setCart((prevProducts) => {
                              return prevProducts.filter(
                                (item) => item.id !== data.id
                              );
                            });
                          }}
                        >
                          <Icon name="close" size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {!cart.length && <div className="w-24 h-24 mx-auto"></div>}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button
                  onClick={() => setCart([])}
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Очистить
                </Button>
                <Button color="primary" onPress={onClose}>
                  {FormatPrice(
                    cart.reduce(
                      (accumulator: number, currentProduct: CartItem) =>
                        accumulator +
                        currentProduct.product.price * currentProduct.quantity,
                      0
                    )
                  )}
                  ₽
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
