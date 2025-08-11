'use client'
import React, { useEffect } from 'react'
import { createStudentProfile } from '../Auth/Actions/Actions'
/* 

Tables for studetns

PostsCreated:{
[
name:string,
feildofStudy:string,
yearOfStudy:string,
university:string,
title:string,
description:string,
images :array-file 
documments :array-file,
comments:{
  [
    name:string,
    comment:string,
    timePosted:date
  ]
}
]
}
]
}
numberOfAdpotations:number,


*/


function Page() {
  
  useEffect(() => {
  const run = async () => {
   const savedData = localStorage.getItem("studentData");
   if (savedData) {
    const parsedData = JSON.parse(savedData);
    console.log(parsedData.email);
    await createStudentProfile({
       email: parsedData.email,
      name: parsedData.name,
      field_of_study: parsedData.fieldOfStudy,
      year_of_study: parsedData.yearOfStudy,
      university: parsedData.university,
    });
    console.log("Profile created successfully");
   
  }
   
  };
  run();
}, []);
  return (
    <div className="space-y-12">
      <h2 className="text-2xl font-bold">Welcome to your Dashboard</h2>
      <p className="text-muted-foreground">
        This is your main content area. The sidebar can be toggled using the button in the header.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className=" rounded-lg border p-4 h-[150px] space-y-0.5">
         <div className='flex justify-between'>
             <h3 className="font-semibold">Posts Created </h3>
          <p className="text-sm text-muted-foreground"></p>
         </div>
         <div className='flex-col  space-y-4'>
            <p className='text-3xl font-bold '>10</p>
            <p>Trending up this month</p>
         </div>
         <p className='text-muted-foreground'>Views by 6 </p>
        </div>
         <div className=" rounded-lg border p-4 h-[150px] space-y-0.5">
         <div className='flex justify-between'>
             <h3 className="font-semibold">Problems Solved </h3>
          <p className="text-sm text-muted-foreground"></p>
         </div>
         <div className='flex-col  space-y-4'>
            <p className='text-3xl font-bold '>6</p>
            <p>Trending up this month</p>
         </div>
         <p className='text-muted-foreground'>Farmers helped 10 </p>
        </div>
         <div className=" rounded-lg border p-4 h-[150px] space-y-0.5">
         <div className='flex justify-between'>
             <h3 className="font-semibold">Theory Adaptations </h3>
          <p className="text-sm text-muted-foreground"></p>
         </div>
         <div className='flex-col  space-y-4'>
            <p className='text-3xl font-bold '>11</p>
            <p>Trending up this month</p>
         </div>
         <p className='text-muted-foreground'>Farmer upVotes 7  </p>
        </div>
      </div>

   <div className='space-y-4'>
      <h2 className="text-2xl font-bold">Farmer Challanges</h2>
       <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <div className=' rounded-lg border p-4 h-fit  space-y-3'>
            <div className='flex-col space-y-3'>
                <p>John Doe</p>
                <div className='flex justify-between '>
                    <p>NorthWest</p>

                    <p>Farm Size :500 acers</p>
                </div>
                <p>2 days ago </p>
            </div>
          <p className=''>Need pest control tips for spinach</p>  
        </div>
         <div className=' rounded-lg border p-4 h-fit  space-y-3'>
            <div className='flex-col space-y-3'>
                <p>John Doe</p>
                <div className='flex justify-between '>
                    <p>NorthWest</p>

                    <p>Farm Size :500 acers</p>
                </div>
                <p>2 days ago </p>
            </div>
          <p className=''>Need pest control tips for spinach</p>  
        </div>
        
      </div>
   </div>
   <div className='space-y-4'>
      <h2 className="text-2xl font-bold">Student posts </h2>
       <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <div className=' rounded-lg border p-4 h-fit  space-y-3'>
            <div className='flex-col space-y-1'>
                <p>Name</p>
                <div className='flex-col space-y-2'>
                    <p>Univesity</p>
                    <p>fieldOfStudy </p>

                    <p>title</p>
                    <p>Description</p>
                </div>
                <p>2 days ago </p>
            </div>
          <p className=''>View more</p>  
        </div>
         <div className=' rounded-lg border p-4 h-fit  space-y-3'>
            <div className='flex-col space-y-3'>
                <p>John Doe</p>
                <div className='flex justify-between '>
                    <p>University Of Johannesburg - Bsc Agriculture</p>

                    <p>Modern Pest Control Methods </p>
                </div>
                <p className='text-sm'>2 days ago </p>
            </div>
          <p className=''>Research</p>  
        </div>
        
      </div>
   </div>
    </div>
  )
}

export default Page