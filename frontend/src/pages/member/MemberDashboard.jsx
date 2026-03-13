import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import API from "../../services/api"
import {
FiCalendar,
FiAward,
FiStar,
FiTrendingUp,
FiUsers
} from "react-icons/fi"

export default function MemberDashboard() {

const [memberData,setMemberData] = useState({
attendance:0,
events:0,
activityPoints:0,
rewardPoints:0,
level:"",
recentEvents:[],
recentPSBookings:[],
roles:[]
})

useEffect(()=>{
loadDashboard()
},[])

const loadDashboard = async ()=>{

try{

const res = await API.get("/member/dashboard")

setMemberData(res.data)

}catch(err){

console.log("Dashboard error:",err)

}

}

return (

<MainLayout>

<div className="max-w-6xl mx-auto px-6 py-10">

<h1 className="text-4xl font-bold text-gray-800 mb-10">
Member Dashboard
</h1>

{/* Stats Section */}

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

<div className="bg-white p-6 rounded-2xl shadow-lg">
<div className="flex items-center gap-3 mb-3">
<FiCalendar className="text-blue-600"/>
<h2 className="text-gray-500">Attendance</h2>
</div>

<p className="text-3xl font-bold text-blue-600">
{memberData.attendance}%
</p>

</div>

<div className="bg-white p-6 rounded-2xl shadow-lg">
<div className="flex items-center gap-3 mb-3">
<FiUsers className="text-green-600"/>
<h2 className="text-gray-500">Events</h2>
</div>

<p className="text-3xl font-bold text-green-600">
{memberData.events}
</p>

</div>

<div className="bg-white p-6 rounded-2xl shadow-lg">
<div className="flex items-center gap-3 mb-3">
<FiTrendingUp className="text-purple-600"/>
<h2 className="text-gray-500">Activity Points</h2>
</div>

<p className="text-3xl font-bold text-purple-600">
{memberData.activityPoints}
</p>

</div>

<div className="bg-white p-6 rounded-2xl shadow-lg">
<div className="flex items-center gap-3 mb-3">
<FiStar className="text-yellow-500"/>
<h2 className="text-gray-500">Reward Points</h2>
</div>

<p className="text-3xl font-bold text-yellow-500">
{memberData.rewardPoints}
</p>

</div>

</div>

{/* Member Level */}

<div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 rounded-2xl shadow-lg mb-10">

<div className="flex items-center gap-3 mb-2">
<FiAward/>
<h2 className="text-lg font-semibold">Member Level</h2>
</div>

<p className="text-2xl font-bold">
{memberData.level}
</p>

</div>

{/* Recent Activity */}

<div className="grid md:grid-cols-2 gap-8 mb-10">

<div className="bg-white p-6 rounded-2xl shadow-lg">

<h2 className="text-lg font-semibold text-gray-700 mb-4">
Recent Events
</h2>

<ul className="space-y-2">

{memberData.recentEvents.map((event,index)=>(
<li key={index} className="bg-gray-100 p-3 rounded-lg">
{event}
</li>
))}

</ul>

</div>

<div className="bg-white p-6 rounded-2xl shadow-lg">

<h2 className="text-lg font-semibold text-gray-700 mb-4">
Recent PS Bookings
</h2>

<ul className="space-y-2">

{memberData.recentPSBookings.map((ps,index)=>(
<li key={index} className="bg-gray-100 p-3 rounded-lg">
{ps}
</li>
))}

</ul>

</div>

</div>

{/* Roles */}

<div className="bg-white p-6 rounded-2xl shadow-lg">

<h2 className="text-lg font-semibold text-gray-700 mb-4">
Project Roles
</h2>

<div className="flex flex-wrap gap-3">

{memberData.roles.map((role,index)=>(
<span
key={index}
className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
>
{role}
</span>
))}

</div>

</div>

</div>

</MainLayout>

)

}