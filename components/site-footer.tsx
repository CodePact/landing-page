import { AtSign, Link2, Globe } from "lucide-react";

const columns = [
  {
    title: "Serviços",
    links: [
      "Desenvolvimento Web",
      "APIs & Backend",
      "Arquitetura em Nuvem",
      "Automação",
    ],
  },
];

const socials = [
  { icon: Globe, label: "Website", href: "#" },
  { icon: Link2, label: "LinkedIn", href: "#" },
  { icon: AtSign, label: "Contato", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m8 6-6 6 6 6" />
                  <path d="m16 6 6 6-6 6" />
                </svg>
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Code<span className="text-muted-foreground">Pact</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Software escalável e confiável para negócios ambiciosos.
              Engenharia de ponta a ponta.
            </p>
            <div className="mt-6 space-y-1 text-sm text-muted-foreground">
              <p>contato@codepact.dev</p>
              <p>+55 11 4000-0000</p>
              <p>São Paulo, Brasil</p>
            </div>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CodePact. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
