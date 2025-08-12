import type React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-gradient-to-br from-green-50 via-white to-gray-50 ">
      <AppSidebar />
      <main className="flex-1">
        <div className="flex h-16 items-center gap-4 border-b px-4">
          <SidebarTrigger variant={'secondary'}/>
          <h1 className="font-semibold">Dashboard</h1>
        </div>
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  )
}
