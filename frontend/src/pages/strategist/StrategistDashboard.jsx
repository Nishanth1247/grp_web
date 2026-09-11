import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import API from "../../services/api"
import { FiTrendingUp, FiCheckSquare, FiCalendar, FiPieChart } from "react-icons/fi"

export default function StrategistDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStrategistDashboard()
  }, [])

  const loadStrategistDashboard = async () => {
    try {
      const res = await API.get("/dashboard/strategist")
      setData(res.data)
    } catch (err) {
      console.error("Strategist Dashboard Error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="p-10 text-center text-gray-500">Loading Strategist Dashboard...</div>
      </MainLayout>
    )
  }

  const { analytics, projectBreakdown = [] } = data || {}

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Strategist Analytics Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Read-only performance metrics, attendance trends & skill evaluation</p>
          </div>
          <span className="bg-teal-100 text-teal-800 text-sm font-semibold px-4 py-1.5 rounded-full">
            Strategist Role
          </span>
        </div>

        {/* Analytics Key Performance Indicators */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-teal-600">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Overall Attendance Rate</span>
              <FiCalendar className="text-teal-600 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{analytics?.attendanceRate || 0}%</p>
            <p className="text-xs text-gray-400 mt-1">{analytics?.presentDays || 0} / {analytics?.totalRecords || 0} recorded days</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Project Completion Rate</span>
              <FiCheckSquare className="text-blue-500 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{analytics?.projectCompletionRate || 0}%</p>
            <p className="text-xs text-gray-400 mt-1">{analytics?.completedProjects || 0} / {analytics?.totalProjects || 0} projects completed</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-indigo-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Performance Trend</span>
              <FiTrendingUp className="text-indigo-500 text-xl" />
            </div>
            <p className="text-3xl font-bold text-indigo-600">Optimal</p>
            <p className="text-xs text-gray-400 mt-1">Based on current task logs</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-purple-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">Analytics Scope</span>
              <FiPieChart className="text-purple-500 text-xl" />
            </div>
            <p className="text-2xl font-bold text-gray-800">Organization</p>
            <p className="text-xs text-gray-400 mt-1">Read / Analysis Access</p>
          </div>
        </div>

        {/* Analytics Breakdown */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiPieChart className="text-teal-600" /> Project Status Distribution
            </h2>
            <div className="space-y-3">
              {projectBreakdown.map((pb, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-800 text-sm capitalize">{pb.status}</span>
                  <span className="text-xs px-3 py-1 bg-teal-100 text-teal-800 font-bold rounded-full">
                    {pb.count} Projects
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiTrendingUp className="text-blue-600" /> Analytical Insights
            </h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="p-3 bg-blue-50 text-blue-800 rounded-lg border border-blue-100">
                <p className="font-semibold mb-1">Attendance Analysis</p>
                <p>Team attendance is tracking at {analytics?.attendanceRate || 0}%. Daily check-ins are verified by Managers.</p>
              </div>
              <div className="p-3 bg-green-50 text-green-800 rounded-lg border border-green-100">
                <p className="font-semibold mb-1">Project Milestone Ratio</p>
                <p>{analytics?.completedProjects || 0} out of {analytics?.totalProjects || 0} overall projects are fully completed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
