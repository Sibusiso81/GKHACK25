"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PostData } from "@/lib/types"
import { getAllPosts } from "@/app/Auth/Actions/Actions"
import { PostsGrid } from "@/app/Componets/posts-grid"
import { createClient } from "@/app/utils/supabse/client"

export default function BrowsePage() {
  const [posts, setPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  posts.forEach((post, index) => {
  console.log(`Post ${index + 1}:`, post);
});
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const fetchedPosts = await getAllPosts()
        setPosts(fetchedPosts)
      } catch (err) {
        console.error("Error fetching posts:", err)
        setError("Failed to load posts. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])
useEffect(() => {
     async function fetchUpdaredPosts(){
  const supabase = await createClient();
  const channel = supabase.channel("posts-channel");
  channel.on(
    "postgres_changes",
    {event:'INSERT',schema:"public",table:"posts"},
  (payload)=>{
    const newPost = payload.new as PostData;
    setPosts((prevPosts)=>[...prevPosts,newPost])
  }
  ).subscribe((status)=>{
    console.log('Subsciption status',status)
  })
  
}
fetchUpdaredPosts()
},[])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Browse Research Posts</h1>
          <p className="text-gray-600">Discover agricultural research and innovations shared by fellow students</p>
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="border-gray-200 bg-white w-full ">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-12" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-8" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Browse Research Posts</h1>
          <p className="text-gray-600">Discover agricultural research and innovations shared by fellow students</p>
        </div>

        <div className="text-center py-12">
          <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Posts</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Browse Supplier Inventory</h1>
        <p className="text-gray-600">Discover agricultural research and innovations shared by fellow students</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Showing {posts.length} post{posts.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <PostsGrid posts={posts} />
    </div>
  )
}
