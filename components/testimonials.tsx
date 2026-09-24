type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "A CodePact reconstruiu nossa plataforma do zero e o resultado superou todas as metas. Performance e estabilidade impecáveis.",
    name: "Marina Costa",
    role: "CTO, NovaBank",
    initials: "MC",
  },
  {
    quote:
      "Times altamente técnicos e comunicação transparente. Entregaram exatamente o que prometeram, no prazo combinado.",
    name: "Rafael Andrade",
    role: "VP Eng., Atlas Logistics",
    initials: "RA",
  },
  {
    quote:
      "A arquitetura que projetaram nos permitiu escalar 5x sem dor de cabeça. Parceria essencial para o nosso crescimento.",
    name: "Juliana Reis",
    role: "Head of Product, Helix Health",
    initials: "JR",
  },
]

export function Testimonials() {
  return (
    <section id="clientes" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-accent">Clientes</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Confiança construída com resultados
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/30"
            >
              <blockquote className="text-pretty leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-accent">
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
