import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine, RiUserAddLine } from 'react-icons/ri';
import CustomButton from './customButton';
import CustomLabel from './customLabel';
import CustomInput from './customInput';
import { useForm } from 'react-hook-form';
import { registerSchema, RegisterType } from '../schemas/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-router-dom';
import Loader from './customSpinner';
import { useState } from 'react';
import { LoadingState } from '../types';
import { handleApiError, showToast } from '../helpers';
import { createCitizen } from '../services/citizen';

type AddCitizenModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export type CreateCitizenDetails = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

function AddCitizenModal({ isOpen, onClose }: AddCitizenModalProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterType>({
        resolver: yupResolver(registerSchema)
    });
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
        },
    };

    const [loading, setLoading] = useState<LoadingState>("idle");

    const onSubmit = async (data: RegisterType) => {
        console.log("data", data)
        console.log("data", data);
        try {
            setLoading("loading");
            const payload = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone
            }
            const response = await createCitizen(payload);
            showToast("success", response.data.message);
            setLoading("idle");
            onClose();
        } catch (error) {
            setLoading("error");
            handleApiError(error, "Error while creating citizen");
        }
    };

    if (loading === "loading") return <Loader styles={{ position: 'absolute', height: '100%', top: '0', left: '0', backgroundColor: '#fcfcfc50' }} />

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
                        className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-5 border-b border-gray-200">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                    <RiUserAddLine size={20} />
                                </div>
                                <h3 className="ml-3 text-lg font-medium text-gray-800">Add New Citizen</h3>
                            </div>
                            <button
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={onClose}
                            >
                                <RiCloseLine size={24} />
                            </button>
                        </div>

                        <div className="p-5">
                            <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <div>
                                    <CustomLabel htmlFor="firstName" required>
                                        First Name
                                    </CustomLabel>
                                    <CustomInput
                                        id="firstName"
                                        placeholder="First Name"
                                        autoComplete="firstName"
                                        {...register('firstName')}
                                    />
                                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                                </div>
                                <div>
                                    <CustomLabel htmlFor="lastName" required>
                                        Last Name
                                    </CustomLabel>
                                    <CustomInput
                                        id="lastName"
                                        placeholder="Last Name"
                                        autoComplete="lastName"
                                        {...register('lastName')}
                                    />
                                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                                </div>
                                <div>
                                    <CustomLabel htmlFor="email" required>
                                        Email
                                    </CustomLabel>
                                    <CustomInput
                                        id="email"
                                        placeholder="Email Address"
                                        autoComplete="email"
                                        {...register('email')}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <CustomLabel htmlFor="phone" required>
                                        Phone
                                    </CustomLabel>
                                    <CustomInput
                                        id="phone"
                                        placeholder="Phone Number"
                                        autoComplete="phone"
                                        {...register('phone')}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>
                                <CustomButton type="submit" className="mt-2 w-full">
                                    Create
                                </CustomButton>
                            </Form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
export default AddCitizenModal;
