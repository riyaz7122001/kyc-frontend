import { Outlet } from "react-router-dom";
import "../css/layout.css";
import Sidebar from "../components/sidebar";
import ChangePasswordModal from "../components/changePasswordModal";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { handleApiError } from "../helpers";
import { getUserDetails } from "../services";
import { UserDetails } from "../types";

function DashboardLayout() {
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false)
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    const [user, setUser] = useState<UserDetails | null>(null)

    const role = sessionStorage.getItem("kno-access");
    console.log("role", JSON.parse(role!))

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUserDetails(JSON.parse(role!));
                console.log("response", response.data.data);
                setUser(response.data.data);
            } catch (error) {
                handleApiError(error, "Getting error while fetching user data");
            }
        }
        fetchUserData();
    }, [])

    const toggleSidebar = () => setSidebarOpen(prev => !prev)

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

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