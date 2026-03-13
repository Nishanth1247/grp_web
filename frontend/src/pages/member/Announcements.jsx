import { useEffect, useState } from "react"
import API from "../../services/api"
import MainLayout from "../../layouts/MainLayout"
import { FiBell } from "react-icons/fi"

export default function Announcements(){

const [announcements,setAnnouncements] = useState([])

useEffect(()=>{

API.get("/announcements")
.then(res=>setAnnouncements(res.data))

},[])

return(

<MainLayout>

<div className="max-w-4xl mx-auto mt-10">

<h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
<FiBell className="text-blue-600"/>
Announcements
</h1>

<div className="flex flex-col gap-6">

{announcements.map((a)=>(

<div
key={a.id}
className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500 hover:shadow-xl transition"
>

<h3 className="text-xl font-semibold text-gray-800 mb-2">
{a.title}
</h3>

<p className="text-gray-600 text-lg leading-relaxed bg-blue-50 p-4 rounded-lg">
{a.message}
</p>

</div>

))}

{announcements.length === 0 && (

<div className="text-center text-gray-400 mt-10">
No announcements available
</div>

)}

</div>

</div>

</MainLayout>

)

}