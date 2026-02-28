"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Heart } from "lucide-react"

interface ProjectLocation {
  id: string
  name: string
  country: string
  coordinates: { x: number; y: number }
  activeProjects: number
  beneficiaries: number
  category: string
}

const PROJECT_LOCATIONS: ProjectLocation[] = [
  {
    id: "1",
    name: "Gaza",
    country: "Palestine",
    coordinates: { x: 52, y: 48 },
    activeProjects: 12,
    beneficiaries: 45000,
    category: "emergency",
  },
  {
    id: "2",
    name: "Idlib",
    country: "Syria",
    coordinates: { x: 51, y: 45 },
    activeProjects: 8,
    beneficiaries: 32000,
    category: "humanitarian",
  },
  {
    id: "3",
    name: "Sana'a",
    country: "Yemen",
    coordinates: { x: 56, y: 52 },
    activeProjects: 6,
    beneficiaries: 18000,
    category: "health",
  },
  {
    id: "4",
    name: "Mogadishu",
    country: "Somalia",
    coordinates: { x: 57, y: 59 },
    activeProjects: 5,
    beneficiaries: 12000,
    category: "food",
  },
  {
    id: "5",
    name: "Kabul",
    country: "Afghanistan",
    coordinates: { x: 62, y: 44 },
    activeProjects: 7,
    beneficiaries: 25000,
    category: "education",
  },
  {
    id: "6",
    name: "Dhaka",
    country: "Bangladesh",
    coordinates: { x: 70, y: 48 },
    activeProjects: 4,
    beneficiaries: 15000,
    category: "water",
  },
  {
    id: "7",
    name: "Beirut",
    country: "Lebanon",
    coordinates: { x: 51, y: 46 },
    activeProjects: 3,
    beneficiaries: 8000,
    category: "shelter",
  },
]

export function InteractiveMap() {
  const { language } = useLanguage()
  const [selectedLocation, setSelectedLocation] = useState<ProjectLocation | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          {language === "tr" ? "Dünya Genelinde Projelerimiz" : "Our Projects Worldwide"}
        </h2>
        <p className="text-muted-foreground">
          {language === "tr"
            ? "İhtiyaç sahibi topluluklara yardım ediyoruz"
            : "Helping communities in need across the globe"}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="relative w-full aspect-[16/10] bg-muted rounded-lg overflow-hidden">
              {/* World map background */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  {/* Simplified world map outline */}
                  <path
                    d="M10,30 Q20,25 30,30 T50,30 T70,30 Q80,35 90,30 M15,20 L25,15 L35,20 L45,15 M60,40 L70,45 L80,40"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>

              {/* Project location markers */}
              {PROJECT_LOCATIONS.map((location) => (
                <button
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125"
                  style={{ left: `${location.coordinates.x}%`, top: `${location.coordinates.y}%` }}
                  onClick={() => setSelectedLocation(location)}
                  onMouseEnter={() => setHoveredLocation(location.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  <div className="relative">
                    <MapPin
                      className={`h-8 w-8 transition-colors ${
                        selectedLocation?.id === location.id || hoveredLocation === location.id
                          ? "text-accent fill-accent"
                          : "text-primary fill-primary"
                      }`}
                    />
                    <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                      {location.activeProjects}
                    </div>
                  </div>

                  {/* Tooltip */}
                  {hoveredLocation === location.id && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10 text-sm">
                      <div className="font-semibold">
                        {location.name}, {location.country}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {location.activeProjects} {language === "tr" ? "proje" : "projects"}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {PROJECT_LOCATIONS.map((location) => (
                <Badge
                  key={location.id}
                  variant={selectedLocation?.id === location.id ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedLocation(location)}
                >
                  {location.country}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {selectedLocation
                ? `${selectedLocation.name}, ${selectedLocation.country}`
                : language === "tr"
                  ? "Bir bölge seçin"
                  : "Select a region"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedLocation ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="bg-primary text-primary-foreground p-2 rounded">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{selectedLocation.activeProjects}</div>
                    <div className="text-sm text-muted-foreground">
                      {language === "tr" ? "Aktif Proje" : "Active Projects"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="bg-accent text-accent-foreground p-2 rounded">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{selectedLocation.beneficiaries.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">
                      {language === "tr" ? "Faydalanan" : "Beneficiaries"}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Badge className="capitalize">{selectedLocation.category}</Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  {language === "tr"
                    ? `${selectedLocation.name} bölgesinde ${selectedLocation.activeProjects} aktif projemiz var ve ${selectedLocation.beneficiaries.toLocaleString()} kişiye ulaşıyoruz.`
                    : `We have ${selectedLocation.activeProjects} active projects in ${selectedLocation.name} reaching ${selectedLocation.beneficiaries.toLocaleString()} people.`}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                {language === "tr"
                  ? "Harita üzerinde bir işaretçiye tıklayarak proje detaylarını görün"
                  : "Click on a marker on the map to view project details"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
