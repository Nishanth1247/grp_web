import { useEffect,useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import API from "../../services/api"

export default function Projects(){

const [projects,setProjects] = useState([])

useEffect(()=>{
loadProjects()
},[])

const loadProjects = async()=>{

try{

const res = await API.get("/projects")
setProjects(res.data)

}catch(err){

console.log(err)

}

}

const statusStyle = (status) => {

if(status==="Completed")
return "bg-green-100 text-green-700"

if(status==="In Progress")
return "bg-yellow-100 text-yellow-700"

if(status==="Planning")
return "bg-blue-100 text-blue-700"

return "bg-gray-100 text-gray-700"
}

return(

<MainLayout>

<div className="max-w-6xl mx-auto px-6 py-10">

{/* Header */}

<div className="flex justify-between items-center mb-10">

<h1 className="text-3xl font-bold text-gray-800">
Projects
</h1>

<button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition">
+ Add Project
</button>

</div>

{/* Project List */}

<div className="flex flex-col gap-6">

{projects.map((p)=>(
  
<div
key={p.id}
className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border"
>

{/* Top Row */}

<div className="flex justify-between items-start mb-4">

<h2 className="text-xl font-semibold text-gray-800">
{p.name}
</h2>

<span
className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyle(p.status)}`}
>
{p.status}
</span>

</div>

{/* Description */}

<p className="text-gray-600 mb-4 leading-relaxed">
{p.description}
</p>

{/* Skills */}

<div className="flex flex-wrap gap-2">

{p.skills?.split(",").map((skill,i)=>(
<span
key={i}
className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
>
{skill}
</span>
))}

</div>

</div>

))}

{/* Empty state */}

{projects.length===0 &&(

<div className="text-center text-gray-400 mt-10">
No projects available
</div>

)}

</div>

</div>

</MainLayout>

)

}