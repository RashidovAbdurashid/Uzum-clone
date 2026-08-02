"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { updateUserRoleAction, updateUserStatusAction } from "@/actions/admin";
import type { RoleType } from "@/constants/roles";

const ROLE_OPTIONS: RoleType[] = ["CUSTOMER", "SELLER", "MODERATOR", "ADMIN", "SUPER_ADMIN"];

export function UserActions({
  userId,
  role,
  status,
}: {
  userId: string;
  role: RoleType;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
}) {
  const [isPending, startTransition] = useTransition();

  function handleRoleChange(next: RoleType) {
    startTransition(async () => {
      const res = await updateUserRoleAction(userId, next);
      if (!res.ok) toast.error(res.error);
      else toast.success("Роль обновлена");
    });
  }

  function toggleBlock() {
    startTransition(async () => {
      const res = await updateUserStatusAction(userId, status === "ACTIVE" ? "BLOCKED" : "ACTIVE");
      if (!res.ok) toast.error(res.error);
      else toast.success(status === "ACTIVE" ? "Пользователь заблокирован" : "Пользователь разблокирован");
    });
  }

  return (
    <div className="flex items-center gap-2">
      <select
        disabled={isPending}
        value={role}
        onChange={(e) => handleRoleChange(e.target.value as RoleType)}
        className="rounded-lg border border-gray-300 px-2 py-1 text-xs outline-none focus:border-brand disabled:opacity-50"
      >
        {ROLE_OPTIONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <button
        disabled={isPending}
        onClick={toggleBlock}
        className={`rounded-lg px-2 py-1 text-xs font-medium disabled:opacity-50 ${
          status === "ACTIVE" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
        }`}
      >
        {status === "ACTIVE" ? "Заблокировать" : "Разблокировать"}
      </button>
    </div>
  );
}
