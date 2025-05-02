import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RiSearchLine, RiFilterLine, RiAddLine, RiUser3Line, RiMailLine, RiPhoneLine } from 'react-icons/ri'
import { handleApiError } from '../../helpers';
import { getCitizens } from '../../services';
import { LoadingState } from '../../types';

type CitizenDetails = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
}[]

function CitizenPage() {
    const [loading, setLoading] = useState<LoadingState>("idle")
    const [citizens, setCitizens] = useState<CitizenDetails>([])
    const [searchTerm, setSearchTerm] = useState('');
    const role = sessionStorage.getItem("kno-access");
    const [pagination, setPagination] = useState<{ size: number; page: number; totalRecords: number }>({
        page: 1,
        size: 10,
        totalRecords: 0
    });

    useEffect(() => {
        const fetchCitizen = async () => {
            try {
                setLoading("loading");
                const response = await getCitizens(JSON.parse(role!), pagination.size, pagination.page);
                console.log("response", response.data.data.rows);
                setCitizens(response.data.data)
                setLoading("idle");
            } catch (error) {
                setLoading("error");
                handleApiError(error, "Error while fetching citizens");
            }

        }
        fetchCitizen();
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

                <button className="btn btn-primary inline-flex items-center bg-primary p-2 text-white rounded">
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
                {loading === "idle" ? (
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
                                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                            No citizens found matching your search criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </motion.table>
                    </div>
                )}

                {loading === "idle" && (
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