import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Trash2, X } from "lucide-react";
import imageLogo from "../../../../public/download.png";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Requestform from "@/components/modals/Requestform";
import ConfirmLogout from "@/components/modals/confirmLogout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from '@/lib/axiosClient';
import ConfirmModal from "@/components/modals/ConfirmModal";
import { getXsrfToken } from "@/lib/crf_token";
import { toast } from "sonner";


interface requirmentSubType {
    drive_link: string,
    requestor_name: string,
    status: string,
    image: string | null,
    course: string,
    id: string
}


function StudentPortal() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [IsOpen, setIsOpen] = useState<boolean>(false);
    const [IsOpenLogout, setIsOpenLogut] = useState<boolean>(false)
    const [IsOpenConfirmModal, setConfirmModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>("");


    const queryClient = useQueryClient()

    // Featch automatically the list of submmited requirmentsb base on curent student login
    const { data: requirmentSub = [] } = useQuery<requirmentSubType[]>({
        queryKey: ['requirmentSub'],
        queryFn: async () => {
            const res = await axiosClient.get('api/student/submited-requirment');

            //  para maisan ang error pag walang data
             return res?.data?.data ?? [];
        }
    })



    const DeleteMution = useMutation({
        mutationFn: async (id: string) => {
            const res = await axiosClient.delete(`api/student/delete-requirment/${id}`, {
                headers: {
                    "X-XSRF-TOKEN": getXsrfToken() ?? ""
                }
            });
            toast.success(res.data.message as any)
            return res.data
        } ,
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['requirmentSub'] })
        }
    })



    async function HandleDelete() {

        DeleteMution.mutate(selectedId)
        setConfirmModal(false)
    }



    return (
        <>
            {/* Header */}
            <header className="backdrop-blur-md bg-white/70 shadow-sm sticky top-0 left-0 z-50 border-b border-gray-100">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                    {/* Logo + Title */}
                    <div className="flex items-center gap-3">
                        <img
                            src={imageLogo}
                            alt="Logo"
                            className="h-10 w-10 object-contain rounded-full border border-gray-200 shadow-sm"
                        />
                        <h1 className="text-xl font-semibold bg-linear-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                            Student Portal
                        </h1>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            to="/student-annoucement"
                            className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                        >
                            Announcements
                        </Link>


                        <Button
                            onClick={() => setIsOpenLogut(true)}
                            className="bg-red-600 text-white px-4 py-2 rounded-full transition-all"
                        >
                            Logout
                        </Button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-gray-700 hover:text-blue-500 transition"
                    >
                        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Nav Dropdown */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-60" : "max-h-0"
                        }`}
                >
                    <nav className="flex flex-col gap-3 bg-white/90 backdrop-blur-md border-t border-gray-100 rounded-b-xl p-4 shadow-lg">
                        <Link
                            to="/student-annoucement"
                            className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
                            onClick={() => setMenuOpen(false)}
                        >
                            Announcements
                        </Link>

                        <Button
                            onClick={() => setIsOpenLogut(true)}
                            className="bg-red-600 text-white px-4 py-2 rounded-full transition-all"
                        >
                            Logout
                        </Button>
                    </nav>
                </div>
            </header>

            {/* Main Section */}
            <main className="max-w-6xl mx-auto px-4 py-10">
                <div className="mb-3">
                    <Button onClick={() => setIsOpen(true)} className="cursor-pointer" variant={'default'}>Request Now</Button>
                </div>


                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Requestor</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Drive Link</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {/* Row 1 */}

                            {requirmentSub && requirmentSub.map((data, idx) => {


                                let style = '';

                                switch (data.status) {
                                    case 'Pending':
                                        style = 'px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full'
                                        break;

                                    case 'Approved':
                                        style = 'px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full'
                                        break;

                                    default:
                                        style = 'px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full'
                                        break;
                                }

                                return (
                                    <TableRow key={idx} className="hover:bg-gray-50 transition">
                                        <TableCell className="font-medium text-gray-800">{data.requestor_name}</TableCell>
                                        <TableCell>{data.course}</TableCell>
                                        <TableCell>
                                            <a
                                                href={data.drive_link}
                                                target="_blank"
                                                className="text-blue-600 hover:underline"
                                            >
                                                View Drive
                                            </a>
                                        </TableCell>
                                        <TableCell>
                                            {data.image == null ? "N/A" : (
                                                <img
                                                    src={data.image}
                                                    alt="Preview"
                                                    className="h-12 w-12 object-cover rounded-md border border-gray-200"
                                                />
                                            )}

                                        </TableCell>
                                        <TableCell>
                                            <span className={style}>
                                                {data.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button onClick={() => {
                                                setSelectedId(data.id)
                                                setConfirmModal(true)
                                            }} className="px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full hover:bg-white cursor-pointer">
                                                <Trash2 />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}



                        </TableBody>
                    </Table>


                </div>

                {/* open the Dialog for Request */}
                <Requestform
                    open={IsOpen}
                    onOpenChange={setIsOpen}
                    onSuccess={() => queryClient.invalidateQueries({ queryKey: ['requirmentSub'] })}
                />

                {/* Logout Modal */}
                <ConfirmLogout
                    open={IsOpenLogout}
                    onOpenChange={setIsOpenLogut}
                />

                {/*  Confirm Delete */}
                <ConfirmModal
                    open={IsOpenConfirmModal}
                    onOpenChange={setConfirmModal}
                    ButtonAction={HandleDelete}
                    description={'This will permanently remove the item from the system'}
                />
            </main>
        </>
    );
}

export default StudentPortal;
