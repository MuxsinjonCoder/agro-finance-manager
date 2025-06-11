"use client";

import * as React from "react";
import { useState } from "react";
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
  ArrowUpDown,
  Banknote,
  Calendar1,
  ChevronDown,
  DollarSign,
  DoorClosed,
  Edit,
  FileText,
  Loader,
  MoreHorizontal,
  MoreVertical,
  Percent,
  Plus,
  PlusCircle,
  PlusCircleIcon,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteFinancePartner,
  useFinancePartner,
  useFinancePartners,
} from "@/queries/partners";
import { GetPartners } from "@/types/partners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { DateRangePicker } from "@/components/date-range-picker";
import { DateRange } from "react-day-picker";
import {
  formatDateToDMY,
  formatDateToMDY,
  formatDateToMDY_HMS,
} from "@/helpers/formatDate";
import Swal from "sweetalert2";
import PartnerModal from "@/components/partners/create";
import PartnerEditModal from "@/components/partners/edit";
import Loading from "@/components/loading";
import { format } from "date-fns";
import CommonModal from "@/components/CommonModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem } from "@radix-ui/react-accordion";
import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import { useUser } from "@/pages/_app";

const staticFinancePartners = {
  data: [
    {
      id: "1",
      name: "Bank of America",
      partnerType: "BANK",
      createdAt: "2023-10-01T08:30:00Z",
      categoryDto: {
        name: "Financial Services",
        description: "A leading financial services provider",
      },
      currencyType: ["USD"],
      inn: "123456789",
      contact_info: {
        fio: "John Doe",
        email: "john.doe@bankofamerica.com",
        phone: "+1234567890",
      },
    },
    {
      id: "2",
      name: "LeasePlan",
      partnerType: "LEASING_COMPANY",
      createdAt: "2023-09-15T10:15:00Z",
      categoryDto: {
        name: "Leasing Services",
        description: "A global leasing company",
      },
      currencyType: ["EUR"],
      inn: "987654321",
      contact_info: {
        fio: "Jane Smith",
        email: "jane.smith@leaseplan.com",
        phone: "+9876543210",
      },
    },
    {
      id: "3",
      name: "Chase Bank",
      partnerType: "BANK",
      createdAt: "2023-08-20T14:45:00Z",
      categoryDto: {
        name: "Banking Services",
        description: "A multinational banking and financial services company",
      },
      currencyType: ["USD"],
      inn: "456789123",
      contact_info: {
        fio: "Alice Johnson",
        email: "alice.johnson@chase.com",
        phone: "+4567891230",
      },
    },
    {
      id: "4",
      name: "HSBC Leasing",
      partnerType: "LEASING_COMPANY",
      createdAt: "2023-07-05T09:20:00Z",
      categoryDto: {
        name: "Leasing and Financing",
        description: "A leading international leasing company",
      },
      currencyType: ["GBP"],
      inn: "789123456",
      contact_info: {
        fio: "Bob Brown",
        email: "bob.brown@hsbc.com",
        phone: "+7891234560",
      },
    },
    {
      id: "5",
      name: "Wells Fargo",
      partnerType: "BANK",
      createdAt: "2023-06-18T16:10:00Z",
      categoryDto: {
        name: "Financial Services",
        description: "A diversified financial services company",
      },
      currencyType: ["USD"],
      inn: "321654987",
      contact_info: {
        fio: "Charlie Davis",
        email: "charlie.davis@wellsfargo.com",
        phone: "+3216549870",
      },
    },
    {
      id: "6",
      name: "ALD Automotive",
      partnerType: "LEASING_COMPANY",
      createdAt: "2023-05-22T11:05:00Z",
      categoryDto: {
        name: "Automotive Leasing",
        description: "A global leader in automotive leasing",
      },
      currencyType: ["EUR"],
      inn: "654987321",
      contact_info: {
        fio: "David Wilson",
        email: "david.wilson@aldautomotive.com",
        phone: "+6549873210",
      },
    },
    {
      id: "7",
      name: "Citibank",
      partnerType: "BANK",
      createdAt: "2023-04-30T13:50:00Z",
      categoryDto: {
        name: "Banking and Financial Services",
        description:
          "A global bank providing a wide range of financial services",
      },
      currencyType: ["USD"],
      inn: "987321654",
      contact_info: {
        fio: "Eve Martinez",
        email: "eve.martinez@citibank.com",
        phone: "+9873216540",
      },
    },
    {
      id: "8",
      name: "Deutsche Leasing",
      partnerType: "LEASING_COMPANY",
      createdAt: "2023-03-10T15:35:00Z",
      categoryDto: {
        name: "Leasing Solutions",
        description: "A provider of leasing solutions for businesses",
      },
      currencyType: ["EUR"],
      inn: "159357486",
      contact_info: {
        fio: "Frank Anderson",
        email: "frank.anderson@deutscheleasing.com",
        phone: "+1593574860",
      },
    },
    {
      id: "9",
      name: "Barclays",
      partnerType: "BANK",
      createdAt: "2023-02-28T12:25:00Z",
      categoryDto: {
        name: "Financial and Banking Services",
        description:
          "A British multinational bank and financial services company",
      },
      currencyType: ["GBP"],
      inn: "753951486",
      contact_info: {
        fio: "Grace Lee",
        email: "grace.lee@barclays.com",
        phone: "+7539514860",
      },
    },
    {
      id: "10",
      name: "Societe Generale Leasing",
      partnerType: "LEASING_COMPANY",
      createdAt: "2023-01-14T09:55:00Z",
      categoryDto: {
        name: "Leasing and Financial Services",
        description: "A provider of leasing and financial services",
      },
      currencyType: ["EUR"],
      inn: "357486912",
      contact_info: {
        fio: "Henry Clark",
        email: "henry.clark@societegenerale.com",
        phone: "+3574869120",
      },
    },
  ],
  pages: 1,
};

const staticSinglePartn = {
  data: {
    id: "1",
    name: "Bank of America",
    partnerType: "BANK",
    createdAt: "2023-10-01T08:30:00Z",
    categoryDto: {
      name: "Financial Services",
      description: "A leading financial services provider",
    },
    currencyType: ["USD"],
    inn: "123456789",
    contact_info: {
      fio: "John Doe",
      email: "john.doe@bankofamerica.com",
      phone: "+1234567890",
    },
  },
};

export default function PartnersPage() {
  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "guide-parts"
  );

  React.useEffect(() => {
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
  const [singlePartner, setSinglePartner] = useState("");
  const [singleModal, setSingleModal] = useState(false);
  const [selectedRange, setSelectedRange] = React.useState<
    DateRange | undefined
  >(undefined);
  const [tempRange, setTempRange] = useState(selectedRange);
  const [selectedPartnerType, setSelectedPartnerType] = useState<string>("all");

  const {
    data: financePartners,
    isLoading,
    error,
    refetch: refetchFinancePartners,
  } = {
    data: staticFinancePartners,
    isLoading: false,
    error: false,
    refetch: () => {},
  };
  const {
    data: singlePartn,
    isLoading: singlePartnLoading,
    error: singlePartnError,
    refetch: refetchSingle,
  } = {
    data: staticSinglePartn,
    error: false,
    isLoading: false,
    refetch: () => {},
  };

  // const {
  //   data: financePartners,
  // isLoading,
  // error,
  // refetch: refetchFinancePartners,
  // } = useFinancePartners({
  //   type: selectedPartnerType === "all" ? "" : selectedPartnerType,
  //   page,
  //   size: 10,
  //   from: selectedRange?.to
  //     ? formatDateToMDY_HMS(selectedRange?.from)
  //     : undefined,
  //   to: formatDateToMDY_HMS(selectedRange?.to),
  //   dateTime: selectedRange?.to ? "" : formatDateToMDY_HMS(selectedRange?.from),
  // });

  // const {
  // data: singlePartn,
  // isLoading: singlePartnLoading,
  // error: singlePartnError,
  // refetch: refetchSingle,
  // } = useFinancePartner(singlePartner);
  // const deletePartner = useDeleteFinancePartner();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [addPartnerModal, setAddPartnerModal] = useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [selectedPartner, setSelectedPartner] = useState("");
  const { t } = useTranslation();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: t("modals.del"), // "Are you sure you want to delete?"
      text: t("modals.delWarn"), // "This action cannot be undone!"
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#fff",
      confirmButtonText: t("buttons.yDel"), // "Yes, delete it!"
      cancelButtonText: t("buttons.nCan"), // "Cancel"
      focusCancel: true,
      reverseButtons: true,
      customClass: {
        cancelButton: "text-black", // Ensuring black text on the cancel button
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("deleting");
        // deletePartner.mutate(id, {
        //   onSuccess: () => {
        //     toast.message(t("messages.delEd"));
        //   },
        //   onError: () => {
        //     toast.message(t("messages.err"));
        //   },
        // });
      }
    });
  };

  const columns: any[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }:any) => <div className="">{page * 10 + (row?.index + 1)}</div>,
    },
    {
      accessorKey: "name",
      header: () => t("tables.name"),
      cell: ({ row }:any) => (
        <div className="capitalize min-w-[150px] max-w-[300px] truncate">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "partnerType",
      header: () => (
        <div className="flex items-center gap-2 min-w-[150px] max-w-[300px] truncate">
          {/* {t("tables.partnerType")} */}
          {/** Partner Type Filter Dropdown **/}
          <Select
            onValueChange={(value) => setSelectedPartnerType(value)}
            value={selectedPartnerType}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("forms.selectPartnerType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("tables.partnerType")}</SelectItem>
              <SelectItem value="BANK">BANK</SelectItem>
              <SelectItem value="LEASING_COMPANY">LEASING_COMPANY</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
      cell: ({ row }:any) => <div>{row.getValue("partnerType")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="flex items-center gap-2 min-w-[150px] max-w-[300px] truncate">
          {t("tables.createdAt")}
        </div>
      ),
      cell: ({ row }:any) => (
        <div>
          {format(new Date(row.getValue("createdAt")), "dd.MM.yyyy hh:MM:ss")}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => (
        <div
          className={`text-center ${
            access &&
            access[0]?.actions &&
            access[0].actions[0]?.action != "all"
              ? "hidden"
              : ""
          }`}
        >
          {t("tables.actions")}
        </div>
      ),
      cell: ({ row }:any) => (
        <div
          className={`text-center ${
            access &&
            access[0]?.actions &&
            access[0].actions[0]?.action != "all"
              ? "hidden"
              : ""
          }`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(row.getValue("id"));
                }}
              >
                <Trash2 className="w-4 h-4 text-red-500 mr-2" />{" "}
                {t("buttons.del")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPartner(row.getValue("id"));
                  setEditModal(true);
                }}
              >
                <Edit className="w-4 h-4 mr-2" /> {t("buttons.ed")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const tableData = React.useMemo(
    () => financePartners?.data ?? [],
    [financePartners]
  );

  const table = useReactTable({
    data: tableData,
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

  const handleSetDateRange = () => {
    setSelectedRange({
      from: new Date(),
      to: new Date(),
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-[99vh] overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("partner.title")}
        </h2>
      </div>
      <div className="flex items-center w-full flex-col lg:flex-row justify-between py-4">
        <div className="w-full lg:w-[25%]">
          <Input
            placeholder={`${t("tables.search")}...`}
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
        </div>
        <div className="flex w-full mt-5 lg:mt-0 items-center justify-end gap-5">
          <div className="flex-col items-center space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0">
            <DateRangePicker
              selectedRange={tempRange} // Use tempRange to store selections
              onChangeRange={setTempRange} // Update tempRange when date range changes
            />

            <Button
              className="w-full"
              onClick={() => {
                setSelectedRange(tempRange); // Apply selected range
                refetchFinancePartners(); // Refetch with new dates
              }}
            >
              {t("partner.searchByDate")}
            </Button>
          </div>

          <div
            className={`${
              access &&
              access[0]?.actions &&
              access[0].actions[0]?.action != "all"
                ? "hidden"
                : ""
            }`}
          >
            <Button className="ml-2" onClick={() => setAddPartnerModal(true)}>
              {t("partner.add")}
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <div className="max-h-[80%] mt-5 overflow-auto">
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
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => {
                      setSinglePartner(row.getValue("id"));
                      setSingleModal(true);
                    }}
                  >
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
        <div className="ml-auto">
          <Pagination
            currentPage={page + 1}
            totalPages={financePartners?.pages || 1}
          >
            <PaginationContent>
              <PaginationItem>
                {page == 0 ? (
                  ""
                ) : (
                  <PaginationPrevious
                    onClick={() => page > 0 && setPage(page - 1)}
                    currentPage={page + 1}
                  />
                )}
              </PaginationItem>
              {Array.from({ length: financePartners?.pages || 1 }).map(
                (_, index) => (
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
                )
              )}
              <PaginationItem>
                {page < (financePartners?.pages || 1) - 1 && (
                  <PaginationNext
                    onClick={() => setPage(page + 1)}
                    currentPage={page + 1}
                    totalPages={financePartners?.pages || 1}
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <PartnerModal
        addPartnerModal={addPartnerModal}
        setAddPartnerModal={setAddPartnerModal}
      />

      <PartnerEditModal
        editPartnerModal={editModal}
        setEditPartnerModal={setEditModal}
        id={selectedPartner}
      />

      <CommonModal
        visible={singleModal}
        onClose={() => setSingleModal(false)}
        title={t("buttons.det")}
      >
        {singlePartnLoading ? (
          <div className="flex justify-center py-6">
            <Loading />
          </div>
        ) : singlePartnError ? (
          <div className="flex flex-col items-center justify-center p-4 text-red-500">
            <p className="text-lg font-semibold">{t("messages.err")}</p>
            <p className="text-sm">{t("messages.smtErr")}</p>
            <Button variant="outline" onClick={() => refetchSingle()}>
              {t("buttons.retry")}
            </Button>
          </div>
        ) : (
          <Card className="p-4 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Banknote className="w-5 h-5 text-green-500" />{" "}
                {singlePartn?.data?.name}
              </CardTitle>
              <div className=" text-gray-600">
                <span className="text-gray-700 font-semibold">
                  {t("tables.partnerType")}:{" "}
                </span>
                {singlePartn?.data?.partnerType || "N/A"}
              </div>

              <div className=" text-gray-600">
                <span className="text-gray-700 font-semibold">
                  {t("forms.currencyType")}:{" "}
                </span>
                {singlePartn?.data?.currencyType.join(", ")}
              </div>
              <div className=" text-gray-600">
                <span className="text-gray-700 font-semibold">
                  {t("forms.inn")}:{" "}
                </span>
                {singlePartn?.data?.inn}
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-bold text-md">
                    {t("tables.categoryInfo")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-gray-700">
                      <span className="font-semibold">
                        {t("tables.categoryName")}:{" "}
                      </span>
                      {singlePartn?.data?.categoryDto?.name || "N/A"}
                    </div>

                    <div className="text-gray-700">
                      <span className="font-semibold">
                        {t("tables.categoryDescription")}:{" "}
                      </span>

                      {singlePartn?.data?.categoryDto?.description || "N/A"}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-bold text-md">
                    {" "}
                    {t("tables.contactInfo")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-gray-700">
                      <span className="font-semibold">{t("tables.fio")}: </span>
                      {singlePartn?.data?.contact_info?.fio || "N/A"}
                    </div>

                    <div className="text-gray-700">
                      <span className="font-semibold">
                        {t("tables.email")}:{" "}
                      </span>
                      <a
                        href={`mailto:${singlePartn?.data?.contact_info?.email}`}
                        className="text-blue-500 hover:underline"
                      >
                        {singlePartn?.data?.contact_info?.email || "N/A"}
                      </a>
                    </div>

                    <div className="text-gray-700">
                      <span className="font-semibold">
                        {t("tables.phone")}:{" "}
                      </span>
                      <a
                        href={`tel:${singlePartn?.data?.contact_info?.phone}`}
                        className="text-blue-500 hover:underline"
                      >
                        {singlePartn?.data?.contact_info?.phone || "N/A"}
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Created At Date */}
              <div className="text-gray-500 text-sm border-t pt-3">
                <span className="font-semibold">{t("tables.createdAt")}: </span>
                {singlePartn?.data?.createdAt
                  ? new Date(singlePartn.data.createdAt).toLocaleDateString()
                  : "N/A"}{" "}
                {singlePartn?.data?.createdAt
                  ? new Date(singlePartn.data.createdAt).toLocaleTimeString()
                  : "N/A"}
              </div>
            </CardContent>
          </Card>
        )}
      </CommonModal>
    </div>
  );
}
