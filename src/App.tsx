
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './components/pages/Login'
import { RegisterPage } from './components/pages/Register'
import HomePage from './components/pages/Home'
import Studentportal from './components/pages/studentPortal/Studentportal'
import AnnouncementPage from './components/pages/studentPortal/AnoouncementPage'
import AdminDashboard from './components/pages/admin/Dashboard'
import Teacher from './components/pages/TeacherPortal/Teacher'
import TeacherList from './components/pages/admin/TeacherList'
import DepartmentList from './components/pages/admin/Departmets'
import ManageRequirment from './components/pages/TeacherPortal/RequirmentList'
import TeacherAnnoucement from './components/pages/TeacherPortal/TeacheraAnnouncementList'

function App() {

  return (
    <BrowserRouter
      {...({
        future: {
          v7_relativeSplatPath: true,
        },
      } as any)}
    >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />


        {/*  protected routes */}\
        <Route path='/student-portal' element={<Studentportal />} />
        <Route path='/student-annoucement' element={<AnnouncementPage />} />

        {/*  Admin Portal */}
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/admin-teacher-list' element={<TeacherList />} />
        <Route path='/admin-department-list' element={<DepartmentList />} />

        {/* Teacher Portal */}
        <Route path='/teacher-portal' element={<Teacher />} />
        <Route path='/teacher-requirments' element={<ManageRequirment />} />
        <Route path='/teacher-announcement' element={<TeacherAnnoucement />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App