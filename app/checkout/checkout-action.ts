"use server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void> => {
  const itemsJson = formData.get("items") as string;
  const items = JSON.parse(itemsJson);
  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: "cad",
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/success`;
  const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`;

  console.log("Base URL:", process.env.NEXT_PUBLIC_BASE_URL);
  console.log("Success URL:", successUrl);
  console.log("Cancel URL:", cancelUrl);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (!session.url) {
      throw new Error("Failed to create checkout session, no URL returned.");
    }

    redirect(session.url);
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    // Handle error appropriately, e.g., redirect to an error page or show a message
  }
};
