export interface Brand {
  id: string;
  name: string;
  slug: string;
}

export const BRANDS: Brand[] = [
  { id: "brand_novex", name: "Novex", slug: "novex" },
  { id: "brand_kaido", name: "Kaido", slug: "kaido" },
  { id: "brand_aurex", name: "Aurex", slug: "aurex" },
  { id: "brand_vionic", name: "Vionic", slug: "vionic" },
  { id: "brand_brightline", name: "Brightline", slug: "brightline" },
  { id: "brand_solace", name: "Solace", slug: "solace" },
  { id: "brand_terra", name: "Terra", slug: "terra" },
  { id: "brand_urbanstyle", name: "UrbanStyle", slug: "urbanstyle" },
  { id: "brand_kidjoy", name: "KidJoy", slug: "kidjoy" },
  { id: "brand_babygo", name: "BabyGo", slug: "babygo" },
];
