import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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

interface DialogProps {
  open: boolean,
  onOpenChange: (open: boolean) => void
}

function CreateRequirments({ open, onOpenChange }: DialogProps) {

  const form = useForm<z.infer<typeof RequirmentSchema>>({
    resolver: zodResolver(RequirmentSchema),
    defaultValues: {
      requirment: "",
    },
  })

  function onSubmit(values: z.infer<typeof RequirmentSchema>) {
    // Do something with the form values.
    console.log(values)
  }


  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Requirment</DialogTitle>
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
                        <Textarea placeholder="Detail" {...field}/>
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <DialogFooter>
                  <Button type="submit">Add Now</Button>
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
