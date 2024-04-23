import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Slider,
  Accordion,
  AccordionItem,
  CheckboxGroup,
  Checkbox,
  useDisclosure,
} from "@nextui-org/react";
import { getCategories } from "@/action/get-categories";
import Rating from "@/components/Rating";
import { FiltersProps } from "@/types";

const Filters = ({
  filters,
  setFilters,
}: {
  filters: FiltersProps;
  setFilters: React.Dispatch<React.SetStateAction<FiltersProps>>;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [filtersTemp, setFiltersTemp] = useState<FiltersProps>(filters);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fc = await getCategories();
        setCategories(fc);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setFiltersTemp(filters);
  }, [filters]);

  const applyFilters = () => {
    setFilters(filtersTemp);
  };

  const clearFilters = () => {
    const defaultFilters = {
      sort: {
        title: "rating",
        method: "desc",
      },
      totalPrice: {
        max: filtersTemp.totalPrice.max,
        min: filtersTemp.totalPrice.min,
      },
      rangePrice: {
        max: filtersTemp.totalPrice.max,
        min: filtersTemp.totalPrice.min,
      },
    };
    setFilters(defaultFilters);
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
                <hr className="shrink-0 border-none w-full h-divider mt-3 bg-default-200" />
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="font-medium leading-8 text-default-600 text-large">
                        Цена
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
                        <Slider
                          label="Ценовой диапазон"
                          formatOptions={{ style: "currency", currency: "RUB" }}
                          step={1}
                          maxValue={filtersTemp.totalPrice.max}
                          minValue={filtersTemp.totalPrice.min}
                          value={[
                            filtersTemp.rangePrice.min,
                            filtersTemp.rangePrice.max,
                          ]}
                          onChange={(value: any) => {
                            setFiltersTemp((prevFilters) => ({
                              ...prevFilters,
                              rangePrice: {
                                min: value[0],
                                max: value[1],
                              },
                            }));
                          }}
                          className="max-w-md"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Input
                        type="number"
                        placeholder="0.00"
                        labelPlacement="outside"
                        value={filtersTemp.rangePrice.min.toString()}
                        onValueChange={(value) =>
                          setFiltersTemp((prevFilters) => ({
                            ...prevFilters,
                            rangePrice: {
                              ...prevFilters.rangePrice,
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
                        value={filtersTemp.rangePrice.max.toString()}
                        onValueChange={(value) =>
                          setFiltersTemp((prevFilters) => ({
                            ...prevFilters,
                            rangePrice: {
                              ...prevFilters.rangePrice,
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
                    <div>
                      <h3 className="font-medium leading-8 text-default-600 text-large">
                        Рейтинг
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="mr-auto">
                        <Rating
                        value={filtersTemp.rating}
                          onValueChange={(value) =>
                            setFiltersTemp((prevFilters) => ({
                              ...prevFilters,
                              rating: value,
                            }))
                          }
                        />
                      </div>
                    </div>
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
                            defaultValue={filtersTemp.category}
                          >
                            {categories.map((category, index) => (
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
                    onClose();
                    applyFilters();
                  }}
                >
                  Показать результаты
                </Button>
                <Button
                  variant="faded"
                  onPress={() => {
                    onClose();
                    clearFilters();
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

export default Filters;
