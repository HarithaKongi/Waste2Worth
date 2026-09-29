import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SubmitForm from "./SubmitForm";

export default async function SubmitPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const categories = await prisma.wasteCategory.findMany({ orderBy: { name: "asc" } });
  return (
    <main className="container-x py-12">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-bold text-[#14804a]">NEW REQUEST</p>
        <h1 className="mt-2 text-4xl font-black">Submit recyclable waste</h1>
        <p className="mt-2 muted">Enter your waste details to calculate an estimated value.</p>
        <SubmitForm categories={categories} />
      </div>
    </main>
  );
}
