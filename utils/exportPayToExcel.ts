import * as XLSX from "xlsx";
//@ts-ignore
import { saveAs } from "file-saver";

export const exportToExcel = (data: any[], fileName: string) => {
  const ws = XLSX.utils.json_to_sheet(data); // JSON-ni Excel jadvaliga o‘girish
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Payments"); // Jadvalni "Payments" nomli sahifaga qo‘shish

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(dataBlob, `${fileName}.xlsx`); // Faylni saqlash
};
