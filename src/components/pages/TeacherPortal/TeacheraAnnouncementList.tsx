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
import { Trash2, MessageCircleMore, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import CreateAnnouncement from "@/components/modals/CreateAnoouncement"
import axiosClient from "@/lib/axiosClient"
import { getXsrfToken } from "@/lib/crf_token";
import { toast } from "sonner"
import ConfirmModal from "@/components/modals/ConfirmModal"


type Announcement = {
    id: string;
    title: string;
    message: string;
    created_at: Date;
};


function TeacherAnnoucement() {
    const [isOpenModalAnnoucement, setIsOpenModalAnnoucement] = useState<boolean>(false);
    const [data, setData] = useState<Announcement[]>([]);
    const [Id, setId] = useState<string>("");
    const [IsOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);





    useEffect(() => {
        async function GetAnnoucement() {

            await axiosClient({
                method: "GET",
                url: "api/teacher/get-annoucement-by-teacher",
                responseType: 'json',
                headers: {
                    "X-XSRF-TOKEN": getXsrfToken() ?? ""
                }
            }).then((res) => {
                if (res.data.success == true) {
                    setData(res.data.data)
                } else {
                    toast.error(res.data.message)
                }

            })
        }
        GetAnnoucement()
    }, [data])

    async function DeleetAnnouncement(id: string) {
        setIsLoading(true)
        try {
            await axiosClient({
                method: "DELETE",
                url: `api/teacher/deleterequirment/${id}`,
                responseType: 'json',
                headers: {
                    "X-XSRF-TOKEN": getXsrfToken() ?? ""
                }
            }).then((res) => {
                toast.success(res.data.message)
                setIsOpen(false)
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    }


    async function HandleDelete() {
        DeleetAnnouncement(Id)
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
                                <BreadcrumbLink href="#" className="text-gray-800 font-semibold">
                                    Manage Department
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className="text-2xl font-bold text-gray-800 mt-2">Annoucement List</h1>
                    <p className="text-gray-500 text-sm">View and manage all Annoucement.</p>
                </div>

                <Button onClick={() => setIsOpenModalAnnoucement(true)} className="flex items-center gap-2 cursor-pointer text-white">
                    <MessageCircleMore className="h-4 w-4" />
                    New Annoucement
                </Button>
            </section>

            {/* TABLE SECTION */}
            <section className="p-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">List of Annoucement</h2>

                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-100">
                                <TableRow>
                                    <TableHead className="font-semibold text-gray-700">Id</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Title</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Message</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {data && data.map((announcement, idx) => (
                                    <TableRow key={idx} className="hover:bg-gray-50 transition">
                                        <TableCell>{announcement.id}</TableCell>
                                        <TableCell>{announcement.title}</TableCell>
                                        <TableCell>{announcement.message}</TableCell>
                                        <TableCell className="text-center flex gap-2">
                                            <Button onClick={() => {
                                                setIsOpen(true)
                                                setId(announcement.id)
                                            }} className="text-red-500 bg-transparent cursor-pointer" size="icon">
                                                {isLoading && <Loader2 />}
                                                {isLoading ? "Deleting..." : <Trash2 />}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </section>


            <CreateAnnouncement
                open={isOpenModalAnnoucement}
                onOpenChange={setIsOpenModalAnnoucement}
            />

            {/*  show the confirm Modal to delete */}
            <ConfirmModal
                ButtonAction={HandleDelete}
                description={'You sure you want to delete this?'}
                open={IsOpen}
                onOpenChange={setIsOpen}
            />
        </main>
    )
}

export default TeacherAnnoucement
