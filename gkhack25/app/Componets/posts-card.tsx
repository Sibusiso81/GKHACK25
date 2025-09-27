"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  FileText,
  ImageIcon,
  ExternalLink,
  Download,
  Eye,
  Clock,
  GraduationCap,
  Building,
  BookOpen,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PostData } from "@/lib/types";
import Image from "next/image";

interface PostCardProps {
  post: PostData;
}

export function PostCard({ post }: PostCardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { date, time } = formatDate(post.created_at);

  // Extract filename from URL
  const getFileName = (url: string) => {
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    return decodeURIComponent(filename.split("_").slice(1).join("_"));
  };

  // Truncate description for card preview
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-green-100 border-gray-200 bg-white hover:border-green-200 w-full">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2 mb-3">
                  {post.title}
                </h3>

                {/* Student Profile Info */}
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-100 text-green-700 text-sm font-medium">
                      {getInitials(post.profile.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {post.profile.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {post.profile.year_of_study} •{" "}
                      {post.profile.field_of_study}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{date}</span>
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{time}</span>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 shrink-0"
              >
                <Eye className="h-3 w-3 mr-1" />
                View
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 text-wr">
              {truncateText(post.description, 120)}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {post.image_urls.length > 0 && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <ImageIcon className="h-4 w-4 text-green-600" />
                    <span>{post.image_urls.length}</span>
                  </div>
                )}
                {post.document_urls.length > 0 && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span>{post.document_urls.length}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Building className="h-3 w-3" />
                <span className="truncate max-w-24">
                  {post.profile.university}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent
        className="w-[80%]
    max-h-[90vh]    p-0"
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-md md:text-2xl font-bold text-gray-900  text-center mx-auto">
            {post.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-4 text-gray-600 mt-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {date} at {time}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] px-4 sm:px-6">
          <div className="p-6 pt-4 space-y-6">
            {/* Student Profile Section */}
            <div className="bg-gradient-to-r from-green-50 to-gray-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-4 w-fit ">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-green-100 text-green-700 text-lg font-medium">
                    {getInitials(post.profile.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {post.profile.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building className="h-4 w-4 text-green-600" />
                      <span>{post.profile.university}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <BookOpen className="h-4 w-4 text-green-600" />
                      <span>{post.profile.field_of_study}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <GraduationCap className="h-4 w-4 text-green-600" />
                      <span>{post.profile.year_of_study}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-3 w-fit ">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Research Description
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {post.description}
                </p>
              </div>
            </div>

            {/* Images Section */}
            {post.image_urls.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-green-600" />
                  Research Images ({post.image_urls.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {post.image_urls.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:border-green-300 transition-colors"
                      onClick={() => setSelectedImage(imageUrl)}
                    >
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={`Research image ${index + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        width={100}
                        height={100}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Section */}
            {post.document_urls.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Research Documents ({post.document_urls.length})
                </h3>
                <div className="space-y-3">
                  {post.document_urls.map((docUrl, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-300 transition-colors group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">
                            {getFileName(docUrl)}
                          </p>
                          <p className="text-sm text-gray-500">PDF Document</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                          onClick={() => window.open(docUrl, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = docUrl;
                            link.download = getFileName(docUrl);
                            link.click();
                          }}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Post Metadata */}
            <Separator />
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">
                Post Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Published:</span>
                  <p className="text-gray-700">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Attachments:</span>
                  <p className="text-gray-700">
                    {post.image_urls.length} images, {post.document_urls.length}{" "}
                    documents
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Research Area:</span>
                  <p className="text-gray-700">{post.profile.field_of_study}</p>
                </div>
                <div>
                  <span className="text-gray-500">Institution:</span>
                  <p className="text-gray-700">{post.profile.university}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Image Preview Dialog */}
        {selectedImage && (
          <Dialog
            open={!!selectedImage}
            onOpenChange={() => setSelectedImage(null)}
          >
            <DialogContent className="max-w-4xl max-h-[90vh] p-2">
              <div className="relative">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Full size preview"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  width={100}
                  height={100}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = selectedImage;
                    link.download = "research-image.jpg";
                    link.click();
                  }}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
}