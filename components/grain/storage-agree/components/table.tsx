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
import { StorageAssignmentsTableData } from "@/constants/StorageAssignmentsTableData";
import { useGetStorageAgree } from "@/queries/grain/storage-agree";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import EditModal from "./edit-modal";

const storageAgreesList = {
  data: {
    list: [
      {
        partnersDto: {
          name: "Agro Storage LLC",
          inn: "12345678901234",
        },
        contractDate: "2025-05-10T10:00:00Z",
        number: "STR001",
        weight: 200,
        signedPenalty: "Pending",
        signedFirm: "Pending",
      },
      {
        partnersDto: {
          name: "Grain Depot Co.",
          inn: "98765432109876",
        },
        contractDate: "2025-05-15T12:00:00Z",
        number: "STR002",
        weight: 300,
        signedPenalty: "Pending",
        signedFirm: "Pending",
      },
      {
        partnersDto: {
          name: "Harvest Storage Group",
          inn: "45678912345678",
        },
        contractDate: "2025-06-01T15:00:00Z",
        number: "STR003",
        weight: 250,
        signedPenalty: "Pending",
        signedFirm: "Pending",
      },
    ],
    allAmount: 750,
    pages: 3,
  },
};

export default function StorageAssignmentsTable() {
  // halpers
  const { t } = useTranslation();

  // states
  const [page, setPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [selectedSigningItem, setSelectedSigningItem] = useState<any | null>(
    null
  );

  // queries
  // const { data: storageAgreesList } = useGetStorageAgree(page, 10);

  return (
    <>
      <div>
        <div className="min-w-full overflow-auto relative border-gray-300">
          <table className="border-collapse min-w-full border-2 border-gray-400 shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th
                  rowSpan={3}
                  className="w-[20px] border-2 border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
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
                  Og'irligi (tonna)
                </th>
                <th
                  colSpan={2}
                  className="border-2 border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Imzolangan
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[100px] border-gray-400 p-4 text-center text-sm font-semibold text-gray-700"
                >
                  Harakatlar
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
              </tr>
            </thead>
            <tbody>
              {storageAgreesList?.data?.list?.map(
                (item: any, index: number) => (
                  <>
                    <tr className="hover:bg-gray-50">
                      <td className="border-2 border-gray-400 w-[20px] p-2 text-xs text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border-2 min-w-[120px] border-gray-400 p-2 text-xs text-gray-700">
                        {item?.partnersDto?.name}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.partnersDto?.inn}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        <Link
                          className="border-b border-black"
                          href={{
                            pathname:
                              "/signitures/storage-aggreement-signiture",
                            query: { data: JSON.stringify(item) },
                          }}
                        >
                          {item?.contractDate
                            ? new Date(item.contractDate).toLocaleDateString(
                                "ru-RU"
                              )
                            : "Imzolash"}
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.number}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.weight}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        <Link
                          className="border-b border-black"
                          href={{
                            pathname:
                              "/signitures/storage-aggreement-signiture",
                            query: { data: JSON.stringify(item) },
                          }}
                        >
                          Imzolash
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        <Link
                          className="border-b border-black"
                          href={{
                            pathname:
                              "/signitures/storage-aggreement-signiture",
                            query: { data: JSON.stringify(item) },
                          }}
                        >
                          Imzolash
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        <Edit
                          onClick={() => {
                            setSelectedItem(item);
                            setEditModal(true);
                          }}
                          className="size-5 text-primary mx-auto transition-all duration-300 hover:scale-[1.2] cursor-pointer"
                        />
                      </td>
                    </tr>
                  </>
                )
              )}
              <tr className="hover:bg-gray-50">
                <td className="border-2 border-gray-400 w-[20px] p-2 text-xs text-gray-700"></td>
                <td className="border-2 border-gray-400 p-2 text-xs text-gray-700">
                  Jami
                </td>
                <td className="border-2 border-gray-400 bg-gray-50 p-2 text-xs text-gray-700 text-center"></td>
                <td className="border-2 border-gray-400 bg-gray-50 p-2 text-xs text-gray-700 text-center"></td>
                <td className="border-2 border-gray-400 bg-gray-50 p-2 text-xs text-gray-700 text-center"></td>
                <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                  {storageAgreesList?.data?.allAmount}
                </td>
                <td className="border-2 border-gray-400 bg-gray-50 p-2 text-xs text-gray-700 text-center"></td>
                <td className="border-2 border-gray-400 bg-gray-50 p-2 text-xs text-gray-700 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* paginations */}
        <div className="flex items-center justify-between">
          <div className="ml-auto">
            <Pagination
              currentPage={page + 1}
              totalPages={storageAgreesList?.data?.pages || 1}
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
                  length: storageAgreesList?.data?.pages || 1,
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
                  {page < (storageAgreesList?.data?.pages || 1) - 1 && (
                    <PaginationNext
                      onClick={() => setPage(page + 1)}
                      currentPage={page + 1}
                      totalPages={storageAgreesList?.data?.pages || 1}
                    />
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      {/* edit modal */}
      <EditModal
        editModal={editModal}
        setEditModal={setEditModal}
        selectedItem={selectedItem}
      />
    </>
  );
}
