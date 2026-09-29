import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminTable from "./AdminTable";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/dashboard");

  const requests = await prisma.wasteRequest.findMany({
    include: { user: { select: { name: true, email: true } }, category: true },
    orderBy: { createdAt: "desc" },
    take: 100
  });

  const totalKg = requests.reduce((sum, r) => sum + r.quantityKg, 0);
  const totalValue = requests.reduce((sum, r) => sum + r.estimatedValue, 0);

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === "PENDING").length,
    collected: requests.filter(r => r.status === "COLLECTED").length,
    completed: requests.filter(r => r.status === "COMPLETED").length
  };

  return (
    <main className="container-x py-12">
      <p className="text-sm font-bold text-[#14804a]">OPERATIONS</p>
      <h1 className="mt-2 text-4xl font-black">Admin Dashboard</h1>
      <p className="mt-2 muted">Manage requests and monitor platform activity.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <Stat title="Requests" value={String(stats.total)} />
        <Stat title="Pending" value={String(stats.pending)} />
        <Stat title="Collected" value={String(stats.collected)} />
        <Stat title="Completed" value={String(stats.completed)} />
        <Stat title="Waste" value={`${totalKg.toFixed(1)} kg`} />
      </div>

      <div className="card mt-8 p-6">
        <p className="text-sm muted">Estimated value represented by requests</p>
        <p className="mt-1 text-3xl font-black">₹{totalValue.toFixed(0)}</p>
      </div>

      <AdminTable requests={requests.map(r => ({
        id: r.id,
        user: r.user.name,
        email: r.user.email,
        category: r.category.name,
        quantityKg: r.quantityKg,
        estimatedValue: r.estimatedValue,
        status: r.status,
        location: r.location
      }))} />
    </main>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return <div className="card p-5"><p className="text-xs font-bold uppercase tracking-wide muted">{title}</p><p className="mt-2 text-2xl font-black">{value}</p></div>;
}
