import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Star, Wallet, BarChart3, Settings, LogOut } from "lucide-react";

const NAV = [
  { href: "/seller/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/seller/products", label: "Товары", icon: Package },
  { href: "/seller/orders", label: "Заказы", icon: ShoppingBag },
  { href: "/seller/reviews", label: "Отзывы", icon: Star },
  { href: "/seller/finance", label: "Финансы", icon: Wallet },
  { href: "/seller/analytics", label: "Аналитика", icon: BarChart3 },
  { href: "/seller/settings", label: "Настройки", icon: Settings },
];

export default async function SellerLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || !["SELLER", "ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="border-b border-gray-100 px-5 py-4">
          <span className="text-lg font-bold text-brand">Кабинет продавца</span>
        </div>
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand"
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
          className="border-t border-gray-100 p-3"
        >
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100">
            <LogOut size={17} /> Выйти
          </button>
        </form>
      </aside>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
