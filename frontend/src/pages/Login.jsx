import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate()

  const login = async()=>{

    try{

      const res = await API.post("/auth/login",{
        email,
        password
      })

      localStorage.setItem("token",res.data.token)
      localStorage.setItem("role",res.data.user.role)

      if(res.data.user.role === "admin"){
        navigate("/admin/dashboard")
      }
      else if(res.data.user.role === "member"){
        navigate("/member/dashboard")
      }

    }catch(err){

      if(err.response){
        setError(err.response.data.message || "Not a valid user")
      }else{
        setError("Server error")
      }

    }

  }

  return(

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">

        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Welcome Back
        </h2>

        <p className="text-center text-gray-400 mb-6">
          Login to your account
        </p>

        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email address"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white w-full p-3 rounded-lg font-semibold"
          onClick={login}
        >
          Login
        </button>

        {error && (
          <p className="text-red-500 text-center mt-4">
            {error}
          </p>
        )}

      </div>

    </div>

  )

}