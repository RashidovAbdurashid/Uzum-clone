import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { mockDb } from "@/lib/mock-db";
import { PICKUP_POINTS } from "@/lib/mock-data/pickup-points";
import { CheckoutWizard } from "@/components/checkout/CheckoutWizard";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/checkout");

  const cities = await mockDb.cities.findMany();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-6 text-xl font-bold text-gray-900">Оформление заказа</h1>
      <CheckoutWizard cities={cities} pickupPoints={PICKUP_POINTS} />
    </div>
  );
}
