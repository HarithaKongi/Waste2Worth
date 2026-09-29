import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="border-b border-[#e2eae5] bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tight text-[#14804a]">
          Waste2Worth
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold">
          <Link href="/" className="hidden sm:block">Home</Link>
          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              {user.role === "ADMIN" && <Link href="/admin">Admin</Link>}
              <a href="/api/auth/logout" className="btn-secondary">Logout</a>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register" className="btn-primary">Get Started</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
