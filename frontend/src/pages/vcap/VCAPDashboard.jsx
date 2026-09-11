import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import API from "../../services/api"
import { FiUsers, FiFolder, FiCheckCircle, FiCalendar, FiBell } from "react-icons/fi"

export default function VCAPDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVCAPDashboard()
  }, [])

  const loadVCAPDashboard = async () => {
    try {
      const res = await API.get("/dashboard/vcap")
      setData(res.data)
    } catch (err) {
      console.error("V_CAP Dashboard Error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="p-10 text-center text-gray-500">Loading Vice Captain Dashboard...</div>
      </MainLayout>
    )
  }

  const { stats, recentProjects = [], announcements = [] } = data || {}

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Vice Captain Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Cross-team operations & project progress oversight</p>
          </div>
          <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-1.5 rounded-full">
            Vice Captain Role
          </span>
        </div>

        {/* Operational Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-purple-600">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Total Teams</span>
              <FiFolder className="text-purple-600 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.totalTeams || 0}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Active Members</span>
              <FiUsers className="text-blue-500 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.totalMembers || 0}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Projects Overview</span>
              <FiCheckCircle className="text-green-500 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.totalProjects || 0}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-indigo-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Today's Attendance</span>
              <FiCalendar className="text-indigo-500 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats?.todayAttendance || 0}</p>
          </div>
        </div>

        {/* Operational Highlights */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiFolder className="text-purple-600" /> Recent Projects Status
            </h2>
            <div className="space-y-3">
              {recentProjects.map((p) => (
                <div key={p.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                  <span className="font-medium text-gray-800 text-sm">{p.name}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiBell className="text-yellow-500" /> Organization Announcements
            </h2>
            <div className="space-y-3">
              {announcements.map((a) => (
                <div key={a.id} className="p-3 bg-gray-50 rounded-lg border-l-2 border-yellow-400">
                  <p className="font-semibold text-gray-800 text-sm">{a.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{a.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
