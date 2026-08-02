import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { User, ShoppingBag, MapPin, Heart, Star, Bell, Settings, LogOut } from "lucide-react";

const NAV = [
  { href: "/account/profile", label: "Профиль", icon: User },
  { href: "/account/orders", label: "Мои заказы", icon: ShoppingBag },
  { href: "/account/addresses", label: "Адреса", icon: MapPin },
  { href: "/favorites", label: "Избранное", icon: Heart },
  { href: "/account/reviews", label: "Мои отзывы", icon: Star },
  { href: "/account/notifications", label: "Уведомления", icon: Bell },
  { href: "/account/settings", label: "Настройки", icon: Settings },
];

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/account/profile");

  return (
    <>
      <Header />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block">
          <nav className="space-y-0.5 rounded-xl border border-gray-200 bg-white p-2">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand"
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100">
                <LogOut size={16} /> Выйти
              </button>
            </form>
          </nav>
        </aside>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
