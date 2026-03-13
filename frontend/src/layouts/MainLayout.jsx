import AdminSidebar from "../components/AdminSidebar"
import MemberSidebar from "../components/MemberSidebar"

export default function MainLayout({children}){

const role = localStorage.getItem("role")

return(

<div className="flex h-screen bg-gray-100">

{/* Fixed Sidebar */}

<div className="fixed left-0 top-0 h-screen w-64">

{role==="admin" ? <AdminSidebar/> : <MemberSidebar/>}

</div>

{/* Scrollable Content */}

<div className="ml-64 flex-1 h-screen overflow-y-auto p-8">

{children}

</div>

</div>

)

}