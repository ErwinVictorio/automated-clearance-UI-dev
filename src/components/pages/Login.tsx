
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
import { LoginSchema } from '@/schemas/FormSchema';

import { getXsrfToken } from '@/lib/crf_token';
import axiosClient from '@/lib/axiosClient';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';


export function LoginPage() {

    const [IsLoading, setIsLoading] = useState<boolean>(false);


    const navigate = useNavigate()

    // Dummy accounts for testing

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })


    // Login

    async function LoginAccount(username: string, password: string) {

        console.log(getXsrfToken)

        try {
            setIsLoading(true)

            await axiosClient.get("/sanctum/csrf-cookie");


            const res = await axiosClient.post(
                "/api/login",
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        "X-XSRF-TOKEN": getXsrfToken() ?? ""
                    },
                }
            );

            if (res.data.success) {

                toast.success('Successfully Login')

                const user = await axiosClient.get("/api/user", {
                    withCredentials: true
                });

                // Redirct base on  role
                switch (user.data.role) {
                    case 0:
                        navigate("/admin-dashboard", { replace: true });
                        break;

                    case 1:
                        navigate("/teacher-portal", { replace: true });
                        break;

                    case 2:
                        navigate("/student-portal", { replace: true });
                        break;



                    default:
                        break;
                }
            }

        }
        catch (error: any) {
            //  show the error message
            toast.error(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmit(values: z.infer<typeof LoginSchema>) {

        LoginAccount(values.username, values.password)
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
                                {IsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {IsLoading ? "Loading..." : "Login"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

                <CardFooter>
                    <Link className='text-blue-400' to={'/register'}> Don't Have Account</Link>

                </CardFooter>

            </Card>
        </div>
    );
}
