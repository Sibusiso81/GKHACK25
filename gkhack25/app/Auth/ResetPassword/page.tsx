"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPassword } from "../Actions/Actions";
import { Sprout } from "lucide-react";
import { Toaster } from "sonner";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(10,{ message: "Email is required." })
    .max(100, { message: "Email must be no longer than 100 characters." }),
});

function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-6 lg:space-y-8">
        <FormField
          control={form.control}
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

        <div className="flex flex-col  max-w-screen-sm space-y-2">
          <button
            className="p-2 rounded-md text-white bg-blue-500 w-full "
            formAction={resetPassword}
          >
            Reset password
          </button>
        </div>
      </form>
    </Form>
  );
}

function page() {
  return (
     <section className="w-screen h-screen flex flex-col p-4 :items-center justify-center   bg-[#122023] text-[#e1fcad]  ">
      <Toaster position="top-center" richColors/>
      <div className="flex flex-col lg:flex-row mx-auto justify-center items-center lg:h-3/4  w-full md:max-w-screen-sm lg:max-w-5xl">
     <div className="rounded-md hidden lg:flex  items-end h-[40vh] lg:h-5/6 my-a md:w-full lg:w-1/2 bg-[url(/tim-mossholder-xDwEa2kaeJA-unsplash.jpg)]  bg-center bg-cover">

          <div className="text-white  p-4 b rounded-lg ">
            <div className="text-5xl font-bold mb-2">
              Growth Together.{" "}
              <span className="place-self-start text-lg font-semibold">
                
                <span className="text-lime-400 text-3xl">AgriAssist</span>
              </span>{" "}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-10 w-full lg:w-1/2  max-w-screen-sm mx-auto justify-center my-auto  p-10 ">
         <div className="flex space-x-2 items-center w-2/3 mx-auto justify-center">
                    <Sprout className="w-8 h-8 stroke-lime-400" />
                    <h1 className="font-medium text-white text-md">AgriAssist</h1>
                  </div>
          <ProfileForm />
        </div>
      </div>
    </section>
  );
}

export default page;
