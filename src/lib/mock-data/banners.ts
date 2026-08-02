export interface MockBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export const BANNERS: MockBanner[] = [
  {
    id: "banner_summer",
    title: "Летняя коллекция",
    subtitle: "Скидки до −50% на летний ассортимент",
    image: "/images/banners/summer-collection.svg",
    link: "/catalog/fashion",
  },
  {
    id: "banner_low-price",
    title: "Гарантия низких цен",
    subtitle: "Вернём разницу, если найдёте дешевле",
    image: "/images/banners/low-price-guarantee.svg",
    link: "/catalog",
  },
  {
    id: "banner_electronics",
    title: "Техника со скидкой",
    subtitle: "Смартфоны, ноутбуки и не только",
    image: "/images/banners/electronics-sale.svg",
    link: "/catalog/electronics",
  },
];
