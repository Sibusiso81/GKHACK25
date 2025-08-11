import React from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownToLine } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
function PostForm() {
     const postFormSchema = z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long" })
      .max(100, { message: "Title must not exceed 100 characters" }),

    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long" })
      .max(1000, { message: "Description must not exceed 1000 characters" }),

    images: z
      .array(z.instanceof(File))
      .max(5, { message: "You can upload a maximum of 5 images" })
      .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
        message: "Each image must be less than 5MB",
      })
      .refine(
        (files) => files.every((file) => file.type.startsWith("image/")),
        { message: "Only image files are allowed" }
      )
      .optional(),

    documents: z
      .array(z.instanceof(File))
      .max(5, { message: "You can upload a maximum of 5 documents" })
      .refine((files) => files.every((file) => file.size <= 10 * 1024 * 1024), {
        message: "Each document must be less than 10MB",
      })
      .optional(),
  });

  const PostForm = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
      documents: [],
    },
  });
  function onSubmit(){}
  return (
    <Form {...PostForm}>
          <form
            onSubmit={PostForm.handleSubmit(onSubmit)}
            className="space-y-10 lg:space-y-8"
          >
            <FormField
              control={PostForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      className="p-4"
                      placeholder="Enter a Title for your post"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={PostForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="p-4 "
                      placeholder="Enter a description for your post"
                      rows={20}
                      cols={50}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={PostForm.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    Upload images <ArrowDownToLine className="w-4" />
                  </FormLabel>
                  <FormControl className="items-center justify-center">
                    <Input
                      className="p-12 items-center justify-center"
                      placeholder="Upload images for your post"
                      type="file"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        field.onChange(files);
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={PostForm.control}
              name="documents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload files <ArrowDownToLine className="w-4" /> </FormLabel>
                  <FormControl>
                    <Input
                      className="p-12 flex items-center justify-center"
                      placeholder="Upload files for your post"
                      type="file"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        console.log(files)
                        field.onChange(files);
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-4">
              <Button className=" w-full" variant={"secondary"}>
                Preview
              </Button>
              <Button type="submit" className="cursor-pointer w-full">
                Submit
              </Button>
            </div>
          </form>
        </Form>
  )
}

export default PostForm