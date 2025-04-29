import { motion } from 'framer-motion'

type TrendType = {
    type: 'increase' | 'decrease';
    value: string;
};

type DashboardCardProps = {
    title: string;
    value: string;
    icon: React.ReactNode;
    description?: string;
    isPrimary?: boolean;
    trend?: TrendType | null;
};

function DashboardCard({ title, value, icon, description, isPrimary = false, trend = null }: DashboardCardProps) {
    return (
        <motion.div
            className={`card ${isPrimary ? 'card-primary' : ''}`}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className={`text-lg font-medium ${isPrimary ? 'text-white' : 'text-gray-700'}`}>
                        {title}
                    </h3>
                    <p className={`text-2xl font-semibold mt-2 ${isPrimary ? 'text-white' : 'text-gray-900'}`}>
                        {value}
                    </p>
                </div>
                <div className={`p-3 rounded-lg ${isPrimary ? 'bg-white/20' : 'bg-primary/10'}`}>
                    {icon}
                </div>
            </div>

            <div className="mt-4 flex items-center">
                {trend && (
                    <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mr-2 ${trend.type === 'increase'
                            ? (isPrimary ? 'bg-white/20 text-white' : 'bg-green-100 text-green-800')
                            : (isPrimary ? 'bg-white/20 text-white' : 'bg-red-100 text-red-800')
                            }`}
                    >
                        {trend.value}
                    </span>
                )}
                <p className={`text-sm ${isPrimary ? 'text-white/80' : 'text-gray-500'}`}>
                    {description}
                </p>
            </div>
        </motion.div>
    )
}

export default DashboardCard