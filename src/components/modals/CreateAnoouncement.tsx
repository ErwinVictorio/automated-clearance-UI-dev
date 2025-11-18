import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { AnnouncementForm } from "@/schemas/FormSchema"
import { Textarea } from "@/components/ui/textarea"

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
import { MessageCircleCodeIcon } from "lucide-react"

interface DialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

function CreateAnnouncement({ open, onOpenChange }: DialogProps) {

    const form = useForm<z.infer<typeof AnnouncementForm>>({
        resolver: zodResolver(AnnouncementForm),
        defaultValues: {
            title: "",
            desription: ""
        },
    })

    function onSubmit(values: z.infer<typeof AnnouncementForm>) {
        // Do something with the form values.
        console.log(values)
    }


    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>New Announcement</DialogTitle>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel />
                                            <FormControl>
                                                <Input placeholder="Title" {...field} />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="desription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel />
                                            <FormControl>
                                                <Textarea placeholder="Message" {...field} />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button type="submit">
                                       <MessageCircleCodeIcon/>
                                        Create Now
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

export default CreateAnnouncement
