import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCloseLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { changePasswordSchema, ChangePasswordType } from '../schemas/auth'
import { handleApiError, showToast } from '../helpers'
import { changePassword } from '../services/auth'

type ChangePasswordProps = {
    isOpen: boolean;
    onClose: () => void;
}

function ChangePasswordModal({ isOpen, onClose }: ChangePasswordProps) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const role = sessionStorage.getItem("kno-access");

    const { register, handleSubmit, formState: { errors }, reset, } = useForm<ChangePasswordType>({
        resolver: yupResolver(changePasswordSchema),
    })

    const onSubmit = async (data: ChangePasswordType) => {
        try {
            const response = await changePassword(JSON.parse(role!), data.currentPassword, data.newPassword);
            showToast("success", response.data.message);
            onClose()
            reset()
        } catch (error) {
            handleApiError(error, "Error while changing password");
        }
    }

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={backdropVariants}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-xl shadow-2xl w-full max-w-md"
                        variants={modalVariants}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-5 border-b border-gray-200">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                    <RiLockPasswordLine size={20} />
                                </div>
                                <h3 className="ml-3 text-lg font-medium text-gray-800">Change Password</h3>
                            </div>
                            <button
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={onClose}
                            >
                                <RiCloseLine size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                            <div className="space-y-4">
                                {/* Current Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showCurrentPassword ? "text" : "password"}
                                            {...register("currentPassword")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        >
                                            {showCurrentPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                                        </button>
                                    </div>
                                    {errors.currentPassword && (
                                        <p className="text-sm text-red-600 mt-1">{errors.currentPassword.message}</p>
                                    )}
                                </div>

                                {/* New Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            {...register("newPassword")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            {showNewPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                                        </button>
                                    </div>
                                    {errors.newPassword && (
                                        <p className="text-sm text-red-600 mt-1">{errors.newPassword.message}</p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...register("confirmPassword")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
                                >
                                    Change Password
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ChangePasswordModal
