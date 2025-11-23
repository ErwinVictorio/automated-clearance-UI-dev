import { useEffect, useState } from "react";
import { Menu, Users, Building2, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ConfirmLogout from "@/components/modals/confirmLogout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/lib/axiosClient";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { getXsrfToken } from "@/lib/crf_token";
import TeacheViewInfo from "@/components/modals/TeacheViewInfo";

function AdminDashboard() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [totalSub, settotalSub] = useState<number>(0);
  const [totalTeacher, settotalTeacher] = useState<number>(0);
  const [OponInfo, setOpenInfo] = useState<boolean>(false)
  const [Id,setId] = useState<string>("");

  function HandleLogout() {
    setIsOpen(true);
  }

  const navigate = useNavigate();

  // FETCH WITH REACT QUERY (Search + Pagination)
  const { data, isLoading } = useQuery({
    queryKey: ["teachers", page],
    queryFn: async () => {
      const res = await axiosClient.get("/api/admin/teacher-list", {
        params: { page },
      });
      return res.data.teacher;
    },
  });


  //  Total Subject
  useEffect(() => {
    axiosClient({
      method: "GET",
      url: "api/admin/total-subject",
      responseType: 'json',
      headers: {
        "X-XSRF-TOKEN": getXsrfToken() ?? ""
      }
    }).then((res) => {
      settotalSub(res.data.counted)
    })
  }, [])


  //  Total Teacher
  useEffect(() => {
    axiosClient({
      method: "GET",
      url: "api/admin/total-teacher",
      responseType: 'json',
      headers: {
        "X-XSRF-TOKEN": getXsrfToken() ?? ""
      }
    }).then((res) => {
      settotalTeacher(res.data.counted)
    })
  }, [])





  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white shadow-md p-6 flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav className="space-y-3">
            <button
              onClick={() => navigate("/admin-subject")}
              className="w-full cursor-pointer text-left py-2 px-3 rounded hover:bg-gray-200"
            >
              Manage Subject
            </button>
            <button
              onClick={() => navigate("/admin-teacher-list")}
              className="w-full cursor-pointer text-left py-2 px-3 rounded hover:bg-gray-200"
            >
              Manage Teacher
            </button>
          </nav>
        </div>

        <Button
          onClick={HandleLogout}
          variant="destructive"
          className="w-full mt-6"
        >
          Logout
        </Button>
      </aside>

      {/* SIDEBAR (Mobile Overlay) */}
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
          <h2 className="text-xl font-bold mb-6">Name</h2>
          <nav className="space-y-3">
            <button
              onClick={() => navigate("")}
              className="w-full cursor-pointer text-left py-2 px-3 rounded hover:bg-gray-200"
            >
              Manage Teacher
            </button>
            <button
              onClick={() => navigate("/admin-department-list")}
              className="w-full cursor-pointer text-left py-2 px-3 rounded hover:bg-gray-200"
            >
              Manage Subject
            </button>
          </nav>
        </div>

        <Button
          onClick={HandleLogout}
          variant="destructive"
          className="w-full mt-6"
        >
          Logout
        </Button>
      </aside>
      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* TOP HEADER WITH HAMBURGER BUTTON */}
        <div className="flex items-center gap-3 mb-6">
          <button
            className="md:hidden p-2 rounded hover:bg-gray-200"
            onClick={() => setOpenSidebar(true)}
          >
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
              <h2 className="text-3xl font-semibold">{totalTeacher}</h2>
            </div>
            <Users size={40} className="text-blue-600" />
          </div>

          {/* Total Departments */}
          <div className="bg-white p-6 shadow rounded-xl flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Subject</p>
              <h2 className="text-3xl font-semibold">{totalSub}</h2>
            </div>
            <Building2 size={40} className="text-green-600" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white p-6 shadow rounded-xl">
          <div className="flex p-3 justify-between items-center">
            <h2 className="font-bold">Office & Teacher List</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Office/Section</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* LOADING STATE */}
              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-4 text-gray-500"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              )}

              {/* EMPTY STATE */}
              {!isLoading && data?.data?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-4 text-gray-500"
                  >
                    No teachers found.
                  </TableCell>
                </TableRow>
              )}

              {/* RESULTS - Cleaned of comments and whitespace */}
              {data?.data?.map((teacher: any) => (
                <TableRow
                  key={teacher.id}
                  className="hover:bg-gray-50 transition"
                >
                  <TableCell>{teacher.id}</TableCell>
                  <TableCell>{teacher.full_name}</TableCell>
                  <TableCell>{teacher.course}</TableCell>
                  <TableCell>{teacher.section}</TableCell>
                  <TableCell>
                    <Button onClick={() => {
                      setOpenInfo(true)
                      setId(teacher.id)
                    }} className="cursor-pointer bg-green-400">
                      View
                      <EyeIcon />
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
                    onClick={() =>
                      data.prev_page_url && setPage((p) => p - 1)
                    }
                    className={
                      !data.prev_page_url
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
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
                    onClick={() =>
                      data.next_page_url && setPage((p) => p + 1)
                    }
                    className={
                      !data.next_page_url
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>

      {/* Logout Modal */}
      <ConfirmLogout open={isOpen} onOpenChange={setIsOpen} />
      <TeacheViewInfo
        onOpenChange={setOpenInfo}
        open={OponInfo}
        teacherId={Id ?? ""}
      />
    </div>
  );
}

export default AdminDashboard;