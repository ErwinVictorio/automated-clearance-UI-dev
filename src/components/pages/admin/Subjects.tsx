import { Button } from "@/components/ui/button"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash2, Plus } from "lucide-react"
import { useState } from "react"
import axiosClient from '@/lib/axiosClient';
import type { Subject } from "@/lib/types/global"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import AddSubject from "@/components/modals/AddSubject"

function SubjectList() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const queryClient = useQueryClient();


    // FETCH THE DEPARTMENT LIST HERE
    const { data: subjects = [] } = useQuery({
        queryKey: ['subjects'],
        queryFn: async () => {
            const res = await axiosClient.get('/api/admin/list-subject');

            console.log(res.data)

            return res.data.data as Subject[]
        }
    })






    return (
        <main className="min-h-screen bg-gray-50">
            {/*  HEADER + BREADCRUMB */}
            <section className="p-6 bg-white shadow-sm flex items-center justify-between">
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/admin-dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/components" className="text-gray-800 font-semibold">
                                    Manage Subjects
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className="text-2xl font-bold text-gray-800 mt-2">Subject List</h1>
                    <p className="text-gray-500 text-sm">View and manage all subjects.</p>
                </div>

                <Button onClick={() => setIsOpen(true)} className="flex items-center gap-2 cursor-pointer text-white">
                    <Plus className="h-4 w-4" />
                    Add New Subject
                </Button>
            </section>

            {/* TABLE SECTION */}
            <section className="p-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">List of Subject</h2>

                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-100">
                                <TableRow>
                                    <TableHead className="font-semibold text-gray-700">Id</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Subject</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subjects && subjects.map((dep, index) => (
                                    <TableRow key={index} className="hover:bg-gray-50 transition">
                                        <TableCell>{dep.id}</TableCell>
                                        <TableCell>{dep.Subject_name}</TableCell>
                                        <TableCell className="text-center">
                                            <Button className="cursor-pointer" variant="destructive" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </div>
                </div>
            </section>


            {/* For Creating teacher Account Modal */}
            <AddSubject
                open={isOpen}
                onOpenChange={setIsOpen}
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ['subjects'] })}
            />
        </main>
    )
}

export default SubjectList
