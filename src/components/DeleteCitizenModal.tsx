import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Loader from "./customSpinner";
import { handleApiError } from "../helpers";
import { deleteCitizen } from "../services/citizen";
import CustomButton from "./customButton";
import { LoadingState } from "../types";

type DeleteCitizenModalProps = {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    onSuccess: () => void;
};

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

export default function DeleteCitizenModal({ isOpen, onClose, userId, onSuccess, }: DeleteCitizenModalProps) {
    const [loading, setLoading] = useState<LoadingState>("idle");

    const handleDelete = async () => {
        try {
            setLoading("loading");
            await deleteCitizen(userId);
            onSuccess();
        } catch (error) {
            setLoading("error");
            handleApiError(error, "Error deleting citizen");
        } finally {
            setLoading("idle");
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
                        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-4"
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-left mb-4">
                            <p className="text-gray-700">
                                Are you sure you want to delete this citizen? <br />
                                <span className="font-medium text-red-400">This action cannot be undone.</span>
                            </p>
                        </div>
                        <div className="flex justify-end gap-4">
                            <CustomButton onClick={onClose} variant="secondary">
                                Cancel
                            </CustomButton>
                            <CustomButton
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Delete
                            </CustomButton>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence >
    );
}
