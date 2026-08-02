export interface CategoryNode {
  id: string;
  slug: string;
  name: { ru: string; uz: string; en: string };
  icon: string; // lucide icon name, resolved in components
  parentSlug: string | null;
  position: number;
  isFeatured: boolean;
}

// Flat list - src/lib/queries.ts builds the tree (parent/children) from this.
export const CATEGORIES: CategoryNode[] = [
  {
    id: "cat_electronics",
    slug: "electronics",
    name: { ru: "Электроника", uz: "Elektronika", en: "Electronics" },
    icon: "Smartphone",
    parentSlug: null,
    position: 0,
    isFeatured: true,
  },
  {
    id: "cat_smartphones",
    slug: "smartphones",
    name: { ru: "Смартфоны", uz: "Smartfonlar", en: "Smartphones" },
    icon: "Smartphone",
    parentSlug: "electronics",
    position: 0,
    isFeatured: false,
  },
  {
    id: "cat_laptops",
    slug: "laptops",
    name: { ru: "Ноутбуки", uz: "Noutbuklar", en: "Laptops" },
    icon: "Laptop",
    parentSlug: "electronics",
    position: 1,
    isFeatured: false,
  },
  {
    id: "cat_headphones",
    slug: "headphones",
    name: { ru: "Наушники", uz: "Quloqchinlar", en: "Headphones" },
    icon: "Headphones",
    parentSlug: "electronics",
    position: 2,
    isFeatured: false,
  },
  {
    id: "cat_home-appliances",
    slug: "home-appliances",
    name: { ru: "Бытовая техника", uz: "Maishiy texnika", en: "Home Appliances" },
    icon: "Refrigerator",
    parentSlug: null,
    position: 1,
    isFeatured: true,
  },
  {
    id: "cat_kitchen",
    slug: "kitchen",
    name: { ru: "Кухонная техника", uz: "Oshxona texnikasi", en: "Kitchen" },
    icon: "CookingPot",
    parentSlug: "home-appliances",
    position: 0,
    isFeatured: false,
  },
  {
    id: "cat_climate",
    slug: "climate",
    name: { ru: "Климатическая техника", uz: "Iqlim texnikasi", en: "Climate" },
    icon: "Fan",
    parentSlug: "home-appliances",
    position: 1,
    isFeatured: false,
  },
  {
    id: "cat_furniture",
    slug: "furniture",
    name: { ru: "Мебель", uz: "Mebel", en: "Furniture" },
    icon: "Sofa",
    parentSlug: null,
    position: 2,
    isFeatured: true,
  },
  {
    id: "cat_fashion",
    slug: "fashion",
    name: { ru: "Модный базар", uz: "Moda bozori", en: "Fashion" },
    icon: "Shirt",
    parentSlug: null,
    position: 3,
    isFeatured: true,
  },
  {
    id: "cat_men",
    slug: "men",
    name: { ru: "Мужская одежда", uz: "Erkaklar kiyimi", en: "Menswear" },
    icon: "Shirt",
    parentSlug: "fashion",
    position: 0,
    isFeatured: false,
  },
  {
    id: "cat_women",
    slug: "women",
    name: { ru: "Женская одежда", uz: "Ayollar kiyimi", en: "Womenswear" },
    icon: "Shirt",
    parentSlug: "fashion",
    position: 1,
    isFeatured: false,
  },
  {
    id: "cat_kids",
    slug: "kids",
    name: { ru: "Детский мир", uz: "Bolalar dunyosi", en: "Kids" },
    icon: "Baby",
    parentSlug: null,
    position: 4,
    isFeatured: true,
  },
];
