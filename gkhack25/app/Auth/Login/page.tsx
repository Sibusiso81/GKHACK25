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
import { login } from "../Actions/Actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { Sprout } from "lucide-react";
const formSchema = z.object({
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters long." })
    .max(50, { message: "Password must be no longer than 50 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .max(100, { message: "Email must be no longer than 100 characters." }),
});
function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });


  
async function handleLogin(formData: FormData) {
  const result = await login(formData);
  if (result?.error) {
    console.log(result.error);
    toast.error(result.error);
    return;
  }
  // handle success (redirect will happen server-side)
}
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
                  className="p-5 "
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
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  className="p-5  "
                  placeholder="Enter you password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col  max-w-screen-sm space-y-2">
          <Link href={"/Auth/ResetPassword"}>
            <button className="p-1 place-self-end text-sm">
              <span className="text-white">Forgot Password ?</span>
            </button>
          </Link>
          

          <Button
            variant={"secondary"}
            formAction={handleLogin}
            className="p-6"
          >
            Login
          </Button>
         

          {/* 
            <Button variant={"ghost"} className="w-full active:bg-transparent p-6 " formAction={signInWithOAuth}>
              <Google className="w-8 h-8 "/>
              <p className="pl-2">Sign in with Google</p>
            </Button>
           */}
        </div>
      </form>
    </Form>
  );
}

function Login() {
  return (
    <section className="min-h-screen flex flex-col p-4 md:p-6 lg:p-4 items-center justify-center">
      <Toaster position="top-center" richColors />
      <div className="flex flex-col lg:flex-row mx-auto justify-center items-center lg:h-3/4 w-full max-w-sm md:max-w-md lg:max-w-5xl text-green-950">
        <div className="rounded-md hidden lg:flex items-end   w-full lg:w-1/2 bg-[url(/tim-mossholder-xDwEa2kaeJA-unsplash.jpg)] bg-center bg-cover h-[60vh]">
          <div className="text-white p-4 rounded-lg">
            <div className="text-4xl xl:text-5xl font-bold mb-2">
              Growth Together.{" "}
              <span className="block text-lg font-semibold mt-2">
                <span className="text-lime-400 text-2xl xl:text-3xl">AgriAssist</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-6 md:space-y-8 lg:space-y-10 w-full lg:w-1/2 max-w-sm md:max-w-md mx-auto justify-center p-6 md:p-8 lg:p-10">
          <div className="flex space-x-2 items-center justify-center">
            <Sprout className="w-6 h-6 md:w-8 md:h-8 stroke-lime-400" />
            <h1 className="font-medium text-lg md:text-xl">AgriAssist</h1>
          </div>
          <ProfileForm />
        </div>
      </div>
    </section>
  );
}

export default Login;
