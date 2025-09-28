"use client"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast, Toaster } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import {  Mail, Loader2 } from "lucide-react"
import Google from "@/app/Componets/Google"
import { signup } from "../Actions/Actions"

function FarmerForm() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const farmerFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .max(100, { message: "Email must be no longer than 100 characters." }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    location: z.string().min(1, "Location is required"),
   
  })

  const form = useForm<z.infer<typeof farmerFormSchema>>({
    resolver: zodResolver(farmerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      location: "",
    
    },
  })

  async function onSubmit(data: z.infer<typeof farmerFormSchema>) {
    setIsSubmitting(true)
console.log('Submitted :',data )
localStorage.setItem("farmerData", JSON.stringify(data))
toast.success("Form submitted successfully!")
setFormSubmitted(true)
setIsSubmitting(false)
const formData = new FormData();
Object.entries(data).forEach(([key, value]) => {
  formData.append(key, value);
  console.log(`key:${key}, value:${value} typeof${typeof(value)}/${typeof(value)}` );
});
signup(formData)
  }

  if (formSubmitted) {
    return (
      <Card className="border-0 shadow-none bg-transparent">
        <CardContent className="flex flex-col items-center justify-center text-center space-y-6 py-12">
          <div className="w-16 h-16 bg-[#e1fcad]/10 rounded-full flex items-center justify-center">
            <Google className="w-8 h-8 text-primary"/>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl">Check Your Email</CardTitle>
            <CardDescription className="text-base">
              We&apos;ve sent a verification link to your email address. Click the link to complete your registration.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            Didn&apos;t receive it? Check your spam folder
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 h-full">
      <Toaster position="top-right" closeButton />

      <div className="space-y-2 text-center flex-shrink-0">
        <h3 className="text-lg font-semibold">Supplier Information</h3>
       
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                  <FormControl>
                    <Input className="h-11" placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                  <FormControl>
                    <Input className="h-11" placeholder="your.email@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Password</FormLabel>
                <FormControl>
                  <Input className="h-11" placeholder="Create a secure password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Location</FormLabel>
                  <FormControl>
                    <Input className="h-11" placeholder="City, State/Province" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

      {/*       <FormField
              control={form.control}
              name="ageGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium w-f">Age Group</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-24">18-24 years</SelectItem>
                        <SelectItem value="25-34">25-34 years</SelectItem>
                        <SelectItem value="35-44">35-44 years</SelectItem>
                        <SelectItem value="45-54">45-54 years</SelectItem>
                        <SelectItem value="55-64">55-64 years</SelectItem>
                        <SelectItem value="65+">65+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

         {/*  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="farmingExperienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Experience Level</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Years in farming" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                        <SelectItem value="experienced">Experienced (6-10 years)</SelectItem>
                        <SelectItem value="expert">Expert (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="farmingGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Primary Goal</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="commercial">Commercial Production</SelectItem>
                        <SelectItem value="subsistence">Subsistence Farming</SelectItem>
                        <SelectItem value="organic">Organic Farming</SelectItem>
                        <SelectItem value="expansion">Farm Expansion</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="cropsGrown"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Primary Crops/Livestock</FormLabel>
                <FormControl>
                  <Input className="h-11" placeholder="e.g., Corn, Wheat, Cattle, Poultry" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="farmingVision"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Farming Vision</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[100px] resize-none"
                    placeholder="Tell us about your farming goals and vision for the future..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Button
            type="submit"
            className="w-full h-11 bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Farmer Account"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default FarmerForm
