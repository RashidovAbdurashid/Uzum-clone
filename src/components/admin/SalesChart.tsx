"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export function SalesChart({ data }: { data: { day: string; total: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f4" />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6b7280" }} />
        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
        <Tooltip formatter={(value: number) => value.toLocaleString("ru-RU") + " сўм"} />
        <Bar dataKey="total" fill="#5232e0" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
