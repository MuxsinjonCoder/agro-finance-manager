import { LoanAssignmentsTableData } from "@/constants/LoanAssignmentsTableData";
import { RequiredAssignmentsTableData } from "@/constants/requiredAssignmentsTableData";
import { ReturnGraphsTableData } from "@/constants/returnGraphsTableData";
import { StorageAssignmentsTableData } from "@/constants/StorageAssignmentsTableData";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function ReturnGraphsTable() {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <div className="min-w-full overflow-auto relative border-gray-300">
          <table className="border-collapse min-w-full border-2 border-gray-400 shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th
                  rowSpan={3}
                  className="w-[20px] border-2 border-gray-400 p-1 text-center text-xs font-semibold text-gray-700"
                >
                  №
                </th>
                <th
                  colSpan={2}
                  className="border-2 w-[320px]  border-gray-400 p-1 text-center text-xs font-semibold text-gray-700"
                >
                  Korxona
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[120px] border-gray-400 p-1 text-center text-xs font-semibold text-gray-700"
                >
                  Sanasi
                </th>
                <th
                  colSpan={3}
                  className="border-2 w-[120px] border-gray-400 p-1 text-center text-xs font-semibold text-gray-700"
                >
                  Qiymati
                </th>
                <th
                  colSpan={3}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-semibold text-gray-700"
                >
                  Imzolangan
                </th>
              </tr>
              <tr>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Nomi
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  JSHR
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Jami urug'lik uchun ajratilgan mablag'
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Jami ishlatilmasdan yoki muddatidan oldin qaytarilgan mablag'
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Jami grafikka asosan qaytarilgan mablag'
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Korxona
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Bosh hisobchi
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Jarima
                </th>
              </tr>
            </thead>
            <tbody>
              {ReturnGraphsTableData?.map((item: any, index: number) => (
                <>
                  <tr className="hover:bg-gray-50">
                    <td className="border-2 border-gray-400 w-[20px] p-1 text-xs text-gray-700">
                      {index + 1}
                    </td>
                    <td className="border-2 min-w-[120px] border-gray-400 p-1 text-xs text-gray-700">
                      {item?.name}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.jshr}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      <Link className="border-b border-black" href={"#"}>
                        {item?.date}
                      </Link>
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.amountAllPrice}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.amountAllPriceSpend}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.amountAllPriceReturn}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      <Link className="border-b border-black" href={"#"}>
                        {item?.signedFirm}
                      </Link>
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.signedMainAcco}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.signedCharety}
                    </td>
                  </tr>
                </>
              ))}
              <tr className="hover:bg-gray-50">
                <td className="border-2 border-gray-400 w-[20px] p-1 text-xs text-gray-700"></td>
                <td className="border-2 border-gray-400 p-1 text-xs text-gray-700">
                  Jami
                </td>
                <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                  0
                </td>
                <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                  0
                </td>
                <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                  0
                </td>
                <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                  0
                </td>
                <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                  0
                </td>
                <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                  0
                </td>
                <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                  0
                </td>
                <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                  0
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
