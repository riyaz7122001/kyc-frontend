import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    RiSearchLine,
    RiFilterLine,
    RiAddLine,
    RiUser3Line,
    RiMailLine,
    RiPhoneLine
} from 'react-icons/ri'

function CitizenPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [citizens, setCitizens] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        // Simulate data fetching
        const timer = setTimeout(() => {
            // Mock data for citizens
            const mockData = [
                {
                    id: 'CT-001',
                    name: 'John Smith',
                    email: 'john.smith@example.com',
                    phone: '(555) 123-4567',
                    address: '123 Main St, Anytown, CA 94321',
                    status: 'Active'
                },
                {
                    id: 'CT-002',
                    name: 'Sarah Johnson',
                    email: 'sarah.johnson@example.com',
                    phone: '(555) 234-5678',
                    address: '456 Oak Ave, Somewhere, NY 10101',
                    status: 'Active'
                },
                {
                    id: 'CT-003',
                    name: 'Michael Brown',
                    email: 'michael.brown@example.com',
                    phone: '(555) 345-6789',
                    address: '789 Pine Rd, Nowhere, TX 75001',
                    status: 'Inactive'
                },
                {
                    id: 'CT-004',
                    name: 'Emily Davis',
                    email: 'emily.davis@example.com',
                    phone: '(555) 456-7890',
                    address: '321 Cedar Ln, Anywhere, WA 98001',
                    status: 'Active'
                },
                {
                    id: 'CT-005',
                    name: 'James Wilson',
                    email: 'james.wilson@example.com',
                    phone: '(555) 567-8901',
                    address: '654 Elm St, Someplace, FL 33101',
                    status: 'Pending'
                }
            ]

            setCitizens(mockData)
            setIsLoading(false)
        }, 1200)

        return () => clearTimeout(timer)
    }, [])

    const filteredCitizens = citizens.filter(citizen =>
        citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        citizen.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        citizen.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const tableVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    }

    return (
        <div className="h-full">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Citizen Management</h1>
                    <p className="text-gray-500 mt-1">View and manage citizen records</p>
                </div>

                <button className="btn btn-primary inline-flex">
                    <RiAddLine className="mr-2" />
                    Add New Citizen
                </button>
            </div>

            {/* Search and filters */}
            <div className="bg-white rounded-xl p-4 mb-6 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center flex-1 bg-gray-100 rounded-lg px-3 py-2">
                    <RiSearchLine className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search citizens..."
                        className="bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <button className="btn inline-flex items-center border border-gray-300">
                    <RiFilterLine className="mr-2" />
                    Filters
                </button>
            </div>

            {/* Citizens table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {isLoading ? (
                    <div className="animate-pulse p-6">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-16 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <motion.table
                            className="min-w-full divide-y divide-gray-200"
                            variants={tableVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Citizen
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Address
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCitizens.length > 0 ? (
                                    filteredCitizens.map((citizen, i) => (
                                        <motion.tr
                                            key={citizen.id}
                                            variants={rowVariants}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                                                {citizen.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                        <RiUser3Line />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {citizen.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 flex items-center">
                                                    <RiMailLine className="text-gray-400 mr-1" />
                                                    {citizen.email}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center mt-1">
                                                    <RiPhoneLine className="text-gray-400 mr-1" />
                                                    {citizen.phone}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {citizen.address}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${citizen.status === 'Active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : citizen.status === 'Inactive'
                                                        ? 'bg-gray-100 text-gray-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {citizen.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-primary hover:text-primary-dark">
                                                    Edit
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                            No citizens found matching your search criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </motion.table>
                    </div>
                )}

                {!isLoading && (
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                        <div className="text-sm text-gray-500">
                            Showing {filteredCitizens.length} of {citizens.length} citizens
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                Previous
                            </button>
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CitizenPage