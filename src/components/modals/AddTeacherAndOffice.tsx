
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


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
import { Loader2 } from "lucide-react"
import { CreateTeacherShema } from "@/schemas/FormSchema"
import axiosClient from '@/lib/axiosClient';
import { getXsrfToken } from "@/lib/crf_token"
import { useState } from "react"

interface DialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    onSuccess: () => void

}


function AddTeacherAndOffice({ open, onOpenChange ,onSuccess}: DialogProps) {
    const [IsLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof CreateTeacherShema>>({
        resolver: zodResolver(CreateTeacherShema),
        defaultValues: {
            fullName: "",
            Course: "",
            Section: "",
            YearLebel: "",
            username: "",
            password: ""
        },
    })


    // Create Teacher
    async function CreateTeacher(fullName: string, course: string, section: string, YearLebelL: string, username: string, password: string) {
        setIsLoading(true)
        try {
            await axiosClient.get("/sanctum/csrf-cookie");
            axiosClient({
                method: 'POST',
                url: "api/admin/create-teacher",
                data: {
                    full_name: fullName,
                    course: course,
                    section: section,
                  yearlavel: YearLebelL,
                    username: username,
                    password: password,
                   
                },
                responseType: 'json',
                headers: {
                    "X-XSRF-TOKEN": getXsrfToken() ?? ""
                }
            }).then((res) => {
                console.log(res)
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    }


    async function onSubmit(values: z.infer<typeof CreateTeacherShema>) {
        // Do something with the form values.
        await CreateTeacher(
            values.fullName,
            values.Course,
            values.Section,
            values.YearLebel,
            values.username,
            values.password
        )

        // reset the form
        form.reset()
        onOpenChange(false)
         onSuccess?.()
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Teacher Account or Office</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-2 items-center mb-3">
                                {/*  Name */}
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel />
                                            <FormControl>
                                                <Input placeholder="Full Name" {...field} />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/*  Course */}
                                <FormField
                                    control={form.control}
                                    name="Course"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel />
                                            <FormControl>
                                                <Input placeholder="Course Name" {...field} />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/*  Section */}
                                <FormField
                                    control={form.control}
                                    name="Section"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel />
                                            <FormControl>
                                                <Input placeholder="Section" {...field} />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                {/*  YearLebel */}
                                <FormField
                                    control={form.control}
                                    name="YearLebel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel />
                                            <FormControl>
                                                <Input placeholder="YearLebel" {...field} />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                {/*  Course */}
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel />
                                            <FormControl>
                                                <Input placeholder="Username" {...field} />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />



                                {/*  Course */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel />
                                            <FormControl>
                                                <Input type="password" placeholder="Password" {...field} />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <DialogFooter>
                                <Button type="submit">
                                    {IsLoading && <Loader2 className="text-gray-300" />}
                                    {IsLoading ? "Loading..." : "Create"}
                                    Create
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
    )
}

export default AddTeacherAndOffice
