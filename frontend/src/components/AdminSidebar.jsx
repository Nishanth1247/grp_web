import { Link, useNavigate, useLocation } from "react-router-dom"
import {
FiHome,
FiFolder,
FiUsers,
FiCalendar,
FiBell,
FiMessageSquare,
FiLogOut
} from "react-icons/fi"

export default function AdminSidebar(){

const navigate = useNavigate()
const location = useLocation()

const logout = () => {
localStorage.removeItem("token")
localStorage.removeItem("role")
navigate("/")
}

const linkStyle = (path) =>
`flex items-center gap-3 px-4 py-3 rounded-lg transition
${location.pathname === path
? "bg-white text-indigo-900 font-semibold"
: "hover:bg-indigo-700"}`

return(

<div className="w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white min-h-screen p-6 flex flex-col justify-between shadow-xl">

<div>

<h1 className="text-2xl font-bold mb-10 tracking-wide">
Admin Panel
</h1>

<nav className="flex flex-col gap-3">

<Link className={linkStyle("/admin/dashboard")} to="/admin/dashboard">
<FiHome size={18}/>
Dashboard
</Link>

<Link className={linkStyle("/admin/projects")} to="/admin/projects">
<FiFolder size={18}/>
Projects
</Link>

<Link className={linkStyle("/admin/team")} to="/admin/team">
<FiUsers size={18}/>
Team
</Link>

<Link className={linkStyle("/admin/attendance")} to="/admin/attendance">
<FiCalendar size={18}/>
Attendance
</Link>

<Link className={linkStyle("/admin/announcements")} to="/admin/announcements">
<FiBell size={18}/>
Announcements
</Link>

<Link className={linkStyle("/admin/queries")} to="/admin/queries">
<FiMessageSquare size={18}/>
Queries
</Link>

</nav>

</div>

<button
className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition p-3 rounded-lg font-semibold"
onClick={logout}
>
<FiLogOut size={18}/>
Logout
</button>

</div>

)

}