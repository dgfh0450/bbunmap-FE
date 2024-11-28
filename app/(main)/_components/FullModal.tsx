import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
    children: ReactNode;
    isOpen: boolean;
    onClose?: () => void;
};

export default function FullModal({ children, isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50">
            {children}
        </div>,
        document.body
    );
}