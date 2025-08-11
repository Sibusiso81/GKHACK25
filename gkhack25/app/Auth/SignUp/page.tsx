"use client";
import React from "react";

import StudentForm from "./StudentForm";
import FarmerForm from "./FarmerForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SignUp() {
  //Form Schemas

  return (
    <section className="w-screen h-screen flex flex-col p-6   lg:items-center lg:justify-center ">
      <div className="flex flex-col  lg:flex-row justify-center items-center   w-full max-w-screen-xl space-y-4 lg:spcae-y-0 lg:space-x-8">
        <div className="rounded-md hidden md:flex  items-end h-[300px] lg:h-5/6 justify-self-end md:w-full lg:w-1/2 bg-[url(/tim-mossholder-xDwEa2kaeJA-unsplash.jpg)]  bg-center bg-cover">
          <div className="text-white  p-4 b rounded-lg ">
            <div className="text-5xl font-bold mb-2">
              Growth Together.{" "}
              <span className="place-self-start text-lg font-semibold">
                
                <span className="text-lime-400 text-3xl">Spartans</span>
              </span>{" "}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:flex-col lg:items-center">
          {" "}
          <div className="flex-col  space-y-3 lg:space-y-1 lg:text-center">
            <h2 className="font-bold text-2xl">Get started </h2>
            <h3>Choose your profile type</h3>
            <p className="text-muted-foreground ">
              Select the option that best describes you{" "}
            </p>
          </div>
          <Tabs defaultValue="Student" className="w-full mt-4">
            <TabsList className="w-full">
              <TabsTrigger value="Student">Student</TabsTrigger>
              <TabsTrigger value="Farmer">Farmer</TabsTrigger>
            </TabsList>
            <TabsContent value="Student">
              <StudentForm />
            </TabsContent>
            <TabsContent value="Farmer">
              <FarmerForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
/* 




*/
