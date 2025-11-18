
import imageLogo from '../../../public/download.png'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '@/lib/axiosClient';
import { getXsrfToken } from "@/lib/crf_token"
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import  { Register } from '@/schemas/FormSchema';



export function RegisterPage() {
    const [IsLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof Register>>({
        resolver: zodResolver(Register),
        defaultValues: {
            username: "",
            password: "",
            fullname: "",
            course: "",
            yearLavel: "",
            section: ""
        },
    })


    const navigate = useNavigate()


async function CreateTeacher(fullName: string, course: string, section: string, YearLebelL: string, username: string, password: string) {
    setIsLoading(true)

    try {
        await axiosClient.get("/sanctum/csrf-cookie");

        const res = await axiosClient.post("api/register", {
            full_name: fullName,
            course,
            section,
            yearlavel: YearLebelL,
            username,
            password
        }, {
            headers: {
                "X-XSRF-TOKEN": getXsrfToken() ?? ""
            }
        });

        toast.success(res.data.message)

        if (res.data.success) {
            navigate('/login')
        }

    } catch (error: any) {
        // 👉 GET THE ERROR MESSAGE HERE
        const msg = error.response?.data?.error;
        toast.error(msg);
    } finally {
        setIsLoading(false);
    }
}





    async function onSubmit(values: z.infer<typeof Register>) {
        await CreateTeacher(
            values.fullname,
            values.course,
            values.section,
            values.yearLavel,
            values.username,
            values.password
        )

        form.reset()

    }

    return (
        <div className="flex w-full min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-sm shadow-md">
                <CardHeader className="">
                    <div className="flex justify-center">
                        <img
                            src={imageLogo}
                            alt="Siena College Tigaon Logo"
                            className="w-28 h-28 mb-4"
                        />
                    </div>
                    <h1 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance">
                        Siena College Tigaon Inc.
                    </h1>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-3">

                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="fullname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Full Name" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-start' />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="course"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Course" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-start' />
                                        </FormItem>
                                    )}
                                />
                            </div>


                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="section"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Section" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-start' />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="yearLavel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="yearLavel" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-start' />
                                        </FormItem>
                                    )}
                                />
                            </div>




                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Username" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-start' />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type='password' placeholder="Password" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-start' />
                                        </FormItem>
                                    )}
                                />
                            </div>




                            <Button className="w-full bg-black text-white hover:bg-gray-900">
                                {IsLoading && <Loader2 className="text-gray-300" />}
                                    {IsLoading ? "Loading..." : "Regsiter"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

                <CardFooter>
                    <Link className='text-blue-400' to={'/'}>Already have account</Link>

                </CardFooter>

            </Card>
        </div>
    );
}
