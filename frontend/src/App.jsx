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

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>

{/* ADMIN ROUTES */}

<Route
path="/admin/dashboard"
element={
<ProtectedRoute roleRequired="admin">
<AdminDashboard/>
</ProtectedRoute>
}
/>

<Route
path="/admin/projects"
element={
<ProtectedRoute roleRequired="admin">
<Projects/>
</ProtectedRoute>
}
/>

<Route
path="/admin/team"
element={
<ProtectedRoute roleRequired="admin">
<Team/>
</ProtectedRoute>
}
/>

<Route
path="/admin/queries"
element={
<ProtectedRoute roleRequired="admin">
<Queries/>
</ProtectedRoute>
}
/>

<Route
path="/admin/announcements"
element={
<ProtectedRoute roleRequired="admin">
<AdminAnnouncements/>
</ProtectedRoute>
}
/>

<Route
path="/admin/attendance"
element={
<ProtectedRoute roleRequired="admin">
<AdminAttendance/>
</ProtectedRoute>
}
/>

{/* MEMBER ROUTES */}

<Route
path="/member/dashboard"
element={
<ProtectedRoute roleRequired="member">
<MemberDashboard/>
</ProtectedRoute>
}
/>

<Route
path="/member/projects"
element={
<ProtectedRoute roleRequired="member">
<MyProjects/>
</ProtectedRoute>
}
/>

<Route
path="/member/attendance"
element={
<ProtectedRoute roleRequired="member">
<MemberAttendance/>
</ProtectedRoute>
}
/>

<Route
path="/member/announcements"
element={
<ProtectedRoute roleRequired="member">
<MemberAnnouncements/>
</ProtectedRoute>
}
/>

<Route
path="/member/query"
element={
<ProtectedRoute roleRequired="member">
<SendQuery/>
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>

)

}

export default App