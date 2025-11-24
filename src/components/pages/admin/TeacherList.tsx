import { Button } from "@/components/ui/button"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination"
import { toast } from "sonner";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash2, Plus } from "lucide-react"
import AddTeacherAndOffice from "@/components/modals/AddTeacherAndOffice"
import { useState } from "react"
import axiosClient from "@/lib/axiosClient"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getXsrfToken } from "@/lib/crf_token"
import ConfirmModal from "@/components/modals/ConfirmModal";

function TeacherList() {
    const [isOpenModalTeacher, setIsOpenModalTeacher] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedId, setSelectedId] = useState<string>("");
    const [IsOpenConfirm, setIsOpenConfirm] = useState<boolean>(false)

    const queryClient = useQueryClient();

    // FETCH WITH REACT QUERY (Search + Pagination)
    const { data, isLoading } = useQuery({
        queryKey: ["teachers", page, search],
        queryFn: async () => {
            const res = await axiosClient.get("/api/admin/teacher-list", {
                params: { page, search },
            });
            return res.data.teacher;
        },
    });


    //  Handle the deleting Teacher
    const DeleteTeacherMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await axiosClient.delete(`/api/admin/delete-teacher/${id}`, {
                headers: {
                    "X-XSRF-TOKEN": getXsrfToken() ?? ""
                }

            });
            toast.success(res.data.message as any)
            setIsOpenConfirm(false)
            return res.data
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teachers'] })
        }
    })

    function HandleDeleteTeacher() {

        DeleteTeacherMutation.mutate(selectedId)
    }


    return (
        <main className="min-h-screen bg-gray-50">

            {/* HEADER */}
            <section className="p-6 bg-white shadow-sm flex items-center justify-between">
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href="/admin-dashboard"
                                    className="text-gray-600 hover:text-blue-600"
                                >
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" className="text-gray-800 font-semibold">
                                    Manage Teacher
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <h1 className="text-2xl font-bold text-gray-800 mt-2">Teacher List</h1>
                    <p className="text-gray-500 text-sm">View and manage all registered teachers.</p>
                </div>

                <Button onClick={() => setIsOpenModalTeacher(true)} className="flex items-center gap-2 text-white">
                    <Plus className="h-4 w-4" />
                    Add Teacher
                </Button>
            </section>

            {/* TABLE SECTION */}
            <section className="p-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">

                    {/* TABLE HEADER + SEARCH */}
                    <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">List of Teachers</h2>

                        <input
                            type="text"
                            placeholder="Search teacher..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1); // reset to page 1 when typing search
                            }}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* TABLE CONTENT */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-100">
                                <TableRow>
                                    <TableHead className="font-semibold text-gray-700">Name</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Course</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Section</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {/* LOADING STATE */}
                                {isLoading && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                )}

                                {/* EMPTY STATE */}
                                {!isLoading && data?.data?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                                            No teachers found.
                                        </TableCell>
                                    </TableRow>
                                )}

                                {/* RESULTS */}
                                {data?.data?.map((teacher: any) => (
                                    <TableRow key={teacher.id} className="hover:bg-gray-50 transition">
                                        <TableCell>{teacher.full_name}</TableCell>
                                        <TableCell>{teacher.course}</TableCell>
                                        <TableCell>{teacher.section}</TableCell>
                                        <TableCell className="text-center">
                                            <Button className="cursor-pointer" onClick={() => {
                                                //  to store the selected id
                                                //   and open the confirm modal
                                                setSelectedId(teacher.id)
                                                setIsOpenConfirm(true)
                                            }} variant="destructive" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* PAGINATION */}
                    {data && data.last_page > 1 && (
                        <div className="p-4 flex justify-center">
                            <Pagination>
                                <PaginationContent>

                                    {/* PREVIOUS */}
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => data.prev_page_url && setPage((p) => p - 1)}
                                            className={!data.prev_page_url ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>

                                    {/* PAGE NUMBERS */}
                                    {Array.from({ length: data.last_page }).map((_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                isActive={data.current_page === i + 1}
                                                onClick={() => setPage(i + 1)}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    {/* NEXT */}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => data.next_page_url && setPage((p) => p + 1)}
                                            className={!data.next_page_url ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>

                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}

                </div>
            </section>

            {/* MODAL COMPONENT */}
            <AddTeacherAndOffice
                open={isOpenModalTeacher}
                onOpenChange={setIsOpenModalTeacher}
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ['teachers'] })}
            />

            {/* Confirm Modal */}
            <ConfirmModal
                onOpenChange={setIsOpenConfirm}
                open={IsOpenConfirm}
                ButtonAction={HandleDeleteTeacher}
                description={'This will permanently remove the item from the system'}
            />
        </main>
    );
}

export default TeacherList;
