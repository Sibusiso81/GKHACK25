'use client'
import React, { useEffect} from 'react'
import { createFarmerProfile, createStudentProfile, getAllPosts } from '../Auth/Actions/Actions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Users,
  BookOpen,
  Clock,
  CheckCircle, 
  TrendingUp,
  Shield,
  Lightbulb,
  GraduationCap,
  Target,
  Award,
  Zap,
  Globe,
  MessageCircle,
} from "lucide-react"
import { Toaster } from 'sonner'
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
    let isMounted = true;
    // Prevent running twice in React StrictMode (dev)
    if (typeof window === "undefined") return;

    const run = async () => {
      try {
        // Only allow one profile creation per mount
        const studentData = localStorage.getItem("studentData");
        const farmerData = localStorage.getItem("farmerData");

        if (studentData && !farmerData) {
          const parsedData = JSON.parse(studentData);
          console.log(parsedData)
          await createStudentProfile({
            email: parsedData.email,
            name: parsedData.name,
            location:parsedData.location
          });
          localStorage.removeItem("studentData");
          if (isMounted) {
            const posts = await getAllPosts();
           /*  console.log("Posts fetched", posts); */
           console.log(posts)
          }
        } else if (farmerData && !studentData) {
          const parsedFarmer = JSON.parse(farmerData);
          console.log(parsedFarmer)
          await createFarmerProfile({
            
            email: parsedFarmer.email,
            name: parsedFarmer.name,
            location: parsedFarmer.location,
           
          });
          localStorage.removeItem("farmerData");
          if (isMounted) {
           
            /* console.log("Posts fetched", posts); */
          }
        }
      } catch (err) {
        console.error("Profile creation error:", err);
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
   <div className="min-h-screen">
  <Toaster />

  {/* Hero Section */}
  <section className="px-6 py-16 bg-white">
    <div className="mx-auto max-w-6xl text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">VARM - Vaccine Access & Response Marketplace</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Connecting farmers, verified suppliers, and government to prevent disease outbreaks, minimize livestock losses, and strengthen food security.
      </p>
    </div>
  </section>

  {/* Impact Section */}
  <section id="impact" className="px-6 py-16 bg-gray-50">
    <div className="mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why VARM Matters</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          VARM addresses key challenges for South African poultry farmers, ensuring rapid, reliable, and AI-powered vaccine access.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-gray-200 bg-white hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-gray-900">Speed & Reliability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Farmers can request vaccines and connect to verified suppliers quickly, ensuring timely protection for their flocks.
            </p>
            <div className="text-sm font-medium text-green-700">Rapid vaccine delivery, every time.</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-gray-900">Verified Supply Network</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Only legally authorized suppliers are listed, ensuring safe, compliant, and reliable vaccine distribution.
            </p>
            <div className="text-sm font-medium text-green-700">Trustworthy suppliers at your fingertips.</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-gray-900">AI-Powered Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Real-time outbreak data and predictive models help suppliers and government forecast demand and optimize vaccine allocation.
            </p>
            <div className="text-sm font-medium text-green-700">Prevent outbreaks before they happen.</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-gray-900">Farmer-Centric Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Provides guidance on vaccination schedules, biosecurity, and disease prevention for both smallholder and commercial farmers.
            </p>
            <div className="text-sm font-medium text-green-700">Practical guidance for healthier flocks.</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-gray-900">Strengthening Food Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Reducing disease outbreaks and livestock losses contributes to consistent poultry supply and community nutrition.
            </p>
            <div className="text-sm font-medium text-green-700">Healthy flocks, resilient communities.</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Lightbulb className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-gray-900">Innovation in Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Digital-first marketplace connects farmers, suppliers, veterinarians, and logistics partners to reduce delays and optimize vaccine access.
            </p>
            <div className="text-sm font-medium text-green-700">Smarter logistics for healthier flocks.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  {/* How It Works */}
  <section className="px-6 py-16 bg-white">
    <div className="mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How VARM Works</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Streamlined steps for farmers to request vaccines and suppliers to deliver quickly and safely.
        </p>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="border-gray-200 bg-green-50 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-gray-900">1. Quick Vaccine Requests</CardTitle>
          </CardHeader>
          <CardContent>
            Farmers log in, select their poultry type and location, and request vaccines directly from the platform.
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-green-50 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-gray-900">2. Supplier Matching</CardTitle>
          </CardHeader>
          <CardContent>
            The system instantly connects farmers to the nearest verified suppliers with available stock.
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-green-50 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-gray-900">3. AI-Driven Analytics & Forecasting</CardTitle>
          </CardHeader>
          <CardContent>
            Data on orders, outbreaks, and regional stock levels powers predictive models to optimize vaccine allocation and support government planning.
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</div>

  )
}

export default Page