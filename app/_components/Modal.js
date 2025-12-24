"use client";
import { IoCloseSharp } from "react-icons/io5";
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl p-6 relative w-full max-w-md shadow-2xl border border-slate-700">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-slate-400 text-3xl hover:text-white  transition-colors"
        >
         <IoCloseSharp />
        </button>

        {children}
      </div>
    </div>
  );
}