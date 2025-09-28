import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { uploadPost } from '../Auth/Actions/Actions'
import { toast, Toaster } from 'sonner'
function PostForm() {
  const [postCreated, setPostCreated] = useState(false)
  const postFormSchema = z.object({
    productId: z
      .string()
      .min(3, {
        message: 'ID must be at least 3 characters long',
      })
      .max(100, {
        message: 'ID must not exceed 100 characters',
      }),
    name: z
      .string()
      .min(10, {
        message: 'Description must be at least 10 characters long',
      })
      .max(1000, {
        message: 'Description must not exceed 1000 characters',
      }),
    stock: z.number().min(1, 'Stock is Required'),
    supplierId: z.string().min(6, 'Supplier id required '),
  })
  const PostForm = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      productId: '',
      name: '',
      stock: 0,
      supplierId: '',
    },
  })
  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    setPostCreated(true)
    const result = await uploadPost({
      productId: values.productId,
      name: values.name,
      stock: values.stock,
      supplierId: values.supplierId,
    })
    if (result.success) {
      toast.success('Your post has been successfully uploaded.', {
        description: `Thank you for your contribution`,
      })
      PostForm.reset()
    } else {
      toast.error(`${'Something went wrong.'}`)
    }
    setPostCreated(false)
  }
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow border border-gray-200">
        {/* Compact Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Create Product Listing
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Share your products with potential buyers
          </p>
        </div>
        {/* Form Section */}
        <div className="p-6">
          <Form {...PostForm}>
            <Toaster position="top-center" closeButton />
            <form
              onSubmit={PostForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Grid Layout for Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={PostForm.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Product Title <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10 px-3 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter product title"
                          type="text"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={PostForm.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Stock Quantity <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10 px-3 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="Available quantity"
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={PostForm.control}
                name="supplierId"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Supplier Information{' '}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 px-3 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Your supplier name or ID"
                        type="text"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )}
              />
              {/* Description Field */}
              <FormField
                control={PostForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Product Description{' '}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[100px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                        placeholder="Describe your product features and specifications..."
                        rows={4}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                    <div className="text-xs text-gray-500 text-right">
                      {field.value?.length || 0}/1000 characters
                    </div>
                  </FormItem>
                )}
              />
              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      className="flex-1 h-10 text-sm font-medium"
                    >
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="md:max-w-2xl max-h-[80vh] flex flex-col">
                    <DialogHeader className="flex-shrink-0">
                      <DialogTitle className="text-lg font-semibold">
                        Product Preview
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 py-4">
                      <p className="text-gray-600 text-sm">
                        Preview content will be displayed here...
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
                {postCreated ? (
                  <Button disabled className="flex-1 h-10 text-sm font-medium">
                    <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                    Creating...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1 h-10 text-sm font-medium bg-blue-600 hover:bg-blue-700"
                  >
                    Create Listing
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default PostForm
