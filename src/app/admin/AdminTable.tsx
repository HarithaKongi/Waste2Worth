"use client";

import { useState } from "react";

type Request = {
  id: string; user: string; email: string; category: string;
  quantityKg: number; estimatedValue: number; status: string; location: string;
};

export default function AdminTable({ requests }: { requests: Request[] }) {
  const [items, setItems] = useState(requests);
  const [busy, setBusy] = useState("");

  async function update(id: string, status: string) {
    setBusy(id);
    const res = await fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (res.ok) setItems(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    setBusy("");
  }

  return (
    <section className="card mt-8 overflow-hidden">
      <div className="border-b border-[#e2eae5] p-6"><h2 className="text-xl font-black">Collection Requests</h2></div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-[#f7faf8] text-xs uppercase tracking-wide muted">
            <tr><th className="p-4">User</th><th>Waste</th><th>Qty</th><th>Value</th><th>Location</th><th>Status</th></tr>
          </thead>
          <tbody className="divide-y divide-[#e2eae5]">
            {items.map(r => (
              <tr key={r.id}>
                <td className="p-4"><p className="font-bold">{r.user}</p><p className="text-xs muted">{r.email}</p></td>
                <td>{r.category}</td>
                <td>{r.quantityKg} kg</td>
                <td>₹{r.estimatedValue.toFixed(0)}</td>
                <td>{r.location}</td>
                <td className="pr-4">
                  <select disabled={busy === r.id} value={r.status} onChange={e => update(r.id, e.target.value)} className="rounded-lg border border-[#d7e2db] bg-white p-2 text-xs font-bold">
                    <option value="PENDING">Pending</option>
                    <option value="COLLECTED">Collected</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
