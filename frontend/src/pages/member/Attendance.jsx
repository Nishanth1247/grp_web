import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import API from "../../services/api"

export default function Attendance(){

const currentMonthName = new Date().toLocaleString("default",{month:"long"})
const [month,setMonth] = useState(currentMonthName)
const [attendance,setAttendance] = useState([])
const [loading,setLoading] = useState(true)

useEffect(()=>{
loadAttendance()
},[])

const loadAttendance = async()=>{
try{
const res = await API.get("/attendance/my")
if(Array.isArray(res.data)){
setAttendance(res.data)
}
}catch(err){
console.log("Error loading attendance:",err)
}finally{
setLoading(false)
}
}

const filtered = attendance.filter(a =>
new Date(a.date).toLocaleString("default",{month:"long"}) === month
)

const presentCount = filtered.filter(a=>a.status==="Present").length
const absentCount = filtered.filter(a=>a.status==="Absent").length

return(

<MainLayout>

<div className="max-w-6xl mx-auto px-6 py-10">

<h1 className="text-3xl font-bold text-gray-800 mb-8">
Attendance Overview
</h1>

{/* Month selector */}

<div className="flex justify-between items-center mb-10">

<select
className="border px-4 py-2 rounded-lg shadow"
value={month}
onChange={(e)=>setMonth(e.target.value)}
>
<option>January</option>
<option>February</option>
<option>March</option>
<option>April</option>
<option>May</option>
<option>June</option>
<option>July</option>
<option>August</option>
<option>September</option>
<option>October</option>
<option>November</option>
<option>December</option>
</select>

</div>

{/* Summary cards */}

<div className="grid md:grid-cols-3 gap-6 mb-10">

<div className="bg-white p-6 rounded-xl shadow">

<p className="text-gray-500">Total Present</p>

<p className="text-3xl font-bold text-green-600">
{presentCount}
</p>

</div>

<div className="bg-white p-6 rounded-xl shadow">

<p className="text-gray-500">Total Absent</p>

<p className="text-3xl font-bold text-red-500">
{absentCount}
</p>

</div>

<div className="bg-white p-6 rounded-xl shadow">

<p className="text-gray-500">Attendance Rate</p>

<p className="text-3xl font-bold text-blue-600">
{filtered.length ? Math.round((presentCount/filtered.length)*100) : 0}%
</p>

</div>

</div>

{/* Calendar style grid */}

<div className="grid grid-cols-7 gap-4">

{filtered.map((a,i)=>{

const day = new Date(a.date).getDate()

return(

<div
key={i}
className={`p-4 rounded-xl text-center shadow
${a.status==="Present"
?"bg-green-100 text-green-700"
:"bg-red-100 text-red-600"}
`}
>

<p className="text-lg font-bold">
{day}
</p>

<p className="text-sm">
{a.status}
</p>

</div>

)

})}

</div>

</div>

</MainLayout>

)
}