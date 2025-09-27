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
  ArrowRight,
 
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
          await createStudentProfile({
            email: parsedData.email,
            name: parsedData.name,
            field_of_study: parsedData.fieldOfStudy,
            year_of_study: parsedData.yearOfStudy,
            university: parsedData.university,
          });
          localStorage.removeItem("studentData");
          if (isMounted) {
            const posts = await getAllPosts();
            console.log("Posts fetched", posts);
          }
        } else if (farmerData && !studentData) {
          const parsedFarmer = JSON.parse(farmerData);
          await createFarmerProfile({
            age_group: parsedFarmer.ageGroup,
            email: parsedFarmer.email,
            name: parsedFarmer.name,
            location: parsedFarmer.location,
            farming_goal: parsedFarmer.farmingGoal,
            farming_experience_level: parsedFarmer.farmingExperienceLevel,
            crops_grown: parsedFarmer.cropsGrown,
            farming_vision: parsedFarmer.farmingVision,
          });
          localStorage.removeItem("farmerData");
          if (isMounted) {
            const posts = await getAllPosts();
            console.log("Posts fetched", posts);
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
    <Toaster/>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-gray-50 px-6 py-16">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
        <div className="relative mx-auto max-w-4xl text-center space-y-4">
          <Badge variant="secondary" className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
            🎓 For Students • By Students • Helping Farmers
          </Badge>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Turn Your
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              {" "}
              Academic Knowledge
            </span>
            <br />
            <span className="text-2xl sm:text-3xl text-gray-700">Into Real-World Impact</span>
          </h1>

          <p className="mb-8 text-xl text-gray-600 max-w-2xl mx-auto">
            Share your agricultural research, theories, and innovative solutions with fellow students. Together, we&apos;re
            building the knowledge base that will revolutionize farming in South Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3" asChild>
              <a href="/create-post" className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Share Your Research
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
              asChild
            >
              <a href="#impact" className="flex items-center gap-2">
                See Your Impact
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Quick Stats */}
                      <h2 className='text-2xl font-bold   col-span-2 '>Help us Reach </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">

            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">200+</div>
              <div className="text-sm text-gray-600">Student Contributors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">200+</div>
              <div className="text-sm text-gray-600">Farmers </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">500+</div>
              <div className="text-sm text-gray-600">Research Posts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Your Academic Work Matters</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              South African farmers face real challenges that your research can help solve
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-gray-200 bg-gray-50/50 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Limited Agricultural Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Township farmers lack access to modern agricultural theories and research-backed farming methods.
                </p>
                <div className="text-sm font-medium text-green-700">Your research can bridge this gap!</div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-gray-50/50 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Pest &amp; Disease Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Farmers struggle with crop diseases and pests without access to scientific solutions.
                </p>
                <div className="text-sm font-medium text-green-700">Share your plant pathology knowledge!</div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-gray-50/50 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Sustainable Farming Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Need for eco-friendly, cost-effective farming methods that work in South African conditions.
                </p>
                <div className="text-sm font-medium text-green-700">Your sustainability research matters!</div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-gray-50/50 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Innovation Gap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Disconnect between university research and practical farming applications in townships.
                </p>
                <div className="text-sm font-medium text-green-700">Be the bridge between theory and practice!</div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-gray-50/50 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Climate Adaptation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Farmers need climate-resilient crops and techniques to adapt to changing weather patterns.
                </p>
                <div className="text-sm font-medium text-green-700">Your climate research can save crops!</div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-gray-50/50 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Knowledge Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Limited platforms for students to collaborate and share agricultural innovations.
                </p>
                <div className="text-sm font-medium text-green-700">Join the student innovation network!</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Features for Students */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Making an Impact Today</h2>
            <p className="text-lg text-gray-600">Share your knowledge and connect with fellow student innovators</p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">AgriThinkHub - Student Innovation Platform</CardTitle>
                <CardDescription className="text-gray-700 text-lg">
                  Share your research, theories, and innovative solutions to help solve real farming challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200">
                    <BookOpen className="h-6 w-6 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Research Papers</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200">
                    <Lightbulb className="h-6 w-6 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Innovative Ideas</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200">
                    <Target className="h-6 w-6 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Problem Solutions</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200">
                    <Award className="h-6 w-6 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Case Studies</span>
                  </div>
                </div>

                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" asChild>
                  <a href="/create-post" className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Share Your First Research
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Student Benefits */}
      <section className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What&apos;s In It For You?</h2>
            <p className="text-lg text-gray-600">Benefits for student contributors</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-gray-200 bg-gray-50/50 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Build Your Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Showcase your research and innovations to potential employers and graduate programs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-gray-50/50 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Network with Peers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Connect with like-minded students from universities across South Africa and beyond.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-gray-50/50 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Real-World Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  See your academic work directly help farmers improve their livelihoods and food security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Exciting Features Coming Soon</h2>
            <p className="text-lg text-gray-600">We&apos;re building tools to amplify your impact</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="relative overflow-hidden border-gray-200 bg-white">
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  <Clock className="h-3 w-3 mr-1" />
                  Coming Soon
                </Badge>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Direct Farmer Connection</CardTitle>
                <CardDescription className="text-gray-700">
                  Your research will be automatically translated and shared with farmers via WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Auto-translation to local languages
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Voice message summaries
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Farmer feedback on your research
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-gray-200 bg-white">
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  <Clock className="h-3 w-3 mr-1" />
                  Coming Soon
                </Badge>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Impact Tracking & Rewards</CardTitle>
                <CardDescription className="text-gray-700">
                  See how many farmers your research helped and earn recognition for your contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Real-time impact metrics
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Digital certificates and badges
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Airtime rewards for top contributors
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stay Updated Section */}
     
    </div>
  )
}

export default Page