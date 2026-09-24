const clients = [
  "NovaBank",
  "Atlas Logistics",
  "Helix Health",
  "Quantum Retail",
  "Vela Energy",
  "Orbit Media",
];

export function LogoCloud() {
  return (
    <section className="border-y border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Empresas que confiam na CodePact
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {clients.map((c) => (
            <span
              key={c}
              className="text-lg font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
