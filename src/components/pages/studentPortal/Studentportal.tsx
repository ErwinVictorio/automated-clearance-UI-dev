import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
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

function StudentPortal() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [IsOpen, setIsOpen] = useState<boolean>(false);

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

                        <Link
                            to="/my-docs"
                            className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                        >
                            My Documents
                        </Link>

                        <Link
                            to="/"
                            className="bg-red-600 text-white px-4 py-2 rounded-full transition-all"
                        >
                            Logout
                        </Link>
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
                        
                        <Link
                            to="/my-docs"
                            className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                        >
                            My Documents
                        </Link>
                        <Link
                            to="/logout"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600 transition-all"
                            onClick={() => setMenuOpen(false)}
                        >
                            Logout
                        </Link>
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
                                <TableHead>Teacher / Office</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead>Drive Link</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {/* Row 1 */}
                            <TableRow className="hover:bg-gray-50 transition">
                                <TableCell className="font-medium text-gray-800">Erwin Victorio</TableCell>
                                <TableCell>Prof. Santos (IT Department)</TableCell>
                                <TableCell>BSIT - Database Management</TableCell>
                                <TableCell>
                                    <a
                                        href="https://drive.google.com/file/d/12345"
                                        target="_blank"
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Drive
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <img
                                        src="https://media.philstar.com/photos/2019/06/19/gen6-jose-rizal2018-06-1622-35-52_2019-06-19_11-00-33256_thumbnail.jpg"
                                        alt="Preview"
                                        className="h-12 w-12 object-cover rounded-md border border-gray-200"
                                    />
                                </TableCell>
                                <TableCell>
                                    <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                        Pending
                                    </span>
                                </TableCell>
                            </TableRow>

                            {/* Row 2 */}
                            <TableRow className="hover:bg-gray-50 transition">
                                <TableCell className="font-medium text-gray-800">Jessa L. Cruz</TableCell>
                                <TableCell>Registrar’s Office</TableCell>
                                <TableCell>Request for TOR</TableCell>
                                <TableCell>
                                    <a
                                        href="https://drive.google.com/file/d/67890"
                                        target="_blank"
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Drive
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <img
                                        src="https://media.philstar.com/photos/2019/06/19/gen6-jose-rizal2018-06-1622-35-52_2019-06-19_11-00-33256_thumbnail.jpg"
                                        alt="Document"
                                        className="h-12 w-12 object-cover rounded-md border border-gray-200"
                                    />
                                </TableCell>
                                <TableCell>
                                    <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                        Approved
                                    </span>
                                </TableCell>
                            </TableRow>


                        </TableBody>
                    </Table>


                </div>

                {/* open the Dialog for Request */}
                <Requestform open={IsOpen} onOpenChange={setIsOpen} />
            </main>
        </>
    );
}

export default StudentPortal;
