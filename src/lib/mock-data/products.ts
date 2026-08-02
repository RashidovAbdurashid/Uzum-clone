export interface ProductVariant {
  id: string;
  sku: string;
  label: string | null; // e.g. "Чёрный", "42", null if the product has a single variant
  attributeName: string | null; // "Цвет", "Размер" - drives the selector UI
  price: number;
  compareAtPrice: number | null;
  installmentPrice: number | null;
  installmentMonths: number | null;
  stock: number;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  pros?: string;
  cons?: string;
  isVerifiedPurchase: boolean;
  createdAt: string; // ISO date
}

export interface MockProduct {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categorySlug: string;
  brandSlug: string;
  images: ProductImage[];
  variants: ProductVariant[];
  specs: { label: string; value: string }[];
  reviews: ProductReview[];
  isNew: boolean;
  isOriginal: boolean;
  hasLowPriceGuarantee: boolean;
  salesCount: number;
  deliveryDays: number; // 1 = "Завтра"
}

function images(slug: string, alt: string): ProductImage[] {
  return [1, 2, 3].map((i) => ({ url: `/images/products/${slug}-${i}.svg`, alt: `${alt} — фото ${i}` }));
}

export const PRODUCTS: MockProduct[] = [
  {
    id: "prod_novex-x12-128gb",
    slug: "novex-x12-128gb",
    name: "Смартфон Novex X12 128GB",
    shortDescription: "Яркий AMOLED-экран, тройная камера 50 Мп, батарея на 5000 мА·ч",
    description:
      "Novex X12 — смартфон среднего класса с большим AMOLED-дисплеем 6.5\", тройной камерой 50+8+2 Мп и батареей 5000 мА·ч с быстрой зарядкой 33Вт. Поддержка двух SIM-карт, NFC для бесконтактной оплаты.",
    categorySlug: "smartphones",
    brandSlug: "novex",
    images: images("novex-x12-128gb", "Novex X12"),
    variants: [
      { id: "var_novex-x12-black", sku: "NVX-X12-BLK", label: "Чёрный", attributeName: "Цвет", price: 3500000, compareAtPrice: 4000000, installmentPrice: 291700, installmentMonths: 12, stock: 24 },
      { id: "var_novex-x12-blue", sku: "NVX-X12-BLU", label: "Синий", attributeName: "Цвет", price: 3500000, compareAtPrice: 4000000, installmentPrice: 291700, installmentMonths: 12, stock: 11 },
      { id: "var_novex-x12-white", sku: "NVX-X12-WHT", label: "Белый", attributeName: "Цвет", price: 3600000, compareAtPrice: 4100000, installmentPrice: 300000, installmentMonths: 12, stock: 6 },
    ],
    specs: [
      { label: "Экран", value: "6.5\" AMOLED, 90 Гц" },
      { label: "Память", value: "128 ГБ / 8 ГБ ОЗУ" },
      { label: "Камера", value: "50 + 8 + 2 Мп" },
      { label: "Батарея", value: "5000 мА·ч, 33 Вт" },
      { label: "Страна", value: "Вьетнам" },
      { label: "Гарантия", value: "12 месяцев" },
    ],
    reviews: [
      { id: "rev_1", author: "Дилноза", rating: 5, comment: "Отличный экран, батареи хватает на два дня. Камера радует при дневном свете.", isVerifiedPurchase: true, createdAt: "2026-06-12" },
      { id: "rev_2", author: "Азиз", rating: 4, comment: "В целом доволен, но в темноте камера немного шумит.", isVerifiedPurchase: true, createdAt: "2026-06-20" },
      { id: "rev_3", author: "Шахзод", rating: 5, comment: "Пришёл на следующий день после заказа, всё как на фото.", isVerifiedPurchase: false, createdAt: "2026-07-02" },
    ],
    isNew: true,
    isOriginal: true,
    hasLowPriceGuarantee: true,
    salesCount: 412,
    deliveryDays: 1,
  },
  {
    id: "prod_kaido-s8-lite-256gb",
    slug: "kaido-s8-lite-256gb",
    name: "Смартфон Kaido S8 Lite 256GB",
    shortDescription: "256 ГБ памяти, экран 90 Гц, разблокировка по отпечатку",
    description:
      "Kaido S8 Lite сочетает большой объём памяти (256 ГБ) и плавный 90-герцовый экран. Сканер отпечатка пальца встроен в кнопку питания, поддержка быстрой зарядки 25 Вт.",
    categorySlug: "smartphones",
    brandSlug: "kaido",
    images: images("kaido-s8-lite-256gb", "Kaido S8 Lite"),
    variants: [
      { id: "var_kaido-s8-black", sku: "KDO-S8-BLK", label: "Чёрный", attributeName: "Цвет", price: 2800000, compareAtPrice: null, installmentPrice: 233400, installmentMonths: 12, stock: 18 },
      { id: "var_kaido-s8-green", sku: "KDO-S8-GRN", label: "Зелёный", attributeName: "Цвет", price: 2800000, compareAtPrice: null, installmentPrice: 233400, installmentMonths: 12, stock: 9 },
    ],
    specs: [
      { label: "Экран", value: "6.6\" IPS, 90 Гц" },
      { label: "Память", value: "256 ГБ / 8 ГБ ОЗУ" },
      { label: "Камера", value: "48 + 2 Мп" },
      { label: "Батарея", value: "5000 мА·ч, 25 Вт" },
      { label: "Страна", value: "Китай" },
      { label: "Гарантия", value: "12 месяцев" },
    ],
    reviews: [
      { id: "rev_4", author: "Мадина", rating: 4, comment: "Хорошее соотношение цены и памяти. Немного греется при играх.", isVerifiedPurchase: true, createdAt: "2026-05-30" },
      { id: "rev_5", author: "Бахтиёр", rating: 5, comment: "За свои деньги отличный вариант, зарядка держит весь день.", isVerifiedPurchase: true, createdAt: "2026-06-15" },
    ],
    isNew: false,
    isOriginal: true,
    hasLowPriceGuarantee: false,
    salesCount: 268,
    deliveryDays: 1,
  },
  {
    id: "prod_aurex-book-14",
    slug: "aurex-book-14",
    name: "Ноутбук Aurex Book 14\"",
    shortDescription: "Лёгкий корпус 1.3 кг, 16 ГБ ОЗУ, SSD 512 ГБ",
    description:
      "Aurex Book 14 — компактный ноутбук для учёбы и работы. Металлический корпус весом 1.3 кг, экран IPS Full HD, 16 ГБ оперативной памяти и быстрый SSD на 512 ГБ.",
    categorySlug: "laptops",
    brandSlug: "aurex",
    images: images("aurex-book-14", "Aurex Book 14"),
    variants: [
      { id: "var_aurex-book-8-256", sku: "AUX-BK14-8256", label: "8 ГБ / 256 ГБ", attributeName: "Конфигурация", price: 6200000, compareAtPrice: 7000000, installmentPrice: 516700, installmentMonths: 12, stock: 7 },
      { id: "var_aurex-book-16-512", sku: "AUX-BK14-16512", label: "16 ГБ / 512 ГБ", attributeName: "Конфигурация", price: 7900000, compareAtPrice: 8800000, installmentPrice: 658400, installmentMonths: 12, stock: 4 },
    ],
    specs: [
      { label: "Экран", value: "14\" IPS Full HD" },
      { label: "Процессor", value: "8-ядерный, до 3.4 ГГц" },
      { label: "Вес", value: "1.3 кг" },
      { label: "Батарея", value: "до 10 часов" },
      { label: "Страна", value: "Китай" },
      { label: "Гарантия", value: "24 месяца" },
    ],
    reviews: [
      { id: "rev_6", author: "Комрон", rating: 5, comment: "Лёгкий, быстрый, экран приятный. Для учёбы и офиса хватает с запасом.", isVerifiedPurchase: true, createdAt: "2026-06-01" },
    ],
    isNew: true,
    isOriginal: true,
    hasLowPriceGuarantee: true,
    salesCount: 134,
    deliveryDays: 2,
  },
  {
    id: "prod_vionic-air-13",
    slug: "vionic-air-13",
    name: "Ноутбук Vionic Air 13\"",
    shortDescription: "Ультратонкий корпус 12 мм, экран 2K, до 14 часов работы",
    description:
      "Vionic Air — ультрабук с корпусом толщиной всего 12 мм и экраном разрешением 2K. Оптимизирован для длительной автономной работы — до 14 часов на одном заряде.",
    categorySlug: "laptops",
    brandSlug: "vionic",
    images: images("vionic-air-13", "Vionic Air 13"),
    variants: [
      { id: "var_vionic-air-silver", sku: "VNC-AIR13-SLV", label: "Серебристый", attributeName: "Цвет", price: 8900000, compareAtPrice: null, installmentPrice: 741700, installmentMonths: 12, stock: 5 },
    ],
    specs: [
      { label: "Экран", value: "13.3\" 2K IPS" },
      { label: "Процессор", value: "8-ядерный, до 4.0 ГГц" },
      { label: "Вес", value: "1.05 кг" },
      { label: "Батарея", value: "до 14 часов" },
      { label: "Страна", value: "Тайвань" },
      { label: "Гарантия", value: "24 месяца" },
    ],
    reviews: [
      { id: "rev_7", author: "Ситора", rating: 5, comment: "Очень тонкий и лёгкий, беру с собой каждый день, батареи хватает на полный рабочий день.", isVerifiedPurchase: true, createdAt: "2026-06-28" },
    ],
    isNew: false,
    isOriginal: true,
    hasLowPriceGuarantee: false,
    salesCount: 58,
    deliveryDays: 3,
  },
  {
    id: "prod_brightline-pods-pro",
    slug: "brightline-pods-pro",
    name: "Наушники Brightline Pods Pro",
    shortDescription: "Активное шумоподавление, до 30 часов от кейса",
    description:
      "Brightline Pods Pro — беспроводные наушники с активным шумоподавлением и прозрачным режимом. Кейс с беспроводной зарядкой обеспечивает до 30 часов автономной работы.",
    categorySlug: "headphones",
    brandSlug: "brightline",
    images: images("brightline-pods-pro", "Brightline Pods Pro"),
    variants: [
      { id: "var_brightline-pods-white", sku: "BRL-PODS-WHT", label: "Белый", attributeName: "Цвет", price: 850000, compareAtPrice: 1000000, installmentPrice: 70900, installmentMonths: 12, stock: 40 },
      { id: "var_brightline-pods-black", sku: "BRL-PODS-BLK", label: "Чёрный", attributeName: "Цвет", price: 850000, compareAtPrice: 1000000, installmentPrice: 70900, installmentMonths: 12, stock: 33 },
    ],
    specs: [
      { label: "Тип", value: "Внутриканальные, TWS" },
      { label: "Шумоподавление", value: "Активное (ANC)" },
      { label: "Автономность", value: "8ч + 22ч от кейса" },
      { label: "Защита", value: "IPX4" },
      { label: "Гарантия", value: "12 месяцев" },
    ],
    reviews: [
      { id: "rev_8", author: "Фарход", rating: 5, comment: "Шумодав реально работает, в метро тишина. Звук чистый.", isVerifiedPurchase: true, createdAt: "2026-06-10" },
      { id: "rev_9", author: "Нилуфар", rating: 4, comment: "Удобные, но кейс немного великоват для кармана.", isVerifiedPurchase: true, createdAt: "2026-06-22" },
    ],
    isNew: false,
    isOriginal: true,
    hasLowPriceGuarantee: true,
    salesCount: 521,
    deliveryDays: 1,
  },
  {
    id: "prod_solace-wireless-x",
    slug: "solace-wireless-x",
    name: "Наушники Solace Wireless X",
    shortDescription: "Бюджетные TWS-наушники с ярким басом",
    description:
      "Solace Wireless X — доступные беспроводные наушники с усиленным басом и сенсорным управлением. Отлично подойдут для повседневного прослушивания музыки и звонков.",
    categorySlug: "headphones",
    brandSlug: "solace",
    images: images("solace-wireless-x", "Solace Wireless X"),
    variants: [
      { id: "var_solace-x-black", sku: "SLC-WX-BLK", label: null, attributeName: null, price: 450000, compareAtPrice: 600000, installmentPrice: null, installmentMonths: null, stock: 62 },
    ],
    specs: [
      { label: "Тип", value: "Внутриканальные, TWS" },
      { label: "Автономность", value: "5ч + 15ч от кейса" },
      { label: "Защита", value: "IPX4" },
      { label: "Гарантия", value: "6 месяцев" },
    ],
    reviews: [
      { id: "rev_10", author: "Умид", rating: 4, comment: "За такую цену — отличный вариант, бас чувствуется хорошо.", isVerifiedPurchase: true, createdAt: "2026-05-18" },
    ],
    isNew: false,
    isOriginal: false,
    hasLowPriceGuarantee: false,
    salesCount: 389,
    deliveryDays: 1,
  },
  {
    id: "prod_terra-blender-900w",
    slug: "terra-blender-900w",
    name: "Блендер Terra Blender 900W",
    shortDescription: "Стеклянная чаша 1.5 л, 6 скоростей, импульсный режим",
    description:
      "Terra Blender мощностью 900 Вт справится с любыми смузи и соусами. Стеклянная чаша на 1.5 литра, 6 скоростных режимов и импульсный режим для колки льда.",
    categorySlug: "kitchen",
    brandSlug: "terra",
    images: images("terra-blender-900w", "Terra Blender"),
    variants: [
      { id: "var_terra-blender", sku: "TRR-BLD-900", label: null, attributeName: null, price: 320000, compareAtPrice: null, installmentPrice: null, installmentMonths: null, stock: 45 },
    ],
    specs: [
      { label: "Мощность", value: "900 Вт" },
      { label: "Объём чаши", value: "1.5 л, стекло" },
      { label: "Режимы", value: "6 скоростей + импульс" },
      { label: "Гарантия", value: "12 месяцев" },
    ],
    reviews: [
      { id: "rev_11", author: "Гульнора", rating: 5, comment: "Мощный, лёд колет без проблем. Мыть легко.", isVerifiedPurchase: true, createdAt: "2026-06-05" },
    ],
    isNew: false,
    isOriginal: true,
    hasLowPriceGuarantee: false,
    salesCount: 97,
    deliveryDays: 2,
  },
  {
    id: "prod_novex-multicooker-5l",
    slug: "novex-multicooker-5l",
    name: "Мультиварка Novex Multicooker 5L",
    shortDescription: "12 программ, отложенный старт, чаша с антипригарным покрытием",
    description:
      "Мультиварка Novex на 5 литров с 12 автоматическими программами и функцией отложенного старта до 24 часов. Чаша с керамическим антипригарным покрытием.",
    categorySlug: "kitchen",
    brandSlug: "novex",
    images: images("novex-multicooker-5l", "Novex Multicooker"),
    variants: [
      { id: "var_novex-multicooker", sku: "NVX-MC-5L", label: null, attributeName: null, price: 780000, compareAtPrice: 890000, installmentPrice: 65000, installmentMonths: 12, stock: 22 },
    ],
    specs: [
      { label: "Объём", value: "5 л" },
      { label: "Программы", value: "12 автоматических" },
      { label: "Мощность", value: "860 Вт" },
      { label: "Гарантия", value: "12 месяцев" },
    ],
    reviews: [
      { id: "rev_12", author: "Зарина", rating: 5, comment: "Плов получается отлично, каша не пригорает. Довольна покупкой.", isVerifiedPurchase: true, createdAt: "2026-06-19" },
    ],
    isNew: true,
    isOriginal: true,
    hasLowPriceGuarantee: true,
    salesCount: 156,
    deliveryDays: 1,
  },
  {
    id: "prod_aurex-ac-12000btu",
    slug: "aurex-ac-12000btu",
    name: "Кондиционер Aurex AC 12000BTU",
    shortDescription: "Инверторный компрессор, охлаждение до 35 м²",
    description:
      "Инверторный кондиционер Aurex мощностью 12000 BTU рассчитан на помещения до 35 м². Тихая работа, режим осушения и ночной режим для комфортного сна.",
    categorySlug: "climate",
    brandSlug: "aurex",
    images: images("aurex-ac-12000btu", "Aurex AC 12000"),
    variants: [
      { id: "var_aurex-ac", sku: "AUX-AC-12K", label: null, attributeName: null, price: 4500000, compareAtPrice: 5200000, installmentPrice: 375000, installmentMonths: 12, stock: 14 },
    ],
    specs: [
      { label: "Мощность охлаждения", value: "12000 BTU" },
      { label: "Площадь", value: "до 35 м²" },
      { label: "Компрессор", value: "Инверторный" },
      { label: "Гарантия", value: "36 месяцев" },
    ],
    reviews: [
      { id: "rev_13", author: "Отабек", rating: 5, comment: "Работает тихо, охлаждает быстро даже в жару. Установили за один день.", isVerifiedPurchase: true, createdAt: "2026-07-01" },
    ],
    isNew: false,
    isOriginal: true,
    hasLowPriceGuarantee: true,
    salesCount: 73,
    deliveryDays: 3,
  },
  {
    id: "prod_vionic-fan-tower",
    slug: "vionic-fan-tower",
    name: "Вентилятор Vionic Fan Tower",
    shortDescription: "Башенный вентилятор с пультом ДУ и таймером",
    description:
      "Башенный вентилятор Vionic с 3 скоростями обдува, таймером выключения и пультом дистанционного управления. Компактный корпус не занимает много места.",
    categorySlug: "climate",
    brandSlug: "vionic",
    images: images("vionic-fan-tower", "Vionic Fan Tower"),
    variants: [
      { id: "var_vionic-fan", sku: "VNC-FAN-TWR", label: null, attributeName: null, price: 590000, compareAtPrice: null, installmentPrice: null, installmentMonths: null, stock: 31 },
    ],
    specs: [
      { label: "Тип", value: "Башенный" },
      { label: "Скорости", value: "3" },
      { label: "Пульт ДУ", value: "Есть" },
      { label: "Гарантия", value: "12 месяцев" },
    ],
    reviews: [],
    isNew: false,
    isOriginal: false,
    hasLowPriceGuarantee: false,
    salesCount: 41,
    deliveryDays: 2,
  },
  {
    id: "prod_divan-comfort-3seat",
    slug: "divan-comfort-3seat",
    name: "Диван «Комфорт» 3-местный",
    shortDescription: "Раскладной механизм еврокнижка, обивка велюр",
    description:
      "Трёхместный диван «Комфорт» с раскладным механизмом «еврокнижка» и вместительным бельевым ящиком. Обивка — мягкий велюр, устойчивый к истиранию.",
    categorySlug: "furniture",
    brandSlug: "terra",
    images: images("divan-comfort-3seat", "Divan Comfort"),
    variants: [
      { id: "var_divan-grey", sku: "TRR-DVN-GRY", label: "Серый", attributeName: "Цвет", price: 5200000, compareAtPrice: 6000000, installmentPrice: 433400, installmentMonths: 12, stock: 6 },
      { id: "var_divan-beige", sku: "TRR-DVN-BGE", label: "Бежевый", attributeName: "Цвет", price: 5200000, compareAtPrice: 6000000, installmentPrice: 433400, installmentMonths: 12, stock: 4 },
    ],
    specs: [
      { label: "Механизм", value: "Еврокнижка" },
      { label: "Обивка", value: "Велюр" },
      { label: "Размер", value: "210×95×90 см" },
      { label: "Гарантия", value: "18 месяцев" },
    ],
    reviews: [
      { id: "rev_14", author: "Малика", rating: 4, comment: "Красивый и удобный, но сборка заняла время.", isVerifiedPurchase: true, createdAt: "2026-06-08" },
    ],
    isNew: false,
    isOriginal: false,
    hasLowPriceGuarantee: true,
    salesCount: 29,
    deliveryDays: 5,
  },
  {
    id: "prod_kreslo-ergomax",
    slug: "kreslo-ergomax",
    name: "Кресло офисное ErgoMax",
    shortDescription: "Регулировка высоты и наклона, сетчатая спинка",
    description:
      "Эргономичное офисное кресло ErgoMax с сетчатой дышащей спинкой, регулировкой высоты, наклона и подлокотников. Подходит для долгой работы за компьютером.",
    categorySlug: "furniture",
    brandSlug: "vionic",
    images: images("kreslo-ergomax", "Kreslo ErgoMax"),
    variants: [
      { id: "var_kreslo-black", sku: "VNC-CHR-BLK", label: null, attributeName: null, price: 1350000, compareAtPrice: null, installmentPrice: 112500, installmentMonths: 12, stock: 17 },
    ],
    specs: [
      { label: "Материал спинки", value: "Сетка" },
      { label: "Регулировки", value: "Высота, наклон, подлокотники" },
      { label: "Макс. нагрузка", value: "120 кг" },
      { label: "Гарантия", value: "24 месяца" },
    ],
    reviews: [
      { id: "rev_15", author: "Жасур", rating: 5, comment: "Спина больше не болит после 8 часов работы. Рекомендую.", isVerifiedPurchase: true, createdAt: "2026-06-25" },
    ],
    isNew: true,
    isOriginal: true,
    hasLowPriceGuarantee: false,
    salesCount: 88,
    deliveryDays: 2,
  },
  {
    id: "prod_stol-loft",
    slug: "stol-loft",
    name: "Стол письменный «Лофт»",
    shortDescription: "Металлический каркас, столешница из ЛДСП",
    description:
      "Письменный стол в стиле лофт с прочным металлическим каркасом чёрного цвета и столешницей из ЛДСП. Подходит для дома и офиса.",
    categorySlug: "furniture",
    brandSlug: "terra",
    images: images("stol-loft", "Stol Loft"),
    variants: [
      { id: "var_stol-120", sku: "TRR-DSK-120", label: "120 см", attributeName: "Ширина", price: 980000, compareAtPrice: null, installmentPrice: null, installmentMonths: null, stock: 12 },
      { id: "var_stol-140", sku: "TRR-DSK-140", label: "140 см", attributeName: "Ширина", price: 1150000, compareAtPrice: null, installmentPrice: null, installmentMonths: null, stock: 8 },
    ],
    specs: [
      { label: "Каркас", value: "Металл, чёрный" },
      { label: "Столешница", value: "ЛДСП, дуб сонома" },
      { label: "Гарантия", value: "12 месяцев" },
    ],
    reviews: [],
    isNew: false,
    isOriginal: false,
    hasLowPriceGuarantee: false,
    salesCount: 34,
    deliveryDays: 4,
  },
  {
    id: "prod_kurtka-urbanstyle",
    slug: "kurtka-urbanstyle",
    name: "Куртка мужская зимняя UrbanStyle",
    shortDescription: "Утеплитель до -25°C, водоотталкивающая ткань",
    description:
      "Зимняя мужская куртка UrbanStyle с утеплителем, рассчитанным на температуру до -25°C. Верхняя ткань с водоотталкивающей пропиткой, капюшон с мехом на молнии.",
    categorySlug: "men",
    brandSlug: "urbanstyle",
    images: images("kurtka-urbanstyle", "Kurtka Urban"),
    variants: [
      { id: "var_kurtka-s", sku: "URB-JCK-S", label: "S", attributeName: "Размер", price: 620000, compareAtPrice: 780000, installmentPrice: null, installmentMonths: null, stock: 5 },
      { id: "var_kurtka-m", sku: "URB-JCK-M", label: "M", attributeName: "Размер", price: 620000, compareAtPrice: 780000, installmentPrice: null, installmentMonths: null, stock: 9 },
      { id: "var_kurtka-l", sku: "URB-JCK-L", label: "L", attributeName: "Размер", price: 620000, compareAtPrice: 780000, installmentPrice: null, installmentMonths: null, stock: 7 },
      { id: "var_kurtka-xl", sku: "URB-JCK-XL", label: "XL", attributeName: "Размер", price: 650000, compareAtPrice: 810000, installmentPrice: null, installmentMonths: null, stock: 3 },
    ],
    specs: [
      { label: "Утеплитель", value: "Синтепон 300г" },
      { label: "Температура", value: "до -25°C" },
      { label: "Ткань", value: "Водоотталкивающая" },
      { label: "Гарантия", value: "Возврат 14 дней" },
    ],
    reviews: [
      { id: "rev_16", author: "Рустам", rating: 5, comment: "Тёплая, не продувает даже в сильный ветер. Размер соответствует.", isVerifiedPurchase: true, createdAt: "2026-01-15" },
    ],
    isNew: false,
    isOriginal: false,
    hasLowPriceGuarantee: true,
    salesCount: 203,
    deliveryDays: 2,
  },
  {
    id: "prod_jeans-slimfit",
    slug: "jeans-slimfit",
    name: "Джинсы мужские Slim Fit",
    shortDescription: "Стрейч-деним, зауженный крой",
    description:
      "Мужские джинсы приталенного кроя Slim Fit из эластичного денима. Пять карманов, универсальный тёмно-синий цвет подходит к любому образу.",
    categorySlug: "men",
    brandSlug: "urbanstyle",
    images: images("jeans-slimfit", "Jeans Slim"),
    variants: [
      { id: "var_jeans-30", sku: "URB-JNS-30", label: "30", attributeName: "Размер", price: 280000, compareAtPrice: null, installmentPrice: null, installmentMonths: null, stock: 14 },
      { id: "var_jeans-32", sku: "URB-JNS-32", label: "32", attributeName: "Размер", price: 280000, compareAtPrice: null, installmentPrice: null, installmentMonths: null, stock: 19 },
      { id: "var_jeans-34", sku: "URB-JNS-34", label: "34", attributeName: "Размер", price: 280000, compareAtPrice: null, installmentPrice: null, installmentMonths: null, stock: 10 },
    ],
    specs: [
      { label: "Состав", value: "98% хлопок, 2% эластан" },
      { label: "Крой", value: "Slim Fit" },
      { label: "Гарантия", value: "Возврат 14 дней" },
    ],
    reviews: [
      { id: "rev_17", author: "Диёр", rating: 4, comment: "Сидят хорошо, но со временем немного растягиваются.", isVerifiedPurchase: true, createdAt: "2026-05-11" },
    ],
    isNew: false,
    isOriginal: false,
    hasLowPriceGuarantee: false,
    salesCount: 176,
    deliveryDays: 1,
  },
  {
    id: "prod_plate-terra-style",
    slug: "plate-terra-style",
    name: "Платье летнее Terra Style",
    shortDescription: "Лёгкая ткань, свободный крой, миди-длина",
    description:
      "Летнее платье свободного кроя миди-длины из лёгкой дышащей ткани. Идеально для жаркой погоды — не сковывает движения и приятно к телу.",
    categorySlug: "women",
    brandSlug: "terra",
    images: images("plate-terra-style", "Plate Terra"),
    variants: [
      { id: "var_plate-xs", sku: "TRR-DRS-XS", label: "XS", attributeName: "Размер", price: 340000, compareAtPrice: null, installmentPrice: null, installmentMonths: null, stock: 8 },
      { id: "var_plate-s", sku: "TRR-DRS-S", label: "S", attributeName: "Размер", price: 340000, compareAtPrice: null, installmentPrice: null, installmentMonths: null, stock: 12 },
      { id: "var_plate-m", sku: "TRR-DRS-M", label: "M", attributeName: "Размер", price: 340000, compareAtPrice: null, installmentPrice: null, installmentMonths: null, stock: 15 },
      { id: "var_plate-l", sku: "TRR-DRS-L", label: "L", attributeName: "Размер", price: 350000, compareAtPrice: null, installmentPrice: null, installmentMonths: null, stock: 6 },
    ],
    specs: [
      { label: "Состав", value: "100% вискоза" },
      { label: "Длина", value: "Миди" },
      { label: "Гарантия", value: "Возврат 14 дней" },
    ],
    reviews: [
      { id: "rev_18", author: "Камила", rating: 5, comment: "Очень лёгкое и приятное, отлично на лето. Цвет как на фото.", isVerifiedPurchase: true, createdAt: "2026-06-30" },
    ],
    isNew: true,
    isOriginal: false,
    hasLowPriceGuarantee: false,
    salesCount: 145,
    deliveryDays: 1,
  },
  {
    id: "prod_palto-wool",
    slug: "palto-wool",
    name: "Пальто женское шерстяное",
    shortDescription: "Классический крой, утеплённая подкладка",
    description:
      "Женское пальто классического кроя из шерстяной смеси с утеплённой подкладкой. Подходит для прохладной погоды, сочетается с любым гардеробом.",
    categorySlug: "women",
    brandSlug: "urbanstyle",
    images: images("palto-wool", "Palto Wool"),
    variants: [
      { id: "var_palto-s", sku: "URB-CT-S", label: "S", attributeName: "Размер", price: 890000, compareAtPrice: 1100000, installmentPrice: 74200, installmentMonths: 12, stock: 4 },
      { id: "var_palto-m", sku: "URB-CT-M", label: "M", attributeName: "Размер", price: 890000, compareAtPrice: 1100000, installmentPrice: 74200, installmentMonths: 12, stock: 6 },
      { id: "var_palto-l", sku: "URB-CT-L", label: "L", attributeName: "Размер", price: 910000, compareAtPrice: 1130000, installmentPrice: 75800, installmentMonths: 12, stock: 3 },
    ],
    specs: [
      { label: "Состав", value: "70% шерсть, 30% полиэстер" },
      { label: "Подкладка", value: "Утеплённая" },
      { label: "Гарантия", value: "Возврат 14 дней" },
    ],
    reviews: [
      { id: "rev_19", author: "Севара", rating: 5, comment: "Тёплое и элегантное, носится с любой обувью.", isVerifiedPurchase: true, createdAt: "2026-01-20" },
    ],
    isNew: false,
    isOriginal: false,
    hasLowPriceGuarantee: true,
    salesCount: 67,
    deliveryDays: 2,
  },
  {
    id: "prod_konstruktor-kidjoy-350",
    slug: "konstruktor-kidjoy-350",
    name: "Конструктор KidJoy 350 деталей",
    shortDescription: "Развивающий конструктор, совместим с популярными брендами",
    description:
      "Конструктор KidJoy на 350 деталей развивает мелкую моторику и пространственное мышление. Крупные и мелкие блоки совместимы с большинством популярных наборов.",
    categorySlug: "kids",
    brandSlug: "kidjoy",
    images: images("konstruktor-kidjoy-350", "KidJoy 350"),
    variants: [
      { id: "var_konstruktor", sku: "KDJ-BLK-350", label: null, attributeName: null, price: 210000, compareAtPrice: 250000, installmentPrice: null, installmentMonths: null, stock: 55 },
    ],
    specs: [
      { label: "Деталей", value: "350 шт" },
      { label: "Возраст", value: "3+" },
      { label: "Материал", value: "ABS-пластик" },
      { label: "Гарантия", value: "Возврат 14 дней" },
    ],
    reviews: [
      { id: "rev_20", author: "Наргиза", rating: 5, comment: "Ребёнок в восторге, детали крупные и безопасные.", isVerifiedPurchase: true, createdAt: "2026-06-14" },
    ],
    isNew: false,
    isOriginal: true,
    hasLowPriceGuarantee: true,
    salesCount: 231,
    deliveryDays: 1,
  },
  {
    id: "prod_kolyaska-babygo-3in1",
    slug: "kolyaska-babygo-3in1",
    name: "Коляска детская 3в1 BabyGo",
    shortDescription: "Люлька + прогулочный блок + автокресло",
    description:
      "Детская коляска-трансформер BabyGo 3в1 включает люльку для новорождённых, прогулочный блок и автокресло. Большие колёса с амортизацией для комфортной езды по любым покрытиям.",
    categorySlug: "kids",
    brandSlug: "babygo",
    images: images("kolyaska-babygo-3in1", "BabyGo 3v1"),
    variants: [
      { id: "var_kolyaska-grey", sku: "BBG-STR-GRY", label: "Серый", attributeName: "Цвет", price: 3100000, compareAtPrice: 3600000, installmentPrice: 258400, installmentMonths: 12, stock: 9 },
      { id: "var_kolyaska-beige", sku: "BBG-STR-BGE", label: "Бежевый", attributeName: "Цвет", price: 3100000, compareAtPrice: 3600000, installmentPrice: 258400, installmentMonths: 12, stock: 5 },
    ],
    specs: [
      { label: "Комплектация", value: "Люлька + прогулка + автокресло" },
      { label: "Колёса", value: "С амортизацией" },
      { label: "Возраст", value: "0-36 месяцев" },
      { label: "Гарантия", value: "24 месяца" },
    ],
    reviews: [
      { id: "rev_21", author: "Феруза", rating: 5, comment: "Очень манёвренная, легко раскладывается одной рукой.", isVerifiedPurchase: true, createdAt: "2026-05-22" },
      { id: "rev_22", author: "Шохрух", rating: 4, comment: "Качество хорошее, но инструкция могла быть понятнее.", isVerifiedPurchase: true, createdAt: "2026-06-03" },
    ],
    isNew: true,
    isOriginal: true,
    hasLowPriceGuarantee: true,
    salesCount: 62,
    deliveryDays: 3,
  },
  {
    id: "prod_velosiped-detsky-16",
    slug: "velosiped-detsky-16",
    name: "Велосипед детский 16\"",
    shortDescription: "Съёмные боковые колёса, регулируемое сиденье",
    description:
      "Детский велосипед с колёсами 16 дюймов и съёмными боковыми колёсиками для первых поездок. Сиденье и руль регулируются по высоте по мере роста ребёнка.",
    categorySlug: "kids",
    brandSlug: "kidjoy",
    images: images("velosiped-detsky-16", "Velosiped 16"),
    variants: [
      { id: "var_velosiped-red", sku: "KDJ-BIKE16-RED", label: "Красный", attributeName: "Цвет", price: 890000, compareAtPrice: null, installmentPrice: 74200, installmentMonths: 12, stock: 13 },
      { id: "var_velosiped-blue", sku: "KDJ-BIKE16-BLU", label: "Синий", attributeName: "Цвет", price: 890000, compareAtPrice: null, installmentPrice: 74200, installmentMonths: 12, stock: 10 },
    ],
    specs: [
      { label: "Диаметр колёс", value: "16\"" },
      { label: "Возраст", value: "4-6 лет" },
      { label: "Доп. колёса", value: "Съёмные боковые" },
      { label: "Гарантия", value: "12 месяцев" },
    ],
    reviews: [
      { id: "rev_23", author: "Дилшод", rating: 5, comment: "Сын быстро научился кататься, качество сборки хорошее.", isVerifiedPurchase: true, createdAt: "2026-06-17" },
    ],
    isNew: false,
    isOriginal: false,
    hasLowPriceGuarantee: false,
    salesCount: 54,
    deliveryDays: 2,
  },
];
