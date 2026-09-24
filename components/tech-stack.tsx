const icons = {
  angular: "/icons/angular.svg",
  ansible: "/icons/ansible.svg",
  aws: "/icons/aws.svg",
  cucumber: "/icons/cucumber.svg",
  cypress: "/icons/cypress.svg",
  docker: "/icons/docker.svg",
  gcp: "/icons/gcp.svg",
  git: "/icons/git.svg",
  jest: "/icons/jest.svg",
  kafka: "/icons/kafka.svg",
  mongodb: "/icons/mongodb.svg",
  nextjs: "/icons/nextjs.svg",
  nodejs: "/icons/nodejs.svg",
  postgresql: "/icons/postgresql.svg",
  react: "/icons/react.svg",
  redis: "/icons/redis.svg",
  terraform: "/icons/terraform.svg",
  typescript: "/icons/typescript.svg",
  vue: "/icons/vue.svg",
};

const stack = [
  { name: "Angular", icon: icons.angular },
  { name: "Ansible", icon: icons.ansible },
  { name: "AWS", icon: icons.aws },
  { name: "Cucumber", icon: icons.cucumber },
  { name: "Cypress", icon: icons.cypress },
  { name: "Docker", icon: icons.docker },
  { name: "GCP", icon: icons.gcp },
  { name: "Git", icon: icons.git },
  { name: "Jest", icon: icons.jest },
  { name: "Kafka", icon: icons.kafka },
  { name: "MongoDB", icon: icons.mongodb },
  { name: "Next.js", icon: icons.nextjs },
  { name: "Node.js", icon: icons.nodejs },
  { name: "PostgreSQL", icon: icons.postgresql },
  { name: "React", icon: icons.react },
  { name: "Redis", icon: icons.redis },
  { name: "Terraform", icon: icons.terraform },
  { name: "TypeScript", icon: icons.typescript },
  { name: "Vue", icon: icons.vue },
];

export function TechStack() {
  return (
    <section id="stack" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-accent">Tecnologias</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Uma stack moderna e comprovada
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Selecionamos ferramentas que equilibram performance, produtividade e
            longevidade.
          </p>
        </div>

        <div className="relative mt-14 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee-left gap-3 running hover:paused">
            {[...stack, ...stack].map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="group relative flex w-40 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-card px-4 py-6 text-center transition-all hover:border-primary/40 hover:bg-secondary/50"
              >
                <img
                  src={tech.icon}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute size-14 opacity-10 grayscale transition-all duration-500 ease-out group-hover:scale-120 -rotate-6 -translate-x-1/1 group-hover:-translate-x-4/5 group-hover:rotate-0 group-hover:opacity-60 group-hover:grayscale-0"
                />
                <span className="relative text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
