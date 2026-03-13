import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import API from "../../services/api"
import { FiFolder } from "react-icons/fi"

export default function MyProjects(){

const [projects,setProjects] = useState([])
const [loading,setLoading] = useState(true)

useEffect(()=>{
loadProjects()
},[])

const loadProjects = async ()=>{

try{

const res = await API.get("/member/projects")

// ensure response is array
if(Array.isArray(res.data)){
setProjects(res.data)
}else if(res.data.projects){
setProjects(res.data.projects)
}else{
setProjects([])
}

}catch(err){

console.log("Project load error:",err)
setProjects([])

}finally{

setLoading(false)

}

}

const statusStyle = (status) => {

if(status === "In Progress") return "bg-yellow-100 text-yellow-700"
if(status === "Planning") return "bg-blue-100 text-blue-700"
if(status === "Completed") return "bg-green-100 text-green-700"

return "bg-gray-100 text-gray-600"

}

return(

<MainLayout>

<div className="max-w-6xl mx-auto px-6 py-10">

<h1 className="text-4xl font-bold text-gray-800 mb-10">
My Projects
</h1>

{/* Loading */}

{loading && (
<div className="text-gray-500 text-center">
Loading projects...
</div>
)}

{/* Projects */}

{!loading && (

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{projects.length === 0 ? (

<div className="col-span-3 text-center text-gray-400">
No projects assigned yet
</div>

) : (

projects.map((p)=>(
<div
key={p.id}
className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
>

{/* Header */}

<div className="flex items-center gap-3 mb-4">

<div className="bg-blue-100 p-3 rounded-lg">
<FiFolder className="text-blue-600 text-xl"/>
</div>

<h2 className="text-xl font-semibold text-gray-800">
{p.name}
</h2>

</div>

{/* Description */}

<p className="text-gray-500 leading-relaxed mb-4">
{p.description}
</p>

{/* Status */}

<span
className={`px-4 py-1 rounded-full text-sm font-semibold ${statusStyle(p.status)}`}
>
{p.status}
</span>

</div>
))

)}

</div>

)}

</div>

</MainLayout>

)

}