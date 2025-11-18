import { useState, useEffect } from "react";
import { Menu, Trash2 } from "lucide-react";
import { Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ConfirmLogout from "@/components/modals/confirmLogout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ConfirmModal from "@/components/modals/ConfirmModal";
import AddOffices from "@/components/modals/AddOffices";
import { useQueryClient } from "@tanstack/react-query";

function AdminDashboard() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [IsOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)
  const [IsOpenAddOffice,setIsOpenAddOffice] = useState<boolean>(false)

  function HandleLogout() {

    setIsOpen(true)
  }

  const navigate = useNavigate();
    const queryClient = useQueryClient();

  return (
    <div className="flex h-screen bg-gray-100">

      {/*    SIDEBAR (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white shadow-md p-6 flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Admin Name</h2>
          <nav className="space-y-3">
            <button
              onClick={() => navigate('/admin-subject')}
              className="w-full cursor-pointer text-left py-2 px-3 rounded hover:bg-gray-200"
            >
              Manage Subject
            </button>
            <button
              onClick={() => navigate('/admin-teacher-list')}
              className="w-full cursor-pointer text-left py-2 px-3 rounded hover:bg-gray-200"
            >
              Manage Teacher
            </button>
          </nav>
        </div>

        <Button onClick={HandleLogout} variant="destructive" className="w-full mt-6">
          Logout
        </Button>
      </aside>

      {/*  SIDEBAR (Mobile Overlay) */}
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
              onClick={() => navigate('')}
              className="w-full cursor-pointer text-left py-2 px-3 rounded hover:bg-gray-200"
            >
              Manage Teacher
            </button>
            <button
              onClick={() => navigate('/admin-department-list')}
              className="w-full cursor-pointer text-left py-2 px-3 rounded hover:bg-gray-200"
            >
              Manage Subject
            </button>
          </nav>
        </div>

        <Button onClick={HandleLogout} variant="destructive" className="w-full mt-6">
          Logout
        </Button>
      </aside>
      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto">

        {/* TOP HEADER WITH HAMBURGER BUTTON */}
        <div className="flex items-center gap-3 mb-6">
          <button className="md:hidden p-2 rounded hover:bg-gray-200" onClick={() => setOpenSidebar(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold">Admin Overview</h1>
        </div>

        {/* Summary / Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* Total Teachers */}
          <div className="bg-white p-6 shadow rounded-xl flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Teachers</p>
              <h2 className="text-3xl font-semibold">{0}</h2>
            </div>
            <Users size={40} className="text-blue-600" /> {/* 👈 ICON */}
          </div>

          {/* Total Departments */}
          <div className="bg-white p-6 shadow rounded-xl flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Departments</p>
              <h2 className="text-3xl font-semibold">{0}</h2>
            </div>
            <Building2 size={40} className="text-green-600" /> {/* 👈 ICON */}
          </div>

        </div>

        {/* Table */}
        <div className="bg-white p-6 shadow rounded-xl">
          <div className="flex p-3 justify-between items-center">
            <h2 className="font-bold">Office List</h2>
            <Button onClick={() => setIsOpenAddOffice(true)} className="cursor-pointer" variant={'default'}>
              Add New Office
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Office Department</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Erwin Victorio</TableCell>
                <TableCell>BSIT</TableCell>
                <TableCell>Library</TableCell>
                <TableCell>
                  <Button onClick={() => setIsOpenConfirmModal(true)} className="cursor-pointer text-red-500 bg-transparent">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

      </main>

      {/* Logout Modal */}

      <ConfirmLogout
        open={isOpen}
        onOpenChange={setIsOpen}
      />


      {/*  For Confirm Delete Modal */}
      <ConfirmModal
        open={IsOpenConfirmModal}
        onOpenChange={setIsOpenConfirmModal}
        ButtonAction="Yes Delete"
        description="Are you sure you want to delete this office? This action cannot be undone."
      />


      {/*  Adding Creating Account For Office */}
      <AddOffices
        setIsOpen={setIsOpenAddOffice}
        open={IsOpenAddOffice}
        onSuccess={() => queryClient.invalidateQueries({queryKey: ['offices']})}
      />

    </div>
  );
}

export default AdminDashboard;
