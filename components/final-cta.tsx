import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section id="contato" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center md:px-12 md:py-24">
          <div className="grid-pattern pointer-events-none absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute left-1/2 top-0 size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[130px]" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Vamos construir o seu próximo{" "}
              <span className="text-gradient">produto digital</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Conte-nos sobre o seu desafio. Em poucos dias, retornamos com uma
              proposta técnica clara e um plano de execução.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:contato@codepact.com.br"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Falar com a equipe
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#projetos"
                className="inline-flex items-center justify-center rounded-xl border border-border glass px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Ver mais projetos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
