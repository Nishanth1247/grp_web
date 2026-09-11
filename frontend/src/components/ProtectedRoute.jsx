import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children, roleRequired, allowedRoles }) {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  if (!token) {
    return <Navigate to="/" replace />
  }

  const roles = allowedRoles || (roleRequired ? (Array.isArray(roleRequired) ? roleRequired : [roleRequired]) : null)

  if (roles && !roles.includes(role)) {
    // Redirect unauthorized role to their own role dashboard
    const roleDashboardMap = {
      CAP: "/cap/dashboard",
      V_CAP: "/vcap/dashboard",
      MANAGER: "/manager/dashboard",
      STRATEGIST: "/strategist/dashboard",
      MEMBER: "/member/dashboard"
    }

    const redirectPath = roleDashboardMap[role] || "/member/dashboard"
    return <Navigate to={redirectPath} replace />
  }

  return children
}