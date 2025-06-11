import React, { useEffect, useState } from "react";
import CommonModal from "../CommonModal";
import { useAllT } from "@/queries/transactions";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import Loading from "../loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CalculatedModalProps {
  open: boolean;
  onClose: () => void;
  contractId: string;
  type: string;
  status: string;
}

export default function CalculatedModal({
  open,
  onClose,
  contractId,
  type,
  status,
}: CalculatedModalProps) {
  const [statusFilter, setStatusFilter] = useState(status);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useAllT(
    contractId,
    0,
    10,
    statusFilter || status,
    type
  );
  const { t } = useTranslation();

  useEffect(() => {
    setStatusFilter(status);
  }, [status]);
  return (
    <CommonModal visible={open} onClose={onClose} title="" loading={isLoading}>
      <div className="mb-8">
        <div>
          <div className="w-[45%] mb-4">
            Filter
            <Select
              onValueChange={(value) => setStatusFilter(value)}
              defaultValue={statusFilter}
            >
              <SelectTrigger className="focus:outline focus:outline-1 focus:outline-blue-500">
                <SelectValue placeholder={t("forms.selectType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PAYMENT">{t("tables.statuses.payment")}</SelectItem>
                <SelectItem value="PENDING">{t("tables.statuses.pending")}</SelectItem>
                <SelectItem value="COUNTED">{t("tables.statuses.counted")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <table className="bg-white rounded-lg shadow-md w-full">
            <thead>
              <tr className="bg-[#3BB5DC] text-white text-sm uppercase tracking-widest">
                <th className="py-2 px-6 text-xs text-left font-semibold whitespace-nowrap">
                  {t("tables.createdAt")}
                </th>
                <th className="py-2 px-6 text-xs text-left font-semibold whitespace-nowrap">
                  {t("tables.transactionType")}
                </th>
                <th className="py-2 px-6 text-xs text-left font-semibold whitespace-nowrap">
                  {t("tables.amountPaid")}
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {data?.data?.length ? (
                data.data.map((item, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-6 text-xs whitespace-nowrap">
                      {format(new Date(item.createdAt), "dd.MM.yyyy HH:mm:ss")}
                    </td>
                    <td className="py-3 px-6 text-xs whitespace-nowrap">
                      {item.type}
                    </td>
                    <td className="py-3 px-6 text-xs whitespace-nowrap">
                      {Number(item.amount)
                        .toLocaleString("en-US", {
                          useGrouping: true,
                          minimumFractionDigits: 3, // Ensures at least 3 decimal places
                          maximumFractionDigits: 3, // Limits to 3 decimal places
                        })
                        .replace(/,/g, " ")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="py-3 px-6 text-center text-gray-500"
                  >
                    {t("common.noData")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* <div className="ml-auto">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem
                                            className={
                                                currentPage === 0
                                                    ? "cursor-not-allowed pointer-events-none"
                                                    : "cursor-pointer"
                                            }
                                        >
                                            <PaginationPrevious
                                                onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
                                            />
                                        </PaginationItem>
                                        {Array.from({ length: data?.pages || 1 }).map(
                                            (_, index) => (
                                                <PaginationItem key={index} className="cursor-pointer">
                                                    <PaginationLink
                                                        onClick={() => setCurrentPage(index)}
                                                        className={currentPage === index ? "bg-[#3BB5DC] text-white" : ""}
                                                    >
                                                        {index + 1}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )
                                        )}
                                        <PaginationItem
                                            className={
                                                currentPage === (data?.pages || 1) - 1
                                                    ? "cursor-not-allowed pointer-events-none"
                                                    : "cursor-pointer"
                                            }
                                        >
                                            <PaginationNext
                                                onClick={() =>
                                                    currentPage < (data?.pages || 1) - 1 && setCurrentPage(currentPage + 1)
                                                }
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div> */}
        </div>
      </div>
    </CommonModal>
  );
}
