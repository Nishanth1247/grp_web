import { Link, useNavigate, useLocation } from "react-router-dom"
import { 
  FiHome, 
  FiFolder, 
  FiCalendar, 
  FiBell, 
  FiMessageSquare, 
  FiLogOut 
} from "react-icons/fi"

export default function MemberSidebar(){

const navigate = useNavigate()
const location = useLocation()

const logout = () => {
 localStorage.removeItem("token")
 localStorage.removeItem("role")
 navigate("/")
}

const linkStyle = (path) =>
`flex items-center gap-3 p-3 rounded-lg transition duration-200
 ${location.pathname === path 
 ? "bg-white text-blue-900 font-semibold" 
 : "hover:bg-blue-800"}`

return(

<div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white min-h-screen p-6 flex flex-col justify-between shadow-xl">

<div>

<h1 className="text-2xl font-bold mb-10 tracking-wide">
Member Panel
</h1>

<nav className="flex flex-col gap-3">

<Link className={linkStyle("/member/dashboard")} to="/member/dashboard">
<FiHome size={18}/>
Dashboard
</Link>

<Link className={linkStyle("/member/projects")} to="/member/projects">
<FiFolder size={18}/>
My Projects
</Link>

<Link className={linkStyle("/member/attendance")} to="/member/attendance">
<FiCalendar size={18}/>
Attendance
</Link>

<Link className={linkStyle("/member/announcements")} to="/member/announcements">
<FiBell size={18}/>
Announcements
</Link>

<Link className={linkStyle("/member/query")} to="/member/query">
<FiMessageSquare size={18}/>
Send Query
</Link>

</nav>

</div>

<button
className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition duration-200 p-3 rounded-lg font-semibold"
onClick={logout}
>
<FiLogOut size={18}/>
Logout
</button>

</div>

)

}