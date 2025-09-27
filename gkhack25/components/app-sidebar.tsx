"use client";
import {
  Home,
  Plus,
  FileText,
  Users,
  Award,
  TrendingUp,
  Clock,
  Target,
  ArrowRightCircleIcon,
  Calendar,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User2, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import logout, { getUser } from "@/app/Auth/Actions/Actions";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const studentAvailableItems = [
  {
    title: "Home",
    url: "/Dashbard",
    icon: Home,
  },
  {
    title: "Borowse vacines",
    url: "/Dashboard/my-posts",
    icon: FileText,
  },
  {
    title: "Place Order ",
    url: "/Dashboard/research-challanges",
    icon: Award,
    comingSoon: true,
    description: "Compete in innovation challenges",
  },
];
const farmerAvailableItems = [
  {
    title: 'Home',
    url: '/Dashboard',
    icon: Home,
  },
  {
    title: 'Add/Edit stock',
    url: '/Dashboard/add-inventory',
    icon: Calendar,
  },
  {
    title: 'View Incomming Orders',
    url: '/Dashboard/create-challange',
    icon: Plus,
  },
  {
    title: 'Confirm/decline orders',
    url: '/Dashboard/learn',
    icon: FileText,
  },
  {
    title: 'Posts',
    url: '/Dashboard/my-posts',
    icon: Users,
  },
  
];

const StudentComingSoonItems = [
  {
    title: "Student Network",
    url: "#",
    icon: Users,
    comingSoon: true,
    description: "Connect with peers",
  },
  {
    title: "Impact Tracker",
    url: "#",
    icon: TrendingUp,
    comingSoon: true,
    description: "See your research impact",
  },
  {
    title: "Farmer Feedback",
    url: "#",
    icon: Target,
    comingSoon: true,
    description: "Get feedback from farmers",
  },
  
];
/* Farmer Coming soon items 
1.Pest Detection
2.Whatapp Chatbot

*/
export function AppSidebar() {
  const [user, setUser] = useState("");
  const [userType, setUserType] = useState<"student" | "farmer" | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const studentData = localStorage.getItem("studentData");
      const farmerData = localStorage.getItem("farmerData");

      if (studentData) {
        const parsed = JSON.parse(studentData);
        /* console.log("Parsed studentData:", parsed); */
        setUser(parsed.email ?? "");
        if (parsed.fieldOfStudy || parsed.field_of_study) {
          setUserType("student");
          return;
        }
      }
      if (farmerData) {
        const parsed = JSON.parse(farmerData);
       /*  console.log("Parsed farmerData:", parsed); */
        setUser(parsed.email ?? "");
        if (parsed.location || parsed["location"]) {
          setUserType("farmer");
          return;
        }
      }
      // fallback to server-side getUser
      const data = await getUser();
      /* console.log("Fetched user data:", data); */
      if (data && data.email) {
        setUser(data.email);
        if (data.type === "student") setUserType("student");
        else if (data.type === "farmer") setUserType("farmer");
        else setUserType(null);
      }
    };
    fetchUser();
  }, []);
/* console.log("User Type:", userType); */
  const availableItems = userType === "student"
    ? studentAvailableItems
    : userType === null
    ? farmerAvailableItems
    : [{'title': 'Home', 'url': '/Dashboard', 'icon': Home}];

  const comingSoonItems = userType === "student"
    ? StudentComingSoonItems
    : [];

  return (
    <Sidebar className="bg-gradient-to-br from-green-50 via-white to-gray-50 ">
      <SidebarContent className="bg-gradient-to-br from-green-50 via-white to-gray-50">
        <SidebarGroup className="gap-4">
          <SidebarGroupLabel className="text-2xl font-bold">
            AgriThinkHub
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3 font-medium  text-lg">
              {availableItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700">
            Coming Soon
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {comingSoonItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="opacity-60 cursor-not-allowed hover:bg-transparent flex-col items-start h-auto py-2 text-gray-600"
                      onClick={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs border-gray-300 text-gray-500"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Soon
                        </Badge>
                      </div>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1 ml-6">
                          {item.description}
                        </p>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    onClick={logout}
                    variant={"ghost"}
                    className="text-sm font-medium"
                  >
                    Sign Out <ArrowRightCircleIcon />{" "}
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}