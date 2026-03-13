import { useState,useEffect } from "react"
import API from "../../services/api"
import MainLayout from "../../layouts/MainLayout"
import { FiSend, FiTrash } from "react-icons/fi"

export default function AdminAnnouncements(){

const [title,setTitle] = useState("")
const [message,setMessage] = useState("")
const [announcements,setAnnouncements] = useState([])
const [loading,setLoading] = useState(false)

useEffect(()=>{
loadAnnouncements()
},[])

const loadAnnouncements = async()=>{

const res = await API.get("/announcements")
setAnnouncements(res.data)

}

const createAnnouncement = async()=>{

if(!title || !message){
alert("Please fill all fields")
return
}

try{

setLoading(true)

await API.post("/announcements",{
title,
message
})

setTitle("")
setMessage("")

loadAnnouncements()

}catch(err){

alert("Failed to create announcement")

}finally{

setLoading(false)

}

}

const deleteAnnouncement = async(id)=>{

await API.delete(`/announcements/${id}`)

loadAnnouncements()

}

return(

<MainLayout>

<div className="max-w-4xl mx-auto px-6 py-10">

<h1 className="text-3xl font-bold text-gray-800 mb-8">
Create Announcement
</h1>

{/* Create Announcement */}

<div className="bg-white p-8 rounded-2xl shadow-lg mb-10">

<label className="block text-gray-600 mb-2 font-medium">
Announcement Title
</label>

<input
value={title}
placeholder="Enter announcement title"
className="w-full border p-3 rounded-lg mb-6"
onChange={(e)=>setTitle(e.target.value)}
/>

<label className="block text-gray-600 mb-2 font-medium">
Announcement Message
</label>

<textarea
value={message}
rows="5"
placeholder="Write announcement message..."
className="w-full border p-3 rounded-lg mb-6"
onChange={(e)=>setMessage(e.target.value)}
/>

<button
className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg"
onClick={createAnnouncement}
>

<FiSend/>

{loading ? "Posting..." : "Post Announcement"}

</button>

</div>

{/* Existing Announcements */}

<h2 className="text-xl font-semibold mb-4">
Previous Announcements
</h2>

<div className="space-y-4">

{announcements.map((a)=>(
<div key={a.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">

<div>
<h3 className="font-semibold">{a.title}</h3>
<p className="text-gray-600">{a.message}</p>
</div>

<button
className="text-red-500"
onClick={()=>deleteAnnouncement(a.id)}
>
<FiTrash/>
</button>

</div>
))}

</div>

</div>

</MainLayout>

)

}