"use client";
import { useState } from "react";
import {  z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {  Mail, Loader2} from "lucide-react";
import Google from "@/app/Componets/Google";
import { signup } from "../Actions/Actions";

function StudentForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const studentFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .max(100, { message: "Email must be no longer than 100 characters." }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    location: z.string().min(1, "Location is required"),
    
  });

  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      location:''
    },
  });

  function onSubmit(data: z.infer<typeof studentFormSchema>) {
    setIsSubmitting(true);

    console.log("Submitted", data);
    localStorage.setItem("studentData", JSON.stringify(data));
    setFormSubmitted(true);
    toast.success("Form submitted successfully!");
    toast.success("Form submitted successfully!");
    setFormSubmitted(true);
    setIsSubmitting(false);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    signup(formData);
  }
  /* async function handleGoogleSignup(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // Prevent form submit
    // Get current form values
    const data = form.getValues();
    // Store in localStorage
    localStorage.setItem("studentData", JSON.stringify(data));
    setIsSubmitting(true);
    await signInWithOAuth();
    setIsSubmitting(false);
  } */
  if (formSubmitted) {
    return (
      <Card className="border-0 shadow-none bg-transparent">
        <CardContent className="flex flex-col items-center justify-center text-center space-y-6 py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Google className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl">Check Your Email</CardTitle>
            <CardDescription className="text-base">
              We&apos;ve sent a verification link to your email address. Click the
              link to complete your registration.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            Didn&apos;t receive it? Check your spam folder
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" closeButton />

      <div className="space-y-2 text-center">
        <h3 className="text-lg font-semibold">Buyer Information</h3>
        <p className="text-sm text-muted-foreground">
          Please provide your  details
        </p>
         
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
              <Input
                className="h-11"
                placeholder="Enter your full name"
                {...field}
              />
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
              <Input
                className="h-11"
                placeholder="your.email@example.com"
                type="email"
                {...field}
              />
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
            <Input
              className="h-11"
              placeholder="Create a secure password"
              type="password"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
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
   {/*  <FormField
      control={form.control}
      name="farmer_type"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">Farmer Type</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Select farmer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crop">Crop Farmer</SelectItem>
                <SelectItem value="poultry">Poultry Farmer</SelectItem>
                <SelectItem value="livestock">Livestock Farmer</SelectItem>
                <SelectItem value="mixed">Mixed Farming</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    /> */}

  {/*   <FormField
      control={form.control}
      name="specialities"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">Specialities</FormLabel>
          <FormControl>
            <Input
              className="h-11"
              placeholder="e.g., Maize, Tomatoes, Chickens"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    /> */}

   {/*  <FormField
      control={form.control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">Bio</FormLabel>
          <FormControl>
            <textarea
              className="h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              placeholder="Share your farming journey and goals..."
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    /> */}

    <Button
      type="submit"
      className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Creating Account...
        </>
      ) : (
        "Create Buyer Account"
      )}
    </Button>
  </form>
</Form>
    </div>
  );
}

export default StudentForm;
