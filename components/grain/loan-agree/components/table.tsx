import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { LoanAssignmentsTableData } from "@/constants/LoanAssignmentsTableData";
import { RequiredAssignmentsTableData } from "@/constants/requiredAssignmentsTableData";
import { useGetLoanAgree } from "@/queries/grain/loan-agree";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const loanAgreesList = {
  data: {
    dtoList: [
      {
        partnersDto: {
          name: "Agro Farm LLC",
          inn: "12345678901234",
        },
        createdAt: "2025-05-15T10:00:00Z",
        contractNumber: "LOAN001",
        amount: 1000,
        penaltyPercent: 5,
        percentAmount: 50,
        gracePeriod: 6,
        signedPenalty: "Pending",
        signedFirm: "Pending",
        contractDate: "2025-05-15",
        contractAmount: 1000,
        signedPenalty2: "Pending",
        signedFirm2: "Pending",
        agreeDate: "2025-05-15",
        agreeNumber: "AGR001",
        agreeAmount: 1000,
        agreeType: "Standard",
        signedPenalty3: "Pending",
        signedFirm3: "Pending",
      },
      {
        partnersDto: {
          name: "Green Fields Co.",
          inn: "98765432109876",
        },
        createdAt: "2025-05-20T12:30:00Z",
        contractNumber: "LOAN002",
        amount: 1500,
        penaltyPercent: 4.5,
        percentAmount: 67.5,
        gracePeriod: 12,
        signedPenalty: "Pending",
        signedFirm: "Pending",
        contractDate: "2025-05-20",
        contractAmount: 1500,
        signedPenalty2: "Pending",
        signedFirm2: "Pending",
        agreeDate: "2025-05-20",
        agreeNumber: "AGR002",
        agreeAmount: 1500,
        agreeType: "Extended",
        signedPenalty3: "Pending",
        signedFirm3: "Pending",
      },
      {
        partnersDto: {
          name: "Harvest Group",
          inn: "45678912345678",
        },
        createdAt: "2025-06-01T15:00:00Z",
        contractNumber: "LOAN003",
        amount: 800,
        penaltyPercent: 6,
        percentAmount: 48,
        gracePeriod: 3,
        signedPenalty: "Pending",
        signedFirm: "Pending",
        contractDate: "2025-06-01",
        contractAmount: 800,
        signedPenalty2: "Pending",
        signedFirm2: "Pending",
        agreeDate: "2025-06-01",
        agreeNumber: "AGR003",
        agreeAmount: 800,
        agreeType: "Short-term",
        signedPenalty3: "Pending",
        signedFirm3: "Pending",
      },
    ],
    allAmount: 3300,
    pages: 5,
  },
};

export default function LoanAssignmentsTable() {
  // halpers
  const { t } = useTranslation();

  // states
  const [page, setPage] = useState(0);

  // queries
  // const { data: loanAgreesList } = useGetLoanAgree(0, 10);

  return (
    <>
      <div>
        <div className="min-w-full overflow-auto relative border-gray-300">
          <table className="border-collapse min-w-full border-2 border-gray-400 shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th
                  rowSpan={3}
                  className="w-[50px] border-2 border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  №
                </th>
                <th
                  colSpan={2}
                  className="border-2 w-[320px]  border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Korxona
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[120px] border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Sanasi
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[120px] border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Raqami
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[120px] border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Qiymati, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[120px] border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Foiz stavka (%)
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[120px] border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Foiz miqdori
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[120px] border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Imtiyozli muddat
                </th>
                <th
                  colSpan={2}
                  className="border-2 border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Imzolangan
                </th>
                <th
                  colSpan={2}
                  className="border-2 border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Bitim
                </th>
                <th
                  colSpan={2}
                  className="border-2 border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Imzolangan
                </th>
                <th
                  colSpan={2}
                  className="border-2 border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Bitim
                </th>
                <th
                  colSpan={2}
                  className="border-2 border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Imzolangan
                </th>
                <th
                  colSpan={2}
                  className="border-2 border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Kelishuv
                </th>
                <th
                  colSpan={2}
                  className="border-2 border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Imzolangan
                </th>
              </tr>
              <tr>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  Nomi
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  JSHR
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  Jamg'arma
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  Korxona
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  Sanasi
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  Raqami
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  Qiymati, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  Jamg'arma
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  Korxona
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  Sanasi
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  Raqami
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  Qiymati, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  Turi
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  Jamg'arma
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-medium text-gray-600"
                >
                  Korxona
                </th>
              </tr>
            </thead>
            <tbody>
              {loanAgreesList?.data?.dtoList?.map(
                (item: any, index: number) => (
                  <>
                    <tr className="hover:bg-gray-50">
                      <td className="border-2 border-gray-400 w-[50px] p-2 text-xs text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border-2 min-w-[200px] max-w-[300px] truncate border-gray-400 p-2 text-xs text-gray-700">
                        {item?.partnersDto?.name || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {item?.partnersDto?.inn || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {item?.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("ru-RU")
                          : "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {item?.contractNumber || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {item?.amount
                          ? Number(item?.amount).toLocaleString("ru-RU")
                          : 0}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {item?.penaltyPercent
                          ? Number(item?.penaltyPercent).toLocaleString("ru-RU")
                          : 0}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {item?.percentAmount
                          ? Number(item?.percentAmount).toLocaleString("ru-RU")
                          : 0}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {item?.gracePeriod
                          ? Number(item?.gracePeriod).toLocaleString("ru-RU")
                          : 0}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {/* <Link className="border-b border-black" href={"#"}>
                        {item?.signedPenalty}
                      </Link> */}
                        <Link className="border-b border-black" href={"#"}>
                          Imzolash
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {/* {item?.signedFirm} */}
                        <Link className="border-b border-black" href={"#"}>
                          Imzolash
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {/* <Link className="border-b border-black" href={"#"}>
                        {item?.contractDate}
                      </Link> */}
                        <Link className="border-b border-black" href={"#"}>
                          Imzolash
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        <Link className="border-b border-black" href={"#"}>
                          Imzolash
                        </Link>
                        {/* {item?.contractNumber} */}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        <Link className="border-b border-black" href={"#"}>
                          Imzolash
                        </Link>
                        {/* {item?.contractAmount} */}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        <Link className="border-b border-black" href={"#"}>
                          <Link className="border-b border-black" href={"#"}>
                            Imzolash
                          </Link>
                          {/* {item?.signedPenalty2} */}
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        <Link className="border-b border-black" href={"#"}>
                          <Link className="border-b border-black" href={"#"}>
                            Imzolash
                          </Link>
                          {/* {item?.signedFirm2} */}
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        <Link className="border-b border-black" href={"#"}>
                          <Link className="border-b border-black" href={"#"}>
                            Imzolash
                          </Link>
                          {/* {item?.agreeDate} */}
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        <Link className="border-b border-black" href={"#"}>
                          Imzolash
                        </Link>
                        {/* {item?.agreeNumber} */}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        <Link className="border-b border-black" href={"#"}>
                          Imzolash
                        </Link>
                        {/* {item?.agreeAmount} */}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        <Link className="border-b border-black" href={"#"}>
                          Imzolash
                        </Link>
                        {/* {item?.agreeType} */}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        <Link className="border-b border-black" href={"#"}>
                          <Link className="border-b border-black" href={"#"}>
                            Imzolash
                          </Link>
                          {/* {item?.signedPenalty3} */}
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        <Link className="border-b border-black" href={"#"}>
                          <Link className="border-b border-black" href={"#"}>
                            Imzolash
                          </Link>
                          {/* {item?.signedFirm3} */}
                        </Link>
                      </td>
                    </tr>
                  </>
                )
              )}
              <tr className="hover:bg-gray-50">
                <td className="border-2 border-gray-400 w-[50px] p-2 text-xs text-gray-700"></td>
                <td className="border-2 border-gray-400 p-2 text-xs text-gray-700">
                  Jami
                </td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                  {loanAgreesList?.data?.allAmount || 0}
                </td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* paginations */}
        <div className="flex items-center justify-between">
          <div className="ml-auto">
            <Pagination
              currentPage={page + 1}
              totalPages={loanAgreesList?.data?.pages || 1}
            >
              <PaginationContent>
                <PaginationItem>
                  {page === 0 ? (
                    ""
                  ) : (
                    <PaginationPrevious
                      onClick={() => page > 0 && setPage(page - 1)}
                      currentPage={page + 1}
                    />
                  )}
                </PaginationItem>
                {Array.from({
                  length: loanAgreesList?.data?.pages || 1,
                }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => setPage(index)}
                      isActive={page === index}
                      className={
                        page === index ? "bg-[#3BB5DC] text-white" : ""
                      }
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  {page < (loanAgreesList?.data?.pages || 1) - 1 && (
                    <PaginationNext
                      onClick={() => setPage(page + 1)}
                      currentPage={page + 1}
                      totalPages={loanAgreesList?.data?.pages || 1}
                    />
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}
