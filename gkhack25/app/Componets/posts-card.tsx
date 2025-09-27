"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Eye,
  Clock,
  Building,
} from "lucide-react";
import { PostData } from "@/lib/types";

interface PostCardProps {
  post: PostData;
}

export function PostCard({ post }: PostCardProps) {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const { date, time } = formatDate(post.created_at);

  



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-green-100 border-gray-200 bg-white hover:border-green-200 w-full">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2 mb-3">
                  {post.product_name}
                </h3>

                <div className="flex items-center gap-3 mb-3">
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-szm truncate">{post.created_at}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {post.id} 
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
              <Badge variant="secondary" className="bg-green-100 text-green-700 shrink-0">
                <Eye className="h-3 w-3 mr-1" /> View
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.supplier_id}</p>

            <div className="flex items-center justify-between">
             

              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Building className="h-3 w-3" />
                <span className="truncate max-w-24">{post.stock_quantity}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="w-[80%] max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-md md:text-2xl font-bold text-gray-900 text-center mx-auto">
            {post.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-4 text-gray-600 mt-2">
            <Calendar className="h-4 w-4" />
            <span>
              {date} at {time}
            </span>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] px-4 sm:px-6">
          <div className="p-6 pt-4 space-y-6">
            {/* Student Info */}
            <div className="bg-gradient-to-r from-green-50 to-gray-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-4 w-fit">
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{post.stock_quantity}</h3>
                 
                </div>
              </div>
            </div>

            {/* Description */}
          

            {/* Images */}
            

            {/* Documents */}
      
            {/* Metadata */}
            <Separator />
           
          </div>
        </ScrollArea>

        {/* Image Preview */}
      
      </DialogContent>
    </Dialog>
  );
}
