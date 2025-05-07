import { useEffect } from 'react';
import { RiEditLine, RiShieldLine, RiMailLine, RiPhoneLine, RiMapPinLine, RiCalendarLine } from 'react-icons/ri';

export default function ProfilePage() {
    const user = {
        firstName: "Riyaz",
        lastName: "Shaikh",
        email: "riyaz@yopmail.com",
        role: "ADMIN",
        phone: "+1 (555) 123-4567",
        address: "123 Admin Street, San Francisco, CA 94107",
        dateJoined: "June 15, 2023",
        status: "VERIFIED"
    };

    const activities = [
        {
            id: 1,
            action: "Verified Citizen ID",
            description: "KYC verification for Nurai Khan was completed successfully",
            status: "success",
            time: "2 hours ago"
        },
        {
            id: 2,
            action: "Updated Profile Information",
            description: "Changed contact details and address information",
            time: "5 hours ago"
        },
        {
            id: 3,
            action: "Security Alert",
            description: "New device used for login - Chrome on Windows",
            status: "warning",
            time: "1 day ago"
        }
    ];

    useEffect(() => { }, [])

    return (
        <div className="max-w-7xl mx-auto py-4 space-y-4">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-4 py-4 sm:px-8 sm:py-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="flex items-center justify-center space-x-4">
                            <div>
                                <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold border-4 border-white">
                                    RS
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
                                <div className="mt-1 flex items-center space-x-4">
                                    <span className="text-sm text-gray-500">{user.email}</span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {user.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-0">
                            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                <RiEditLine className="mr-2 -ml-1" />
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Personal Information */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                        </div>
                        <div className="px-6 py-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <RiMailLine className="text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Email</p>
                                        <p className="text-sm text-gray-900">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RiPhoneLine className="text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Phone</p>
                                        <p className="text-sm text-gray-900">{user.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RiMapPinLine className="text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Address</p>
                                        <p className="text-sm text-gray-900">{user.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RiCalendarLine className="text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Joined Date</p>
                                        <p className="text-sm text-gray-900">{user.dateJoined}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity Timeline */}
                    <div className="mt-6 bg-white rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                        </div>
                        <div className="px-6 py-4">
                            <div className="flow-root">
                                <ul className="-mb-8">
                                    {activities.map((activity, index) => (
                                        <li key={activity.id}>
                                            <div className="relative pb-8">
                                                {index !== activities.length - 1 && (
                                                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                                )}
                                                <div className="relative flex space-x-3">
                                                    <div>
                                                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${activity.status === 'success' ? 'bg-green-500' :
                                                            activity.status === 'warning' ? 'bg-yellow-500' :
                                                                'bg-gray-500'
                                                            }`}>
                                                            <RiShieldLine className="h-5 w-5 text-white" />
                                                        </span>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                                            <p className="mt-0.5 text-sm text-gray-500">{activity.time}</p>
                                                        </div>
                                                        <div className="mt-2 text-sm text-gray-700">
                                                            <p>{activity.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">KYC Information</h2>
                        </div>
                        <div className="px-6 py-4 space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-900">What is KYC?</p>
                                <p className="text-sm text-gray-500">
                                    KYC (Know Your Customer) is a process used to verify the identity of clients to prevent fraud, money laundering, and other financial crimes.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm font-medium text-gray-900">Why it’s important</p>
                                <p className="text-sm text-gray-500">
                                    Completing your KYC ensures your account remains active and secure. It also helps us comply with regulatory standards.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm font-medium text-gray-900">Required Documents</p>
                                <ul className="mt-2 list-disc list-inside text-sm text-gray-500 space-y-1">
                                    <li>Valid government-issued ID (e.g., passport, driver's license)</li>
                                    <li>Proof of address (e.g., utility bill, bank statement)</li>
                                    <li>Recent photograph</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};