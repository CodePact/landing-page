const stack = [
  "Node.js",
  "React",
  "Next.js",
  "Docker",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "TypeScript",
]

export function TechStack() {
  return (
    <section id="stack" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-accent">Tecnologias</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Uma stack moderna e comprovada
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Selecionamos ferramentas que equilibram performance, produtividade e longevidade.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stack.map((tech) => (
            <div
              key={tech}
              className="group flex items-center justify-center rounded-xl border border-border bg-card px-4 py-6 text-center transition-all hover:border-primary/40 hover:bg-secondary/50"
            >
              <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
