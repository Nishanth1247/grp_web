import { useEffect, useState } from "react"
import API from "../../services/api"
import MainLayout from "../../layouts/MainLayout"
import { FiMessageCircle, FiSend } from "react-icons/fi"

export default function Queries(){

const [queries,setQueries] = useState([])
const [replyText,setReplyText] = useState({})

useEffect(()=>{
loadQueries()
},[])

const loadQueries = async () => {
const res = await API.get("/queries")
setQueries(res.data)
}

const replyQuery = async(id)=>{

await API.put("/queries/reply",{
id,
reply: replyText[id]
})

alert("Reply sent")

loadQueries()
}

return(

<MainLayout>

<div className="max-w-4xl mx-auto px-6 py-10">

<h1 className="text-3xl font-bold text-gray-800 mb-8">
Member Queries
</h1>

{queries.map((q)=>(

<div
key={q.id}
className="bg-white p-6 rounded-2xl shadow-lg mb-6 border"
>

{/* Member Info */}

<div className="flex items-center gap-3 mb-4">

<div className="bg-blue-100 p-3 rounded-full">
<FiMessageCircle className="text-blue-600"/>
</div>

<h3 className="text-lg font-semibold text-gray-800">
{q.name}
</h3>

</div>

{/* Query Message */}

<div className="bg-gray-50 p-4 rounded-lg mb-4">

<p className="text-gray-700">
{q.message}
</p>

</div>

{/* Admin Reply */}

{q.reply && (

<div className="bg-green-50 p-4 rounded-lg mb-4 border border-green-200">

<p className="text-green-700 font-medium">
Admin Reply
</p>

<p className="text-gray-700">
{q.reply}
</p>

</div>

)}

{/* Reply Input */}

<textarea
placeholder="Write reply to this query..."
className="border border-gray-300 p-3 w-full rounded-lg mb-3 focus:ring-2 focus:ring-blue-400"
rows="3"
onChange={(e)=>
setReplyText({
...replyText,
[q.id]: e.target.value
})
}
/>

<button
className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
onClick={()=>replyQuery(q.id)}
>

<FiSend/>

Send Reply

</button>

</div>

))}

{queries.length === 0 && (

<p className="text-gray-400 text-center mt-10">
No queries available
</p>

)}

</div>

</MainLayout>

)

}