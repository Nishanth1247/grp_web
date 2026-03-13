export default function Header(){

    const logout = ()=>{
            localStorage.removeItem("token")
            localStorage.removeItem("role")
            window.location="/"
            }

return(

<div className="bg-white shadow p-4 flex justify-between">

<h2 className="text-lg font-semibold">
Team Dashboard
</h2>

<button
className="bg-red-500 text-white px-3 py-1 rounded"
onClick={logout}
>
Logout
</button>

</div>

)

}