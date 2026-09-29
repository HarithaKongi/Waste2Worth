"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Category = { id: string; name: string; pricePerKg: number; description: string };

export default function SubmitForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [quantity, setQuantity] = useState("1");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selected = categories.find(c => c.id === categoryId);
  const value = useMemo(() => {
    const n = Number(quantity);
    return selected && n > 0 ? n * selected.pricePerKg : 0;
  }, [quantity, selected]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId, quantityKg: Number(quantity), location })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to submit request.");
      router.push(`/requests/${data.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="card mt-8 p-7">
      {error && <div className="mb-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
      <label className="block text-sm font-bold">Waste category</label>
      <select className="input mt-2" value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
        {categories.map(c => <option key={c.id} value={c.id}>{c.name} — ₹{c.pricePerKg}/kg</option>)}
      </select>
      <p className="mt-2 text-xs muted">{selected?.description}</p>

      <label className="mt-6 block text-sm font-bold">Quantity (kg)</label>
      <input className="input mt-2" type="number" min="0.1" step="0.1" value={quantity} onChange={e => setQuantity(e.target.value)} required />

      <label className="mt-6 block text-sm font-bold">Collection location</label>
      <input className="input mt-2" value={location} onChange={e => setLocation(e.target.value)} placeholder="Area, city or pickup point" required />

      <div className="mt-7 rounded-2xl bg-[#effaf3] p-5">
        <p className="text-sm font-semibold text-[#12633a]">Estimated value</p>
        <p className="mt-1 text-3xl font-black text-[#14804a]">₹{value.toFixed(0)}</p>
        <p className="mt-1 text-xs muted">Final value can vary based on actual material and collection assessment.</p>
      </div>

      <button className="btn-primary mt-7 w-full" disabled={loading}>{loading ? "Submitting..." : "Create Collection Request"}</button>
    </form>
  );
}
