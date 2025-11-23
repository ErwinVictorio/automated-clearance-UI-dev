import { useState, useEffect } from "react";
import { Menu, FileIcon, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/lib/axiosClient";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import ConfirmLogout from "@/components/modals/confirmLogout";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { getXsrfToken } from "@/lib/crf_token";
import { toast } from "sonner";

function Teacher() {
    const [requirments, setRequirments] = useState<any[]>([]);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [isOpenLogout, setisOpenLogout] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [Status, setStatus] = useState<string>("");
    const [OpenConfrimModal, setOpenConfrimModal] = useState<boolean>(false);
    const [Id, setId] = useState<string>("");
    const [countedRe, setcountedRe] = useState<number>(0);
    const [countedAn, setcountedAn] = useState<number>(0);


    const navigate = useNavigate();

    // FETCH USER
    useEffect(() => {
        async function check() {
            try {
                const res = await axiosClient.get("/api/user", {
                    withCredentials: true,
                });
                setName(res.data.full_name);
            } catch (error) {
                console.log(error);
            }
        }
        check();
    }, []);

    // FETCH SUBMITTED REQUIREMENTS
    const { data, isLoading } = useQuery({
        queryKey: ["requirmentSub", page, search],
        queryFn: async () => {
            const res = await axiosClient.get("api/teacher/get-submmited-requirment", {
                params: { page, search },
            });
            return res.data;
        },
    });

    const pagination = data?.data;

    // UPDATE REQUIREMENTS
    useEffect(() => {
        if (pagination?.data) {
            setRequirments(pagination.data);
        }
    }, [pagination]);



    async function ConfirmChangeStatus() {
        await axiosClient({
            method: "POST",
            url: `/api/teacher/update-status/${Id}`,
            responseType: 'json',
            headers: {
                "X-XSRF-TOKEN": getXsrfToken() ?? "",
                "Content-Type": "application/json"
            },
            data: { status: Status } // <- this was missing
        }).then((res) => {
            console.log(res.data)
            toast.success(res.data.message)
            setOpenConfrimModal(false)
            //  reload the page after to second
            setTimeout(() => {
                window.location.reload()
            }, 2000)

        })
    }


    //  Display the counted requirment
    useEffect(() => {
        axiosClient({
            method: "GET",
            url: "api/teacher/counte-requirment",
            headers: {
                "X-XSRF-TOKEN": getXsrfToken() ?? "",
            }
        }).then((res) => {
            setcountedRe(res.data.counted)
        })
    }, [])

//   Counte Announcemnet
    useEffect(() => {
        axiosClient({
            method: "GET",
            url: "api/teacher/count-announcemnt",
            headers: {
                "X-XSRF-TOKEN": getXsrfToken() ?? "",
            }
        }).then((res) => {

            console.log(res.data)
            setcountedAn(res.data.counted)
        })
    }, [])


    return (
        <div className="flex h-screen bg-gray-100">

            {/* SIDEBAR DESKTOP */}
            <aside className="hidden md:flex w-64 bg-white shadow-md p-6 flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-6">Dashboard</h2>
                    <nav className="space-y-3">
                        <button
                            onClick={() => navigate('/teacher-requirments')}
                            className="w-full text-left py-2 px-3 rounded hover:bg-gray-200"
                        >
                            Manage Requirements
                        </button>
                        <button
                            onClick={() => navigate('/teacher-announcement')}
                            className="w-full text-left py-2 px-3 rounded hover:bg-gray-200"
                        >
                            Manage Announcements
                        </button>
                    </nav>
                </div>

                <Button onClick={() => setisOpenLogout(true)} variant="destructive" className="w-full mt-6">
                    Logout
                </Button>
            </aside>

            {/* MOBILE OVERLAY */}
            {openSidebar && (
                <div
                    className="fixed inset-0 bg-black/40 md:hidden"
                    onClick={() => setOpenSidebar(false)}
                ></div>
            )}

            {/* SIDEBAR MOBILE */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md p-6 flex flex-col justify-between transform transition-transform duration-300 md:hidden ${openSidebar ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div>
                    <h2 className="text-xl font-bold mb-6">Dashboard</h2>
                    <nav className="space-y-3">
                        <button
                            onClick={() => navigate('/teacher-requirments')}
                            className="w-full text-left py-2 px-3 rounded hover:bg-gray-200"
                        >
                            Manage Requirements
                        </button>
                        <button
                            onClick={() => navigate('/teacher-announcement')}
                            className="w-full text-left py-2 px-3 rounded hover:bg-gray-200"
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

                {/* HEADER */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        className="md:hidden p-2 rounded hover:bg-gray-200"
                        onClick={() => setOpenSidebar(true)}
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-2xl font-bold">Good Day, {name}</h1>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-6 shadow rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Total Requirements</p>
                            <h2 className="text-3xl font-semibold">{countedRe}</h2>
                        </div>
                        <Users size={40} className="text-blue-600" />
                    </div>

                    <div className="bg-white p-6 shadow rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Total Announcement</p>
                            <h2 className="text-3xl font-semibold">{countedAn ?? 0}</h2>
                        </div>
                        <Building2 size={40} className="text-green-600" />
                    </div>

                    <div className="bg-white p-6 shadow rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Total Submitted Requirements</p>
                            <h2 className="text-3xl font-semibold">{requirments.length}</h2>
                        </div>
                        <FileIcon size={40} className="text-gray-600" />
                    </div>
                </div>

                {/* TABLE */}
                <Card className="border shadow-sm bg-gray-50 h-full">

                    <CardHeader className="flex justify-between items-center">
                        <CardTitle className="text-lg text-gray-700">
                            Submitted Requirements
                        </CardTitle>

                        <Input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search..."
                            className="w-48"
                        />
                    </CardHeader>

                    <CardContent className="overflow-x-auto">
                        {isLoading ? (
                            <p className="text-center py-5">Loading...</p>
                        ) : (
                            <>
                                <table className="min-w-full border-collapse text-left text-sm md:text-base">
                                    <thead>
                                        <tr className="border-b text-gray-600 bg-gray-100">
                                            <th className="p-3">#</th>
                                            <th className="p-3">Request By</th>
                                            <th className="p-3">Course</th>
                                            <th className="p-3">Drive Link</th>
                                            <th className="p-3 text-center">Status</th>
                                            <th className="p-3 text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {requirments && requirments.map((req) => {

                                            let style = ''

                                            switch (req.status) {
                                                case 'Pending':
                                                    style = 'px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700'
                                                    break;
                                                case 'Approved':
                                                    style = 'px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700'
                                                    break

                                                case 'Decline':
                                                    style = 'px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700'
                                                    break

                                                default:
                                                    break;
                                            }


                                            return (
                                                <tr key={req.id} className="border-b hover:bg-gray-50">
                                                    <td className="p-3">{req.id}</td>

                                                    <td className="p-3">{req.requestor_name}</td>

                                                    <td className="p-3">{req.course ?? "N/A"}</td>

                                                    <td className="p-3 text-blue-600 underline truncate max-w-[150px]">
                                                        <a
                                                            href={req.drive_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            View File
                                                        </a>
                                                    </td>

                                                    <td className="p-3 text-center">
                                                        <span
                                                            className={style}
                                                        >
                                                            {req.status}
                                                        </span>
                                                    </td>

                                                    <td className="flex justify-center p-3">
                                                        <Select
                                                            value={Status}
                                                            onValueChange={(value) => {
                                                                setStatus(value)
                                                                setOpenConfrimModal(true)
                                                                setId(req.id)
                                                            }}>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Select Status" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Approved">Approve</SelectItem>
                                                                <SelectItem value="Decline">Decline</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                                {/* PAGINATION */}
                                <Pagination className="mt-6">
                                    <PaginationContent>

                                        {/* PREVIOUS BUTTON */}
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => pagination?.prev_page_url && setPage(page - 1)}
                                                className={pagination?.prev_page_url ? "" : "pointer-events-none opacity-50"}
                                            />
                                        </PaginationItem>

                                        {/* PAGE NUMBERS */}
                                        {Array.from({ length: pagination?.last_page || 1 }).map((_, i) => (
                                            <PaginationItem key={i}>
                                                <PaginationLink
                                                    onClick={() => setPage(i + 1)}
                                                    isActive={page === i + 1}
                                                >
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                        {/* NEXT BUTTON */}
                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => pagination?.next_page_url && setPage(page + 1)}
                                                className={pagination?.next_page_url ? "" : "pointer-events-none opacity-50"}
                                            />
                                        </PaginationItem>

                                    </PaginationContent>
                                </Pagination>
                            </>
                        )}
                    </CardContent>
                </Card>

                <ConfirmLogout open={isOpenLogout} onOpenChange={setisOpenLogout} />
                <ConfirmModal
                    open={OpenConfrimModal}
                    onOpenChange={setOpenConfrimModal}
                    ButtonAction={ConfirmChangeStatus}
                    description={`You sure you want to change the status to ${Status}?`}
                />
            </main>
        </div>
    );
}

export default Teacher;



