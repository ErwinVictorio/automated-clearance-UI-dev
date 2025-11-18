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
import { Trash2, Plus, PenIcon, PenBox, MessageCircleMore } from "lucide-react"
import { useEffect, useState } from "react"
import CreateAnnouncement from "@/components/modals/CreateAnoouncement"

function TeacherAnnoucement() {

    const [TeacherAnnouncements, setTeacherAnnouncements] = useState<any[]>([])
    const [isOpenModalAnnoucement, setIsOpenModalAnnoucement] = useState<boolean>(false);

    useEffect(() => {
        setTeacherAnnouncements([
            {
                id: 1,
                title: "Class Suspension",
                message: "All classes are suspended tomorrow due to heavy rainfall. Please wait for further announcements regarding rescheduling.",
            },
            {
                id: 2,
                title: "Grade Submission Reminder",
                message: "Teachers are reminded to submit final grades before Friday, November 15, 2025.",
            },
            {
                id: 3,
                title: "Faculty Meeting",
                message: "There will be a faculty meeting on Monday at 3:00 PM in the AVR. Attendance is required.",
            },
            {
                id: 4,
                title: "Christmas Party Preparation",
                message: "All teachers are invited to join the committee meeting for the upcoming Christmas Party this Thursday at 4 PM.",
            },
            {
                id: 5,
                title: "Online Portal Maintenance",
                message: "The teacher portal will be under maintenance this weekend. Please finish uploading all grades and documents before Friday evening.",
            },
        ]);
    }, []);


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
                    <h1 className="text-2xl font-bold text-gray-800 mt-2">Annoucement List</h1>
                    <p className="text-gray-500 text-sm">View and manage all Annoucement.</p>
                </div>

                <Button onClick={() => setIsOpenModalAnnoucement(true)} className="flex items-center gap-2 cursor-pointer text-white">
                    <MessageCircleMore  className="h-4 w-4"  />
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
                                    <TableHead className="font-semibold text-gray-700">Detetails</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {TeacherAnnouncements && TeacherAnnouncements.map((announceMent, idx) => (
                                    <TableRow key={idx} className="hover:bg-gray-50 transition">
                                        <TableCell>{announceMent.id}</TableCell>
                                        <TableCell>{announceMent.title}</TableCell>
                                        <TableCell>{announceMent.message}</TableCell>
                                        <TableCell className="text-center flex gap-2">
                                            <Button className="text-red-500 bg-transparent cursor-pointer" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <Button className="text-blue-500 bg-transparent cursor-pointer" size="icon">
                                                <PenBox/>
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
        </main>
    )
}

export default TeacherAnnoucement
