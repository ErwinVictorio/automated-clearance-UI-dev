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
import ManageRequirment from './components/pages/TeacherPortal/RequirmentList'
import TeacherAnnoucement from './components/pages/TeacherPortal/TeacheraAnnouncementList'
import ProtectRoute from './lib/ProtectRoute'
import PreventBack from './lib/PreventBack'
import SubjectList from './components/pages/admin/Subjects'


function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* ------------------------------------------------------------------ */}
        {/* Public routes */}
        <Route path='/' element={
          <PreventBack>
            <HomePage />
          </PreventBack>

        } />

        <Route path='/login' element={
          <PreventBack>
            <LoginPage />
          </PreventBack>

        } />
        {/* ------------------------------------------------------------------ */}

        <Route path='/register' element={<RegisterPage />} />

        {/* Student routes */}
        <Route
          path='/student-portal'
          element={
            <ProtectRoute AllowedRoute={[2]}>
              <Studentportal />
            </ProtectRoute>
          }
        />
        <Route
          path='/student-annoucement'
          element={
            <ProtectRoute AllowedRoute={[2]}>
              <AnnouncementPage />
            </ProtectRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path='/admin-dashboard'
          element={
            <ProtectRoute AllowedRoute={[0]}>
              <AdminDashboard />
            </ProtectRoute>
          }
        />
        <Route
          path='/admin-teacher-list'
          element={
            <ProtectRoute AllowedRoute={[0]}>
              <TeacherList />
            </ProtectRoute>
          }
        />
        <Route
          path='/admin-subject'
          element={
            <ProtectRoute AllowedRoute={[0]}>
              <SubjectList />
            </ProtectRoute>
          }
        />

        {/* Teacher routes */}
        <Route
          path='/teacher-portal'
          element={
            <ProtectRoute AllowedRoute={[1]}>
              <Teacher />
            </ProtectRoute>
          }
        />
        <Route
          path='/teacher-requirments'
          element={
            <ProtectRoute AllowedRoute={[1]}>
              <ManageRequirment />
            </ProtectRoute>
          }
        />
        <Route
          path='/teacher-announcement'
          element={
            <ProtectRoute AllowedRoute={[1]}>
              <TeacherAnnoucement />
            </ProtectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
