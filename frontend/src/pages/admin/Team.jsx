import { useEffect,useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import API from "../../services/api"

export default function Team(){

const [teams,setTeams] = useState([])

useEffect(()=>{
loadTeams()
},[])

const loadTeams = async()=>{

const res = await API.get("/teams")

// group members by team
const grouped = {}

res.data.forEach(item=>{    

if(!grouped[item.team_name]){
grouped[item.team_name] = {
teamName:item.team_name,
lead:item.leader,
members:[]
}
}

if(item.name){
grouped[item.team_name].members.push({
name:item.name,
role:item.role
})
}

})

setTeams(Object.values(grouped))

}

return(

<MainLayout>

<div className="max-w-6xl mx-auto px-6 py-10">

<h1 className="text-3xl font-bold text-gray-800 mb-8">
Team Structure
</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{teams.map((team,i)=>(

<div
key={i}
className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
>

<h2 className="text-xl font-semibold text-indigo-700 mb-3">
{team.teamName}
</h2>

<p className="text-gray-700 mb-4">
<span className="font-semibold">Team Lead:</span> {team.leader}
</p>

<div className="space-y-2">

{team.members.map((m,index)=>(

<div
key={index}
className="flex justify-between bg-gray-100 p-2 rounded-lg"
>

<span className="font-medium">
{m.name}
</span>

<span className="text-sm text-gray-600">
{m.role}
</span>

</div>

))}

</div>

</div>

))}

</div>

</div>

</MainLayout>

)

}