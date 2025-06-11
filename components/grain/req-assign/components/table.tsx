import { DateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RequiredAssignmentsTableData } from "@/constants/requiredAssignmentsTableData";
import { useGetReqAssign } from "@/queries/grain/req-assign";
import { Download, Edit } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";
import EditModal from "./edit-modal";

const reqAssignsList = {
  data: {
    agreementDtoList: [
      {
        partnerName: "Agro Farm LLC",
        jshr: "12345678901234",
        createdAt: "2025-05-15T10:00:00Z",
        contractNumber: "CON001",
        productWeight: 500,
        productPrice: 250,
        allPrice: 300,
        signedPenalty: "Pending",
        signedFirm: "Pending",
        contractDate: "2025-05-15",
        weight2: 500,
        price2: 250,
      },
      {
        partnerName: "Green Fields Co.",
        jshr: "98765432109876",
        createdAt: "2025-05-20T12:30:00Z",
        contractNumber: "CON002",
        productWeight: 750,
        productPrice: 375,
        allPrice: 450,
        signedPenalty: "Pending",
        signedFirm: "Pending",
        contractDate: "2025-05-20",
        weight2: 750,
        price2: 375,
      },
      {
        partnerName: "Harvest Group",
        jshr: "45678912345678",
        createdAt: "2025-06-01T15:45:00Z",
        contractNumber: "CON003",
        productWeight: 1000,
        productPrice: 500,
        allPrice: 600,
        signedPenalty: "Pending",
        signedFirm: "Pending",
        contractDate: "2025-06-01",
        weight2: 1000,
        price2: 500,
      },
    ],
    allProductWeight: 2250,
    allProductPrice: 1125,
    pages: 3,
  },
};

export default function RequiredAssignmentsTable() {
  // states
  const [page, setPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [searchValues, setSearchValues] = useState<any | null>("");
  const [createdDateRange, setCreatedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [contractedDateRange, setContractedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [editModal, setEditModal] = useState(false);

  // hapers
  const { t } = useTranslation();
  const formattedFrom = createdDateRange?.from?.toISOString().slice(0, 19);
  const formattedTo = createdDateRange?.to?.toISOString().slice(0, 19);

  // queries
  // const { data: reqAssignsList } = useGetReqAssign(
  //   page,
  //   10,
  //   searchValues,
  //   formattedFrom,
  //   formattedTo
  // );

  return (
    <>
      <div>
        <div className="flex my-5 items-end justify-between flex-wrap gap-5">
          <div className="w-full md:w-[25%]">
            <Label>Qidirish</Label>
            <Input
              name="search"
              placeholder="Hamkor, JSHSHIR, Shartnoma raqami bo'yicha"
              value={searchValues}
              onChange={(e) => setSearchValues(e.target.value)}
            />
          </div>
          <div className="w-full md:w-[70%] flex items-center justify-end gap-5">
            <div>
              <Label>Yaratilgan sana:</Label>
              <DateRangePicker
                selectedRange={createdDateRange}
                onChangeRange={setCreatedDateRange}
              />
            </div>
            <div>
              <Label>Imzolangan sana:</Label>
              <DateRangePicker
                selectedRange={contractedDateRange}
                onChangeRange={setContractedDateRange}
              />
            </div>
          </div>
        </div>
        <div className="min-w-full overflow-auto relative border-gray-300">
          <table className="border-collapse min-w-full border-2 border-gray-400 shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th
                  rowSpan={3}
                  className="w-[50px] border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                >
                  №
                </th>
                <th
                  colSpan={2}
                  className="border-2 w-[150px] border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                >
                  Korxona
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                >
                  Sanasi
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                >
                  Raqami
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                >
                  Miqdori, tn
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                >
                  Narx, mln so'm
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                >
                  Qiymati, QQS bilan (Jami)
                </th>
                <th
                  colSpan={2}
                  className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                >
                  Imzolangan
                </th>
                <th
                  colSpan={2}
                  className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                >
                  Bitim
                </th>
                <th
                  colSpan={2}
                  className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                >
                  Imzolangan
                </th>
                <th
                  rowSpan={2}
                  className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                >
                  Harakatlar
                </th>
              </tr>
              <tr>
                <th
                  rowSpan={2}
                  className="border-2 w-[70px] border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
                >
                  Nomi
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[70px] border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
                >
                  JSHR
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[70px] border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
                >
                  Jamg'arma
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[70px] border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
                >
                  Korxona
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[70px] border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
                >
                  Sanasi
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[70px] border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
                >
                  Raqami
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[70px] border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
                >
                  Jamg'arma
                </th>
                <th
                  rowSpan={2}
                  className="border-2 w-[70px] border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
                >
                  Korxona
                </th>
              </tr>
            </thead>
            <tbody>
              {reqAssignsList?.data?.agreementDtoList?.map(
                (item: any, index: number) => (
                  <>
                    <tr className="hover:bg-gray-50">
                      <td className="border-2 border-gray-400 w-[50px] p-2 text-xs text-gray-700">
                        {page * 10 + index + 1}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs min-w-[200px] max-w-[300px] truncate text-gray-700">
                        {item?.partnerName || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {item?.jshr || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {/* <Link className="border-b border-black" href={"#"}> */}
                        {item?.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("ru-RU")
                          : "-----"}
                        {/* </Link> */}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {item?.contractNumber || 0}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {item?.productWeight || 0}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {item?.productPrice
                          ? Number(item.productPrice).toLocaleString("ru-RU")
                          : 0}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {item?.allPrice
                          ? Number(item.allPrice).toLocaleString("ru-RU")
                          : 0}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {/* <Link className="border-b border-black" href={"#"}>
                          {item?.signedPenalty || "-----"}
                        </Link> */}
                        <Link
                          className="border-b border-black"
                          href={{
                            pathname:
                              "/signitures/required-assignment-signiture",
                            query: { data: JSON.stringify(item) }, // item ni JSON ga aylantirib yuboramiz
                          }}
                        >
                          Imzolash
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {/* <Link className="border-b border-black" href={"#"}>
                          {item?.signedFirm || "-----"}
                        </Link> */}
                        <Link
                          className="border-b border-black"
                          href={{
                            pathname:
                              "/signitures/required-assignment-signiture",
                            query: { data: JSON.stringify(item) }, // item ni JSON ga aylantirib yuboramiz
                          }}
                        >
                          Imzolash
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        <Link
                          className="border-b border-black"
                          href={{
                            pathname:
                              "/signitures/required-assignment-signiture",
                            query: { data: JSON.stringify(item) }, // item ni JSON ga aylantirib yuboramiz
                          }}
                        >
                          Imzolash
                        </Link>
                        {/* <Link className="border-b border-black" href={"#"}>
                          {item?.contractDate || "-----"}
                        </Link> */}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {/* {item?.contractNumber || "-----"} */}
                        <Link
                          className="border-b border-black"
                          href={{
                            pathname:
                              "/signitures/required-assignment-signiture",
                            query: { data: JSON.stringify(item) }, // item ni JSON ga aylantirib yuboramiz
                          }}
                        >
                          Imzolash
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {/* {item?.weight2 || "-----"} */}
                        <Link
                          className="border-b border-black"
                          href={{
                            pathname:
                              "/signitures/required-assignment-signiture",
                            query: { data: JSON.stringify(item) }, // item ni JSON ga aylantirib yuboramiz
                          }}
                        >
                          Imzolash
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                        {/* {item?.price2 || "-----"} */}
                        <Link
                          className="border-b border-black"
                          href={{
                            pathname:
                              "/signitures/required-assignment-signiture",
                            query: { data: JSON.stringify(item) }, // item ni JSON ga aylantirib yuboramiz
                          }}
                        >
                          Imzolash
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px] max-w-[120px] truncate">
                        <Edit
                          onClick={() => {
                            setEditModal(true);
                            setSelectedItem(item);
                          }}
                          className="text-primary size-5 transition-all duration-300 hover:scale-[1.3] cursor-pointer mx-auto"
                        />
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
                  {reqAssignsList?.data?.allProductWeight
                    ? Number(
                        reqAssignsList?.data?.allProductWeight
                      ).toLocaleString("ru-RU")
                    : 0}
                </td>
                <td className="border-2 border-gray-400 bg-gray-100 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate"></td>
                <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[120px] max-w-[200px] truncate">
                  {reqAssignsList?.data?.allProductPrice
                    ? Number(
                        reqAssignsList?.data?.allProductPrice
                      ).toLocaleString("ru-RU")
                    : 0}
                </td>
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
              totalPages={reqAssignsList?.data?.pages || 1}
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
                  length: reqAssignsList?.data?.pages || 1,
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
                  {page < (reqAssignsList?.data?.pages || 1) - 1 && (
                    <PaginationNext
                      onClick={() => setPage(page + 1)}
                      currentPage={page + 1}
                      totalPages={reqAssignsList?.data?.pages || 1}
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
