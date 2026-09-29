import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="container-x flex min-h-[calc(100vh-128px)] items-center justify-center py-16">
      <form action="/api/auth/register" method="post" className="card w-full max-w-md p-8">
        <h1 className="text-3xl font-black">Create your account</h1>
        <p className="mt-2 muted">Start turning waste into measurable impact.</p>
        <label className="mt-7 block text-sm font-bold">Full name</label>
        <input className="input mt-2" name="name" required minLength={2} placeholder="Your name" />
        <label className="mt-5 block text-sm font-bold">Email</label>
        <input className="input mt-2" name="email" type="email" required placeholder="you@example.com" />
        <label className="mt-5 block text-sm font-bold">Password</label>
        <input className="input mt-2" name="password" type="password" required minLength={8} placeholder="At least 8 characters" />
        <button className="btn-primary mt-7 w-full" type="submit">Create Account</button>
        <p className="mt-5 text-center text-sm muted">Already registered? <Link className="font-bold text-[#14804a]" href="/login">Sign in</Link></p>
      </form>
    </main>
  );
}
