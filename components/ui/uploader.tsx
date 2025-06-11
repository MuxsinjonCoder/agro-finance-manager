import { useState, useEffect, useCallback } from "react";
import { Upload } from 'lucide-react'
import { t } from "i18next";
import { cn } from "@/lib/utils";

interface FileUploadProps {
    onChange: (files: File[]) => void;
    defaultValues?: File[];
    multiple?: boolean;
    accept?: string;
    error?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
    onChange,
    defaultValues = [],
    multiple = false,
    accept,
    error = false
}) => {
    const [files, setFiles] = useState<File[]>(defaultValues);

    useEffect(()=>{
        if(defaultValues.length > 0){
            setFiles(defaultValues)
        }
    },[defaultValues])


    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setFiles((prev) => {
                const updatedFiles = [...prev, ...newFiles];
                return updatedFiles;
            });

            // Вызов onChange только один раз после обновления состояния
            onChange([...files, ...newFiles]);
        }
    }, [defaultValues,files]);



    return (
        <div className="flex flex-col space-y-2">
            <input
                type="file"
                id="file-input"
                hidden
                multiple={multiple}
                onChange={handleFileChange}
                accept={accept}
            />
            <button
                type="button"
                onClick={() => document.getElementById("file-input")?.click()}
                className={cn("px-4 py-2 border border-[#3BB5DC] text-[#3BB5DC] bg-transparent shadow rounded-md flex justify-center items-center gap-[7px] " , error ? "border-red-500 text-red-500" : "")}
            >
                <Upload size={18} />
                <span>{t("buttons.upload")}</span>
            </button>
            {/* <div className="text-gray-500">
                {files.length > 0 ? files.join(", ") : "No file chosen, yet."}
            </div> */}
        </div>
    );
};

export { FileUpload, type FileUploadProps }
