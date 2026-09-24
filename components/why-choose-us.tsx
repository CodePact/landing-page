import {
  Code2,
  Gauge,
  Layers,
  type LucideIcon,
  Rocket,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"

type Reason = {
  icon: LucideIcon
  title: string
  description: string
}

const reasons: Reason[] = [
  {
    icon: Layers,
    title: "Arquitetura Limpa",
    description: "Código organizado em camadas claras, fácil de evoluir e testar.",
  },
  {
    icon: Gauge,
    title: "Performance",
    description: "Aplicações otimizadas para velocidade percebida e custo eficiente.",
  },
  {
    icon: TrendingUp,
    title: "Escalabilidade",
    description: "Sistemas que crescem com o seu negócio sem reescrever do zero.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança",
    description: "Boas práticas e validação rigorosa em cada camada da aplicação.",
  },
  {
    icon: Rocket,
    title: "Entrega Rápida",
    description: "Ciclos curtos e iterativos que colocam valor em produção logo.",
  },
  {
    icon: Code2,
    title: "Código Sustentável",
    description: "Documentação e padrões que tornam a manutenção previsível.",
  },
]

export function WhyChooseUs() {
  return (
    <section id="diferenciais" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-sm font-medium text-accent">Por que a CodePact</span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Excelência técnica em cada detalhe
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Não entregamos apenas código — entregamos confiança, previsibilidade e tecnologia preparada para o longo prazo.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="group bg-card p-6 transition-colors hover:bg-secondary/40"
              >
                <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-secondary text-accent">
                  <r.icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
