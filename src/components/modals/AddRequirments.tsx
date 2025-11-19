import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RequirmentSchema } from "@/schemas/FormSchema"

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
import { Textarea } from "../ui/textarea"
import { useEffect, useState } from "react"
import axiosClient from "@/lib/axiosClient"
import { getXsrfToken } from "@/lib/crf_token"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface DialogProps {
  open: boolean,
  onOpenChange: (open: boolean) => void
}

function CreateRequirments({ open, onOpenChange }: DialogProps) {

  const [subjects, setSubecjt] = useState<string[]>([]);
  const [Loading, setLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof RequirmentSchema>>({
    resolver: zodResolver(RequirmentSchema),
    defaultValues: {
      requirment: "",
      subject: "",
      detail: ""
    },
  })

  //  Get teh list of Subjects
  useEffect(() => {
    async function GetSubjects() {
      await axiosClient.get("/sanctum/csrf-cookie");
      await axiosClient({
        method: "GET",
        url: 'api/teacher/subjects',
        responseType: "json",
        headers: {
          "X-XSRF-TOKEN": getXsrfToken() ?? ""
        }
      }).then((res) => {
        console.log(res.data.data)
        setSubecjt(res.data.data)
      })

    }
    GetSubjects()

  }, [])


  // Create Requirment
  async function CreateRequirment(
    title: string,
    detail: string,
    subject: string
  ) {

    setLoading(true)
    try {
         await axiosClient.get("/sanctum/csrf-cookie");
      await axiosClient({
        method: "POST",
        url: "api/teacher/requirment",
        responseType: 'json',
        data: {
          requirment: title,
          detail: detail,
          subject: subject
        },
        headers:{
             "X-XSRF-TOKEN": getXsrfToken() ?? ""
        }
      }).then((res) => {
        console.log(res)
        toast.success(res.data.message)
      })


    } catch (error) {
      console.log(error)

    }finally{
       setLoading(false)
       form.reset();
       onOpenChange(false)
    }
  }




  async function onSubmit(values: z.infer<typeof RequirmentSchema>) {
    // Do something with the form values.
    CreateRequirment(
      values.requirment,
      values.detail,
      values.subject
    )
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Requirment</DialogTitle>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="requirment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <FormControl>
                        <Input placeholder="Requirment Name" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="detail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <FormControl>
                        <Textarea placeholder="Detail" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/*  Display the list of subject here */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects && subjects.map((sub, index) => (
                              <SelectItem key={index} value={sub}>{sub}</SelectItem>
                            ))}

                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />



                <DialogFooter>
                  <Button type="submit">
                    {Loading && <Loader2 className="text-white" />}
                    {Loading ? "Loading..." : "Add Now"}
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

export default CreateRequirments
