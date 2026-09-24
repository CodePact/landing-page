import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { LogoCloud } from "@/components/logo-cloud"
import { Services } from "@/components/services"
import { Portfolio } from "@/components/portfolio"
import { TechStack } from "@/components/tech-stack"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Testimonials } from "@/components/testimonials"
import { FinalCta } from "@/components/final-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <LogoCloud />
        <Services />
        <Portfolio />
        <TechStack />
        <WhyChooseUs />
        <Testimonials />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
