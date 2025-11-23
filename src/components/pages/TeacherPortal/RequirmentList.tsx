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
import { Trash2, Files } from "lucide-react"
import { useEffect, useState } from "react"
import CreateRequirments from "@/components/modals/AddRequirments"
import axiosClient from "@/lib/axiosClient"
import { getXsrfToken } from "@/lib/crf_token"
import ConfirmModal from "@/components/modals/ConfirmModal"
import { toast } from "sonner"


interface Reauirment {
    created_at: Date,
    detail: string,
    title: string,
    id: number,
    subject: string,
    deadline: string
}

function ManageRequirment() {
    const [isOpenModalRequirment, setIsOpenModalRequirment] = useState<boolean>(false);
    const [requirment, setReqirment] = useState<Reauirment[]>([]);
    const [isOpen, setOpen] = useState<boolean>(false);
    const [Id, setId] = useState<any>("");


    const fetchRequirments = async () => {
        try {
            await axiosClient({
                method: "GET",
                url: "api/teacher/requirments-list",
                headers: {
                    "X-XSRF-TOKEN": getXsrfToken() ?? "",
                }
            }).then((res) => {
                setReqirment(res.data.requirments)
            })

        } catch (error: any) {
            console.log("Axios Error:", error.response ?? error.message);
        }
    };


    useEffect(() => {
        fetchRequirments();
    }, [])



    // Handle for Delete
    const deleteRequirment = async () => {
        try {
            await axiosClient({
                method: "DELETE",
                url: `api/teacher/delete-requirment/${Id}`,
                responseType: 'json',
                headers: {
                    "X-XSRF-TOKEN": getXsrfToken() ?? "",
                }
            }).then((res) => {
                toast.success(res.data.message)
                fetchRequirments()
            })
        } catch (error) {
            console.log("Axios Error:", error);
        }
    }



    async function handleDelete() {
        deleteRequirment()
        setOpen(false)
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/*  HEADER + BREADCRUMB */}
            <section className="p-6 bg-white shadow-sm flex items-center justify-between">
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/teacher-portal" className="text-gray-600 hover:text-blue-600">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/components" className="text-gray-800 font-semibold">
                                    Manage Department
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className="text-2xl font-bold text-gray-800 mt-2">Requirment List</h1>
                    <p className="text-gray-500 text-sm">View and manage all Requirment.</p>
                </div>

                <Button onClick={() => setIsOpenModalRequirment(true)} className="flex items-center gap-2 cursor-pointer text-white">
                    <Files className="h-4 w-4" />
                    Add Requirment
                </Button>
            </section>

            {/* TABLE SECTION */}
            <section className="p-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">List of Requirments</h2>

                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-100">
                                <TableRow>
                                    <TableHead className="font-semibold text-gray-700">Id</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Title</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Detetails</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Subject</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Deadline</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {requirment && requirment.map((re, idx) => (
                                    <TableRow key={idx} className="hover:bg-gray-50 transition">
                                        <TableCell>1</TableCell>
                                        <TableCell>{re.title}</TableCell>
                                        <TableCell>{re.detail}</TableCell>
                                        <TableCell>{re.subject}</TableCell>
                                         <TableCell>{re.deadline}</TableCell>
                                        <TableCell className="text-center flex gap-2">
                                            <Button onClick={() => {
                                                setOpen(true)
                                                setId(re.id)
                                            }} className="bg-transparent text-red-500 cursor-pointer" size="icon">
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


            {/*   Modal for Requirments for Teacher */}
            <CreateRequirments
                open={isOpenModalRequirment}
                onOpenChange={setIsOpenModalRequirment}
            />

            <ConfirmModal
                description={'You sure you want to Delete this?'}
                ButtonAction={handleDelete}
                open={isOpen}
                onOpenChange={setOpen}
            />
        </main>
    )
}

export default ManageRequirment
