import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiDashboardLine, RiTeamLine, RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri'

const sidebarAnimation = {
    open: { width: '240px', transition: { duration: 0.3 } },
    closed: { width: '80px', transition: { duration: 0.3 } }
}

type SidebarProps = {
    isOpen: boolean;
    toggleSidebar: () => void;
}

function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
    return (
        <motion.aside
            initial="open"
            animate={isOpen ? 'open' : 'closed'}
            variants={sidebarAnimation}
            className="bg-greige border-r border-gray-200 h-full flex flex-col z-20 overflow-hidden"
        >
            {/* Logo */}
            <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200">
                <div className="flex items-center">
                    <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">D</div>
                    {isOpen && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="ml-3 font-semibold text-lg"
                        >
                            Dashboard
                        </motion.span>
                    )}
                </div>
                <button className="text-gray-500 hover:text-primary" onClick={toggleSidebar}>
                    {isOpen ? <RiMenuFoldLine size={20} /> : <RiMenuUnfoldLine size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3">
                <ul className="space-y-2">
                    <li className='flex rounded'>
                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                `sidebar-item flex p-2 gap-2 items-center rounded ${isActive ? 'active text-white bg-primary w-full' : ''}`
                            }
                            end
                        >
                            <RiDashboardLine size={20} />
                            {isOpen && <span className=''>Dashboard</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/citizen"
                            className={({ isActive }) =>
                                `sidebar-item flex p-2 gap-2 items-center rounded ${isActive ? 'active text-white bg-primary w-full' : ''}`
                            }
                        >
                            <RiTeamLine size={20} />
                            {isOpen && <span>Citizens</span>}
                        </NavLink>
                    </li>
                </ul>
            </nav>

            {/* Footer */}
            {isOpen && (
                <div className="p-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                        <p>© 2025 MyDashboard</p>
                        <p>v1.0.0</p>
                    </div>
                </div>
            )}
        </motion.aside>
    )
}

export default Sidebar