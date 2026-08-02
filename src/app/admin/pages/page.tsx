import { FileText } from "lucide-react";

export default function AdminPagesPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Управление контентом</h1>
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
        <FileText className="text-gray-300" size={32} />
        <p className="text-gray-500">Раздел ещё не реализован в этой сборке.</p>
        <p className="max-w-md text-sm text-gray-400">
          Планируется: WYSIWYG-редактор для статических страниц (О нас, Контакты, Условия),
          CRUD для FAQ и мета-теги SEO на каждую страницу.
        </p>
      </div>
    </div>
  );
}
