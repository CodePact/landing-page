"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Stack", href: "#stack" },
  { label: "Por que nós", href: "#diferenciais" },
  { label: "Clientes", href: "#clientes" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300",
            scrolled
              ? "glass border border-border shadow-lg shadow-black/30"
              : "border border-transparent",
          )}
        >
          <a href="#" className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="CodePact Logo"
              className="size-8 rounded-sm pr"
            />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Code<span className="text-muted-foreground">Pact</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#contato"
              className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Falar conosco
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-lg text-foreground md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <div className="glass mt-2 rounded-2xl border border-border p-3 md:hidden">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-foreground px-4 py-3 text-center text-sm font-medium text-background"
              >
                Falar conosco
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
