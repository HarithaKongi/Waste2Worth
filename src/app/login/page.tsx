import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="container-x flex min-h-[calc(100vh-128px)] items-center justify-center py-16">
      <form action="/api/auth/login" method="post" className="card w-full max-w-md p-8">
        <h1 className="text-3xl font-black">Welcome back</h1>
        <p className="mt-2 muted">Sign in to manage your recycling requests.</p>
        <label className="mt-7 block text-sm font-bold">Email</label>
        <input className="input mt-2" name="email" type="email" required placeholder="you@example.com" />
        <label className="mt-5 block text-sm font-bold">Password</label>
        <input className="input mt-2" name="password" type="password" required placeholder="••••••••" />
        <button className="btn-primary mt-7 w-full" type="submit">Sign In</button>
        <p className="mt-5 text-center text-sm muted">No account? <Link className="font-bold text-[#14804a]" href="/register">Create one</Link></p>
      </form>
    </main>
  );
}
