import { ArrowRight, Play } from "lucide-react";

import { InteractiveOrb } from "./interactive-orb";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-pattern absolute inset-0 opacity-60 mask-[radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="animate-glow absolute left-1/2 top-0 -z-10 size-160 -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/25 blur-[140px]" />
        <div className="animate-glow absolute right-[10%] top-1/3 size-105 rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" />
              Engenharia de software de alto nível
            </div>

            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Construímos software{" "}
              <span className="text-gradient">escalável</span> para negócios
              ambiciosos.
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Da arquitetura à entrega, projetamos sistemas rápidos, seguros e
              preparados para crescer. Transformamos ideias complexas em
              produtos digitais confiáveis.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contato"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all hover:opacity-90"
              >
                Inicie seu projeto
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#projetos"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border glass px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <Play className="size-4 text-accent" />
                Ver projetos
              </a>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {[
                { v: "99.9%", l: "Uptime médio" },
                { v: "8 anos", l: "De experiência" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="text-2xl font-semibold tracking-tight text-foreground">
                    {s.v}
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <InteractiveOrb />
        </div>
      </div>
    </section>
  );
}
