"use client";
import PostForm from "@/app/Componets/PostForm";
import React from "react";

function page() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center p-4 space-y-4 ">
      <div className="flex flex-col space-y-2 ">
        <h2 className="text-xl font-bold">Create A Post</h2>
        <p className="text-muted-foreground">
          How can your knowlege help small scale farmers
        </p>
      </div>
      <div className="w-full ">
        <PostForm/>
      </div>
    </section>
  );
}

export default page;
