import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"

import CAPDashboard from "./pages/cap/CAPDashboard"
import VCAPDashboard from "./pages/vcap/VCAPDashboard"
import ManagerDashboard from "./pages/manager/ManagerDashboard"
import StrategistDashboard from "./pages/strategist/StrategistDashboard"
import MemberDashboard from "./pages/member/MemberDashboard"

import Projects from "./pages/admin/Projects"
import Team from "./pages/admin/Team"
import Queries from "./pages/admin/Queries"
import AdminAnnouncements from "./pages/admin/Announcements"
import AdminAttendance from "./pages/admin/Attendance"

import MemberAnnouncements from "./pages/member/Announcements"
import MemberAttendance from "./pages/member/Attendance"
import MyProjects from "./pages/member/MyProjects"
import SendQuery from "./pages/member/SendQuery"
import UserManagement from "./pages/users/UserManagement"

function App() {
  const managementRoles = ["CAP", "V_CAP", "MANAGER", "STRATEGIST"]
  const allRoles = ["CAP", "V_CAP", "MANAGER", "STRATEGIST", "MEMBER"]

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* ROLE SPECIFIC DASHBOARDS */}
        <Route
          path="/cap/dashboard"
          element={
            <ProtectedRoute allowedRoles={["CAP"]}>
              <CAPDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vcap/dashboard"
          element={
            <ProtectedRoute allowedRoles={["V_CAP"]}>
              <VCAPDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/strategist/dashboard"
          element={
            <ProtectedRoute allowedRoles={["STRATEGIST"]}>
              <StrategistDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member/dashboard"
          element={
            <ProtectedRoute allowedRoles={["MEMBER"]}>
              <MemberDashboard />
            </ProtectedRoute>
          }
        />

        {/* BACKWARD COMPATIBLE /ADMIN/DASHBOARD REDIRECT */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={managementRoles}>
              <Navigate to="/cap/dashboard" replace />
            </ProtectedRoute>
          }
        />

        {/* MANAGEMENT SUB-PAGES */}
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute allowedRoles={["CAP", "V_CAP", "MANAGER", "STRATEGIST"]}>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/team"
          element={
            <ProtectedRoute allowedRoles={["CAP", "V_CAP", "MANAGER", "STRATEGIST"]}>
              <Team />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/queries"
          element={
            <ProtectedRoute allowedRoles={["CAP", "V_CAP", "MANAGER"]}>
              <Queries />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/announcements"
          element={
            <ProtectedRoute allowedRoles={["CAP", "V_CAP", "STRATEGIST"]}>
              <AdminAnnouncements />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute allowedRoles={["CAP", "V_CAP", "MANAGER", "STRATEGIST"]}>
              <AdminAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["CAP", "V_CAP", "MANAGER", "STRATEGIST"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        {/* MEMBER SUB-PAGES */}
        <Route
          path="/member/projects"
          element={
            <ProtectedRoute allowedRoles={allRoles}>
              <MyProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member/attendance"
          element={
            <ProtectedRoute allowedRoles={allRoles}>
              <MemberAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member/announcements"
          element={
            <ProtectedRoute allowedRoles={allRoles}>
              <MemberAnnouncements />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member/query"
          element={
            <ProtectedRoute allowedRoles={allRoles}>
              <SendQuery />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK REDIRECT */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App