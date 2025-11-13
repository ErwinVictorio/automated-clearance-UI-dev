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
import AddDepartment from "@/components/modals/AddDepartment"

function DepartmentList() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
                                    Manage Department
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className="text-2xl font-bold text-gray-800 mt-2">Department List</h1>
                    <p className="text-gray-500 text-sm">View and manage all registered teachers.</p>
                </div>

                <Button onClick={() => setIsOpen(true)} className="flex items-center gap-2 cursor-pointer text-white">
                    <Plus className="h-4 w-4" />
                    Add Department
                </Button>
            </section>

            {/* TABLE SECTION */}
            <section className="p-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">List of Departments</h2>
                        <input
                            type="text"
                            placeholder="Search teacher..."
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-100">
                                <TableRow>
                                    <TableHead className="font-semibold text-gray-700">Id</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Department</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[1, 2, 3].map((id) => (
                                    <TableRow key={id} className="hover:bg-gray-50 transition">
                                        <TableCell>1</TableCell>
                                        <TableCell>Sample Department</TableCell>
                                        <TableCell className="text-center">
                                            <Button variant="destructive" size="icon">
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
            <AddDepartment
                open={isOpen}
                onOpenChange={setIsOpen}
            />
        </main>
    )
}

export default DepartmentList
