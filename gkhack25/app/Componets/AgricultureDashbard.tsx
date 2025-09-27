"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sprout, Droplets, Users, Calendar, AlertTriangle, TrendingUp, Leaf, Sun } from "lucide-react"

interface AgricultureAdvice {
  title: string
  description: string
}

interface AgriculturalDashboardProps {
  data: AgricultureAdvice[]
}

const iconMap = {
  0: TrendingUp, // Yield
  1: Sprout, // Planting
  2: Leaf, // Soil
  3: Droplets, // Water
  4: Users, // Labor
  5: Calendar, // Harvest
  6: AlertTriangle, // Risk
  7: Sun, // Alternatives
}

const colorMap = {
  0: "text-chart-2",
  1: "text-chart-3",
  2: "text-chart-4",
  3: "text-chart-1",
  4: "text-chart-5",
  5: "text-chart-3",
  6: "text-destructive",
  7: "text-chart-2",
}

export function AgriculturalDashboard({ data }: AgriculturalDashboardProps) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Sprout className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Agricultural Data</h3>
          <p className="text-muted-foreground">Generate your agricultural plan to see insights here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agricultural Planning Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive insights and recommendations for your agricultural operations
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          {data.length} Insights
        </Badge>
      </div>

      <Separator />

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((item, index) => {
          const Icon = iconMap[index as keyof typeof iconMap] || Sprout
          const iconColor = colorMap[index as keyof typeof colorMap] || "text-primary"

          return (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-border/50 ${
                selectedCard === index ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedCard(selectedCard === index ? null : index)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-secondary/50`}>
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm font-semibold leading-tight text-balance">{item.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs leading-relaxed line-clamp-3">
                  {item.description.split("\n")[0]}
                </CardDescription>
                {selectedCard === index && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-sm text-foreground/90 whitespace-pre-line leading-relaxed">{item.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      {/* <div className="flex flex-wrap gap-3 pt-4">
        <Button variant="outline" size="sm">
          <TrendingUp className="h-4 w-4 mr-2" />
          Export Report
        </Button>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Review
        </Button>
        <Button variant="outline" size="sm">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Risk Assessment
        </Button>
      </div> */}
    </div>
  )
}
