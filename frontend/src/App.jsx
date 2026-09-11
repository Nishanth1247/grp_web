import {BrowserRouter,Routes,Route} from "react-router-dom"

import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"

import AdminDashboard from "./pages/admin/AdminDashboard"
import Projects from "./pages/admin/Projects"
import Team from "./pages/admin/Team"
import Queries from "./pages/admin/Queries"
import AdminAnnouncements from "./pages/admin/Announcements"
import AdminAttendance from "./pages/admin/Attendance"

import MemberAnnouncements from "./pages/member/Announcements"
import MemberAttendance from "./pages/member/Attendance"
import MyProjects from "./pages/member/MyProjects"
import MemberDashboard from "./pages/member/MemberDashboard"
import SendQuery from "./pages/member/SendQuery"

const managementRoles = ["CAP", "V_CAP", "MANAGER", "STRATEGIST", "admin"];
const memberRoles = ["MEMBER", "member", "CAP", "V_CAP", "MANAGER", "STRATEGIST"];

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>

{/* ADMIN / MANAGEMENT ROUTES */}

<Route
path="/admin/dashboard"
element={
<ProtectedRoute allowedRoles={managementRoles}>
<AdminDashboard/>
</ProtectedRoute>
}
/>

<Route
path="/admin/projects"
element={
<ProtectedRoute allowedRoles={managementRoles}>
<Projects/>
</ProtectedRoute>
}
/>

<Route
path="/admin/team"
element={
<ProtectedRoute allowedRoles={managementRoles}>
<Team/>
</ProtectedRoute>
}
/>

<Route
path="/admin/queries"
element={
<ProtectedRoute allowedRoles={managementRoles}>
<Queries/>
</ProtectedRoute>
}
/>

<Route
path="/admin/announcements"
element={
<ProtectedRoute allowedRoles={managementRoles}>
<AdminAnnouncements/>
</ProtectedRoute>
}
/>

<Route
path="/admin/attendance"
element={
<ProtectedRoute allowedRoles={managementRoles}>
<AdminAttendance/>
</ProtectedRoute>
}
/>

{/* MEMBER ROUTES */}

<Route
path="/member/dashboard"
element={
<ProtectedRoute allowedRoles={memberRoles}>
<MemberDashboard/>
</ProtectedRoute>
}
/>

<Route
path="/member/projects"
element={
<ProtectedRoute allowedRoles={memberRoles}>
<MyProjects/>
</ProtectedRoute>
}
/>

<Route
path="/member/attendance"
element={
<ProtectedRoute allowedRoles={memberRoles}>
<MemberAttendance/>
</ProtectedRoute>
}
/>

<Route
path="/member/announcements"
element={
<ProtectedRoute allowedRoles={memberRoles}>
<MemberAnnouncements/>
</ProtectedRoute>
}
/>

<Route
path="/member/query"
element={
<ProtectedRoute allowedRoles={memberRoles}>
<SendQuery/>
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>

)

}

export default App