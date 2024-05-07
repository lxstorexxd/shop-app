import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

import Cart from "@/components/Cart";

export default function NavBar() {
  const currentRoute = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    { title: "Главная", href: "/" },
    { title: "Меню", href: "/products" },
    { title: "Контакты", href: "/contact" },
  ];

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href={`/`}>
            <h1 className="text-5xl font-bold caveat">ЛИС</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index} isActive={currentRoute === item.href}>
            <Link
              color={currentRoute === item.href ? "primary" : "foreground"}
              href={item.href}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link className="leading-5" href="tel:89319519343">
            +7 (931) 951-93-43
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Cart />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "secondary"
                  : "foreground"
              }
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
