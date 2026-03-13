import { useState } from "react"
import API from "../../services/api"
import MainLayout from "../../layouts/MainLayout"
import { FiSend } from "react-icons/fi"

export default function SendQuery(){

const [message,setMessage] = useState("")
const [loading,setLoading] = useState(false)

const sendQuery = async()=>{

if(!message.trim()) return

try{

setLoading(true)

await API.post("/queries",{
 message
})

setMessage("")
alert("Query sent successfully")

}catch(err){

alert("Failed to send query")

}finally{
setLoading(false)
}

}

return(

<MainLayout>

<div className="flex justify-center mt-10">

<div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">

<h1 className="text-2xl font-bold text-gray-700 mb-6">
Send a Query
</h1>

<p className="text-gray-400 mb-4">
Have a question or issue? Send it to the admin team.
</p>

<textarea
className="w-full border border-gray-300 rounded-lg p-4 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
placeholder="Write your query here..."
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>

<button
className={`flex items-center justify-center gap-2 w-full p-3 rounded-lg font-semibold text-white transition
${message ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
onClick={sendQuery}
disabled={!message || loading}
>

<FiSend size={18}/>

{loading ? "Sending..." : "Send Query"}

</button>

</div>

</div>

</MainLayout>

)

}