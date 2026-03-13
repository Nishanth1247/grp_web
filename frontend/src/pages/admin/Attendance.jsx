import { useEffect,useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import API from "../../services/api"
import { FiUserCheck, FiUserX } from "react-icons/fi"

export default function Attendance(){

const [attendance,setAttendance] = useState([])

useEffect(()=>{
loadMembers()
},[])

const loadMembers = async()=>{

const res = await API.get("/attendance/members")

const formatted = res.data.map(m=>({
id:m.id,
name:m.name,
status:"Absent"
}))

setAttendance(formatted)

}

const updateStatus = async(index,status)=>{

const updated = [...attendance]
updated[index].status = status
setAttendance(updated)

await API.post("/attendance",{
user_id:updated[index].id,
status
})

}

return(

<MainLayout>

<div className="max-w-4xl mx-auto px-6 py-10">

<h1 className="text-3xl font-bold text-gray-800 mb-8">
Team Attendance
</h1>

<div className="space-y-6">

{attendance.map((a,i)=>(

<div
key={a.id}
className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between"
>

<div>

<h2 className="text-lg font-semibold text-gray-800">
{a.name}
</h2>

<span
className={`text-sm px-3 py-1 rounded-full font-medium ${
a.status==="Present"
?"bg-green-100 text-green-700"
:"bg-red-100 text-red-600"
}`}
>
{a.status}
</span>

</div>

<div className="flex gap-3">

<button
className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
onClick={()=>updateStatus(i,"Present")}
>
<FiUserCheck/>
Present
</button>

<button
className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
onClick={()=>updateStatus(i,"Absent")}
>
<FiUserX/>
Absent
</button>

</div>

</div>

))}

</div>

</div>

</MainLayout>

)

}