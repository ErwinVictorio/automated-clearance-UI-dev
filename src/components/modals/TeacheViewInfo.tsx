import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "../ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import axiosClient from "@/lib/axiosClient"
import { getXsrfToken } from "@/lib/crf_token"
import { useEffect, useState } from "react"

interface DialogType {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    teacherId: string
}

interface Info {
    student_name: string,
    status_of_request: string,
    section: string
    link: string,
    image: string
}

function TeacheViewInfo({ open, onOpenChange, teacherId }: DialogType) {
    const [Data, setData] = useState<Info[]>([])

    useEffect(() => {
        if (!open || !teacherId) return;

        axiosClient({
            method: "GET",
            url: `api/admin/get-students-by-teacher/${teacherId}`,
            responseType: "json",
            headers: {
                "X-XSRF-TOKEN": getXsrfToken() ?? ""
            }
        }).then((res) => {
            setData(res.data.result)
        })
    }, [open, teacherId])


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl rounded-xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold tracking-tight">
                        Student Submissions
                    </DialogTitle>
                    <DialogDescription className="text-gray-500">
                        List of students who submitted their requirements.
                    </DialogDescription>
                </DialogHeader>

                {/* Scrollable Table Container */}
                <div className="max-h-96 overflow-y-auto mt-4 border rounded-lg">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="font-semibold">Student</TableHead>
                                <TableHead className="font-semibold">Section</TableHead>
                                <TableHead className="font-semibold">Drive Link</TableHead>
                                <TableHead className="font-semibold">Image</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {Data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center py-6 text-gray-500"
                                    >
                                        No submitted requirements.
                                    </TableCell>
                                </TableRow>
                            )}

                            {Data.map((student, i) => (
                                <TableRow
                                    key={i}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <TableCell className="font-medium">
                                        {student.student_name}
                                    </TableCell>
                                    <TableCell>{student.section}</TableCell>

                                    <TableCell>
                                        <a
                                            href={student.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline font-medium"
                                        >
                                            Open Link
                                        </a>
                                    </TableCell>

                                    <TableCell>
                                        <img
                                            src={student.image}
                                            className="w-14 h-14 object-cover rounded-lg shadow-sm cursor-pointer hover:scale-105 transition"
                                        />
                                    </TableCell>

                                    <TableCell>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                                ${student.status_of_request === "Approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : student.status_of_request === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {student.status_of_request}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button className="bg-gray-700 hover:bg-gray-800 text-white px-5">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TeacheViewInfo
