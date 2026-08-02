export interface PickupPoint {
  id: string;
  name: string;
  citySlug: string;
  address: string;
  workingHours: string;
  phone: string;
}

export const PICKUP_POINTS: PickupPoint[] = [
  { id: "pp_tsk_1", name: "ПВЗ Чиланзар", citySlug: "tashkent", address: "ул. Бунёдкор, 12", workingHours: "09:00–21:00", phone: "+998 71 200 10 10" },
  { id: "pp_tsk_2", name: "ПВЗ Юнусабад", citySlug: "tashkent", address: "массив Юнусабад-4, дом 25", workingHours: "09:00–21:00", phone: "+998 71 200 10 11" },
  { id: "pp_tsk_3", name: "ПВЗ Мирзо-Улугбек", citySlug: "tashkent", address: "ул. Амира Темура, 108", workingHours: "10:00–20:00", phone: "+998 71 200 10 12" },
  { id: "pp_smk_1", name: "ПВЗ Самарканд-Центр", citySlug: "samarkand", address: "ул. Регистан, 5", workingHours: "09:00–20:00", phone: "+998 66 200 10 13" },
  { id: "pp_bxr_1", name: "ПВЗ Бухара-Центр", citySlug: "bukhara", address: "ул. Бахоуддина Накшбанди, 8", workingHours: "09:00–20:00", phone: "+998 65 200 10 14" },
];
