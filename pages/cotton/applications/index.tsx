"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
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
  ChevronDown,
  FileText,
  MoreHorizontal,
  PlusIcon,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/ui/loader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Separator } from "@radix-ui/react-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommonModal from "@/components/CommonModal";
import { formatNumberWithSpaces } from "@/helpers/textUtils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Swal from "sweetalert2";
import { formatDateToDMY } from "@/helpers/formatDate";
import { useRouter } from "next/navigation";

export type FinanceCategory = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  currencyType: string;
  applicationDate: string;
  requestedAmount: number;
  applicationStatus: string;
};

interface categoryTypes {
  createdAt: string;
  description: string;
  id: number;
  name: string;
  updatedAt: string | null;
}

interface Partner {
  id: number;
  name: string;
  partnerType: string;
}

const staticApplications = [
  {
    id: "1",
    applicationDate: "2025-01-15",
    requestedAmount: 5000000,
    currencyType: "UZS",
    applicationStatus: "PENDING",
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "2",
    applicationDate: "2025-02-20",
    requestedAmount: 10000,
    currencyType: "USD",
    applicationStatus: "APPROVED",
    createdAt: "2025-02-20T12:30:00Z",
  },
  {
    id: "3",
    applicationDate: "2025-03-10",
    requestedAmount: 750000,
    currencyType: "EUR",
    applicationStatus: "REJECTED",
    createdAt: "2025-03-10T09:15:00Z",
  },
];

const staticCategories = [
  {
    id: 1,
    name: "Operating Expenses",
    description: "",
    createdAt: "2024-01-01",
    updatedAt: null,
  },
  {
    id: 2,
    name: "Equipment Purchase",
    description: "",
    createdAt: "2024-02-01",
    updatedAt: null,
  },
  {
    id: 3,
    name: "Inventory",
    description: "",
    createdAt: "2024-03-01",
    updatedAt: null,
  },
];

const staticPartners = [
  { id: 1, name: "Green Farm Co.", partnerType: "FARM" },
  { id: 2, name: "Sunny Fields", partnerType: "FARM" },
  { id: 3, name: "Agro Supplies", partnerType: "SUPPLIER" },
];

const staticSingleApp = {
  id: "1",
  requestedAmount: 5000000,
  currencyType: "UZS",
  applicationStatus: "PENDING",
  applicationDate: "2025-01-15",
  createdAt: "2025-01-15T10:00:00Z",
};

export default function ApplicationsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const user = {
    data: {
      id: "123",
      role: [
        { dtoList: [{ name: "cotton-apps", actions: [{ action: "all" }] }] },
      ],
    },
  };

  const [page, setPage] = React.useState<number>(0);
  const [selectedApp, setSelectedApp] = React.useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [addModal, setAddModal] = React.useState(false);
  const [singleModal, setSingleModal] = React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedPartner, setSelectedPartner] = React.useState<Partner | null>(
    null
  );

  const farmPartners = staticPartners.filter(
    (partner) => partner.partnerType === "FARM"
  );

  const form = useForm({
    defaultValues: {
      userId: undefined,
      categoryId: undefined,
      partnerIds: undefined,
      requestedAmount: undefined,
      currencyType: "UZS",
      applicationDate: "",
    },
  });

  const { control, register, handleSubmit, getValues, watch, reset } = form;

  const formValues = watch();
  React.useEffect(() => {
    if (
      formValues.applicationDate ||
      formValues.categoryId ||
      formValues.partnerIds ||
      formValues.requestedAmount
    ) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [formValues]);

  const handleCloseModal = () => {
    if (hasUnsavedChanges) {
      const confirmClose = window.confirm(
        "Your inputted data will be lost. Are you sure you want to close?"
      );
      if (confirmClose) {
        setAddModal(false);
        form.reset();
      }
    } else {
      setAddModal(false);
      form.reset();
    }
  };

  const handleSubmitAddApp = (values: any) => {
    const submitingData = {
      userId: Number(user?.data?.id),
      categoryId: Number(values?.categoryId),
      partnerIds: [Number(selectedPartner?.id)],
      applicationDate: values?.applicationDate,
      currencyType: values?.currencyType,
      requestedAmount: Number(
        (values?.requestedAmount ?? "").toString().replace(/\s/g, "")
      ),
    };
    console.log("submitingData:", submitingData);
    setAddModal(false);
    reset();
    toast.success(t("messages.created"));
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: t("modals.del"),
      text: t("modals.delWarn"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#fff",
      confirmButtonText: t("buttons.yDel"),
      cancelButtonText: t("buttons.nCan"),
      focusCancel: true,
      reverseButtons: true,
      customClass: {
        cancelButton: "text-black",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("deleting...");
        toast.success(t("messages.delEd"));
      }
    });
  };

  const columns: any[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }: any) => <div>{page * 10 + (row?.index + 1)}</div>,
    },
    {
      accessorKey: "applicationDate",
      header: ({ column }: any) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("tables.date")}
        </Button>
      ),
      cell: ({ row }: any) => (
        <div className="capitalize text-center">
          {formatDateToDMY(new Date(row.getValue("applicationDate")))}
        </div>
      ),
    },
    {
      accessorKey: "requestedAmount",
      header: () => <div className="text-center">{t("tables.reqAmo")}</div>,
      cell: ({ row }: any) => (
        <div className="text-center">
          {formatNumberWithSpaces(parseFloat(row.getValue("requestedAmount")))}{" "}
          {row.original.currencyType}
        </div>
      ),
    },
    {
      accessorKey: "applicationStatus",
      header: () => <div className="text-center">{t("tables.status")}</div>,
      cell: ({ row }: any) => (
        <div
          className={`text-xs font-bold cursor-pointer hover:opacity-80 text-center ${
            row.getValue("applicationStatus") === "PENDING"
              ? "text-yellow-500"
              : row.getValue("applicationStatus") === "APPROVED"
              ? "text-green-500"
              : row.getValue("applicationStatus") === "REJECTED"
              ? "text-red-500"
              : "text-black"
          }`}
        >
          {row.getValue("applicationStatus") === "PENDING"
            ? t("common.statuses.pending")
            : row.getValue("applicationStatus") === "APPROVED"
            ? t("common.statuses.approved")
            : row.getValue("applicationStatus") === "REJECTED"
            ? t("common.statuses.rejected")
            : "------"}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-center">{t("tables.actions")}</div>,
      cell: ({ row }: any) => (
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(row.getValue("id"));
          }}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: staticApplications,
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
            {t("apps.title")}
          </h2>
          <div>
            <Button className="ml-2" onClick={() => setAddModal(true)}>
              {t("apps.add")}
              <PlusIcon />
            </Button>
          </div>
        </div>
        <div className="max-h-[82%] mt-5 overflow-auto">
          <div className="rounded-md border">
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
                      onClick={() => (
                        setSingleModal(true), setSelectedApp(row.getValue("id"))
                      )}
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
        </div>
        <div className="ml-auto">
          <Pagination currentPage={page + 1} totalPages={1}>
            <PaginationContent>
              <PaginationItem
                className={
                  page === 0
                    ? "cursor-not-allowed pointer-events-none"
                    : "cursor-pointer"
                }
              >
                {page === 0 ? (
                  ""
                ) : (
                  <PaginationPrevious
                    onClick={() => page > 0 && setPage(page - 1)}
                    currentPage={page + 1}
                  />
                )}
              </PaginationItem>
              <PaginationItem className="cursor-pointer">
                <PaginationLink
                  onClick={() => setPage(0)}
                  className={page === 0 ? "bg-blue-500 text-white" : ""}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem
                className={
                  page === 0
                    ? "cursor-not-allowed pointer-events-none"
                    : "cursor-pointer"
                }
              >
                {page < 0 && (
                  <PaginationNext
                    onClick={() => setPage(page + 1)}
                    currentPage={page + 1}
                    totalPages={1}
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <CommonModal
        visible={addModal}
        onClose={handleCloseModal}
        title={t("apps.add")}
      >
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitAddApp)}
              className="flex flex-wrap justify-between gap-5"
            >
              <div className="w-[48%]">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="py-3">{t("tables.category")}</div>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          required
                          value={String(field?.value)}
                        >
                          <SelectTrigger className="focus:outline focus:outline-1 focus:outline-blue-500">
                            <SelectValue
                              placeholder={t("forms.selectCategory")}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {staticCategories.map((category: categoryTypes) => (
                              <SelectItem
                                key={category.id}
                                value={String(category.id)}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[48%]">
                <FormField
                  control={form.control}
                  name="partnerIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="py-3">{t("forms.farm")}</div>
                      </FormLabel>
                      <FormControl>
                        <Select
                          required
                          onValueChange={(value) => {
                            field.onChange(value);
                            const selected = farmPartners?.find(
                              (partner: Partner) =>
                                partner.id.toString() === value
                            );
                            setSelectedPartner(selected || null);
                          }}
                          value={String(field?.value)}
                        >
                          <SelectTrigger className="focus:outline focus:outline-1 focus:outline-blue-500">
                            <SelectValue placeholder={t("forms.selectFarm")} />
                          </SelectTrigger>
                          <SelectContent className="max-h-[400px]">
                            {farmPartners?.map((partner: Partner) => (
                              <SelectItem
                                key={partner.id}
                                value={String(partner.id)}
                              >
                                {partner?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[48%]">
                <FormField
                  control={form.control}
                  name="applicationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="py-3">{t("forms.appDate")}</div>
                      </FormLabel>
                      <FormControl>
                        <Popover
                          open={calendarOpen}
                          onOpenChange={setCalendarOpen}
                        >
                          <PopoverTrigger asChild value={field?.value}>
                            <FormControl>
                              <Button
                                variant="outline"
                                onClick={() => setCalendarOpen(true)}
                              >
                                {field?.value
                                  ? format(parseISO(field?.value), "dd.MM.yyyy")
                                  : t("forms.enterappDate")}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Calendar
                              required
                              mode="single"
                              selected={
                                field?.value
                                  ? parseISO(field?.value)
                                  : undefined
                              }
                              onSelect={(date) => {
                                field.onChange(date?.toISOString());
                                setCalendarOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[48%] flex items-end justify-between gap-1">
                <div className="w-[70%]">
                  <FormField
                    control={form.control}
                    name="requestedAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="py-3">{t("forms.reqAmo")}</div>
                        </FormLabel>
                        <FormControl>
                          <Input
                            required
                            {...field}
                            placeholder={t("forms.enterreqAmo")}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, "");
                              value = value.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                " "
                              );
                              field.onChange(value);
                            }}
                            value={field?.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-[30%]">
                  <FormField
                    control={form.control}
                    name="currencyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            defaultValue="USD"
                            required
                            value={field?.value}
                          >
                            <SelectTrigger className="focus:outline focus:outline-1 focus:outline-blue-500">
                              <SelectValue
                                placeholder={t("forms.currencyType")}
                              />
                            </SelectTrigger>
                            <SelectContent className="">
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="UZS">UZS</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full flex justify-end gap-2">
                <Button type="submit">
                  {t("buttons.submit.applications")}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CommonModal>

      <CommonModal
        visible={singleModal}
        onClose={() => setSingleModal(false)}
        title={t("buttons.det")}
      >
        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              {" ID: "}
              {staticSingleApp?.id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 space-y-4">
              <div className="text-xm font-semibold">
                {t("tables.reqAmo")}:{" "}
                {formatNumberWithSpaces(
                  Number(staticSingleApp.requestedAmount)
                )}{" "}
                {staticSingleApp?.currencyType}
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{t("tables.status")}: </span>
                <span
                  className={`
                    px-2 py-1 text-sm font-medium rounded-lg
                    ${
                      staticSingleApp?.applicationStatus === "APPROVED"
                        ? "bg-green-100 text-green-600"
                        : staticSingleApp?.applicationStatus === "PENDING"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }
                  `}
                >
                  {staticSingleApp?.applicationStatus}
                </span>
              </div>
              <div>
                <span className="font-semibold">{t("tables.date")}: </span>
                <span className="text-gray-700">
                  {staticSingleApp?.applicationDate
                    ? formatDateToDMY(new Date(staticSingleApp.applicationDate))
                    : "N/A"}
                </span>
              </div>
              <div>
                <span className="font-semibold">{t("tables.createdAt")}: </span>
                <span className="text-gray-700">
                  {formatDateToDMY(new Date(staticSingleApp?.createdAt))}{" "}
                  {new Date(staticSingleApp?.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </CommonModal>
    </>
  );
}
