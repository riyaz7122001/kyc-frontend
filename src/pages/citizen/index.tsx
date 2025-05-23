import { useState, useEffect, useMemo, useCallback } from 'react'
import { RiSearchLine, RiAddLine } from 'react-icons/ri'
import { debounce, handleApiError } from '../../helpers';
import { changeUserActivation, getCitizens } from '../../services';
import { LoadingState, Status } from '../../types';
import CustomSwitch from '../../components/customSwitch';
import CustomPagination from '../../components/customPagination';
import Loader from '../../components/customSpinner';
import DataTable, { TableColumn } from "react-data-table-component";
import AddCitizenModal from '../../components/AddCitizenModal';
import EditCitizenModal from '../../components/EditCitizenModal';
import DeleteCitizenModal from '../../components/DeleteCitizenModal';

type CitizenDetails = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string | null;
    activationStatus: boolean;
    kyc: {
        status: Status;
        statusUpdatedOn: string;
    } | null;
}

export default function CitizenPage() {
    const [loading, setLoading] = useState<LoadingState>("idle");
    const [data, setData] = useState<CitizenDetails[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const role = sessionStorage.getItem("kno-access");
    const [isAddModalOpen, setIsAddModalOpen] = useState({
        addModal: false,
        editModal: false,
        deleteModal: false
    });
    const [editCitizenData, setEditCitizenData] = useState<CitizenDetails | null>(null);
    const [deleteCitizenId, setDeleteCitizenId] = useState<string | null>(null);
    const [pagination, setPagination] = useState<{ size: number; page: number; totalRecords: number }>({
        page: 1,
        size: 10,
        totalRecords: 0
    });

    const fetchCitizen = useCallback(async () => {
        try {
            setLoading("loading");
            const response = await getCitizens(
                JSON.parse(role!),
                pagination.size,
                pagination.page,
                searchTerm
            );
            setData(response.data.data.rows);
            setPagination(prev => ({
                ...prev,
                totalRecords: response.data.data.count
            }));
            setLoading("idle");
        } catch (error) {
            setLoading("error");
            handleApiError(error, "Error while fetching citizens");
        }
    }, [role, pagination.page, pagination.size, searchTerm]);

    useEffect(() => {
        fetchCitizen();
    }, [fetchCitizen]);

    const customStyles = useMemo(() => {
        return {
            rows: {
                style: {
                    fontSize: '0.84rem',
                    color: '#0A192C',
                    fontFamily: 'DMSans-Medium',
                    height: '64px',
                },
            },
            cells: {
                style: {}
            },
            headCells: {
                style: {
                    fontSize: '0.96rem',
                    fontFamily: 'DMSans-Medium',
                    color: '#726E6C'
                },
            },
        }
    }, []);

    const columns: TableColumn<CitizenDetails>[] = useMemo(() => {
        return [
            {
                name: 'Id',
                selector: (row: CitizenDetails) => row.id
            },
            {
                name: 'Name',
                selector: (row: CitizenDetails) => `${row.firstName} ${row.lastName}`,
            },
            {
                name: 'Email',
                selector: (row: CitizenDetails) => row.email,
            },
            {
                name: 'KycStatus',
                cell: (row: CitizenDetails) => {
                    const status = row.kyc?.status?.toLowerCase();

                    const getColor = (status: string) => {
                        switch (status) {
                            case 'pending':
                                return 'orange';
                            case 'processing':
                                return 'blue';
                            case 'verified':
                                return 'green';
                            case 'rejected':
                                return 'red';
                            default:
                                return '';
                        }
                    };

                    return (
                        <span style={{
                            color: 'white',
                            backgroundColor: getColor(status!),
                            padding: '4px 8px',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: '0.8rem'
                        }}>
                            {status}
                        </span>
                    );
                },
            },
            {
                name: 'Status',
                cell: (row: CitizenDetails) => <CustomSwitch initialState={row.activationStatus || false}
                    onStateChange={(state: boolean) => onChangeUserActivation(row.id, state)} disabled={row.email === "riyaz@yopmail.com"} />,
            },
            {
                name: 'Actions',
                cell: (row: CitizenDetails) => (
                    <div className="flex gap-2">
                        <button
                            className="px-2 py-1 text-sm bg-primary text-white rounded hover:bg-blue-600 cursor-pointer"
                            onClick={() => {
                                setEditCitizenData(row);
                                setIsAddModalOpen((prev) => ({ ...prev, editModal: true }));
                            }}
                        >
                            Edit
                        </button>
                        <button
                            disabled={row.email === "riyaz@yopmail.com"}
                            className="px-2 py-1 text-sm bg-secondary text-black rounded hover:bg-red-200 cursor-pointer"
                            onClick={() => {
                                setDeleteCitizenId(row.id);
                                setIsAddModalOpen((prev) => ({ ...prev, deleteModal: true }));
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ),
                ignoreRowClick: true,
                allowOverflow: true,
            },
        ]
    }, []);

    const onChangeUserActivation = debounce(async (userId, value) => {
        try {
            await changeUserActivation(userId, value);
        } catch (error) {
            handleApiError(error, "Error while changing user activation status")
        }
    }, 300);

    const handlePageChange = (value: number) => {
        setPagination(prev => {
            return {
                ...prev,
                page: value
            }
        })
    }

    return (
        <>
            <div className="h-full">
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Citizen Management</h1>
                        <p className="text-gray-500 mt-1">View and manage citizen records</p>
                    </div>

                    <button className="btn btn-primary inline-flex items-center bg-primary p-2 text-white rounded cursor-pointer" onClick={() => setIsAddModalOpen((prev) => ({ ...prev, addModal: true }))} >
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
                </div>

                {/* Citizens table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <DataTable
                        columns={columns}
                        data={data}
                        progressPending={loading === "loading"}
                        pagination={false}
                        customStyles={customStyles}
                        progressComponent={<Loader />}
                    />

                    {pagination.totalRecords > pagination.size && (
                        <CustomPagination
                            rowsPerPage={pagination.size}
                            rowCount={pagination.totalRecords}
                            currentPage={pagination.page}
                            onChangePage={(page) => handlePageChange(page)}
                        />
                    )}
                </div>
            </div>
            <AddCitizenModal isOpen={isAddModalOpen.addModal} onClose={() => setIsAddModalOpen((prev) => ({ ...prev, addModal: false }))} />
            <DeleteCitizenModal isOpen={isAddModalOpen.deleteModal} onClose={() => setIsAddModalOpen((prev) => ({ ...prev, deleteModal: false }))} userId={deleteCitizenId!} onSuccess={() => {
                fetchCitizen();
                setIsAddModalOpen(prev => ({ ...prev, deleteModal: false }));
            }} />
            <EditCitizenModal isOpen={isAddModalOpen.editModal} onClose={() => setIsAddModalOpen(prev => ({ ...prev, editModal: false }))} initialData={editCitizenData}
                onSuccess={() => {
                    fetchCitizen();
                    setIsAddModalOpen(prev => ({ ...prev, editModal: false }));
                }} />
        </>
    )
}