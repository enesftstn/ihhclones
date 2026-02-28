"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

const projects = [
  {
    title: "Hearing Screening Program",
    location: "Syria",
    description: "With your donations, we can provide hearing screening for hundreds of children in Syria.",
    raised: 4254.91,
    goal: 40000,
    supporters: 1029,
    currency: "$",
  },
  {
    title: "30,000 Tree Campaign",
    location: "Turkey",
    description: "With your support, 30,000 saplings will be planted across Turkey.",
    raised: 20242.52,
    goal: 42800,
    supporters: 2935,
    currency: "$",
  },
  {
    title: "Computer Lab for Deaf Students",
    location: "Burundi",
    description: "We're establishing a computer lab at an education center for hearing-impaired students.",
    raised: 2734.75,
    goal: 6400,
    supporters: 497,
    currency: "€",
  },
]

export function ProjectSection() {
  const router = useRouter()
  const { language } = useLanguage()

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-4xl font-bold text-foreground">
            {language === "tr" ? "Bir Projeyi Fonla" : "Fund a Project"}
          </h2>
          <p className="text-xl text-muted-foreground">
            {language === "tr" ? "Destekle ve umudu hayata geçir!" : "Support it and bring hope to life!"}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const percentage = (project.raised / project.goal) * 100
            return (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6">
                  <div className="mb-2 text-sm font-semibold text-accent">{project.location}</div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground text-balance">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{project.description}</p>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="mb-2 flex items-baseline justify-between">
                      <div>
                        <span className="text-2xl font-bold text-foreground">
                          {project.currency}
                          {project.raised.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {" "}
                          / {project.currency}
                          {project.goal.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-lg font-semibold text-accent">{percentage.toFixed(2)}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                  <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {project.supporters.toLocaleString()}{" "}
                      {language === "tr" ? "kişi bu projeyi destekledi" : "people supported this project"}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => router.push(`/donate?campaign=${encodeURIComponent(project.title)}`)}
                  >
                    {language === "tr" ? "Bu Projeyi Destekle" : "Support This Project"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/projects">
            <Button variant="outline" size="lg">
              {language === "tr" ? "Tüm Projeleri Görüntüle" : "View All Projects"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
