"use client";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tabs,
  Tab,
  Chip,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Icon from "@/lib/IconSprite";

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status } = useSession();

  return (
    <main>
      <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-xl">TaskFlow</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {/* Возможности */}
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent text-base text-foreground"
                  endContent={
                    <Icon
                      name="chevron"
                      size={24}
                      className="fill-foreground"
                    />
                  }
                  radius="sm"
                  variant="light"
                >
                  Возможности
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="automation"
                description="Автоматизируйте задачи и рабочие процессы."
                startContent={
                  <Icon name="bot" size={24} className="fill-primary" />
                }
              >
                Автоматизация
              </DropdownItem>
              <DropdownItem
                key="improvements"
                description="Работайте эффективнее с плагинами, подключив любимые инструменты команд."
                startContent={
                  <Icon name="rocket" size={24} className="fill-success" />
                }
              >
                Улучшения
              </DropdownItem>
              <DropdownItem
                key="templates"
                description="Используйте шаблоны от лидеров индустрии — путь к успеху станет проще."
                startContent={
                  <Icon name="template" size={24} className="fill-secondary" />
                }
              >
                Шаблоны
              </DropdownItem>
              <DropdownItem
                key="representations"
                description="Работайте из любой точки мира, и не беспокойтесь за потерю продуктивности или доступ к необходимым ресурсам."
                startContent={
                  <Icon name="server" size={24} className="fill-danger" />
                }
              >
                Сервера
              </DropdownItem>
              <DropdownItem
                key="integration"
                description="Находите приложения, которыми ваша команда уже пользуется, или открывайте для себя новые способы эффективного решения задач."
                startContent={
                  <Icon name="integration" size={24} className="fill-warning" />
                }
              >
                Интеграции
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* --- Возможности --- */}

          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent text-base text-foreground"
                  endContent={
                    <Icon
                      name="chevron"
                      size={24}
                      className="fill-foreground"
                    />
                  }
                  radius="sm"
                  variant="light"
                >
                  Планы
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="freemode"
                description="Идеально подходит для личного использования и небольших проектов."
                startContent={
                  <Icon name="free-mode" size={24} className="fill-success" />
                }
              >
                Начальный
              </DropdownItem>

              <DropdownItem
                key="premiummode"
                description="Для профессионалов и команд, которым необходимы все доступные функции для максимально эффективного управления проектами."
                startContent={
                  <Icon
                    name="premium-mode"
                    size={24}
                    className="fill-secondary"
                  />
                }
              >
                Премиум
              </DropdownItem>
              <DropdownItem
                key="enterprisemode"
                description="Разработан для крупных организаций с потребностью в расширенных возможностях и высокой безопасности."
                startContent={
                  <Icon
                    name="enterprise-mode"
                    size={24}
                    className="fill-primary"
                  />
                }
              >
                Корпоративный
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <NavbarItem>
            <Link color="foreground" href="#pricing">
              Цены
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {status === "authenticated" ? (
            <NavbarItem>
              <Button
                color="primary"
                as={Link}
                href="/dashboard"
                className="hidden lg:flex"
                endContent={
                  <Icon
                    name="goto"
                    size={24}
                    className="fill-background rotate-180 animate-bounce-horizontal"
                  />
                }
              >
                Перейти к доске
              </Button>
            </NavbarItem>
          ) : (
            <>
              <NavbarItem>
                <Button
                  color="primary"
                  onPress={() => router.push("?auth=login")}
                  className="hidden lg:flex"
                >
                  Войти
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  color="primary"
                  variant="flat"
                  onPress={() => router.push("?auth=register")}
                >
                  Создать аккаунт
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem>
            <Button
              color="primary"
              variant="faded"
              fullWidth
              href="/dashboard"
              as={Link}
            >
              Главная
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button
              color="primary"
              variant="faded"
              fullWidth
              href="/dashboard"
              as={Link}
            >
              Информация
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button
              color="primary"
              variant="faded"
              fullWidth
              href="/dashboard"
              as={Link}
            >
              Новости
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button
              color="primary"
              variant="faded"
              fullWidth
              href="/dashboard"
              as={Link}
            >
              Плагины
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>

      <section
        className="flex justify-center items-center px-4 py-8"
        style={{
          backgroundImage:
            "url('/white-wave-bg.svg'), linear-gradient(-45deg, rgb(82, 67, 170), rgb(237, 80, 180))",
          backgroundPosition: "center bottom -0.5px, 0% 0%",
          backgroundSize: "100% 14%, auto",
          backgroundRepeat: "no-repeat, repeat",
          backgroundColor: "rgb(82, 67, 170)",
        }}
      >
        <div className="w-full max-w-md md:max-w-5xl grid grid-cols-1 md:grid-cols-2 px-4 py-4 md:py-40">
          <div className="md:order-2">
            <img src="/UICollage_4x.webp" alt="preview" />
          </div>
          <div className="flex flex-col gap-2 justify-center md:order-1">
            <h3 className="text-2xl md:text-4xl font-medium text-white">
              Открывайте новые возможности
            </h3>
            <p className="md:text-lg leading-6 text-white">
              Создавайте новые проекты, работайте в команде, выполняйте свои
              задачи!
            </p>
            <div className="mt-4">
              <Button
                color="primary"
                onPress={() => router.push("?auth=register")}
                size="lg"
              >
                Зарегистрироваться
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full min-h-dvh px-4 py-8 bg-gradient-to-t to-white from-sky-500/20">
        <div className="w-full max-w-7xl flex flex-col gap-8 mx-auto">
          <div className="w-full max-w-xl text-center lg:text-left mx-auto lg:mx-0 flex-none space-y-4">
            <h1 className="text-2xl lg:text-4xl font-medium">
              Инструмент повышения производительности
            </h1>
            <p className="text-lg font-normal">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab
              incidunt quisquam eveniet culpa quae velit porro voluptate. Nisi
              ad illum voluptatum repellat non ducimus voluptates dolore iure
              praesentium, eaque quod.
            </p>
          </div>
          <div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex flex-col md:flex-row lg:flex-col gap-4 w-full lg:max-w-xs">
                <Card
                  shadow="sm"
                  isPressable
                  radius="sm"
                  className="p-4 border-l-8 md:border-b-8 md:border-l-0 lg:border-l-8 lg:border-b-0 border-solid border-sky-500"
                >
                  <div className="text-left">
                    <h3 className="mb-2 font-medium">Доски</h3>
                    <p className="">
                      Доски позволяют систематизировать задачи и продвигать
                      работу вперед.
                    </p>
                  </div>
                </Card>
                <Card shadow="sm" isPressable radius="sm" className="p-4">
                  <div className="text-left">
                    <h3 className="mb-2 font-medium">Колонки</h3>
                    <p className="">
                      Создавайте различные этапы выполнения задач. Начните с
                      простого "В ожидании", "В процессе", "Выполнено".
                    </p>
                  </div>
                </Card>
                <Card shadow="sm" isPressable radius="sm" className="p-4">
                  <div className="text-left">
                    <h3 className="mb-2 font-medium">Карточки</h3>
                    <p className="">
                      Доски позволяют систематизировать задачи и продвигать
                      работу вперед.
                    </p>
                  </div>
                </Card>
              </div>
              <div className="w-full">
                <div className="relative w-full aspect-video bg-black rounded-lg">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                    <Icon name="play" size={64} className="fill-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Price */}
      <PriceSection />

      {/* Sponsors */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20">
        <div
          className="flex w-full overflow-x-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 4%, rgba(0,0,0,1) 96%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div className="flex w-max items-stretch gap-4 animate-scrolling-banner hover:[animation-play-state:paused]">
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-center text-foreground border border-solid border-gray-200 p-6 rounded-lg"
              >
                <svg
                  fill="none"
                  height="19"
                  viewBox="0 0 152 19"
                  width="152"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M75.693 16.374H70.573V2.686H75.693V16.374ZM71.073 15.874H75.193V3.186H71.073V15.874ZM82.817 16.374H77.8V2.686H88.282C89.7836 2.5644 91.279 2.98597 92.496 3.874C93.0199 4.35331 93.426 4.94719 93.6825 5.60929C93.9391 6.2714 94.0392 6.98383 93.975 7.691C94.0498 8.91297 93.6609 10.1182 92.886 11.066C91.969 12.118 90.443 12.66 88.351 12.679C87.824 12.693 83.875 12.679 82.82 12.679L82.817 16.374ZM78.297 15.874H82.317V12.174H82.568C82.619 12.174 87.746 12.19 88.339 12.174C90.288 12.157 91.689 11.674 92.508 10.731C93.1978 9.87345 93.5404 8.78815 93.468 7.69C93.5295 7.05637 93.4442 6.41709 93.2188 5.82174C92.9933 5.22639 92.6338 4.69097 92.168 4.257C91.0396 3.4471 89.659 3.06693 88.275 3.185H78.3L78.297 15.874ZM87.22 9.604H82.283V5.878H87.253C87.6053 5.82932 87.9642 5.87044 88.2963 5.99753C88.6285 6.12463 88.9232 6.33358 89.153 6.605C89.3615 6.95194 89.4598 7.35398 89.435 7.758C89.4537 8.1331 89.3727 8.50647 89.2 8.84C88.9629 9.12588 88.6562 9.34595 88.3094 9.47905C87.9627 9.61215 87.5875 9.6538 87.22 9.6V9.604ZM82.783 9.104H87.22C88.04 9.104 88.548 8.933 88.773 8.581C88.8969 8.32515 88.953 8.04176 88.936 7.758C88.9579 7.46006 88.8933 7.16214 88.75 6.9L88.744 6.891C88.506 6.541 88.033 6.378 87.253 6.378H82.783V9.104ZM103.1 16.576C98.61 16.576 95.93 15.461 94.909 13.168C94.7419 12.7251 94.6285 12.2638 94.571 11.794L94.527 11.506H99.869L99.904 11.716C99.9451 11.9292 100.036 12.1299 100.168 12.302C100.379 12.557 101.083 12.985 103.419 12.985C106.227 12.985 106.227 12.492 106.227 12.227C106.227 11.78 105.902 11.627 103.612 11.383L103.177 11.342C102.315 11.261 101.225 11.158 100.727 11.115C96.527 10.735 94.652 9.43 94.652 6.885C94.652 4.212 97.843 2.485 102.782 2.485C106.811 2.485 109.407 3.547 110.496 5.644C110.754 6.13178 110.928 6.65999 111.009 7.206L111.044 7.487H105.696L105.674 7.261C105.653 7.08438 105.578 6.91869 105.458 6.787C105.258 6.519 104.626 6.076 102.664 6.076C100.255 6.076 99.923 6.384 99.923 6.716C99.923 7.159 100.684 7.316 103.123 7.577C104.14 7.66 105.775 7.828 106.335 7.896C109.856 8.278 111.427 9.551 111.427 12.025C111.428 14.1 109.983 16.576 103.1 16.576ZM95.111 12.006C95.1611 12.3358 95.2473 12.659 95.368 12.97C96.298 15.059 98.828 16.076 103.1 16.076C106.672 16.076 110.931 15.376 110.931 12.025C110.931 9.832 109.541 8.746 106.282 8.393C105.722 8.325 104.097 8.158 103.082 8.074C100.482 7.792 99.425 7.642 99.425 6.716C99.425 5.758 100.564 5.576 102.666 5.576C104.327 5.576 105.4 5.876 105.855 6.481C105.979 6.63005 106.073 6.80195 106.131 6.987H110.465C110.378 6.60025 110.24 6.22669 110.055 5.876C109.055 3.957 106.612 2.985 102.784 2.985C98.149 2.985 95.154 4.516 95.154 6.885C95.154 9.145 96.835 10.261 100.773 10.617C101.273 10.66 102.362 10.763 103.226 10.845L103.664 10.886C105.791 11.11 106.729 11.25 106.729 12.227C106.729 13.279 105.516 13.485 103.421 13.485C101.483 13.485 100.259 13.194 99.786 12.621C99.6402 12.4383 99.5302 12.2296 99.462 12.006H95.111ZM120.927 16.559C115.707 16.559 112.827 14.448 112.827 10.614V2.686H117.879V10.614C117.879 11.929 119.056 12.683 121.107 12.683C123.067 12.683 124.284 11.896 124.284 10.631V2.686H129.284V11.034C129.289 14.545 126.24 16.559 120.924 16.559H120.927ZM113.327 3.186V10.614C113.327 15.352 118.085 16.059 120.927 16.059C123.865 16.059 128.792 15.406 128.792 11.034V3.186H124.792V10.631C124.792 12.181 123.348 13.183 121.115 13.183C118.781 13.183 117.387 12.223 117.387 10.614V3.186H113.327ZM150.472 16.374H145.704V10.194L143 16.374H138.841L136.165 10.206V16.374H131.38V2.686H137.674L140.944 10.233L144.372 2.686H150.478L150.472 16.374ZM146.204 15.874H149.972V3.186H144.69L140.928 11.465L137.342 3.186H131.876V15.874H135.661V7.8L139.161 15.877H142.661L146.198 7.812L146.204 15.874ZM6.054 2.936H1.5V16.124H14.084V12.613H6.054V2.936ZM23.276 2.636C17.463 2.636 14.406 5.391 14.406 9.436C14.406 14.006 17.615 16.324 23.276 16.324C29.508 16.324 32.129 13.636 32.129 9.436C32.129 5.171 29.172 2.634 23.276 2.634V2.636ZM23.259 6.063C23.6547 6.06114 24.0502 6.08418 24.443 6.132L19.352 11.223C19.1111 10.6781 18.9936 10.0866 19.008 9.491C19.008 7.422 20.05 6.061 23.259 6.061V6.063ZM23.276 12.951C22.8947 12.9527 22.5137 12.9313 22.135 12.887L27.235 7.787C27.4669 8.3229 27.5779 8.90333 27.56 9.487C27.56 11.5 26.6 12.949 23.276 12.949V12.951ZM41.152 11.151H45.839C45.77 11.4763 45.6262 11.781 45.419 12.041C44.4473 12.8326 43.2072 13.2178 41.958 13.116C41.3292 13.1833 40.6934 13.1146 40.0935 12.9146C39.4936 12.7147 38.9436 12.3881 38.481 11.957C38.0071 11.2619 37.782 10.4271 37.842 9.588C37.7653 8.70874 38.0101 7.83152 38.531 7.119C39.186 6.379 40.295 6.06 41.925 6.06C42.9621 5.97413 43.9979 6.24048 44.865 6.816C45.1383 7.03308 45.3426 7.32491 45.453 7.656H49.8C49.7684 7.11047 49.6372 6.57533 49.413 6.077C48.372 3.96 45.952 2.7 41.837 2.7C38.258 2.7 35.856 3.792 34.529 5.439C33.6526 6.62836 33.2027 8.07844 33.252 9.555C33.1953 11.065 33.6336 12.5521 34.5 13.79C35.811 15.49 38.146 16.326 40.952 16.326C42.8175 16.4561 44.6703 15.9336 46.193 14.848L46.311 16.124H49.922V8.312H41.152V11.151ZM60.171 2.633C54.359 2.633 51.301 5.388 51.301 9.433C51.301 14.003 54.509 16.321 60.171 16.321C66.404 16.321 69.025 13.633 69.025 9.433C69.025 5.171 66.068 2.634 60.171 2.634V2.633ZM60.155 6.06C60.5403 6.05886 60.9253 6.0809 61.308 6.126L56.237 11.2C56.0036 10.6611 55.89 10.0781 55.904 9.491C55.9 7.422 56.946 6.061 60.155 6.061V6.06ZM60.171 12.948C59.7796 12.9497 59.3885 12.9269 59 12.88L64.117 7.762C64.3577 8.30503 64.4729 8.89532 64.454 9.489C64.456 11.5 63.5 12.949 60.171 12.949V12.948Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="flex w-full flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2 px-6 py-12 lg:px-8">
          <div className="flex items-center justify-center">
            <span className="text-medium font-medium">TaskFlow</span>
          </div>
          <div className="flex justify-center gap-x-4">
            <Link href="#">
              <Icon name="vk" size={24} className="fill-gray-800" />
            </Link>
            <Link href="#">
              <Icon name="google" size={24} className="fill-gray-800" />
            </Link>
          </div>
          <p className="mt-1 text-center text-small text-default-400">
            © 2024. With love by Orexxd.
          </p>
        </div>
      </footer>
    </main>
  );
}

const PriceSection = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("pay_month");

  return (
    <section className="flex items-center justify-center p-4" id="pricing">
      <div className="relative flex max-w-7xl flex-col items-center py-24">
        <div className="flex max-w-xl flex-col text-center">
          <h2 className="font-medium leading-7 text-secondary">Цены</h2>
          <h1 className="text-4xl font-medium tracking-tight mb-4">
            Получите безлимитные возможности.
          </h1>
          <h2 className="text-large text-default-500">
            Разблокируйте для себя премиальный план, и получите новые
            возможности
          </h2>
        </div>
        {/* tabs */}
        <Tabs
          key="select_payment_period"
          radius="full"
          aria-label="Tabs select plan"
          className="my-4"
          selectedKey={selected}
          onSelectionChange={(e: any) => setSelected(e)}
        >
          <Tab key="pay_month" title="Оплата в месяц" />
          <Tab
            key="pay_year"
            title={
              <div className="flex items-center gap-2">
                <p>Оплата в год</p>
                <Chip radius="full" color="secondary" variant="flat">
                  Скидка 20%
                </Chip>
              </div>
            }
          />
        </Tabs>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 my-12">
          {/* Card 1 */}
          <Card className="bg-background/60 dark:bg-default-100/50 p-3">
            <CardHeader className="flex flex-col items-start gap-2">
              <h2 className="text-large font-medium">Начальный</h2>
              <p className="text-medium text-default-500 text-balance">
                Идеально подходит для личного использования и небольших
                проектов.
              </p>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4">
              <p className="flex items-baseline gap-1 pt-2">
                <span className="inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-3xl leading-8 font-semibold tracking-tight text-transparent">
                  Бесплатно
                </span>
              </p>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <Icon
                    name="check"
                    size={24}
                    className="fill-primary shrink-0"
                  />
                  <p className="text-default-500">Доски: до 3 досок</p>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    name="check"
                    size={24}
                    className="fill-primary shrink-0"
                  />
                  <p className="text-default-500">
                    Карточки: неограниченное количество
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    name="check"
                    size={24}
                    className="fill-primary shrink-0"
                  />
                  <p className="text-default-500">Команда: до 3 участников</p>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    name="check"
                    size={24}
                    className="fill-primary shrink-0"
                  />
                  <p className="text-default-500">Хранилище: 1 ГБ для файлов</p>
                </li>
              </ul>
            </CardBody>
            <CardFooter>
              <Button
                color="primary"
                variant="flat"
                onPress={() => router.push("?auth=register")}
                fullWidth
              >
                Продолжить бесплатно
              </Button>
            </CardFooter>
          </Card>
          {/* --- Card 1 --- */}

          {/* Card 2 */}
          <Card className="bg-background/60 dark:bg-default-100/50 p-3 border-2 border-solid border-primary">
            <CardHeader className="flex flex-col items-start gap-2">
              <h2 className="text-large font-medium">Премиум</h2>
              <p className="text-medium text-default-500 text-balance">
                Для профессионалов, которым нужно эффективное управление
                проектами.
              </p>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4">
              <div className="flex items-center gap-1 pt-2">
                <span className="inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-3xl leading-8 font-semibold tracking-tight text-transparent">
                  {selected === "pay_month" ? 599 : Math.round(599 * 12 * 0.8)}{" "}
                  ₽
                </span>
                {selected === "pay_year" && (
                  <Chip color="primary" size="sm">
                    -20%
                  </Chip>
                )}
              </div>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <Icon
                    name="check"
                    size={24}
                    className="fill-primary shrink-0"
                  />
                  <p className="text-default-500">
                    Доски: неограниченное количество
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    name="check"
                    size={24}
                    className="fill-primary shrink-0"
                  />
                  <p className="text-default-500">
                    Карточки: неограниченное количество
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    name="check"
                    size={24}
                    className="fill-primary shrink-0"
                  />
                  <p className="text-default-500">Команда: до 50 участников</p>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    name="check"
                    size={24}
                    className="fill-primary shrink-0"
                  />
                  <p className="text-default-500">
                    Хранилище: 200 ГБ для файлов
                  </p>
                </li>
              </ul>
            </CardBody>
            <CardFooter>
              <Button color="primary" href="#" as={Link} fullWidth>
                Продолжить
              </Button>
            </CardFooter>
          </Card>
          {/* --- Card 2 --- */}

          {/* Card 3 */}
          <Card className="bg-background/60 dark:bg-default-100/50 p-3">
            <CardHeader className="flex flex-col items-start gap-2">
              <h2 className="text-large font-medium">Корпоративный</h2>
              <p className="text-medium text-default-500 text-balance">
                Для крупных организаций с потребностью в расширенных
                возможностях и высокой безопасности.
              </p>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4">
              <p className="flex items-baseline gap-1 pt-2">
                <span className="inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-3xl leading-8 font-semibold tracking-tight text-transparent">
                  Индивидуально
                </span>
              </p>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <Icon
                    name="check"
                    size={24}
                    className="fill-primary shrink-0"
                  />
                  <p className="text-default-500">
                    Доски: неограниченное количество
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    name="check"
                    size={24}
                    className="fill-primary shrink-0"
                  />
                  <p className="text-default-500">
                    Карточки: неограниченное количество
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    name="check"
                    size={24}
                    className="fill-primary shrink-0"
                  />
                  <p className="text-default-500">
                    Команда: неограниченное количество участников
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <Icon
                    name="check"
                    size={24}
                    className="fill-primary shrink-0"
                  />
                  <p className="text-default-500">
                    Хранилище: неограниченное количество
                  </p>
                </li>
              </ul>
            </CardBody>
            <CardFooter>
              <Button
                color="primary"
                variant="flat"
                href="#"
                as={Link}
                fullWidth
              >
                Связаться с нами
              </Button>
            </CardFooter>
          </Card>
          {/* --- Card 3 --- */}
        </div>
        <div className="flex py-2">
          <p className="text-default-400 text-center">
            Вы являетесь активным разработчиком?{" "}
            <Link href="#" className="underline underline-offset-4">
              Получить скидку
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
