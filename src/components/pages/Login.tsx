
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
import { Link,useNavigate } from 'react-router-dom';
import { LoginSchema } from '@/schemas/FormSchema';


export function LoginPage() {


    const navigate = useNavigate()
    
  // Dummy accounts for testing
    const dummyAccounts = [
        { username: "admin", password: "admin", path: "/admin-dashboard" },
        { username: "teacher", password: "teacher", path: "/teacher-portal" },
        { username: "student", password: "student", path: "/student-portal" },
    ];




    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof LoginSchema>) {
        const foundAccount = dummyAccounts.find(
            acc => acc.username === values.username && acc.password === values.password
        );

        console.log(foundAccount)

        if (foundAccount) {
            // Redirect to respective portal
            navigate(foundAccount.path);
        } else {
            alert("Invalid username or password");
        }
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
                                Login
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
