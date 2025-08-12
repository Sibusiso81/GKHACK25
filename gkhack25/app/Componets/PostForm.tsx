import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
function PostForm() {
  const [Description, setDescription] = useState("");
  const [Title, setTitle] = useState("");
  const [Images, setImages] = useState<string[]>([]);
  const [Documents, setDocuments] = useState<string[]>([]);

  function handleImageChange(files: File[], onChange: (files: File[]) => void) {
    // Combine previous images with new files
    console.log('image files:',files)
  setImages((prev) => [
    ...prev,
    ...files.map((file) => URL.createObjectURL(file)),
  ]);
  console.log(Images)
  // Combine previous files with new files for the form field
  onChange([
    ...(PostForm.getValues("images") ?? []),
    ...files,
  ]);
  }


  function handleDocumentChange(
    files: File[],
    onChange: (files: File[]) => void
  ) {
   // Combine previous documents with new files
   console.log('document files:',files)
  setDocuments((prev) => [
    ...prev,
    ...files.map((file) => file.name),
  ]);
  console.log(Documents)
  // Combine previous files with new files for the form field
  onChange([
    ...(PostForm.getValues("documents") ?? []),
    ...files,
  ]);
  }
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
  function onSubmit() {}
  return (
    <Form {...PostForm}>
      <form
        onSubmit={PostForm.handleSubmit(onSubmit)}
        className="space-y-10 lg:space-y-8 lg:grid lg:grid-cols-2 lg:gap-8"
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
                  onChange={(e)=>{
                    field.onChange(e)
                    setTitle(e.target.value)
                  }}
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
                  onChange={(e)=>{
                    field.onChange(e);
                    setDescription(e.target.value)
                    
                  }}
                  value={Description}
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
                    handleImageChange(files, field.onChange);
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
              <FormLabel>
                Upload files <ArrowDownToLine className="w-4" />{" "}
              </FormLabel>
              <FormControl>
                <Input
                  className="p-12 flex items-center justify-center"
                  placeholder="Upload files for your post"
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? []);
                    console.log(files);
                    field.onChange(files);
                    handleDocumentChange(files, field.onChange);
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
        <div className="flex flex-col space-y-4 ">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className="w-full">
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="md:w-2xl lg:w-5xl max-h-[80vh] flex flex-col scrollbar-hide">
              <DialogHeader className="flex-shrink-0">
                <DialogTitle>
                  <div className="flex-col space-y-0.5 text-sm text-start font-medium">
                    <p>Sibusiso Zulu</p>
                    <div className="flex space-x-2">
                      <p>Agriculture</p>
                      <p>2nd Year</p>
                    </div>
                    <p>University of Johannesburg</p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              {/* Scrollable content area */}
              <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                <div className="space-y-4">
                  
               <div > <h1 className="textlg font-bold">{Title}</h1></div>
                  <div className="border-2 h-fit rounded-md grid grid-cols-2 gap-2 p-2 w-full">
                    
                    <div className="grid grid-cols-3 gap-1 w-full">
                      {
                        Images.map((image,idx)=>(
                          
                            <Image
                            key={idx}
                            src={image}
                            width={200}
                            height={200}
                            sizes="(max-width: 768px) 200px, (max-width: 1200px) 200px, 200px"
                            alt={`Uploaded image ${idx + 1}`}
                            className="border-2 rounded-md bg-gray-50 col-span-1"/>
                         
                        ))
                      }
                    {/*   <div className="border-2 rounded-md bg-gray-50"></div>
                      <div className="border-2 rounded-md bg-gray-50"></div>
                      <div className="border-2 rounded-md bg-gray-50"></div>
                      <div className="border-2 rounded-md bg-gray-50"></div> */}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <h3 className="col-span-2 text-nowrap">Uploaded Documents:</h3>
                    {Documents.map((document, i) => (
                     <div
                          key={i}
                          className="border rounded-md p-3 bg-gray-50 flex space-x-2"
                        >
                          <p className="text-xs">{document}</p>
                          
                        </div>
                    ))}
                  </div>

                  <DialogDescription className="text-sm text-start">
                   {Description}
                  </DialogDescription>

                  {/* Extra content to demonstrate scrolling */}
                 
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button type="submit" className="cursor-pointer w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PostForm;
