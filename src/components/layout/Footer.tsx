import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  const columns = [
    {
      title: t("about"),
      links: [
        { href: "/pickup-points", label: "Пункты выдачи" },
        { href: "/careers", label: "Вакансии" },
        { href: "/pages/about", label: "О компании" },
      ],
    },
    {
      title: t("forUsers"),
      links: [
        { href: "/pages/contacts", label: "Связаться с нами" },
        { href: "/faq", label: "Вопрос-Ответ" },
        { href: "/pages/returns", label: "Возврат товара" },
      ],
    },
    {
      title: t("forBusiness"),
      links: [
        { href: "/seller/register", label: "Продавайте на Uzum" },
        { href: "/login?role=seller", label: "Вход для продавцов" },
        { href: "/pages/open-pickup-point", label: "Открыть пункт выдачи" },
      ],
    },
  ];

  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 md:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-sm font-semibold text-gray-900">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-900">{t("getApp")}</h4>
          <div className="flex flex-col gap-2">
            <div className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500">App Store</div>
            <div className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500">Google Play</div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 px-4 py-4 text-center text-xs text-gray-400">
        {t("copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}
