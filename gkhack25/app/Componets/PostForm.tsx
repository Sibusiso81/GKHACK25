import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { uploadPost } from "../Auth/Actions/Actions";
import { toast, Toaster } from "sonner";
function PostForm() {
  /* const [images, setImages] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]); */
  /* const [images_display_urls, setImages__Display_Urls] = useState<string[]>([]);
  const [documents_display_urls, setDocuments_Display_Urls] = useState<string[]>([]); */
  const [postCreated, setPostCreated] = useState(false);

  /*  function handleImageChange(files: File[], onChange: (files: File[]) => void) {
    // Combine previous images with new files
    
    setImages((prev) => [...prev, ...files.map((file) => file)]);

    setImages__Display_Urls((prev = []) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
   
    // Combine previous files with new files for the form field
    onChange([...(PostForm.getValues("images") ?? []), ...files]);
    onChange([...(PostForm.getValues("images") ?? []), ...files]);
  }
 */
  /*  function handleDocumentChange(
    files: File[],
    onChange: (files: File[]) => void
  ) {
    // Combine previous documents_urls with new files
    
    setDocuments((prev) => [...prev, ...files.map((file) => file)]);
    setDocuments_Display_Urls((prev = []) => [
      ...prev,
      ...files.map((file) => file.name),
    ]);
    
    // Combine previous files with new files for the form field
    onChange([...(PostForm.getValues("documents_urls") ?? []), ...files]);
  } */
  const postFormSchema = z.object({
    productId: z
      .string()
      .min(3, { message: "ID must be at least 3 characters long" })
      .max(100, { message: "ID must not exceed 100 characters" }),

    name: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long" })
      .max(1000, { message: "Description must not exceed 1000 characters" }),

    stock: z.number().min(1, "Stock is Required"),

    supplierId: z.string().min(6, "Supplier id required "),

    /* images: z
      .array(z.instanceof(File))
      .max(20, { message: "You can upload a maximum of 5 images" })
      .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
        message: "Each image must be less than 5MB",
      })
      .refine(
        (files) => files.every((file) => file.type.startsWith("image/")),
        { message: "Only image files are allowed" }
      )
      .optional(),

    documents_urls: z
      .array(z.instanceof(File))
      .max(20, { message: "You can upload a maximum of 5 documents_urls" })
      .refine((files) => files.every((file) => file.size <= 10 * 1024 * 1024), {
        message: "Each document must be less than 10MB",
      })
      .optional(),
  }); */
  });

  const PostForm = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      productId: "",
      name: "",
      stock: 0,
      supplierId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    setPostCreated(true);
    /*  const  images_urls = await uploadImages(images); // returns an array of image urls
    const  documents_urls = await uploadDocuments(documents);
    console.log('Public Image links :',images_urls)
    console.log('Public Document links :',images_urls) */

    const result = await uploadPost({
      productId: values.productId,
      name: values.name,
      stock: values.stock,
      supplierId: values.supplierId,
    });

    if (result.success) {
      toast.success("Your post has been successfully uploaded.", {
        description: `Thank you for your contribution`,
      });
      PostForm.reset();
    } else {
      toast.error(`${"Something went wrong."}`);
    }
    setPostCreated(false);
  }
  return (
    <Form {...PostForm}>
      <Toaster position="top-center" closeButton />
      <form
        onSubmit={PostForm.handleSubmit(onSubmit)}
        className="space-y-10 lg:space-y-8 lg:grid lg:grid-cols-2 lg:gap-8"
      >
        <FormField
          control={PostForm.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="p-4"
                  placeholder="Enter a Title for your post"
                  type="text"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={PostForm.control}
          name="name"
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
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={PostForm.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Quantity</FormLabel>
              <FormControl>
                <Input
                  className="p-4"
                  placeholder="Enter stock quantity"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={PostForm.control}
          name="supplierId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>supplier info</FormLabel>
              <FormControl>
                <Input
                  className="p-4"
                  placeholder="Enter your suplier name "
                  type="text"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*     <FormField
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
        /> */}
        {/* <FormField
          control={PostForm.control}
          name="documents_urls"
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
        /> */}
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
                    <p>NDV001</p>
                    <div className="flex space-x-2">
                      <p>nONILLIS nd cLONE 30</p>
                      <p></p>
                    </div>
                    <p></p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              {/* Scrollable content area */}
            </DialogContent>
          </Dialog>
          {postCreated ? (
            <Button disabled>
              <Loader2Icon className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="cursor-pointer w-full">
              Submit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default PostForm;
