import { useEffect, useState } from "react"
import MainLayout from "../../layouts/MainLayout"
import API from "../../services/api"
import { FiUsers, FiPlus, FiEdit2, FiTrash2, FiUserCheck } from "react-icons/fi"

export default function Team() {
  const [teams, setTeams] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal State
  const [showModal, setShowModal] = useState(false)
  const [editingTeamId, setEditingTeamId] = useState(null)
  const [teamName, setTeamName] = useState("")
  const [leader, setLeader] = useState("")
  const [selectedMembers, setSelectedMembers] = useState([])
  const [saving, setSaving] = useState(false)

  const currentRole = localStorage.getItem("role")
  const canManageTeams = ["CAP", "V_CAP", "MANAGER"].includes(currentRole)
  const canDeleteTeams = ["CAP", "V_CAP"].includes(currentRole)

  useEffect(() => {
    loadTeams()
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const res = await API.get("/users")
      setUsers(res.data)
    } catch (err) {
      console.error("Error loading users for team assignment:", err)
    }
  }

  const loadTeams = async () => {
    try {
      const res = await API.get("/teams")
      const grouped = {}

      res.data.forEach((item) => {
        if (!grouped[item.team_name]) {
          grouped[item.team_name] = {
            id: item.team_id,
            teamName: item.team_name,
            lead: item.leader,
            members: []
          }
        }

        if (item.name) {
          grouped[item.team_name].members.push({
            id: item.member_id,
            name: item.name,
            role: item.role
          })
        }
      })

      setTeams(Object.values(grouped))
    } catch (err) {
      console.error("Error loading teams:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenCreateModal = () => {
    setEditingTeamId(null)
    setTeamName("")
    setLeader(users.length > 0 ? users[0].name : "")
    setSelectedMembers([])
    setShowModal(true)
  }

  const handleOpenEditModal = (team) => {
    setEditingTeamId(team.id)
    setTeamName(team.teamName)
    setLeader(team.lead || "")
    const existingMemberNames = team.members.map((m) => m.name).filter((n) => n !== team.lead)
    setSelectedMembers(existingMemberNames)
    setShowModal(true)
  }

  const handleToggleMember = (name) => {
    if (selectedMembers.includes(name)) {
      setSelectedMembers(selectedMembers.filter((m) => m !== name))
    } else {
      setSelectedMembers([...selectedMembers, name])
    }
  }

  const handleSaveTeam = async () => {
    if (!teamName.trim() || !leader) {
      alert("Please specify team name and team leader.")
      return
    }

    try {
      setSaving(true)
      const payload = {
        team_name: teamName,
        leader,
        members: selectedMembers
      }

      if (editingTeamId) {
        await API.put(`/teams/${editingTeamId}`, payload)
        alert("Team updated successfully!")
      } else {
        await API.post("/teams", payload)
        alert("Team created successfully!")
      }

      setShowModal(false)
      loadTeams()
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save team")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteTeam = async (team) => {
    if (!window.confirm(`Are you sure you want to delete "${team.teamName}"? This action cannot be undone.`)) {
      return
    }

    try {
      await API.delete(`/teams/${team.id}`)
      alert("Team deleted successfully!")
      loadTeams()
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete team")
    }
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FiUsers className="text-indigo-600" /> Team Structure & Management
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage team groupings, assignments, and leadership</p>
          </div>

          {canManageTeams && (
            <button
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow transition"
              onClick={handleOpenCreateModal}
            >
              <FiPlus size={18} /> Create Team
            </button>
          )}
        </div>

        {/* Team Cards List */}
        {loading ? (
          <div className="p-10 text-center text-gray-500">Loading team structure...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.length === 0 ? (
              <div className="col-span-3 text-center py-12 text-gray-400 bg-white rounded-2xl border">
                No teams created yet.
              </div>
            ) : (
              teams.map((team) => (
                <div
                  key={team.id || team.teamName}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-xl font-bold text-indigo-800">{team.teamName}</h2>
                      <span className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-700 font-semibold rounded-full border border-indigo-100">
                        {team.members.length} Members
                      </span>
                    </div>

                    <div className="p-3 bg-indigo-50/60 rounded-xl mb-4 border border-indigo-100/50">
                      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-0.5">Team Leader</p>
                      <p className="font-bold text-gray-800 flex items-center gap-1.5 text-sm">
                        <FiUserCheck className="text-indigo-600" /> {team.lead || "Unassigned"}
                      </p>
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Team Members</p>
                    <div className="space-y-2 mb-6 max-h-48 overflow-y-auto pr-1">
                      {team.members.map((m, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border text-sm">
                          <span className="font-medium text-gray-800">{m.name}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded font-semibold ${
                              m.role === "HEAD" ? "bg-purple-100 text-purple-700" : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {m.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  {canManageTeams && (
                    <div className="flex justify-end gap-2 border-t pt-4">
                      <button
                        className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg font-semibold transition"
                        onClick={() => handleOpenEditModal(team)}
                      >
                        <FiEdit2 size={13} /> Edit
                      </button>
                      {canDeleteTeams && (
                        <button
                          className="flex items-center gap-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-semibold transition"
                          onClick={() => handleDeleteTeam(team)}
                        >
                          <FiTrash2 size={13} /> Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Create / Edit Team Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingTeamId ? "Edit Team" : "Create New Team"}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Web Development Team"
                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Leader</label>
                  <select
                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    value={leader}
                    onChange={(e) => setLeader(e.target.value)}
                  >
                    {users.map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name} ({u.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Team Members</label>
                  <div className="border rounded-xl p-3 max-h-48 overflow-y-auto space-y-2 bg-gray-50">
                    {users
                      .filter((u) => u.name !== leader)
                      .map((u) => (
                        <label key={u.id} className="flex items-center gap-3 p-2 bg-white rounded-lg border hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedMembers.includes(u.name)}
                            onChange={() => handleToggleMember(u.name)}
                            className="w-4 h-4 text-indigo-600 rounded"
                          />
                          <span className="text-sm font-medium text-gray-800">{u.name}</span>
                          <span className="text-xs text-gray-400 ml-auto">({u.role})</span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t pt-4">
                <button
                  className="px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-medium"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
                  onClick={handleSaveTeam}
                  disabled={saving}
                >
                  {saving ? "Saving..." : editingTeamId ? "Update Team" : "Create Team"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}