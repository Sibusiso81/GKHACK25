import React, { useState } from "react";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Gmail from "@/app/Componets/Gmail";

export interface Farmer {
  name: string;
  email: string;
  password: string;
  farmingGoal: string;
  FarmingExperienceLevel: string;
  InternetAccessType: string;
  cropsGrown: string;
  location: string;
  ageGroup: string;
}
function FarmerForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const farmerFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .max(100, { message: "Email must be no longer than 100 characters." }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    FarmingGoal: z.string().min(1, "Farming goal is required"),
    FarmingExperienceLevel: z
      .string()
      .min(1, "Farming experience level is required"),
    FarmingVision: z.string().min(1, "Farming vision is required"),
   cropsGrown: z.string().min(1, "Crops grown is required"),
    location: z.string().min(1, "Location is required"),
    ageGroup: z.string().min(1, "Age group is required"),
  });

  const FarmerForm = useForm<z.infer<typeof farmerFormSchema>>({
    resolver: zodResolver(farmerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      FarmingGoal: "",
      FarmingExperienceLevel: "",
      FarmingVision: "",
      cropsGrown: "",
      location: "",
      ageGroup: "",
    },
  });
  function onSubmit(data: z.infer<typeof farmerFormSchema>) {
    console.log("Submitted", data);
    setFormSubmitted(true);
    toast.success("Form submitted successfully!");
  }
  return (
    <>
      {!formSubmitted ? (
        <div className="flex flex-col space-y-4 p-1  ">
          <Toaster position="top-right" closeButton />
          <div className="flex flex-col space-y-1 text-sm">
            <h2 className="text-xl ">Farmer Information</h2>
            <p className="text-muted-foreground">
              please provide your details as a farmer
            </p>
          </div>
          <Form {...FarmerForm}>
            <form
              onSubmit={FarmerForm.handleSubmit(onSubmit)}
            
              className="space-y-6 lg:space-y-8 lg:grid grid-cols-2 lg:gap-x-16"
            >
              <FormField
                control={FarmerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="p-4"
                        placeholder="Enter your name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={FarmerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="p-4"
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={FarmerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="p-4"
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={FarmerForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        className="p-4"
                        placeholder="Enter your location"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
              <FormField
                control={FarmerForm.control}
                name="FarmingExperienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Number of Years as a farmer </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Year In Farming " />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st year">
                            Beginner (0-2 years)
                          </SelectItem>
                          <SelectItem value="2nd year">
                            Intermediate (3-5 years)
                          </SelectItem>
                          <SelectItem value="3rd year">
                            Experienced (6-10 years)
                          </SelectItem>
                          <SelectItem value="4rd year">
                            Expert (10+ years)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={FarmerForm.control}
                name="FarmingGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Farm Goal </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Commercial">
                            Commercial Production
                          </SelectItem>
                          <SelectItem value="Subsistence">
                            Subsistence Farming
                          </SelectItem>
                          <SelectItem value="Organic">
                            Organic Farming
                          </SelectItem>
                          <SelectItem value="Expansion">
                            Farm Expansion
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={FarmerForm.control}
                name="FarmingVision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>farming Vision</FormLabel>
                    <FormControl>
                      <Textarea
                        className="p-4"
                        placeholder="Tell us more about your farming vision"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={FarmerForm.control}
                name="cropsGrown"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Crops/Livestock</FormLabel>
                    <FormControl>
                      <Input
                        className="p-4"
                        placeholder="What  Crops/Livestock do you grow or keep"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                        control={FarmerForm.control}
                        name="ageGroup"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel> Age Group</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select age group" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="18-24 years">
                                    18-24 years
                                  </SelectItem>
                                  <SelectItem value="25-34 years">
                                    25-34 years
                                  </SelectItem>
                                  <SelectItem value="35-44 years">
                                    35-44 years
                                  </SelectItem>
                                  <SelectItem value="45-54 years">
                                    45-54 years
                                  </SelectItem>
                                  <SelectItem value="55-64 years">
                                    55-64 years
                                  </SelectItem>
                                  <SelectItem value="65+ years">
                                    65+ years
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
              <Button type="submit" className="cursor-pointer w-full place-self-center">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      ) : (
          <div className="flex flex-col space-y-4 p-1  my-auto mx-auto items-center justify-center">
        <div className="flex flex-col
         space-y-2 ">
          <Gmail className="place-self-center justify-self-center"/>
            <h2 className="text-xl text-center font-medium">Check your mail  </h2>
            
        </div>
        <p className="text-muted-foreground">
          Follow the link on your email to log in .
        </p>
      </div>
      )}
    </>
  );
}

export default FarmerForm;
