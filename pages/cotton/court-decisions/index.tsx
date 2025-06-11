"use client";

import * as React from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
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
  CalendarIcon,
  ChevronDown,
  FileText,
  Gavel,
  Loader,
  MoreHorizontal,
  Plus,
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
import CommonModal from "@/components/CommonModal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

interface CourtDecision {
  id: string;
  action: string;
  note: string;
  decisionDocument: string;
  decisionDate: string;
  createdAt: string;
}

interface Contract {
  id: string;
  number: string;
}

const staticCourtDecisions: CourtDecision[] = [
  {
    id: "1",
    action: "Payment Enforcement",
    note: "Court ordered immediate payment of outstanding debt.",
    decisionDocument: "/documents/decision1.pdf",
    decisionDate: "2025-01-15T10:00:00Z",
    createdAt: "2025-01-15T10:30:00Z",
  },
  {
    id: "2",
    action: "Contract Termination",
    note: "Termination due to breach of contract terms.",
    decisionDocument: "/documents/decision2.pdf",
    decisionDate: "2025-02-20T12:00:00Z",
    createdAt: "2025-02-20T12:30:00Z",
  },
  {
    id: "3",
    action: "Penalty Imposed",
    note: "Penalty for late delivery of goods.",
    decisionDocument: "/documents/decision3.pdf",
    decisionDate: "2025-03-10T09:00:00Z",
    createdAt: "2025-03-10T09:15:00Z",
  },
];

const staticContracts: Contract[] = [
  { id: "101", number: "CTR-2025-001" },
  { id: "102", number: "CTR-2025-002" },
  { id: "103", number: "CTR-2025-003" },
];

const staticSingleCourtDecision: CourtDecision = {
  id: "1",
  action: "Payment Enforcement",
  note: "Court ordered immediate payment of outstanding debt.",
  decisionDocument: "/documents/decision1.pdf",
  decisionDate: "2025-01-15T10:00:00Z",
  createdAt: "2025-01-15T10:30:00Z",
};

export default function CourtDecisionsPage() {
  const router = useRouter();
  const user = {
    data: {
      role: [{ dtoList: [{ name: "cotton-cortD", actions: [{ action: "all" }] }] }],
    },
  };
  const { t } = useTranslation();

  const [page, setPage] = React.useState<number>(0);
  const [selectedCourt, setSelectedCourt] = React.useState<string>("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [singleModal, setSingleModal] = React.useState(false);
  const [addModal, setAddModal] = React.useState(false);
  const [sorting, setColumnSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const form = useForm({
    defaultValues: {
      contractId: "",
      decisionDate: "",
      action: "",
      note: "",
      decisionDocument: "",
    },
    mode: "onChange",
  });

  const { isDirty } = form.formState;

  const handleCloseModal = () => {
    if (isDirty) {
      const confirmClose = window.confirm(
        "Your inputted data will be lost. Are you sure you want to close?"
      );
      if (confirmClose) {
        setAddModal(false);
        form.reset();
      }
    } else {
      setAddModal(false);
    }
  };

  const onSubmit = async (data: {
    contractId: string;
    decisionDate: string;
    action: string;
    note: string;
    decisionDocument: string;
  }) => {
    const submittingData = {
      contractId: Number(data.contractId),
      decisionDate: String(data.decisionDate),
      action: String(data.action),
      note: String(data.note),
      decisionDocument: String(data.decisionDocument),
    };
    console.log("submittingData:", submittingData);
    setAddModal(false);
    form.reset();
    toast.success(t("messages.created"));
  };

  const columns: ColumnDef<CourtDecision>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>{page * 10 + (row.index + 1)}</div>,
    },
    {
      accessorKey: "action",
      header: ({ column }) => (
        <div className="flex items-center cursor-pointer">{t("tables.name")}</div>
      ),
      cell: ({ row }) => <div className="capitalize">{row.getValue("action")}</div>,
    },
    {
      accessorKey: "note",
      header: t("tables.note"),
      cell: ({ row }) => <div>{row.getValue("note")}</div>,
    },
    {
      accessorKey: "decisionDate",
      header: t("tables.decisionDate"),
      cell: ({ row }) => (
        <div>{format(new Date(row.getValue("decisionDate")), "dd.MM.yyyy")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: t("tables.createdAt"),
      cell: ({ row }) => (
        <div>{format(new Date(row.getValue("createdAt")), "dd.MM.yyyy")}</div>
      ),
    },
  ];

  const table = useReactTable({
    data: staticCourtDecisions,
    columns,
    onSortingChange: setColumnSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting: sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full h-[99vh] overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{t("cortD.title")}</h2>
        <div>
          <Button className="ml-2" onClick={() => setAddModal(true)}>
            {t("cortD.add")}
            <Plus />
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
                      {flexRender(header.column.columnDef.header, header.getContext())}
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
                      setSelectedCourt(row.getValue("id"));
                      setSingleModal(true);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {t("common.noData")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="ml-auto">
          <Pagination currentPage={page + 1} totalPages={1}>
            <PaginationContent>
              <PaginationItem>
                {page === 0 ? "" : (
                  <PaginationPrevious
                    onClick={() => page > 0 && setPage(page - 1)}
                    currentPage={page + 1}
                  />
                )}
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => setPage(0)}
                  isActive={page === 0}
                  className={page === 0 ? "bg-[#3BB5DC] text-white" : ""}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
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

      <CommonModal title={t("cortD.add")} visible={addModal} onClose={handleCloseModal}>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="contractId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("conts.cont")}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <SelectTrigger className="focus:outline focus:outline-1 focus:outline-background">
                        <SelectValue placeholder={t("forms.selectContract")} />
                      </SelectTrigger>
                      <SelectContent>
                        {staticContracts.map((contract: Contract) => (
                          <SelectItem key={contract.id} value={String(contract.id)}>
                            {contract.number}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="decisionDate"
              render={({ field }:any) => (
                <FormItem>
                  <FormLabel>{t("tables.decisionDate")}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline">
                          {field.value
                            ? format(parseISO(field.value), "dd.MM.yyyy")
                            : t("tables.enterdecisionDate")}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        required
                        mode="single"
                        selected={field.value ? parseISO(field.value) : undefined}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("tables.actions")}</FormLabel>
                  <FormControl>
                    <Input required {...field} placeholder={t("tables.enteractions")} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("tables.note")}</FormLabel>
                  <FormControl>
                    <Input required {...field} placeholder={t("tables.enternote")} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-2 justify-end">
              <Button type="button" onClick={handleCloseModal} variant="outline">
                {t("buttons.can")}
              </Button>
              <Button type="submit">{t("buttons.add")}</Button>
            </div>
          </form>
        </FormProvider>
      </CommonModal>

      <CommonModal
        visible={singleModal}
        onClose={() => setSingleModal(false)}
        title={t("buttons.det")}
      >
        <Card className="p-4 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Gavel className="w-5 h-5 text-red-500" />
              {staticSingleCourtDecision.action || t("tables.noAction")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-gray-700">
              <span className="font-semibold">{t("tables.id")}: </span>
              {staticSingleCourtDecision.id}
            </div>
            <div className="text-gray-700">
              <span className="font-semibold">{t("tables.decisionDate")}: </span>
              {new Date(staticSingleCourtDecision.decisionDate).toLocaleDateString()}{" "}
              {new Date(staticSingleCourtDecision.decisionDate).toLocaleTimeString()}
            </div>
            <div className="border-t pt-3">
              <p className="text-lg font-semibold text-gray-800">{t("tables.note")}</p>
              <p className="text-gray-700">
                {staticSingleCourtDecision.note || t("tables.noNote")}
              </p>
            </div>
            {staticSingleCourtDecision.decisionDocument && (
              <div className="border-t pt-3">
                <p className="text-lg font-semibold text-gray-800">
                  {t("tables.decisionDocument")}
                </p>
                <a
                  href={staticSingleCourtDecision.decisionDocument}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {t("tables.viewDocument")}
                </a>
              </div>
            )}
            <div className="text-gray-500 text-sm border-t pt-3">
              <span className="font-semibold">{t("tables.createdAt")}: </span>
              {new Date(staticSingleCourtDecision.createdAt).toLocaleDateString()}{" "}
              {new Date(staticSingleCourtDecision.createdAt).toLocaleTimeString()}
            </div>
          </CardContent>
        </Card>
      </CommonModal>
    </div>
  );
}