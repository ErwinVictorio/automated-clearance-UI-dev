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
import { Loader2, MessageCircleCodeIcon } from "lucide-react"
import axiosClient from '@/lib/axiosClient';
import { getXsrfToken } from "@/lib/crf_token"
import { useState } from "react"
import { toast } from "sonner"

interface DialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

function CreateAnnouncement({ open, onOpenChange }: DialogProps) {
    const [IsLoading, setIsLoading] = useState<boolean>(false)



    // Create Annoucement
    async function CrteateAnnoucement(
        title: string,
        message: string
    ) {

        setIsLoading(true)

        try {
            await axiosClient.get("/sanctum/csrf-cookie");

            axiosClient({
                method: "POST",
                url: "api/teacher/create-announcement",
                data: {
                    title: title,
                    message: message
                },
                responseType: "json",
                headers: {
                    "X-XSRF-TOKEN": getXsrfToken() ?? ""
                }
            }).then((res) => {
                toast.success(res.data.message)
            })

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }



    const form = useForm<z.infer<typeof AnnouncementForm>>({
        resolver: zodResolver(AnnouncementForm),
        defaultValues: {
            title: "",
            message: ""
        },
    })

    function onSubmit(values: z.infer<typeof AnnouncementForm>) {
        // Do something with the form values.
        CrteateAnnoucement(values.title, values.message)
        //  reset the form and close the modal
        form.reset()
        onOpenChange(false)
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
                                    name="message"
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
                                        <MessageCircleCodeIcon />
                                        {IsLoading && <Loader2/>}
                                        {IsLoading ? "Loading.." : "Post"}
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
