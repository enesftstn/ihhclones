import { HeroCarousel } from "@/components/hero-carousel"
import { CampaignGrid } from "@/components/campaign-grid"
import { NewsSection } from "@/components/news-section"
import { ImpactStories } from "@/components/impact-stories"
import { ProjectSection } from "@/components/project-section"
import { CallToAction } from "@/components/call-to-action"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroCarousel />
      <CampaignGrid />
      <NewsSection />
      <ImpactStories />
      <ProjectSection />
      <CallToAction />
    </main>
  )
}
