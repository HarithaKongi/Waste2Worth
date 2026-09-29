import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const requests = await prisma.wasteRequest.findMany({
    where: { userId: user.id },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 20
  });

  const totals = requests.reduce((a, r) => ({
    kg: a.kg + r.quantityKg,
    value: a.value + r.estimatedValue
  }), { kg: 0, value: 0 });

  const completed = requests.filter(r => r.status === "COMPLETED").length;

  return (
    <main className="container-x py-12">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold text-[#14804a]">YOUR DASHBOARD</p>
          <h1 className="mt-2 text-4xl font-black">Welcome, {user.name}</h1>
          <p className="mt-2 muted">Track your recycling journey in one place.</p>
        </div>
        <Link href="/submit" className="btn-primary">+ Submit Waste</Link>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Stat title="Total Waste" value={`${totals.kg.toFixed(1)} kg`} />
        <Stat title="Estimated Value" value={`₹${totals.value.toFixed(0)}`} />
        <Stat title="Completed Requests" value={String(completed)} />
      </div>

      <section className="card mt-8 overflow-hidden">
        <div className="border-b border-[#e2eae5] p-6">
          <h2 className="text-xl font-black">Recent Requests</h2>
        </div>
        {requests.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-bold">No recycling requests yet.</p>
            <p className="mt-2 text-sm muted">Submit your first request to start tracking impact.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#e2eae5]">
            {requests.map(r => (
              <Link href={`/requests/${r.id}`} key={r.id} className="grid gap-2 p-6 transition hover:bg-[#f7faf8] sm:grid-cols-4">
                <div><p className="font-bold">{r.category.name}</p><p className="text-xs muted">{r.quantityKg} kg</p></div>
                <div><p className="font-bold">₹{r.estimatedValue.toFixed(0)}</p><p className="text-xs muted">Estimated</p></div>
                <div><p className="text-sm font-semibold">{r.location}</p><p className="text-xs muted">Location</p></div>
                <div className="sm:text-right"><Status status={r.status} /></div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return <div className="card p-6"><p className="text-sm muted">{title}</p><p className="mt-2 text-3xl font-black">{value}</p></div>;
}

function Status({ status }: { status: string }) {
  return <span className="inline-flex rounded-full bg-[#eff7f1] px-3 py-1 text-xs font-bold capitalize text-[#12633a]">{status.toLowerCase()}</span>;
}
