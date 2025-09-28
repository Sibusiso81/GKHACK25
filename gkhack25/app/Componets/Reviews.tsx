"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star,  MessageSquare, Send, Sprout, Leaf, RefreshCw } from "lucide-react"
import { createReview, getReviews, getUserID } from "../Auth/Actions/Actions"



interface Review {
  id: string
  user_id: string
  rating: number
  title: string
  content: string
  created_at: string
  updated_at?: string
  profiles?: {
    full_name?: string
    email?: string
  }
}

export function ReviewsPage() {
  const [newReview, setNewReview] = useState({
    title: "",
    content: "",
    rating: 5,
  })
  const [userId, setUserId] = useState("")
  const [reviews, setReviews] = useState<Review[]>([])
 
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
  setLoading(true)
  try {
    const reviewsData = await getReviews()
    setReviews(reviewsData || [])  // set state safely

  } catch (error) {
    console.error("Error fetching data:", error)
  } finally {
    setLoading(false)
  }
}

// If you want to log the updated state
useEffect(() => {
  console.log("Updated reviews:", reviews)
}, [reviews])


  useEffect(() => {
    // Get user ID (you'll need to implement getUserID function)
    async function user() {
      // const id = await getUserID()
      // setUserId(id)
      const id  = await getUserID()
      setUserId(id) 
      // Placeholder until you implement getUserID
    const rev = await getReviews()
    if(rev){
        setReviews(rev)
    }
    }
    user()

    // Fetch all data on component mount
    fetchData()
  }, [])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    const newReviewData = {
      title: newReview.title,
      content: newReview.content,
      rating: newReview.rating,
    }

    try {
      const result = await createReview(newReviewData, userId)
      if (result) {
        setNewReview({ title: "", content: "", rating: 5 })
        // Refresh reviews after successful submission
        await fetchData()
      }
    } catch (error) {
      console.error("Error submitting review:", error)
    }
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-primary text-primary" : "text-muted-foreground"
            } ${interactive ? "cursor-pointer hover:text-primary" : ""}`}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sprout className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">AgriReviews Dashboard</h1>
                <p className="text-muted-foreground">Farmer feedback and platform insights</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchData}
                disabled={loading}
                className="flex items-center gap-2 bg-transparent"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1"
              >
                <Leaf className="h-3 w-3" />
                Live Farm Data
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* User Statistics Grid */}
    

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent User Activity */}
     

          {/* Review Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Share Your Experience
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Help fellow farmers with your platform review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rating" className="text-foreground">
                    Rating
                  </Label>
                  <div className="flex items-center gap-2">
                    {renderStars(newReview.rating, true, (rating) => setNewReview((prev) => ({ ...prev, rating })))}
                    <span className="text-sm text-muted-foreground">({newReview.rating}/5)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-foreground">
                    Review Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Summarize your farming experience..."
                    value={newReview.title}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-foreground">
                    Your Review
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="How has this platform helped your farming operations?"
                    value={newReview.content}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, content: e.target.value }))}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground min-h-[120px] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={!newReview.title || !newReview.content}
                >
                  Submit Review
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Reviews Display */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Farmer Reviews
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Latest feedback from our farming community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="text-center text-muted-foreground">Loading reviews...</div>
              ) : reviews.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  No reviews yet. Be the first to share your experience!
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-lg bg-muted/30 border border-border/50 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={`/placeholder.svg?height=24&width=24&query=farmer`} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {(review.profiles?.full_name || review.profiles?.email || "U").slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">
                          {review.profiles?.full_name || review.profiles?.email?.split("@")[0] || "Anonymous"}
                        </span>
                      </div>
                      {renderStars(review.rating)}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">{review.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(review.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
