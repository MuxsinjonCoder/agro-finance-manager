import { FinalAccountsTableData } from "@/constants/finalAccountsTableData";
import { LoanAssignmentsTableData } from "@/constants/LoanAssignmentsTableData";
import { RequiredAssignmentsTableData } from "@/constants/requiredAssignmentsTableData";
import { ReturnGraphsTableData } from "@/constants/returnGraphsTableData";
import { StorageAssignmentsTableData } from "@/constants/StorageAssignmentsTableData";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function FinalAccountsTable() {
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
                  rowSpan={2}
                  className="border-2 w-[320px]  border-gray-400 p-1 text-center text-xs font-semibold text-gray-700"
                >
                  Hududlar
                </th>
                <th
                  colSpan={3}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-semibold text-gray-700"
                >
                  Davlat xaridi
                </th>
                <th
                  colSpan={3}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-semibold text-gray-700"
                >
                  Don korxonasiga
                </th>
                <th
                  colSpan={3}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-semibold text-gray-700"
                >
                  Imtiyozli kredit
                </th>
                <th
                  colSpan={3}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-semibold text-gray-700"
                >
                  Urug'lik don
                </th>
                <th
                  colSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-semibold text-gray-700"
                >
                  Haqdorlik
                </th>
                <th
                  colSpan={3}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-semibold text-gray-700"
                >
                  Xo'jalikka to'landi
                </th>
                <th
                  colSpan={3}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-semibold text-gray-700"
                >
                  To'lovga qoldi
                </th>
                <th
                  colSpan={3}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-semibold text-gray-700"
                >
                  Resurs qoldig'i, mln so'm
                </th>
              </tr>
              <tr>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Xo'jalik nomi
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Vazni, tn
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Qiymati, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Ko'chirilgan, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  xaridga nisbati, %
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Farqi, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Berilgan, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  So'ndirilgan, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Qoldiq, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Qarzdorlik, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  So'ndirilgan, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Qoldiq, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Xo'jalik soni
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Qiymati, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Xo'jalik soni
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Summasi, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Talabga nisbati, %
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Xo'jalik soni
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Summasi, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Talabga nisbati, %
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Xo'jaliklar hisobidan
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Urug'lik hisobidan
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-1 text-center text-xs font-medium text-gray-600"
                >
                  Jami qoldiq
                </th>
              </tr>
            </thead>
            <tbody>
              {FinalAccountsTableData?.map((item: any, index: number) => (
                <>
                  <tr className="hover:bg-gray-50">
                    <td className="border-2 border-gray-400 w-[20px] p-1 text-xs text-gray-700">
                      {index + 1}
                    </td>
                    <td className="border-2 border-gray-400 min-w-[150px] p-1 text-xs text-gray-700">
                      <Link className="border-b border-black" href={"#"}>
                        {item?.region}
                      </Link>
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.govPurchaseNum}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.govPurchaseTon}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.govPurchaseAmount}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.grainCompTransferAmo}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.grainCompPercent}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.grainCompDiff}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.creAmount}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.creEnded}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.creLeft}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.seedGrainDebt}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.seedGrainEnded}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.seedGrainLeft}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.ownerNum}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.ownerAmount}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.spendLocalNum}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.spendLocalAmount}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.spendLocalPercent}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.leftPaidNumber}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.leftPaidAmount}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.leftPaidPercent}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.leftResourceNum}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.leftResourceFromGrain}
                    </td>
                    <td className="border-2 border-gray-400 p-1 text-xs text-gray-700 text-center">
                      {item?.leftResourceAll}
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
                </td>{" "}
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
