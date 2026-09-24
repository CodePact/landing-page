import {
  Building2,
  Cloud,
  Database,
  Globe,
  type LucideIcon,
  Plug,
  Server,
  Workflow,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: Globe,
    title: "Desenvolvimento Web",
    description:
      "Aplicações web modernas, rápidas e responsivas com as melhores tecnologias do mercado.",
  },
  {
    icon: Server,
    title: "APIs & Backend",
    description:
      "Serviços robustos, documentados e escaláveis para sustentar produtos de alto tráfego.",
  },
  {
    icon: Database,
    title: "ETL & Pipelines de Dados",
    description:
      "Ingestão, transformação e orquestração de dados confiáveis em larga escala.",
  },
  {
    icon: Building2,
    title: "Sistemas Corporativos",
    description:
      "Plataformas internas sob medida que organizam e aceleram operações complexas.",
  },
  {
    icon: Workflow,
    title: "Soluções de Automação",
    description:
      "Fluxos automatizados que eliminam tarefas manuais e reduzem custos operacionais.",
  },
  {
    icon: Cloud,
    title: "Arquitetura em Nuvem",
    description:
      "Infraestrutura resiliente, observável e otimizada em custo na AWS e além.",
  },
  {
    icon: Plug,
    title: "Integração de Sistemas",
    description:
      "Conectamos ferramentas, ERPs e serviços para um ecossistema único e coeso.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-accent">Serviços</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Capacidades completas de engenharia
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Cobrimos todo o ciclo de vida do produto digital — do conceito à
            operação em produção.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:bg-secondary/40"
            >
              <div className="absolute -right-12 -top-12 size-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-secondary text-accent transition-colors group-hover:border-primary/40">
                <s.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </div>
          ))}
          <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-accent/10 p-6">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Precisa de algo sob medida?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Montamos times dedicados para desafios técnicos específicos do seu
              negócio.
            </p>
            <a
              href="#contato"
              className="mt-4 text-sm font-medium text-accent hover:underline"
            >
              Conversar com a equipe →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
