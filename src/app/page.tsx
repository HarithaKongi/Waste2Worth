import Link from "next/link";

const categories = [
  ["Plastic", "₹20/kg", "Bottles, containers and clean recyclable plastics."],
  ["Paper", "₹12/kg", "Cardboard, newspapers and recyclable paper."],
  ["Metal", "₹45/kg", "Aluminium, steel and other recyclable metals."],
  ["E-Waste", "₹80/kg", "Small electronic items and components."]
];

export default function Home() {
  return (
    <main>
      <section className="bg-gradient-to-br from-[#effbf3] via-white to-[#e7f8ee]">
        <div className="container-x grid min-h-[610px] items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-[#dff7e9] px-4 py-2 text-sm font-bold text-[#12633a]">
              ♻ Sustainability, made actionable
            </span>
            <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl">
              Turn waste into <span className="text-[#14804a]">worth.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 muted">
              Submit recyclable waste, estimate its value, request collection and track your impact in one simple platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="btn-primary">Start Recycling</Link>
              <Link href="#how-it-works" className="btn-secondary">How It Works</Link>
            </div>
          </div>
          <div className="card overflow-hidden bg-[#10231b] p-6 text-white">
            <p className="text-sm text-emerald-200">WASTEWORTH IMPACT</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["12,450 kg", "Waste tracked"],
                ["₹3.2L", "Estimated value"],
                ["2,840", "Requests completed"],
                ["5", "Waste categories"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-white/10 p-5">
                  <p className="text-2xl font-black">{value}</p>
                  <p className="mt-1 text-sm text-white/65">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-[#14804a] p-5">
              <p className="text-sm text-white/75">CORE LOOP</p>
              <p className="mt-2 font-bold">Submit → Value → Collect → Impact</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="container-x py-20">
        <div className="max-w-2xl">
          <p className="font-bold text-[#14804a]">HOW IT WORKS</p>
          <h2 className="mt-2 text-3xl font-black">Four simple steps.</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            ["01", "Submit", "Tell us what recyclable waste you have."],
            ["02", "Estimate", "Get an instant estimated value."],
            ["03", "Collect", "Create and track your collection request."],
            ["04", "Impact", "See your recycling contribution over time."]
          ].map(([n, title, body]) => (
            <div className="card p-6" key={n}>
              <span className="text-sm font-black text-[#14804a]">{n}</span>
              <h3 className="mt-5 text-xl font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-x">
          <p className="font-bold text-[#14804a]">WASTE CATEGORIES</p>
          <h2 className="mt-2 text-3xl font-black">Know the value of what you recycle.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(([name, price, description]) => (
              <div className="card p-6" key={name}>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">♻</span>
                  <span className="rounded-full bg-[#effaf3] px-3 py-1 text-xs font-bold text-[#14804a]">{price}</span>
                </div>
                <h3 className="mt-6 text-xl font-black">{name}</h3>
                <p className="mt-2 text-sm leading-6 muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="rounded-3xl bg-[#14804a] p-10 text-white sm:p-14">
          <h2 className="max-w-2xl text-4xl font-black">Your waste has value. Start tracking it.</h2>
          <p className="mt-4 max-w-xl text-white/80">Create a free account and make your first recycling request.</p>
          <Link href="/register" className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-[#12633a]">Create Account</Link>
        </div>
      </section>
    </main>
  );
}
