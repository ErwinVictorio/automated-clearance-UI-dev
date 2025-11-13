import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Users, Building2 } from "lucide-react"; // 👈 ADD THIS
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [openSidebar, setOpenSidebar] = useState(false); // 👈 ADD THIS


  useEffect(() => {
    setTeachers([
      { id: 1, name: "Mr. Reyes", subject: "Math" },
      { id: 2, name: "Mrs. Santos", subject: "English" },
      { id: 3, name: "Ms. Dela Cruz", subject: "Science" },
    ]);

    setDepartments([
      { id: 1, name: "Math Department" },
      { id: 2, name: "Science Department" },
    ]);
  }, []);

  function HandleLogout() {

    navigate('/')
  }

  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">

      {/*    SIDEBAR (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white shadow-md p-6 flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Admin Name</h2>
          <nav className="space-y-3">
            <button
              onClick={() => navigate('/admin-department-list')}
              className="w-full cursor-pointer text-left py-2 px-3 rounded hover:bg-gray-200"
            >
              Manage Department
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
              Manage Requirements
            </button>
            <button
              onClick={() => navigate('/admin-department-list')}
              className="w-full cursor-pointer text-left py-2 px-3 rounded hover:bg-gray-200"
            >
              Manage Department
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
              <h2 className="text-3xl font-semibold">{teachers.length}</h2>
            </div>
            <Users size={40} className="text-blue-600" /> {/* 👈 ICON */}
          </div>

          {/* Total Departments */}
          <div className="bg-white p-6 shadow rounded-xl flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Departments</p>
              <h2 className="text-3xl font-semibold">{departments.length}</h2>
            </div>
            <Building2 size={40} className="text-green-600" /> {/* 👈 ICON */}
          </div>

        </div>

        {/* Table */}
        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-lg font-semibold mb-4">List of Teachers</h2>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Subject</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{t.id}</td>
                  <td className="p-3">{t.name}</td>
                  <td className="p-3">{t.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>

      {/*  Render The Add Department Modal */}





    </div>
  );
}

export default AdminDashboard;
