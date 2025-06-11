import { useClickOutside } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { Cross, CrossIcon, X } from "lucide-react";

interface Modal {
  onClose: () => void;
  title?: string;
  content: any;
  confirm?: boolean;
  closeOnOutsideClick?: boolean;
  contentClassName?: string;
  overlayClassName?: string;
}

export default function Modal({
  onClose,
  title,
  content,
  confirm,
  closeOnOutsideClick = false,
  contentClassName,
  overlayClassName,
}: Modal) {
  const ref = useClickOutside(() => closeOnOutsideClick && handleClose());

  const handleClose = () => {
    if (confirm) {
      const userConfirmed = window.confirm(
        "You inputed data will be lost. Are you sure you want to close?"
      );
      if (userConfirmed) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/60 z-50 flex items-center justify-center h-screen",
          overlayClassName
        )}
      >
        <div
          className={cn(
            "bg-white rounded-lg min-w-[350px] max-h-[85%] max-w-[70%] relative flex flex-col",
            contentClassName
          )}
          ref={ref}
        >
          <div className="px-5 py-3 border-b flex items-center justify-between">
            <h3 className="font-semibold text-xl">{title}</h3>
            <X className="cursor-pointer w-[20px] h-[20px]" onClick={handleClose} />
          </div>
          <div className="overflow-y-auto flex-1 p-5">
            {content}
          </div>
        </div>
      </div>
    </>
  );
}
