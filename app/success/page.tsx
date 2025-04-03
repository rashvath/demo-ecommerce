"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-700">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mt-2">
          Thank you for your purchase. Your order is being processed.
        </p>
        <Link
          href="/products"
          className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
