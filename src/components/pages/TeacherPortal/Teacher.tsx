import { useState, useEffect } from "react";
import { Menu, FileIcon } from "lucide-react";
import { Users, Building2 } from "lucide-react"; // 👈 ADD THIS
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ConfirmLogout from "@/components/modals/confirmLogout";




function Teacher() {
    // const [teachers, setTeachers] = useState<any[]>([]);
    const [Requirments, setTeachersRequirments] = useState<any[]>([]);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [isOpenLogout,setisOpenLogout] = useState<boolean>(false)

    const navigate = useNavigate()
    useEffect(() => {
        setTeachersRequirments([
            {
                id: 1,
                RequistorName: "Erwin Victorio",
                title: "Library",
                requirement: "Return all borrowed books and settle any fines.",
                driveLink: "https://drive.google.com/example1",
                status: "Pending",
            },
            {
                id: 2,
                RequistorName: "Erwin Victorio",
                title: "Registrar",
                requirement: "Submit grades and required student records.",
                driveLink: "https://drive.google.com/example2",
                status: "Approved",
            },
            {
                id: 3,
                RequistorName: "Erwin Victorio",
                title: "Guidance Office",
                requirement: "Secure clearance form and counseling report.",
                driveLink: "https://drive.google.com/example3",
                status: "Pending",
            },
        ]);
    }, []);



    return (
        <div className="flex h-screen bg-gray-100">



            {/* SIDEBAR (Desktop) */}
            <aside className="hidden md:flex w-64 bg-white shadow-md p-6 flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-6">Teacher Name</h2>
                    <nav className="space-y-3">
                        <button
                            onClick={() => navigate('/teacher-requirments')}
                            className="w-full cursor-pointer text-left py-2 px-3 rounded hover:bg-gray-200"
                        >
                            Manage Requirements
                        </button>
                        <button
                            onClick={() => navigate('/teacher-announcement')}
                            className="w-full cursor-pointer text-left py-2 px-3 rounded hover:bg-gray-200"
                        >
                            Manage Announcements
                        </button>
                    </nav>
                </div>

               <Button onClick={() => setisOpenLogout(true)} variant="destructive" className="w-full mt-6">
                    Logout
                </Button>
            </aside>

            {/* ✅ SIDEBAR (Mobile Overlay) */}
            {openSidebar && (
                <div
                    className="fixed inset-0 bg-black/40 md:hidden"
                    onClick={() => setOpenSidebar(false)}
                ></div>
            )}

            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md p-6 flex flex-col justify-between transform transition-transform duration-300 md:hidden ${openSidebar ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div>
                    <h2 className="text-xl font-bold mb-6">Teacher Name</h2>
                    <nav className="space-y-3">
                        <button
                            onClick={() => navigate('/teacher-requirments')}
                            className="w-full cursor-pointer text-left py-2 px-3 rounded hover:bg-gray-200"
                        >
                            Manage Requirements
                        </button>
                        <button
                               onClick={() => navigate('/teacher-announcement')}
                            className="w-full cursor-pointer text-left py-2 px-3 rounded hover:bg-gray-200"
                        >
                            Manage Announcements
                        </button>
                    </nav>
                </div>

                <Button onClick={() => setisOpenLogout(true)} variant="destructive" className="w-full mt-6">
                    Logout
                </Button>
            </aside>


            {/* MAIN CONTENT */}
            <main className="flex-1 p-6 overflow-y-auto">

                {/*  TOP HEADER WITH HAMBURGER BUTTON */}
                <div className="flex items-center gap-3 mb-6">
                    <button className="md:hidden p-2 rounded hover:bg-gray-200" onClick={() => setOpenSidebar(true)}>
                        <Menu size={24} />
                    </button>
                    <h1 className="text-2xl font-bold">Teacher Overview</h1>
                </div>

                {/* Summary / Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                    {/* Total Teachers */}
                    <div className="bg-white p-6 shadow rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Total Requirments</p>
                            <h2 className="text-3xl font-semibold">{8}</h2>
                        </div>
                        <Users size={40} className="text-blue-600" /> {/* 👈 ICON */}
                    </div>

                    {/* Total Departments */}
                    <div className="bg-white p-6 shadow rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Total Announcement</p>
                            <h2 className="text-3xl font-semibold">{0}</h2>
                        </div>
                        <Building2 size={40} className="text-green-600" /> {/* 👈 ICON */}
                    </div>

                    <div className="bg-white p-6 shadow rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Total Submited Requirments</p>
                            <h2 className="text-3xl font-semibold">{3}</h2>
                        </div>

                        <FileIcon size={40} className="text-gray-600" />
                    </div>

                </div>

                {/* Table */}
                <Card className="border shadow-sm bg-gray-50 h-full">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-700">
                            <h1>Submitted Requirements</h1>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="overflow-x-auto">
                        <table className="min-w-full border-collapse text-left text-sm md:text-base">
                            <thead>
                                <tr className="border-b text-gray-600 bg-gray-100">
                                    <th className="p-3">#</th>
                                    <th className="p-3">Request By</th>
                                    <th className="p-3">Title</th>
                                    <th className="p-3">Requirement</th>
                                    <th className="p-3">Drive Link</th>
                                    <th className="p-3 text-center">Status</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Requirments.map((req) => (
                                    <tr
                                        key={req.id}
                                        className="border-b hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="p-3">{req.id}</td>
                                        <td className="p-3">{req.RequistorName}</td>
                                        <td className="p-3 font-medium">{req.title}</td>
                                        <td className="p-3">{req.requirement}</td>
                                        <td className="p-3 text-blue-600 underline truncate max-w-[150px]">
                                            <a
                                                href={req.driveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View File
                                            </a>
                                        </td>
                                        <td className="p-3 text-center">
                                            <span
                                                className={`px-3 py-1 text-xs font-semibold rounded-full ${req.status === "Approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {req.status}
                                            </span>
                                        </td>

                                        <td className="flex justify-center p-3">
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="light">Approve</SelectItem>
                                                    <SelectItem value="dark">Decline</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>


             <ConfirmLogout
               open={isOpenLogout}
               onOpenChange={setisOpenLogout}
             />
            </main>
        </div>
    );
}

export default Teacher;
