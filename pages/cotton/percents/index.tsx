"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { format, parseISO } from "date-fns";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { formatNumberWithSpaces } from "@/helpers/textUtils";
import { GotPercentTypes } from "@/types/percents";
import { ChevronDown, Info } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useGetAllTransactions,
  useGetTransactionsByStatus,
} from "@/queries/percents";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useUser } from "@/pages/_app";
import { toast } from "sonner";

const staticTransactions: GotPercentTypes[] = [
  {
    id: 1,
    createdAt: "2025-05-15T10:30:00Z",
    type: "CONTRACT",
    transactionStatus: "PENDING",
    amount: 1500000,
  },
  {
    id: 2,
    createdAt: "2025-05-14T14:45:00Z",
    type: "PAYMENT",
    transactionStatus: "COUNTED",
    amount: 2300000,
  },
  {
    id: 3,
    createdAt: "2025-05-13T09:15:00Z",
    type: "PENALTY",
    transactionStatus: "PAYMENT",
    amount: 500000,
  },
  {
    id: 4,
    createdAt: "2025-05-12T16:20:00Z",
    type: "PERCENTAGE",
    transactionStatus: "PENDING",
    amount: 750000,
  },
  {
    id: 5,
    createdAt: "2025-05-11T11:00:00Z",
    type: "PERCENT_FOR_PAY",
    transactionStatus: "COUNTED",
    amount: 1800000,
  },
  {
    id: 6,
    createdAt: "2025-05-10T13:30:00Z",
    type: "CONTRACT",
    transactionStatus: "PAYMENT",
    amount: 3200000,
  },
  {
    id: 7,
    createdAt: "2025-05-09T08:45:00Z",
    type: "PAYMENT",
    transactionStatus: "PENDING",
    amount: 900000,
  },
  {
    id: 8,
    createdAt: "2025-05-08T15:10:00Z",
    type: "PERCENTAGE",
    transactionStatus: "COUNTED",
    amount: 1200000,
  },
  {
    id: 9,
    createdAt: "2025-05-07T12:25:00Z",
    type: "PENALTY",
    transactionStatus: "PAYMENT",
    amount: 600000,
  },
  {
    id: 10,
    createdAt: "2025-05-06T17:50:00Z",
    type: "PERCENT_FOR_PAY",
    transactionStatus: "PENDING",
    amount: 2500000,
  },
];

export default function PercentPage() {
  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "cotton-percents"
  );

  useEffect(() => {
    if (
      !access?.length &&
      access?.length != undefined &&
      access?.length != "undefined"
    ) {
      toast.error("Sizga bu sahifa uchun ruxsat yo'q!!!");
      router.push("/sitemap");
    }
  }, [access]);

  const [page, setPage] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const transactionsByStatus = useGetTransactionsByStatus(
    selectedStatus,
    selectedType,
    page,
    10
  );

  const [selectedItem, setSelectedItem] = useState<GotPercentTypes | null>(
    null
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { t } = useTranslation();

  const clearFilters = () => {
    setSelectedStatus("all");
    setSelectedType("all");
  };

  const columns: ColumnDef<GotPercentTypes>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-xs">N</div>,
      cell: ({ row }) => (
        <div className="text-xs">{page * 10 + (row?.index + 1)}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="text-xs truncate">{t("tables.createdAt")}</div>
      ),
      cell: ({ row }) => (
        <div className="max-w-[300px] text-xs truncate ">
          {format(parseISO(row?.original?.createdAt), "dd.MM.yyyy") || "-----"}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: () => <div className="text-xs truncate">{t("tables.type")}</div>,
      cell: ({ row }) => (
        <div className="max-w-[300px] text-xs truncate ">
          {row?.original?.type == "CONTRACT"
            ? t("tables.transactions.CONTRACT")
            : row?.original?.type == "PAYMENT"
            ? t("tables.transactions.PAYMENT")
            : row?.original?.type == "PENALTY"
            ? t("tables.transactions.PENALTY")
            : row?.original?.type == "PERCENTAGE"
            ? t("tables.transactions.PERCENTAGE")
            : row?.original?.type == "PERCENT_FOR_PAY"
            ? t("tables.transactions.PERCENT_FOR_PAY")
            : "-----"}
        </div>
      ),
    },
    {
      accessorKey: "transactionStatus",
      header: () => (
        <div className="text-xs truncate">{t("tables.transactionStatus")}</div>
      ),
      cell: ({ row }) => (
        <div className="max-w-[300px] text-xs truncate ">
          {row?.original?.transactionStatus == "PENDING"
            ? t("tables.transactionStatuses.PENDING")
            : row?.original?.transactionStatus == "COUNTED"
            ? t("tables.transactionStatuses.COUNTED")
            : row?.original?.transactionStatus == "PAYMENT"
            ? t("tables.transactionStatuses.PAYMENT")
            : "-----"}
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: t("tables.amount"),
      cell: ({ row }) => (
        <div className="min-w-[200px] max-w-[350px] truncate">
          {formatNumberWithSpaces(parseFloat(row.getValue("amount")))}
        </div>
      ),
    },
    // {
    //   id: "actions",
    //   header: t("tables.actions"),
    //   cell: ({ row }) => (
    //     <Info onClick={() => {
    //       setSelectedItem(row?.original)
    //     }} className="text-blue-600 transition-all duration-300 hover:scale-[1.2] cursor-pointer" />
    //   ),
    // },
  ];

  // const tableData = useMemo(
  //   () => transactionsByStatus?.data?.data ?? [],
  //   [transactionsByStatus?.data?.data]
  // );

  const table = useReactTable({
    data: staticTransactions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="w-full h-[99vh] overflow-hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("percent.title")}
          </h2>
        </div>
        <div className="flex gap-5 items-end justify-between py-4">
          {/* status filter */}
          <div className="w-[200px] flex flex-col gap-2">
            <label className="text-sm">{t("tables.transactionStatus")}</label>
            <Select
              value={selectedStatus}
              onValueChange={(value) => {
                setSelectedStatus(
                  value as "PENDING" | "COUNTED" | "PAYMENT" | "all"
                );
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("tables.transactionStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("tables.transactionStatuses.all")}
                </SelectItem>
                <SelectItem value="PENDING">
                  {t("tables.transactionStatuses.PENDING")}
                </SelectItem>
                <SelectItem value="COUNTED">
                  {t("tables.transactionStatuses.COUNTED")}
                </SelectItem>
                <SelectItem value="PAYMENT">
                  {t("tables.transactionStatuses.PAYMENT")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* type filter */}
          <div className="w-[200px] flex flex-col gap-2">
            <label className="text-sm">{t("tables.type")}</label>
            <Select
              value={selectedType}
              onValueChange={(value) => {
                setSelectedType(
                  value as
                    | "CONTRACT"
                    | "PAYMENT"
                    | "PENALTY"
                    | "PERCENTAGE"
                    | "PERCENT_FOR_PAY"
                    | "all"
                );
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("tables.transactionStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("tables.transactions.all")}
                </SelectItem>
                <SelectItem value="CONTRACT">
                  {t("tables.transactions.CONTRACT")}
                </SelectItem>
                <SelectItem value="PAYMENT">
                  {t("tables.transactions.PAYMENT")}
                </SelectItem>
                <SelectItem value="PENALTY">
                  {t("tables.transactions.PENALTY")}
                </SelectItem>
                <SelectItem value="PERCENTAGE">
                  {t("tables.transactions.PERCENTAGE")}
                </SelectItem>
                <SelectItem value="PERCENT_FOR_PAY">
                  {t("tables.transactions.PERCENT_FOR_PAY")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Button
              onClick={() => {
                clearFilters();
              }}
            >
              {t("buttons.clear")}
            </Button>
          </div>
          <div className="flex w-full items-center justify-end gap-5">
            <div className="">
              {/* <Button className="ml-2" onClick={() => setAddModal(true)}>
                {`${t("buttons.add")} ${t("percent.title")}`}
                <Plus />
              </Button> */}
            </div>
          </div>
        </div>
        <div className="mt-5 overflow-auto">
          <div className="rounded-md border ">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {staticTransactions?.length > 0 && staticTransactions?.length != undefined ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      {t("common.noData")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        {/* paginations */}
        {/* <div className="ml-auto">
          <Pagination
            currentPage={page + 1}
            totalPages={transactionsByStatus?.data?.pages || 1}
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
                length: transactionsByStatus?.data?.pages || 1,
              }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setPage(index)}
                    isActive={page === index}
                    className={page === index ? "bg-[#3BB5DC] text-white" : ""}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                {page < (transactionsByStatus?.data?.pages || 1) - 1 && (
                  <PaginationNext
                    onClick={() => setPage(page + 1)}
                    currentPage={page + 1}
                    totalPages={transactionsByStatus?.data?.pages || 1}
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div> */}
      </div>
    </>
  );
}
