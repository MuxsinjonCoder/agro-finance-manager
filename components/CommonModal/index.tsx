import React, { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import Loading from "../loading";

interface CommonModalProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
  visible: boolean;
  width?: string;
  isRequired?: boolean;
  titleSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  loading?: boolean;
}

const CommonModal: React.FC<CommonModalProps> = ({
  children,
  title,
  onClose,
  visible,
  width = "600px",
  isRequired = false,
  titleSize = 'xl',
  loading = false,
}) => {
  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent
        className="p-0 bg-white rounded-lg shadow-lg flex flex-col max-h-[85vh] [&>button]:hidden"
        style={{ maxWidth: width }}
      >
        <div className="px-3 pt-5">
          <DialogHeader>
            <div className="flex items-center border-b-2 pb-5 justify-between">
              <DialogTitle className={`text-${titleSize} text-gray-900`}>
                {title}
              </DialogTitle>
              <X
                className="cursor-pointer w-[15px] absolute top-3 text-red-600 right-3 h-[15px]"
                onClick={onClose}
              />
            </div>
          </DialogHeader>
        </div>
        <div className="overflow-y-auto flex-1 p-2">{loading ? <div className="flex items-center justify-center h-full"><Loading></Loading></div> : children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default CommonModal;
