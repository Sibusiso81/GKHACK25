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
import { changePassword } from "../Actions/Actions";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters long." })
    .max(50, { message: "Password must be no longer than 50 characters." }),
});

function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-6 lg:space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your new Password</FormLabel>
              <FormControl>
                <Input
                  className="p-4 space-y-8"
                  placeholder="password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col  max-w-screen-sm ">
          <Button
            className=" w-full"
            variant={"default"}
            formAction={changePassword}
          >
            {" "}
            Change Password
          </Button>
        </div>
      </form>
    </Form>
  );
}

function page() {
  return (
    <section className="w-screen h-screen flex flex-col p-4 justify-center lg:items-center   ">
      <div className="flex flex-col lg:flex-row mx-auto justify-between h-3/4  w-full max-w-screen-xl">
        <div className="rounded-md hidden lg:flex  items-end  lg:w-1/2 bg-[url(/oliver-sjostrom-y-GMWtWW_H8-unsplash.jpg)]  bg-center bg-cover">
          <div className="text-white  p-4 b rounded-lg">
            <h1 className="text-5xl font-bold mb-2">
              Browse Boldly{" "}
              <h1 className="place-self-start text-lg font-semibold">
                Spartan <span className="text-lime-400 text-3xl">Sentinel</span>
              </h1>{" "}
            </h1>
          </div>
        </div>
        <div className="flex flex-col space-y-4 lg:w-1/2 max-w-screen-sm justify-center w-1/2   p-24 ">
          <p className="text-center font-medium text-md ">
            Change your Password{" "}
          </p>
          <ProfileForm />
        </div>
      </div>
    </section>
  );
}

export default page;
