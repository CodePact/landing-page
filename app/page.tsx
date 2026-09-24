import { FinalCta } from "@/components/final-cta"
import { Hero } from "@/components/hero"
import { LogoCloud } from "@/components/logo-cloud"
import { Portfolio } from "@/components/portfolio"
import { Services } from "@/components/services"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TechStack } from "@/components/tech-stack"
import { Testimonials } from "@/components/testimonials"
import { WhyChooseUs } from "@/components/why-choose-us"

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
