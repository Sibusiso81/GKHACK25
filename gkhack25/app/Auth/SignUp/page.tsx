"use client";
import React, { useState } from "react";
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
import { signInWithOAuth } from "../Actions/Actions";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import { Github } from "lucide-react";
import FarmerIcon from "@/components/farmerIcon";
import StudentIcon from "@/components/StudentIcon";
import { User} from "@/lib/types";
import StudentForm from "./StudentForm";
import FarmerForm from "./FarmerForm";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
});

function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6 lg:space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className="p-4"
                  placeholder="Enter a username"
                  type="username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col  max-w-screen-sm space-y-2">
          <Toaster position="top-right" />

          <Button
            variant={"secondary"}
            className="w-full hover:bg-black hover:stroke-white hover:text-white flex space-x-5 p-2"
            onClick={signInWithOAuth}
          >
            <p>Sign Up with Github </p>
            <Github className="stroke-black w-8  h-8 h rounded-md" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

function SignUp() {
  const [userType, setUserType] = useState<User>(null);

  !userType
    ? console.log("Select a user type ")
    : console.log(`Selected user type: ${userType}`);

  //Form Schemas

  return (
    <section className="w-screen h-screen flex flex-col p-6 lg:items-center   ">
      <div className="flex flex-col lg:flex-row mx-auto justify-between h-3/4  w-full max-w-screen-xl">
        <div className="rounded-md hidden lg:flex  items-end  lg:w-1/2 bg-[url(/tim-mossholder-xDwEa2kaeJA-unsplash.jpg)]  bg-center bg-cover">
          <div className="text-white  p-4 b rounded-lg">
            <div className="text-5xl font-bold mb-2">
              Growth.Together.{" "}
              <span className="place-self-start text-lg font-semibold">
                by {""}
                <span className="text-lime-400 text-3xl">Spartans</span>
              </span>{" "}
            </div>
          </div>
        </div>
        <h2 className="font-bold text-2xl">Get started </h2>
        {
          !userType 
          ?<div className="flex flex-col space-y-4 lg:w-1/2 max-w-screen-sm justify-center    p-6 lg:p-24 ">
          {/*     */}
          
          <div className="flex-col space-y-3 ">
            <h3>Choose your profile type</h3>
            <p className="text-muted-foreground ">
              Select the option that best describes you{" "}
            </p>
          </div>
          <button onClick={()=>setUserType('Student')} className="flex flex-col space-y-3 ">
            <div className="border-2 border-gray-500/55 rounded-2xl p-4 w-full items-center justify-center space-y-3  ">
              <StudentIcon />
              <p className="font-medium text-lg ">Student</p>
              <p>
                For students looking to contribution theories ,ideas and
                research{" "}
              </p>{" "}
              
            </div>
          </button>
          <button onClick={()=>setUserType('Farmer')} className="flex flex-col space-y-3 ">
            <div className="border-2 border-gray-500/55 rounded-2xl p-4 w-full items-center justify-center space-y-3  ">
              <FarmerIcon />
              <p className="font-medium text-lg ">Farmer</p>
              <p>
                For agricultural professionals and farmers {" "}
              </p>{" "}
              
            </div>
          </button>
        </div>
        :
          userType === "Student" ? (
            <StudentForm />
          ) : userType === "Farmer" ? (
            <FarmerForm />
          ) : (
            <div className="flex flex-col space-y-4 lg:w-1/2 max-w-screen-sm justify-center    p-6 lg:p-24 ">
              <h2 className="font-bold text-2xl">Select a valid user type</h2>
              <p className="text-muted-foreground ">
                Please select either Student or Farmer{" "}
              </p>
            </div>
          )
        
        }
      </div>
    </section>
  );
}

export default SignUp;
