
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash2 } from "lucide-react";

function MyDoc() {
    // const [loading, setLoading] = useState(true);


    return (
        <div className="mx-auto py-6 px-4">
            <h1 className="text-2xl font-bold mb-6">My Requirments</h1>

            <Breadcrumb className="mb-4">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/student-portal">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/student-annoucement">Requirments</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* Table for Docs Submited  */}
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold">Department</TableHead>
                            <TableHead className="font-bold">Detail</TableHead>
                            <TableHead className="font-bold">Drive Link</TableHead>
                            <TableHead className="font-bold">Status</TableHead>
                            <TableHead className="font-bold">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Library</TableCell>
                            <TableCell>Return all borrowed books and settle any fines.</TableCell>
                            <TableCell>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View File
                                </a>
                            </TableCell>
                            <TableCell>
                                <span
                                    className="bg-green-100 text-green-700"
                                >
                                    Approved
                                </span>
                            </TableCell>
                            <TableCell>
                                <Button className="bg-transparent text-red-500">
                                    <Trash2 />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

        </div>
    );
}

export default MyDoc;
