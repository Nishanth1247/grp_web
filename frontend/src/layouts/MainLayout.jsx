import Sidebar from "../components/Sidebar"

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64">
        <Sidebar />
      </div>

      {/* Scrollable Content */}
      <div className="ml-64 flex-1 h-screen overflow-y-auto p-8">
        {children}
      </div>
    </div>
  )
}