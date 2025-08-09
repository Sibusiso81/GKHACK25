'use client'
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import MailIcon from "@/components/MailIcon";
import { signup } from "../Actions/Actions";
function StudentForm() {
    const [formSubmitted, setFormSubmitted] = useState(false);
  const studentFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .max(100, { message: "Email must be no longer than 100 characters." }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    fieldOfStudy: z.string().min(1, "Field of study is required"),
    yearOfStudy: z.string().min(1, "Year of study is required"),
    university: z.string().min(1, "University is required"),
  });

  const StudentForm = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      fieldOfStudy: "",
      yearOfStudy: "",
      university: "",
    },
  });
  function onSubmit(data: z.infer<typeof studentFormSchema>) {
    console.log('Submitted',data)
    setFormSubmitted(true);
    toast.success("Form submitted successfully!",)
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    signup(formData);
  }

  return (
   <>
   {
    !formSubmitted
    ? <div className="flex flex-col space-y-4 p-1  ">
        <Toaster position="top-right" closeButton/>
      <div className="flex flex-col space-y-1 text-sm">
        <h2 className="text-xl ">Student Information</h2>
        <p className="text-muted-foreground">
          please provide your details as a student
        </p>
      </div>
      <Form {...StudentForm}>
        <form
          onSubmit={StudentForm.handleSubmit(onSubmit)}
          className="space-y-6 lg:space-y-8"
        >
          <FormField
            control={StudentForm.control}
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
            control={StudentForm.control}
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
            control={StudentForm.control}
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
            control={StudentForm.control}
            name="fieldOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>field Of Study</FormLabel>
                <FormControl>
                  <Input
                    className="p-4"
                    placeholder="Enter your fieldOfStudy"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={StudentForm.control}
            name="yearOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year of Study</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Year of Study" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st year">1st year </SelectItem>
                      <SelectItem value="2nd year">2nd year</SelectItem>
                      <SelectItem value="3rd year">3rd year</SelectItem>
                      <SelectItem value="4rd year">4th year</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
  control={StudentForm.control}
  name="university"
  render={({ field }) => (
    <FormItem>
      <FormLabel>University</FormLabel>
      <FormControl>
        <Input
          className="p-4"
          placeholder="Enter your university"
          type="text"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
          <Button
            type="submit"
            
            className="cursor-pointer w-full"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
    : <div className="flex flex-col space-y-4 p-1  my-auto mx-auto items-center justify-center">
        <div className="flex flex-col
         space-y-2 ">
          <MailIcon/>
            <h2 className="text-xl text-center">Check your mail  </h2>
            
        </div>
        <p className="text-muted-foreground">
          Follow the link on your email to log in .
        </p>
      </div>
   }
   </>
  );
}

export default StudentForm;
