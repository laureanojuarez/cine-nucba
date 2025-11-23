import {X} from "lucide-react";
import type {ReactNode} from "react";

interface SideTabProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
}

export const SideTab = ({
  open,
  onClose,
  children,
  width = "w-full md:w-104",
}: SideTabProps) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 right-0 h-full bg-neutral-900 z-50 shadow-2xl transition-transform duration-300 ease-in-out ${width} ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{maxWidth: "100vw"}}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-white text-2xl"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X />
        </button>
        <div className=" pt-16 h-full overflow-y-auto">{children}</div>
      </div>
    </>
  );
};
