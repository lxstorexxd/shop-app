import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Slider,
  Input,
  Accordion,
  AccordionItem,
  CheckboxGroup,
  Checkbox,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { getCategories } from "./action/getCategories";
import type { FiltersProps } from "@/types";

interface CategoriesProps {
  id: number;
  name: string;
}

const ProductsFilters = ({
  filters,
  setFilters,
  maxPriceProduct,
}: {
  filters: FiltersProps;
  setFilters: React.Dispatch<React.SetStateAction<FiltersProps>>;
  maxPriceProduct: number;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Categories, setCategories] = React.useState<CategoriesProps[]>([]);
  const [filtersTemp, setFiltersTemp] = useState<FiltersProps>(filters);

  const Heading = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) => {
    return (
      <div>
        <h3 className="font-medium leading-8 text-default-600 text-large">
          {title}
        </h3>
        <p className="text-small text-default-400">{description}</p>
      </div>
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  const applyFilters = () => {
    setFilters(filtersTemp);
  };

  const clearFilters = () => {
    const fltr = {
      sort: {
        title: "rating",
        method: "desc",
      },
      price: {
        min: 0,
        max: 1000,
      },
    };
    setFilters(fltr);
    setFiltersTemp(fltr);
  };

  return (
    <>
      <Popover placement="bottom" showArrow offset={10}>
        <PopoverTrigger>
          <Button color="primary">Сортировка</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px]">
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <p
                className="text-small font-bold text-foreground"
                {...titleProps}
              >
                Сортировка
              </p>
              <div className="mt-2 flex flex-col gap-2 w-full">
                <Button
                  color="primary"
                  variant={`ghost`}
                  value="rating"
                  onPress={(value) =>
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      sort: {
                        title: String("rating"),
                        method: "desc",
                      },
                    }))
                  }
                >
                  По популярности
                </Button>
                <Button
                  color="primary"
                  variant="ghost"
                  value="price"
                  onPress={(value) =>
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      sort: {
                        title: "price",
                        method: "asc",
                      },
                    }))
                  }
                >
                  Сначала недорогие
                </Button>
                <Button
                  color="primary"
                  variant="ghost"
                  value="price"
                  onPress={(value) =>
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      sort: {
                        title: "price",
                        method: "desc",
                      },
                    }))
                  }
                >
                  Сначала дорогие
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
      <Button variant="flat" onPress={onOpen}>
        Фильтры
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Фильтры
                <hr className="shrink-0 border-none w-full h-divider my-3 bg-default-200" />
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Heading title="Цена" />
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
                        <Slider
                          label="Ценовой диапазон"
                          formatOptions={{ style: "currency", currency: "RUB" }}
                          step={1}
                          maxValue={maxPriceProduct}
                          minValue={0}
                          value={[filtersTemp.price.min, filtersTemp.price.max]}
                          onChange={(value: any) =>
                            setFiltersTemp((prevFilters) => ({
                              ...prevFilters,
                              price: {
                                min: Number(value[0]),
                                max: Number(value[1]),
                              },
                            }))
                          }
                          className="max-w-md"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Input
                        type="number"
                        placeholder="0.00"
                        labelPlacement="outside"
                        value={filtersTemp.price.min.toLocaleString()}
                        onValueChange={(value) =>
                          setFiltersTemp((prevFilters) => ({
                            ...prevFilters,
                            price: {
                              ...prevFilters.price,
                              min: Number(value),
                            },
                          }))
                        }
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              ₽
                            </span>
                          </div>
                        }
                      />
                      <hr
                        className="shrink-0 bg-divider border-none h-divider mx-2 w-2"
                        role="separator"
                      />
                      <Input
                        type="number"
                        placeholder="0.00"
                        labelPlacement="outside"
                        value={filtersTemp.price.max.toLocaleString()}
                        onValueChange={(value) =>
                          setFiltersTemp((prevFilters) => ({
                            ...prevFilters,
                            price: {
                              ...prevFilters.price,
                              max: Number(value),
                            },
                          }))
                        }
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              ₽
                            </span>
                          </div>
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Heading title="Рейтинг" />
                    <div className="flex flex-col gap-1">13</div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <Accordion isCompact defaultExpandedKeys={["1"]}>
                        <AccordionItem
                          key="1"
                          aria-label="Accordion 1"
                          title="Категория"
                        >
                          <CheckboxGroup
                            onValueChange={(value) =>
                              setFiltersTemp((prevFilters) => ({
                                ...prevFilters,
                                category: value,
                              }))
                            }
                          >
                            {Categories.map((category, index) => (
                              <Checkbox value={`${category.name}`} key={index}>
                                {category.name}
                              </Checkbox>
                            ))}
                          </CheckboxGroup>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="mt-auto flex flex-col gap-2">
                <Button
                  color="primary"
                  onPress={() => {
                    applyFilters(), onClose();
                  }}
                >
                  Показать результаты
                </Button>
                <Button
                  variant="faded"
                  onClick={() => {
                    clearFilters();
                    onClose();
                  }}
                >
                  Убрать все фильтры
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductsFilters;
