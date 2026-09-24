import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type Project = {
  image: string;
  name: string;
  description: string;
  tech: string[];
  impact: string;
};

const projects: Project[] = [
  {
    image: "/fluxusmed-ai.png",
    name: "Fluxusmed AI",
    description:
      "Projeto de inteligência artificial para otimização de processos médicos. Sendo o primeiro do gênero no mercado.",
    tech: ["React", "TypeScript", "Terraform", "Python", "Docker", "FastAPI"],
    impact: "+90% de precisão nos diagnósticos médicos.",
  },
  {
    image: "/project-logistics.png",
    name: "Atlas Logistics — Supply Chain",
    description:
      "Sistema de rastreamento e otimização de rotas com pipelines de dados integrados a múltiplas transportadoras.",
    tech: ["React", "TypeScript", "Docker", "MongoDB"],
    impact: "Redução de 28% nos custos de entrega no primeiro ano.",
  },
  {
    image: "/project-health.png",
    name: "Helix Health — Sistema Corporativo",
    description:
      "Plataforma de gestão clínica integrada com prontuários, agendamentos e analytics de operação.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    impact: "Atendimentos 35% mais ágeis e zero downtime em produção.",
  },
];

export function Portfolio() {
  return (
    <section id="projetos" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-accent">Projetos</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Resultados que falam por si
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Uma seleção de produtos que projetamos, construímos e escalamos
            junto aos nossos clientes.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-6">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className="group grid items-center gap-8 overflow-hidden rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/30 md:p-8 lg:grid-cols-2"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-border">
                  <Image
                    src={p.image || "/placeholder.svg"}
                    alt={`Interface do projeto ${p.name}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {p.name}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {p.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <ArrowUpRight className="size-4" />
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    {p.impact}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
