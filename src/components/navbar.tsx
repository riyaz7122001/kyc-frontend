import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiBellLine, RiSearchLine, RiMenuLine, RiLogoutBoxLine, RiUser3Line, RiLockPasswordLine } from 'react-icons/ri'

type NavbarProps = {
    user: {
        name: string;
        email: string;
        role: string;
    };
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    onChangePassword: () => void;
}

export default function Navbar({ user, toggleSidebar, onChangePassword }: NavbarProps) {
    const [profileOpen, setProfileOpen] = useState(false)
    const profileRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    const getInitials = (name: string) => {
        return name.toString()?.split(" ")?.map(char => char.charAt(0)?.toUpperCase())
    }

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                    className="lg:hidden mr-2 text-gray-500 hover:text-primary"
                    onClick={toggleSidebar}
                >
                    <RiMenuLine size={24} />
                </button>

                {/* Search bar */}
                <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
                    <RiSearchLine className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 w-full"
                    />
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
                {/* Notification icon */}
                <button className="text-gray-500 hover:text-primary relative">
                    <RiBellLine size={20} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        3
                    </span>
                </button>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                    <button
                        className="flex items-center space-x-3"
                        onClick={() => setProfileOpen(!profileOpen)}
                    >
                        {/* Avatar with initials */}
                        <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                            {getInitials(user.name)}
                        </div>

                        {/* Name (hide on small screens) */}
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium text-gray-700">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.role}</p>
                        </div>
                    </button>

                    {/* Dropdown menu */}
                    <AnimatePresence>
                        {profileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                            >
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-700">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                    <RiUser3Line className="mr-2" />
                                    My Profile
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                    onClick={() => {
                                        setProfileOpen(false)
                                        onChangePassword()
                                    }}
                                >
                                    <RiLockPasswordLine className="mr-2" />
                                    Change Password
                                </button>
                                <div className="border-t border-gray-100 mt-1"></div>
                                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                                    <RiLogoutBoxLine className="mr-2" />
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    )
}