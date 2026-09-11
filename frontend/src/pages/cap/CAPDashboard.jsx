import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import API from "../../services/api"
import { FiUsers, FiFolder, FiCheckCircle, FiMessageSquare, FiCalendar, FiBell } from "react-icons/fi"

export default function CAPDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCAPDashboard()
  }, [])

  const loadCAPDashboard = async () => {
    try {
      const res = await API.get("/dashboard/cap")
      setData(res.data)
    } catch (err) {
      console.error("CAP Dashboard Error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="p-10 text-center text-gray-500">Loading Captain Dashboard...</div>
      </MainLayout>
    )
  }

  const { stats, recentProjects = [], recentQueries = [], announcements = [] } = data || {}

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Captain Executive Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Organization-wide control & performance analytics</p>
          </div>
          <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-1.5 rounded-full">
            Captain Role
          </span>
        </div>

        {/* Executive Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-indigo-600">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Total Users</span>
              <FiUsers className="text-indigo-600 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.totalUsers || 0}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Total Teams</span>
              <FiFolder className="text-blue-500 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.totalTeams || 0}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Total Projects</span>
              <FiCheckCircle className="text-green-500 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.totalProjects || 0}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-purple-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Today's Attendance</span>
              <FiCalendar className="text-purple-500 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.todayAttendance || 0}</p>
          </div>
        </div>

        {/* Executive Action Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Projects Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiFolder className="text-indigo-600" /> Recent Projects
            </h2>
            <div className="space-y-3">
              {recentProjects.length === 0 ? (
                <p className="text-gray-400 text-sm">No projects recorded</p>
              ) : (
                recentProjects.map((p) => (
                  <div key={p.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.assigned_user_name || "Unassigned"}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                      {p.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pending Queries */}
          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiMessageSquare className="text-red-500" /> Open Queries ({stats?.openQueries || 0})
            </h2>
            <div className="space-y-3">
              {recentQueries.length === 0 ? (
                <p className="text-gray-400 text-sm">No pending queries</p>
              ) : (
                recentQueries.map((q) => (
                  <div key={q.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-semibold text-indigo-700 mb-1">{q.name}</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{q.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiBell className="text-yellow-500" /> Announcements
            </h2>
            <div className="space-y-3">
              {announcements.length === 0 ? (
                <p className="text-gray-400 text-sm">No announcements</p>
              ) : (
                announcements.map((a) => (
                  <div key={a.id} className="p-3 bg-gray-50 rounded-lg border-l-2 border-yellow-400">
                    <p className="font-semibold text-gray-800 text-sm">{a.title}</p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{a.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
