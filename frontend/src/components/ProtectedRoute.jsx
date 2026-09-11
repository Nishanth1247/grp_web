import { Navigate } from "react-router-dom"

export default function ProtectedRoute({children, roleRequired, allowedRoles}){

const token = localStorage.getItem("token")
const role = localStorage.getItem("role")

if(!token){
 return <Navigate to="/" />
}

const roles = allowedRoles || (roleRequired ? (Array.isArray(roleRequired) ? roleRequired : [roleRequired]) : null)

if(roles && !roles.includes(role)){
 return <Navigate to="/" />
}

return children

}