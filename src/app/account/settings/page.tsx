import { auth } from "@/lib/auth";
import { mockDb } from "@/lib/mock-db";
import { ChangePasswordForm } from "@/components/account/ChangePasswordForm";

export default async function AccountSettingsPage() {
  const session = await auth();
  const user = session?.user ? await mockDb.users.findById(session.user.id) : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4 text-xl font-bold text-gray-900">Настройки</h1>
        <div className="max-w-sm rounded-xl border border-gray-200 bg-white p-5">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Язык</dt>
              <dd className="font-medium text-gray-900">Русский</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Город</dt>
              <dd className="font-medium text-gray-900">Ташкент</dd>
            </div>
          </dl>
          <p className="mt-2 text-xs text-gray-400">Смена языка — переключатель флагов в шапке сайта.</p>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          {user?.passwordHash ? "Смена пароля" : "Установить пароль"}
        </h2>
        <p className="mb-4 text-sm text-gray-500">
          {user?.passwordHash
            ? "Пароль используется для входа по email на странице /login."
            : "У вашего аккаунта пока нет пароля — можно войти только по телефону через OTP. Установите пароль, чтобы также иметь возможность входить по email."}
        </p>
        <ChangePasswordForm hasPassword={!!user?.passwordHash} />
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold text-gray-900">Удаление аккаунта</h2>
        <button
          disabled
          title="Не реализовано в этой сборке"
          className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-400"
        >
          Удалить аккаунт
        </button>
      </div>
    </div>
  );
}
