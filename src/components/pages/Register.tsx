
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
import { Link } from 'react-router-dom';

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().refine((val) => val.length > 8, {
        message: "Password must be at least 8 characters long"
    }),

    fullname: z.string().nonempty('Name is required'),

    course: z.string().nonempty('course is required'),

    section: z.string().nonempty('section is required'),
})

export function RegisterPage() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            fullname: "",
            course: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)

    }

    return (
        <div className="flex w-full min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-sm shadow-md">
                <CardHeader className="">
                    <h1 className="text-lg font-semibold">Siena College Tigaon Inc.</h1>
                    <div className="flex justify-center">
                        <img
                            src={imageLogo}
                            alt="Siena College Tigaon Logo"
                            className="w-28 h-28 mb-4"
                        />
                    </div>
                    <h2 className="text-md font-medium">Student Clearance</h2>
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
                                                <Input placeholder="Password" {...field} />
                                            </FormControl>
                                            <FormMessage className='text-start' />
                                        </FormItem>
                                    )}
                                />
                            </div>




                            <Button className="w-full bg-black text-white hover:bg-gray-900">
                                Register
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
