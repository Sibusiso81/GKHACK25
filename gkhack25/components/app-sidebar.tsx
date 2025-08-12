'use client'
import {
  Home,
  Plus,
  FileText,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Settings,
  Clock,
  Target,
  ArrowRightCircleIcon,
} from "lucide-react"
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
} from "@/components/ui/sidebar"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { User2, ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"
import logout, { getUser } from "@/app/Auth/Actions/Actions"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

const availableItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Create Post",
    url: "/Dashboard/create-post",
    icon: Plus,
    highlight: true,
  },
  {
    title: "My Posts",
    url: "/Dashboard/my-posts",
    icon: FileText,
  },
  
]

// Coming soon features
const comingSoonItems = [
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
  {
    title: "Research Challenges",
    url: "#",
    icon: Award,
    comingSoon: true,
    description: "Compete in innovation challenges",
  },
]


export function AppSidebar() {
const [user, setUser] = useState('');
useEffect(()=>{
  const user  = async()=>await getUser()
  user().then((data)=>{
    if(data){
      setUser(data.email ?? '')
    }
  })
},[])


  return (
    <Sidebar className="bg-gradient-to-br from-green-50 via-white to-gray-50 ">
      <SidebarContent className="bg-gradient-to-br from-green-50 via-white to-gray-50">
        <SidebarGroup className="gap-4">
          <SidebarGroupLabel className="text-2xl font-bold">AgriThinkHub</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5 font-medium">
              {availableItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
              <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700">Coming Soon</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {comingSoonItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="opacity-60 cursor-not-allowed hover:bg-transparent flex-col items-start h-auto py-2 text-gray-600"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <Badge variant="outline" className="text-xs border-gray-300 text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        Soon
                      </Badge>
                    </div>
                    {item.description && <p className="text-xs text-gray-500 mt-1 ml-6">{item.description}</p>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
                   <Button onClick={logout} variant={'ghost'} className="text-sm font-medium">Sign Out <ArrowRightCircleIcon/> </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
