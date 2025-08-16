"use client";

import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import Image from 'next/image';
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const sizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[95vw] max-h-[95vh]",
};

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
  className,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={cn(
              "relative w-full mx-4 my-8",
              "bg-white rounded-xl shadow-2xl",
              sizes[size],
              className
            )}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB]">
                {title && (
                  <h2 className="text-[18px] font-bold text-[#333]">{title}</h2>
                )}

                {showCloseButton && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="p-1 text-[#919191] hover:text-[#333] transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                )}
              </div>
            )}

            {/* Content */}
            <div
              className={cn(
                "p-6",
                size === "full" && "max-h-[calc(95vh-120px)] overflow-y-auto"
              )}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

// ServiceName 전용 모달 프리셋
export function FilterModal({
  isOpen,
  onClose,
  onApply,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  children: ReactNode;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="필터" size="md">
      <div className="space-y-6">
        {children}

        <div className="flex gap-3 pt-4 border-t border-[#EBEBEB]">
          <button
            onClick={onClose}
            className="flex-1 h-12 border border-[#EBEBEB] text-[#616161] rounded-lg hover:bg-[#F7F7F7] transition-colors"
          >
            취소
          </button>
          <button
            onClick={onApply}
            className="flex-1 h-12 bg-[#1D8BFF] text-white rounded-lg hover:bg-[#0066CC] transition-colors"
          >
            적용하기
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function ImageModal({
  isOpen,
  onClose,
  images,
  currentIndex = 0,
}: {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; alt: string }[];
  currentIndex?: number;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" className="bg-black">
      <div className="flex items-center justify-center h-full">
        <Image
          src={images[currentIndex]?.src || ''}
          alt={images[currentIndex]?.alt || ''}
          width={800}
          height={600}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full",
                  index === currentIndex ? "bg-white" : "bg-white/50"
                )}
              />
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "확인",
  message,
  confirmText = "확인",
  cancelText = "취소",
  variant = "default",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
}) {
  const confirmButtonClass =
    variant === "danger"
      ? "bg-[#FF2D55] hover:bg-[#E6194B]"
      : "bg-[#1D8BFF] hover:bg-[#0066CC]";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-6">
        <p className="text-[14px] text-[#616161] leading-relaxed">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-12 border border-[#EBEBEB] text-[#616161] rounded-lg hover:bg-[#F7F7F7] transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={cn(
              "flex-1 h-12 text-white rounded-lg transition-colors",
              confirmButtonClass
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
