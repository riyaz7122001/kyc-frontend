import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RiTeamLine, RiBuilding4Line, RiFileList3Line, RiCalendarCheckLine } from 'react-icons/ri'
import DashboardCard from '../../components/dashboardCard'

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: any) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: 'easeOut'
            }
        })
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <div className="h-full">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back, here's your admin dashboard</p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="card animate-pulse">
                            <div className="flex justify-between">
                                <div>
                                    <div className="h-5 bg-gray-200 rounded w-24"></div>
                                    <div className="h-8 bg-gray-200 rounded w-16 mt-2"></div>
                                </div>
                                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                            </div>
                            <div className="mt-4 flex items-center">
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div custom={0} variants={cardVariants}>
                        <DashboardCard
                            title="Total Citizens"
                            value="24,521"
                            icon={<RiTeamLine size={24} className="text-primary" />}
                            description="15% increase from last month"
                            isPrimary={true}
                            trend={{ type: 'increase', value: '+15%' }}
                        />
                    </motion.div>

                    <motion.div custom={1} variants={cardVariants}>
                        <DashboardCard
                            title="Departments"
                            value="32"
                            icon={<RiBuilding4Line size={24} className="text-primary" />}
                            description="2 new departments added"
                            trend={{ type: 'increase', value: '+2' }}
                        />
                    </motion.div>

                    <motion.div custom={2} variants={cardVariants}>
                        <DashboardCard
                            title="Applications"
                            value="1,286"
                            icon={<RiFileList3Line size={24} className="text-primary" />}
                            description="8% decrease from last month"
                            trend={{ type: 'decrease', value: '-8%' }}
                        />
                    </motion.div>

                    <motion.div custom={3} variants={cardVariants}>
                        <DashboardCard
                            title="Scheduled Appointments"
                            value="842"
                            icon={<RiCalendarCheckLine size={24} className="text-primary" />}
                            description="120 appointments today"
                        />
                    </motion.div>
                </motion.div>
            )}

            {/* Additional dashboard content - can be expanded */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="card h-80">
                        <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {!isLoading && [1, 2, 3, 4].map((item) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + item * 0.1 }}
                                    className="flex items-start p-3 rounded-lg hover:bg-gray-50"
                                >
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                                        <RiTeamLine className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">
                                            Citizen ID #1234{item} submitted a new application
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {item} hour{item !== 1 ? 's' : ''} ago
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card h-80">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        {!isLoading && [
                            'Create new citizen record',
                            'Schedule appointment',
                            'Generate report',
                            'Review pending applications'
                        ].map((action, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="w-full text-left p-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center"
                            >
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                                    {index + 1}
                                </span>
                                {action}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard