import { adminBanners } from "@/lib/admin-store";
import { BannerManager } from "@/components/admin/BannerManager";

export default function AdminBannersPage() {
  const banners = adminBanners.list();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Баннеры ({banners.length})</h1>
      <BannerManager banners={banners} />
    </div>
  );
}
