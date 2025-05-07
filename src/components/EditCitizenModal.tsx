import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "./customInput";
import CustomLabel from "./customLabel";
import CustomButton from "./customButton";
import Loader from "./customSpinner";
import { handleApiError } from "../helpers";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from "react";
import { editCitizen } from "../services/citizen";
import { registerSchema, RegisterType } from "../schemas/auth";
import { LoadingState } from "../types";

type EditCitizenModalProps = {
    isOpen: boolean;
    onClose: () => void;
    initialData: any;
    onSuccess: () => void;
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } }
}

export default function EditCitizenModal({ isOpen, onClose, initialData, onSuccess, }: EditCitizenModalProps) {
    const [loading, setLoading] = useState<LoadingState>("idle");

    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterType>({
        resolver: yupResolver(registerSchema)
    });

    useEffect(() => {
        if (isOpen) {
            reset(initialData);
        }
    }, [isOpen, initialData, reset]);

    const onSubmit = async (data: RegisterType) => {
        try {
            setLoading("loading");
            const payload = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone
            }
            await editCitizen(initialData.id, payload);
            onSuccess();
        } catch (error) {
            setLoading("error");
            handleApiError(error, "Error updating citizen");
        } finally {
            setLoading("idle");
        }
    };

    if (loading === "loading") return <Loader />

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
                        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-4"
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-4">
                            <div className="flex flex-col gap-1">
                                <CustomLabel htmlFor="firstName">First Name</CustomLabel>
                                <CustomInput {...register("firstName")} />
                                {errors.firstName && <p className="text-danger small mt-1">{errors.firstName.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1 mt-2">
                                <CustomLabel htmlFor="lastName">Last Name</CustomLabel>
                                <CustomInput {...register("lastName")} />
                                {errors.lastName && <p className="text-danger small mt-1">{errors.lastName.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1 mt-2">
                                <CustomLabel htmlFor="email">Email</CustomLabel>
                                <CustomInput type="email" {...register("email")} />
                                {errors.email && <p className="text-danger small mt-1">{errors.email.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1 mt-2">
                                <CustomLabel htmlFor="email">Phone</CustomLabel>
                                <CustomInput type="phone" {...register("phone")} />
                                {errors.phone && <p className="text-danger small mt-1">{errors.phone.message}</p>}
                            </div>

                            <div className="flex justify-end gap-4 mt-4">
                                <CustomButton onClick={onClose} variant="secondary">
                                    Cancel
                                </CustomButton>
                                <CustomButton>
                                    Edit
                                </CustomButton>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence >
    );
}
