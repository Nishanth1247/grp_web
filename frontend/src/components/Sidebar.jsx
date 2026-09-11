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

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const role = localStorage.getItem("role")

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/")
  }

  const getDashboardPath = () => {
    switch (role) {
      case "CAP": return "/cap/dashboard"
      case "V_CAP": return "/vcap/dashboard"
      case "MANAGER": return "/manager/dashboard"
      case "STRATEGIST": return "/strategist/dashboard"
      case "MEMBER": return "/member/dashboard"
      default: return "/member/dashboard"
    }
  }

  const getTitle = () => {
    switch (role) {
      case "CAP": return "Captain Panel"
      case "V_CAP": return "Vice Captain Panel"
      case "MANAGER": return "Manager Panel"
      case "STRATEGIST": return "Strategist Panel"
      case "MEMBER": return "Member Panel"
      default: return "Dashboard"
    }
  }

  const linkStyle = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 ${
      location.pathname === path
        ? "bg-white text-indigo-900 font-semibold shadow-sm"
        : "hover:bg-indigo-700/60 text-indigo-100"
    }`

  const dashboardPath = getDashboardPath()

  return (
    <div className="w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white min-h-screen p-6 flex flex-col justify-between shadow-xl">
      <div>
        <h1 className="text-2xl font-bold mb-10 tracking-wide border-b border-indigo-700/50 pb-4">
          {getTitle()}
        </h1>

        <nav className="flex flex-col gap-2">
          {/* Dashboard Link */}
          <Link className={linkStyle(dashboardPath)} to={dashboardPath}>
            <FiHome size={18} />
            Dashboard
          </Link>

          {/* CAP & V_CAP Navigation */}
          {(role === "CAP" || role === "V_CAP") && (
            <>
              <Link className={linkStyle("/admin/projects")} to="/admin/projects">
                <FiFolder size={18} />
                Projects
              </Link>
              <Link className={linkStyle("/admin/team")} to="/admin/team">
                <FiUsers size={18} />
                Teams
              </Link>
              <Link className={linkStyle("/admin/attendance")} to="/admin/attendance">
                <FiCalendar size={18} />
                Attendance
              </Link>
              <Link className={linkStyle("/admin/announcements")} to="/admin/announcements">
                <FiBell size={18} />
                Announcements
              </Link>
              <Link className={linkStyle("/admin/queries")} to="/admin/queries">
                <FiMessageSquare size={18} />
                Queries
              </Link>
              <Link className={linkStyle("/users")} to="/users">
                <FiUsers size={18} />
                Users
              </Link>
            </>
          )}

          {/* MANAGER Navigation */}
          {role === "MANAGER" && (
            <>
              <Link className={linkStyle("/admin/projects")} to="/admin/projects">
                <FiFolder size={18} />
                Projects
              </Link>
              <Link className={linkStyle("/admin/team")} to="/admin/team">
                <FiUsers size={18} />
                My Teams
              </Link>
              <Link className={linkStyle("/admin/attendance")} to="/admin/attendance">
                <FiCalendar size={18} />
                Attendance
              </Link>
              <Link className={linkStyle("/admin/queries")} to="/admin/queries">
                <FiMessageSquare size={18} />
                Queries
              </Link>
              <Link className={linkStyle("/users")} to="/users">
                <FiUsers size={18} />
                Users
              </Link>
            </>
          )}

          {/* STRATEGIST Navigation */}
          {role === "STRATEGIST" && (
            <>
              <Link className={linkStyle("/admin/projects")} to="/admin/projects">
                <FiFolder size={18} />
                Projects
              </Link>
              <Link className={linkStyle("/admin/team")} to="/admin/team">
                <FiUsers size={18} />
                Team Progress
              </Link>
              <Link className={linkStyle("/admin/attendance")} to="/admin/attendance">
                <FiCalendar size={18} />
                Attendance Audit
              </Link>
              <Link className={linkStyle("/admin/announcements")} to="/admin/announcements">
                <FiBell size={18} />
                Announcements
              </Link>
            </>
          )}

          {/* MEMBER Navigation */}
          {role === "MEMBER" && (
            <>
              <Link className={linkStyle("/member/projects")} to="/member/projects">
                <FiFolder size={18} />
                My Projects
              </Link>
              <Link className={linkStyle("/member/attendance")} to="/member/attendance">
                <FiCalendar size={18} />
                Attendance
              </Link>
              <Link className={linkStyle("/member/announcements")} to="/member/announcements">
                <FiBell size={18} />
                Announcements
              </Link>
              <Link className={linkStyle("/member/query")} to="/member/query">
                <FiMessageSquare size={18} />
                Send Query
              </Link>
            </>
          )}
        </nav>
      </div>

      <button
        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition duration-200 p-3 rounded-lg font-semibold shadow"
        onClick={logout}
      >
        <FiLogOut size={18} />
        Logout
      </button>
    </div>
  )
}
