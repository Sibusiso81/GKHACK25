"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Sprout } from "lucide-react"
import StudentForm from "./StudentForm"
import FarmerForm from "./FarmerForm"

function page() {
  return (
   <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-balance leading-tight">
              Growth Together.
              <span className="block text-primary text-4xl mt-2">Spartans</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join our community of learners and growers. Whether you&apos;re pursuing education or cultivating the land,
              we&apos;re here to support your journey.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">For Students</h3>
                <p className="text-sm text-muted-foreground">Academic excellence</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Sprout className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">For Farmers</h3>
                <p className="text-sm text-muted-foreground">Sustainable growth</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <Card className="w-full max-w-lg mx-auto shadow-xl border-0 bg-card/80 backdrop-blur-sm md:max-h-[90vh] flex flex-col">
          <CardHeader className="text-center space-y-2 pb-6 flex-shrink-0">
            <CardTitle className="text-2xl font-bold">Get Started</CardTitle>
            <CardDescription className="text-base">Choose your profile type to begin your journey</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 flex-1 overflow-scroll">
            <Tabs defaultValue="Student" className="w-full h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-12 flex-shrink-0">
                <TabsTrigger
                  value="Student"
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <GraduationCap className="w-4 h-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger
                  value="Farmer"
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                >
                  <Sprout className="w-4 h-4" />
                  Farmer
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto">
                <TabsContent value="Student" className="mt-0 h-full">
                  <StudentForm />
                </TabsContent>

                <TabsContent value="Farmer" className="mt-0 h-full">
                  <FarmerForm />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default page
