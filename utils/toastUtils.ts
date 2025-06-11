import { toast } from "sonner";

export const showErrorToast = (message: string) => {
    toast.error(message, {
        style: { backgroundColor: "#dc2626", color: "white" },
    });
};

export const showSuccessToast = (message: string) => {
    toast.success(message, {
        style: { backgroundColor: "#16a34a", color: "white" },
    });
};


export const showInfoToast = (message: string) => {
    toast.info(message, {
        style: { backgroundColor: "#3BB5DC", color: "white" }, // Blue for info
    });
};