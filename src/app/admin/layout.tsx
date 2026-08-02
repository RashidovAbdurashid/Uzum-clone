import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  FolderTree,
  ShoppingBag,
  Image as ImageIcon,
  Percent,
  MapPin,
  Star,
  Wallet,
  BarChart3,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Пользователи", icon: Users },
  { href: "/admin/sellers", label: "Продавцы", icon: Store },
  { href: "/admin/products", label: "Товары", icon: Package },
  { href: "/admin/categories", label: "Категории", icon: FolderTree },
  { href: "/admin/orders", label: "Заказы", icon: ShoppingBag },
  { href: "/admin/banners", label: "Баннеры", icon: ImageIcon },
  { href: "/admin/promotions", label: "Акции", icon: Percent },
  { href: "/admin/pickup-points", label: "Пункты выдачи", icon: MapPin },
  { href: "/admin/reviews", label: "Отзывы", icon: Star },
  { href: "/admin/finance", label: "Финансы", icon: Wallet },
  { href: "/admin/analytics", label: "Аналитика", icon: BarChart3 },
  { href: "/admin/pages", label: "Контент", icon: FileText },
  { href: "/admin/settings", label: "Настройки", icon: Settings },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  // Defense in depth - middleware already blocks this, but keep a server-side check too.
  if (!session?.user || !["MODERATOR", "ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="border-b border-gray-100 px-5 py-4">
          <span className="text-lg font-bold text-brand">Uzum Admin</span>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
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

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
          <h1 className="text-sm font-medium text-gray-500">Административная панель</h1>
          <span className="text-sm font-semibold text-gray-800">{session.user.name || session.user.email}</span>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
