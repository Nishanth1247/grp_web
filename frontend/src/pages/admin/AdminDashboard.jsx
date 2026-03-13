import { useEffect,useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import API from "../../services/api"

export default function AdminDashboard(){

const [stats,setStats] = useState({
projects:0,
members:0,
queries:0,
attendance:0
})

const [recentProjects,setProjects] = useState([])
const [recentQueries,setQueries] = useState([])
const [announcements,setAnnouncements] = useState([])

const [loading,setLoading] = useState(true)

useEffect(()=>{
loadDashboard()
},[])

const loadDashboard = async()=>{

try{

const statsRes = await API.get("/dashboard/stats")
setStats(statsRes.data)

const projectsRes = await API.get("/projects")
setProjects(projectsRes.data.slice(0,4))

const queriesRes = await API.get("/queries")
setQueries(queriesRes.data.slice(0,4))

const annRes = await API.get("/announcements")
setAnnouncements(annRes.data.slice(0,4))

}catch(err){

console.log("Dashboard error:",err)

}finally{

setLoading(false)

}

}

const statCards = [
{title:"Active Projects",value:stats.projects,color:"text-blue-600"},
{title:"Team Members",value:stats.members,color:"text-green-600"},
{title:"Open Queries",value:stats.queries,color:"text-red-500"},
{title:"Today's Attendance",value:stats.attendance,color:"text-purple-600"}
]

if(loading){
return(
<MainLayout>
<div className="p-10 text-center text-gray-500">
Loading dashboard...
</div>
</MainLayout>
)
}

return(

<MainLayout>

<div className="max-w-7xl mx-auto px-6 py-10">

<h1 className="text-3xl font-bold text-gray-800 mb-8">
Admin Dashboard
</h1>

{/* Stats */}

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

{statCards.map((s,i)=>(
<div key={i} className="bg-white p-6 rounded-2xl shadow-lg">

<p className="text-gray-500 mb-2">
{s.title}
</p>

<p className={`text-3xl font-bold ${s.color}`}>
{s.value}
</p>

</div>
))}

</div>

{/* Dashboard Sections */}

<div className="grid md:grid-cols-3 gap-6">

{/* Projects */}

<div className="bg-white p-6 rounded-2xl shadow-lg">

<h2 className="text-lg font-semibold mb-4">
Recent Projects
</h2>

<ul className="space-y-2">

{recentProjects.length === 0 ? (
<p className="text-gray-400 text-sm">No projects yet</p>
) : (
recentProjects.map((p)=>(
<li key={p.id} className="bg-gray-100 p-2 rounded">
{p.name}
</li>
))
)}

</ul>

</div>

{/* Queries */}

<div className="bg-white p-6 rounded-2xl shadow-lg">

<h2 className="text-lg font-semibold mb-4">
Pending Queries
</h2>

<ul className="space-y-2">

{recentQueries.length === 0 ? (
<p className="text-gray-400 text-sm">No queries</p>
) : (
recentQueries.map((q)=>(
<li key={q.id} className="bg-gray-100 p-2 rounded">
{q.message}
</li>
))
)}

</ul>

</div>

{/* Announcements */}

<div className="bg-white p-6 rounded-2xl shadow-lg">

<h2 className="text-lg font-semibold mb-4">
Announcements
</h2>

<ul className="space-y-2">

{announcements.length === 0 ? (
<p className="text-gray-400 text-sm">No announcements</p>
) : (
announcements.map((a)=>(
<li key={a.id} className="bg-gray-100 p-2 rounded">
{a.title}
</li>
))
)}

</ul>

</div>

</div>

</div>

</MainLayout>

)

}