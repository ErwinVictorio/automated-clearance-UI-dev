import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Subject } from "@/schemas/FormSchema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import axiosClient from '@/lib/axiosClient';
import { getXsrfToken } from "@/lib/crf_token"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface DialogProps {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  onSuccess?: () => void  // optional callback
}

function AddSubject({ open, onOpenChange, onSuccess }: DialogProps) {

  const [IsLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof Subject>>({
    resolver: zodResolver(Subject),
    defaultValues: {
      subject: "",
    },
  })


  // CREATE DEPARTMENT

  async function StoreDepartment(subject_name: string) {

    setIsLoading(true)
    try {
      await axiosClient.get("/sanctum/csrf-cookie");

      await axiosClient({
        method: "POST",
        url: "/api/admin/create-subject",
        data: {
          Subject_name: subject_name
        },
        responseType: "json",
        headers: {
          "X-XSRF-TOKEN": getXsrfToken() ?? ""
        }
      }).then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message)
        } else {
          toast.error(res.data.error)
        }
      })
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }

  }

  async function onSubmit(values: z.infer<typeof Subject>) {
    // Do something with the form values.

    await StoreDepartment(values.subject)


    //  Reset the for after submitting
    form.reset()
    onSuccess?.()
    onOpenChange(false)
  }


  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <FormControl>
                        <Input placeholder="Subject" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">
                    {IsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {IsLoading ? "Loading..." : "Add Now"}
                  </Button>
                  <DialogClose asChild>
                    <Button className="bg-gray-600 text-white">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>

  )
}

export default AddSubject
