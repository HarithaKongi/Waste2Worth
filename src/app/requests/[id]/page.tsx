import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const steps = ["PENDING", "COLLECTED", "COMPLETED"];

export default async function RequestPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const { id } = await params;

  const request = await prisma.wasteRequest.findUnique({
    where: { id },
    include: { category: true, events: { orderBy: { createdAt: "asc" } } }
  });

  if (!request || (request.userId !== user.id && user.role !== "ADMIN")) notFound();

  const activeIndex = steps.indexOf(request.status);

  return (
    <main className="container-x py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold text-[#14804a]">REQUEST TRACKING</p>
        <h1 className="mt-2 text-4xl font-black">W2W-{request.id.slice(-6).toUpperCase()}</h1>
        <div className="card mt-8 p-7">
          <div className="grid gap-5 sm:grid-cols-3">
            <Info title="Waste" value={request.category.name} />
            <Info title="Quantity" value={`${request.quantityKg} kg`} />
            <Info title="Estimated value" value={`₹${request.estimatedValue.toFixed(0)}`} />
          </div>
          <div className="mt-10 space-y-5">
            {steps.map((step, index) => (
              <div className="flex items-start gap-4" key={step}>
                <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${index <= activeIndex ? "bg-[#14804a] text-white" : "bg-[#e7eee9] text-[#789084]"}`}>
                  {index <= activeIndex ? "✓" : index + 1}
                </div>
                <div>
                  <p className="font-black capitalize">{step.toLowerCase()}</p>
                  <p className="text-sm muted">
                    {step === "PENDING" ? "Request submitted and awaiting collection." :
                     step === "COLLECTED" ? "Your waste has been collected." :
                     "Request completed and recorded in your impact history."}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-[#e2eae5] pt-6">
            <p className="text-sm font-bold">Location</p>
            <p className="mt-1 muted">{request.location}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return <div><p className="text-xs font-bold uppercase tracking-wide muted">{title}</p><p className="mt-1 text-xl font-black">{value}</p></div>;
}
