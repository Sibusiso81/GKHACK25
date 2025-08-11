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


type Post ={
  
  title:string,
  description:string,
  feildofStudy:string,
  yearOfStudy:string,
  university:string,
  images: File[],
  documents: File[],  

}

export const PostCreated: Post = {

  title: "",
  description: "",
  feildofStudy: "",
  yearOfStudy: "",
  university: "",
  images: [],
  documents: []
}

PostCreated.description = 'dssdsdsd'
console.log(PostCreated)
type StudentProfile = {
 
  language:string,
  password: string,
  fieldOfStudy: string,
  yearOfStudy: string,
  university: string,
}
export const StudentProfile: StudentProfile = {
  language:'',
  password: "",
  fieldOfStudy: "",
  yearOfStudy: "",
  university: ""
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
} */
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
  farmingVision:string;
}
export type User = "Student" | "Farmer" | null;
