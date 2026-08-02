import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/shared/QueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uzum Market Clone",
  description: "Маркетплейс — миллионы товаров по низким ценам",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QueryProvider>
            {children}
            <Toaster position="top-center" richColors />
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
