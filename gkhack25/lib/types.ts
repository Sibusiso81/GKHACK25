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
  productId: string;
  name: string;
  stock: number;
  supplierId: string;
};


export interface StudentProfile {
  id: string
  created_at: string
  name: string
  email: string
  field_of_study: string
  year_of_study: string
  university: string
}

export interface PostData {
  id: string
  created_at: string
  title: string,
  product_name:string,
  supplier_id:string,
  stock_quantity:number,

  
}

export interface PostsResponse {
  posts: PostData[]
}


export interface PostsResponse {
  posts: PostData[]
}





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
