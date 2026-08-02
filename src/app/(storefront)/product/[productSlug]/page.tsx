import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, getCategoryBreadcrumb, getBrandBySlug } from "@/lib/queries";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductRow } from "@/components/product/ProductRow";

export default async function ProductPage({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product) notFound();

  const [breadcrumb, related, brand] = await Promise.all([
    getCategoryBreadcrumb(product.categorySlug),
    getRelatedProducts(product),
    getBrandBySlug(product.brandSlug),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand">
          Главная
        </Link>
        {breadcrumb.map((c) => (
          <span key={c.slug} className="flex items-center gap-1">
            <span>/</span>
            <Link href={`/catalog/${c.slug}`} className="hover:text-brand">
              {c.name.ru}
            </Link>
          </span>
        ))}
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} />

        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="mb-4 text-sm text-gray-500">
            Продавец: <span className="font-medium text-gray-700">{brand?.name}</span>
          </p>
          <p className="mb-6 text-sm text-gray-600">{product.shortDescription}</p>
          <ProductPurchasePanel product={product} />
        </div>
      </div>

      <ProductTabs product={product} />

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Похожие товары</h2>
          <ProductRow items={related} />
        </section>
      )}
    </div>
  );
}
