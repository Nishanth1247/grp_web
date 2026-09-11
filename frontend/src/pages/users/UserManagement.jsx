import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import API from "../../services/api"
import { FiUsers, FiSearch, FiEdit2 } from "react-icons/fi"

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [newRole, setNewRole] = useState("")
  const [saving, setSaving] = useState(false)

  const currentRole = localStorage.getItem("role")
  const canEditRoles = ["CAP", "V_CAP"].includes(currentRole)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const res = await API.get("/users")
      setUsers(res.data)
    } catch (err) {
      console.error("Error loading users:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenRoleModal = (user) => {
    setSelectedUser(user)
    setNewRole(user.role)
  }

  const handleSaveRole = async () => {
    if (!selectedUser || !newRole) return
    try {
      setSaving(true)
      await API.put(`/users/${selectedUser.id}/role`, { role: newRole })
      alert(`User ${selectedUser.name}'s role updated to ${newRole}`)
      setSelectedUser(null)
      loadUsers()
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user role")
    } finally {
      setSaving(false)
    }
  }

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.role?.toLowerCase().includes(search.toLowerCase())
  )

  const roleBadgeStyle = (r) => {
    switch (r) {
      case "CAP": return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "V_CAP": return "bg-purple-100 text-purple-800 border-purple-200"
      case "MANAGER": return "bg-blue-100 text-blue-800 border-blue-200"
      case "STRATEGIST": return "bg-teal-100 text-teal-800 border-teal-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FiUsers className="text-indigo-600" /> User Management
            </h1>
            <p className="text-gray-500 text-sm mt-1">Directory of organization users and role assignments</p>
          </div>
          <span className="bg-indigo-100 text-indigo-800 font-semibold text-sm px-4 py-1.5 rounded-full">
            {users.length} Total Users
          </span>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-80">
            <FiSearch className="absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              className="w-full pl-10 pr-4 py-2.5 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* User Table */}
        {loading ? (
          <div className="p-10 text-center text-gray-500">Loading user directory...</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md border overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b text-gray-600 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Activity Points</th>
                  <th className="py-4 px-6">Reward Points</th>
                  {canEditRoles && <th className="py-4 px-6 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-400">
                      No matching users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50/80 transition">
                      <td className="py-4 px-6 font-mono text-gray-500 text-xs">#{u.id}</td>
                      <td className="py-4 px-6 font-semibold text-gray-800">{u.name}</td>
                      <td className="py-4 px-6 text-gray-600">{u.email}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${roleBadgeStyle(u.role)}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium text-indigo-600">{u.activity_points || 0}</td>
                      <td className="py-4 px-6 font-medium text-yellow-600">{u.reward_points || 0}</td>
                      {canEditRoles && (
                        <td className="py-4 px-6 text-right">
                          <button
                            className="inline-flex items-center gap-1.5 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-200 transition font-medium"
                            onClick={() => handleOpenRoleModal(u)}
                          >
                            <FiEdit2 size={13} /> Change Role
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Change Role Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Change User Role</h3>
              <p className="text-sm text-gray-500 mb-6">
                Update organizational role for <span className="font-semibold text-gray-800">{selectedUser.name}</span>
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">Select New Role</label>
              <select
                className="w-full border p-3 rounded-xl mb-6 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="CAP">CAP (Captain)</option>
                <option value="V_CAP">V_CAP (Vice Captain)</option>
                <option value="MANAGER">MANAGER (Manager)</option>
                <option value="STRATEGIST">STRATEGIST (Strategist)</option>
                <option value="MEMBER">MEMBER (Individual Member)</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-medium"
                  onClick={() => setSelectedUser(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
                  onClick={handleSaveRole}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Role"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
