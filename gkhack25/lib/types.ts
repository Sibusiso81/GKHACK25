import { LucideIconName } from "@/app/Componets/DynamicLucideIcon";

export interface LandingPageProps {
  index: number;
  onLanguageChange: (lang: string) => void;
}
export interface HowToProps {
  steps: { step: string; subHeading: string; description: string }[];
}
export interface PricingCardProps {
  price: string;
  description: string;
  features: string[];
  idx: number;
  buttonText: string;
}

export interface FeatureCardProps {
  icon: LucideIconName;
  heading: string;
  description: string;
}

export type Post = {
  title: string;
  description: string;
  images_urls: string[];
  documents_urls: string[];
};




type StudentProfile = {
  language: string;
  password: string;
  fieldOfStudy: string;
  yearOfStudy: string;
  university: string;
};
export const StudentProfile: StudentProfile = {
  language: "",
  password: "",
  fieldOfStudy: "",
  yearOfStudy: "",
  university: "",
};
/* interface StudentFormProps {
  initialData: {
    name: string
    email: string
    password: string
    fieldOfStudy: string
    yearOfStudy: string
    university: string
  }
  onSubmit: (data: StudentFormData) => void
  onBack: () => void
} 
  
student = {
name,
email,
univeristy,
yearOfStudy,
FeildOfStudy,
posts:[
[
id,
title,
description,
images:[]
documents:[]
]

]



}















*/
export interface Farmer {
  name: string;
  email: string;
  password: string;
  farmingGoal: string;
  FarmingExperienceLevel: string;
  InternetAccessType: string;
  cropsGrown: string;
  location: string;
  ageGroup: string;
  farmingVision: string;
}
export type User = "Student" | "Farmer" | null;
