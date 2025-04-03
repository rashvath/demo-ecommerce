"use client";

import { useCartStore } from "@/store/cart-store";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [mobileOpen, setmobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setmobileOpen(false);
      }
      window.addEventListener("resize", handleResize);

      return window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-40 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <Link href="/" className="hover:text-blue-600">
          My Ecommerce
        </Link>

        <div className="hidden md:flex space-x-4">
          <Link href={"/"}>Home</Link>
          <Link href="/products" className="hover:text-black-600">
            Products
          </Link>
          <Link href="/checkout" className="hover:text-blue-600">
            Checkout
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-white text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            className="md:hidden"
            variant="ghost"
            onClick={() => setmobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6 text-black" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-black" />
            )}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <nav>
          <ul>
            <li>
              <Link href={"/"} className="block hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href={"/products"} className="block hover:text-blue-600">
                Products
              </Link>
            </li>
            <li>
              <Link href={"/checkout"} className="block hover:text-blue-600">
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};
