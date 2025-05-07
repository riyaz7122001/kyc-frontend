import { ReactNode } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

type ModalWrapperProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
};

export default function ModalWrapper({ isOpen, onClose, title, children, className }: ModalWrapperProps) {
    return (
        <Modal
            isOpen={isOpen}
            toggle={onClose}
            centered
            size="lg"
            contentClassName="border-0 shadow-lg rounded-lg overflow-hidden"
            className={className}
        >
            {title && (
                <ModalHeader
                    toggle={onClose}
                    className="border-bottom-0 bg-white"
                >
                    {title}
                </ModalHeader>
            )}
            <ModalBody className="px-6 py-4">
                {children}
            </ModalBody>
        </Modal>
    );
}