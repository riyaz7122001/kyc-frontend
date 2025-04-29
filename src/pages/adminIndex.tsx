import { Outlet } from "react-router-dom";
import "../css/layout.css";
import Sidebar from "../components/sidebar";
import ChangePasswordModal from "../components/changePasswordModal";
import { useState } from "react";
import Navbar from "../components/navbar";

function DashboardLayout() {
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [user, setUser] = useState({
        name: 'Riyaz Shaikh',
        email: 'riyaz.shaikh@example.com',
        role: 'Administrator'
    })

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar
                    user={user}
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    onChangePassword={() => setShowPasswordModal(true)}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-greige">
                    <Outlet />
                </main>
            </div>

            {/* Change Password Modal */}
            <ChangePasswordModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />
        </div>
    )
}

export default DashboardLayout