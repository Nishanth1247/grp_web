import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import API from "../../services/api"
import { FiUsers, FiFolder, FiMessageSquare, FiCheckCircle } from "react-icons/fi"

export default function ManagerDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadManagerDashboard()
  }, [])

  const loadManagerDashboard = async () => {
    try {
      const res = await API.get("/dashboard/manager")
      setData(res.data)
    } catch (err) {
      console.error("Manager Dashboard Error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="p-10 text-center text-gray-500">Loading Manager Dashboard...</div>
      </MainLayout>
    )
  }

  const { stats, teamList = [] } = data || {}

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Team Manager Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Managed teams, task delegation & daily team attendance</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1.5 rounded-full">
            Manager Role
          </span>
        </div>

        {/* Manager Operational Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-600">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Managed Teams</span>
              <FiFolder className="text-blue-600 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.teamsCount || 0}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-indigo-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Team Members</span>
              <FiUsers className="text-indigo-500 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.membersCount || 0}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-yellow-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Active Projects</span>
              <FiCheckCircle className="text-yellow-500 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.activeProjects || 0}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-red-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Pending Queries</span>
              <FiMessageSquare className="text-red-500 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.pendingQueries || 0}</p>
          </div>
        </div>

        {/* Team List Breakdown */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiUsers className="text-blue-600" /> Team Operations Breakdown
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamList.map((t, i) => (
              <div key={i} className="p-5 bg-gray-50 rounded-xl border hover:shadow-md transition">
                <h3 className="text-lg font-bold text-indigo-700 mb-2">{t.team_name}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-semibold text-gray-700">Team Lead:</span> {t.leader || "N/A"}
                </p>
                <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border text-sm">
                  <span className="text-gray-500 font-medium">Members</span>
                  <span className="font-bold text-indigo-600">{t.member_count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
