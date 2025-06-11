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
import Modal from "../../../components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { ArrowUpDown, ChevronDown, File, Plus } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAddFile, useCreateDocs, useGetDocs } from "@/queries/docs";
import { CreateDocTypes, GotDocs } from "@/types/doc";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useFinanceContracts } from "@/queries/contracts";
import { GotContractData } from "@/types/contracts";
import { useApplications } from "@/queries/applications";
import { GotAppTypes } from "@/types/apps";
import { useCourtDecisions } from "@/queries/courtDecisions";
import { GotCourtTypes } from "@/types/court";
import CommonModal from "@/components/CommonModal";
import { useRouter } from "next/navigation";
import { useUser } from "@/pages/_app";

const staticData = {
  docsList: {
    data: [
      {
        id: 1,
        entityType: "CONTRACT",
        createdAt: "2025-01-15T10:00:00Z",
        paths: ["https://example.com/files/doc1.pdf"],
      },
      {
        id: 2,
        entityType: "APPLICATION",
        createdAt: "2025-02-20T12:30:00Z",
        paths: ["https://example.com/files/doc2.pdf"],
      },
      {
        id: 3,
        entityType: "COURT_DECISION",
        createdAt: "2025-03-10T15:45:00Z",
        paths: ["https://example.com/files/doc3.pdf"],
      },
    ],
    pages: 3,
  },
  financeContracts: {
    data: [
      { id: 1, number: "CONT-001" },
      { id: 2, number: "CONT-002" },
      { id: 3, number: "CONT-003" },
    ],
  },
  applicationsList: {
    data: [
      { id: 1, requestedAmount: 5000 },
      { id: 2, requestedAmount: 10000 },
      { id: 3, requestedAmount: 7500 },
    ],
  },
  courtDecisions: {
    data: [
      { id: 1, action: "Approved" },
      { id: 2, action: "Rejected" },
      { id: 3, action: "Pending" },
    ],
  },
};

export default function DocumentPage() {
  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "cotton-docs"
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

  const [contsSize, setContsSize] = useState(10);
  const [appsSize, setAppsSize] = useState(10);
  const [courtDSize, setCourtDSize] = useState(10);
  const [page, setPage] = useState<number>(0);

  // const { data: docsList } = useGetDocs(page, 10);
  const { data: financeContracts, refetch: refetchFinanceContracts } =
    useFinanceContracts(0, contsSize);
  const { data: applicationsList } = useApplications(0, appsSize);
  const { data: courtDecisions } = useCourtDecisions(0, courtDSize);

  useEffect(() => {
    refetchFinanceContracts();
  }, [contsSize]);

  const addFile = useAddFile();
  const createDoc = useCreateDocs();

  const { register, handleSubmit, reset } = useForm();

  const form = useForm<CreateDocTypes>({
    defaultValues: {
      entityType: "",
      entityId: 0,
      docType: "",
      uploadedAt: "",
    },
  });

  const [addModal, setAddModal] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [addFileModal, setAddFileModal] = useState(false);
  const [newCreated, setNewCreated] = useState<GotDocs | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<String | "">("CONTRACT");

  const { t } = useTranslation();

  const handleSubnmitDoc = async (data: CreateDocTypes) => {
    const submitingData: CreateDocTypes = {
      entityType: String(data?.entityType),
      entityId: Number(data?.entityId),
    };

    console.log("submitingData in create doc:", submitingData);

    // createDoc.mutate(submitingData, {
    //   onSuccess: (data) => {
    //     setAddModal(false);
    //     form.reset();
    //     setNewCreated(data?.data?.data);
    //     setAddFileModal(true);
    //     toast.message(t("messages.created"));
    //   },
    // });
  };

  const handleAddFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const fileInput = (event.target as HTMLFormElement).elements.namedItem(
      "file"
    ) as HTMLInputElement;

    if (fileInput?.files?.[0]) {
      formData.append("file", fileInput.files[0]);

      if (newCreated?.id) {
        try {
          await addFile.mutateAsync({ id: newCreated.id, formData });
          setAddFileModal(false);
          toast.message(t("messages.uploaded"));
          setNewCreated(null);
        } catch (error) {
          toast.message(t("messages.smtErr"));
        }
      } else {
        toast.message(t("messages.smtErr"));
      }
    }
  };

  const columns: any = [
    {
      accessorKey: "id",
      header: () => <div className="text-xs">N</div>,
      cell: ({ row }: any) => (
        <div className="text-xs">{page * 10 + (row?.index + 1)}</div>
      ),
    },
    {
      accessorKey: "entityType",
      header: ({ column }: any) => (
        <Button
          className="flex items-start justify-start"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("tables.entityType")}
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }:any) => (
        <div>
          {row?.original?.entityType == "APPLICATION"
            ? t("apps.title")
            : row?.original?.entityType == "CONTRACT"
            ? t("conts.title")
            : row?.original?.entityType == "COURT_DECISION"
            ? t("cortD.title")
            : t("conts.title")}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: t("tables.createdAt"),
      cell: ({ row }:any) => (
        <div>
          {new Date(row.getValue("createdAt")).toLocaleDateString("en-GB")}
        </div>
      ),
    },
    {
      accessorKey: "uploadedFile",
      header: () => (
        <div
          className={`${
            access &&
            access[0]?.actions &&
            access[0].actions[0]?.action != "all"
              ? "hidden"
              : ""
          }`}
        >
          {t("tables.uploadedFile")}
        </div>
      ),
      cell: ({ row }: { row: { original: GotDocs } }) => (
        <div
          className={`${
            access &&
            access[0]?.actions &&
            access[0].actions[0]?.action != "all"
              ? "hidden"
              : ""
          }`}
        >
          {row?.original?.paths?.map((link, index) => (
            <a key={index} href={link} download>
              <File className="size-5 text-green-600" />
            </a>
          ))}
        </div>
      ),
    },
  ];

  const tableData = useMemo(() => staticData.docsList.data, []);

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

  return (
    <>
      <div className="w-full h-[99vh] overflow-hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("docs.title")}
          </h2>
          <div
            className={`${
              access &&
              access[0]?.actions &&
              access[0].actions[0]?.action != "all"
                ? "hidden"
                : ""
            }`}
          >
            <Button onClick={() => setAddModal(true)}>
              <Plus />
              Hujjat qo'shish
            </Button>
          </div>
        </div>
        <div className="max-h-[82%] mt-5 overflow-auto">
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
                    <TableRow className="h-[40px]" key={row.id}>
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
          <Pagination
            currentPage={page + 1}
            totalPages={staticData.docsList.pages}
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
              {Array.from({ length: staticData.docsList.pages }).map(
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
                {page < staticData.docsList.pages - 1 && (
                  <PaginationNext
                    onClick={() => setPage(page + 1)}
                    currentPage={page + 1}
                    totalPages={staticData.docsList.pages}
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <CommonModal
        visible={addModal}
        title={t("modals.addDocs")}
        onClose={() => setAddModal(false)}
      >
        <div className="w-[500px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubnmitDoc)}
              className="flex flex-wrap justify-between gap-5"
            >
              {/* entityType */}
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="entityType"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("forms.selectEntity")}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedEntity(value);
                          }}
                          defaultValue={"CONTRACT"}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t("forms.selectEntity")}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CONTRACT">
                              {t("conts.title")}
                            </SelectItem>
                            <SelectItem value="APPLICATION">
                              {t("apps.title")}
                            </SelectItem>
                            <SelectItem value="COURT_DECISION">
                              {t("cortD.title")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {selectedEntity == "CONTRACT" ? (
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="entityId"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("layout.nav.conts")}</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t("forms.selectContract")}
                              />
                            </SelectTrigger>
                            <SelectContent
                              style={{ height: "200px", overflowY: "auto" }}
                              onScroll={(e) => {
                                if (e.currentTarget.scrollTop % 20 === 0) {
                                  setContsSize((prev) => prev + 10);
                                }
                              }}
                            >
                              {financeContracts?.data?.map(
                                (contract: GotContractData) => (
                                  <SelectItem
                                    key={contract.id}
                                    value={contract.id.toString()}
                                  >
                                    {contract.number}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : selectedEntity == "APPLICATION" ? (
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="entityId"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("apps.title")}</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t("forms.selectApp")} />
                            </SelectTrigger>
                            <SelectContent>
                              {applicationsList?.data?.map(
                                (contract: GotAppTypes) => (
                                  <SelectItem
                                    key={contract.id}
                                    value={contract.id.toString()}
                                  >
                                    {contract.requestedAmount}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : selectedEntity == "COURT_DECISION" ? (
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="entityId"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("layout.nav.cortD")}</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t("forms.selectCD")} />
                            </SelectTrigger>
                            <SelectContent>
                              {courtDecisions?.data?.map(
                                (contract: GotCourtTypes) => (
                                  <SelectItem
                                    key={contract.id}
                                    value={contract.id.toString()}
                                  >
                                    {contract.action}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                ""
              )}
              <Button variant={"add"} className="mt-5" type="submit">
                {t("buttons.submit.document")}
              </Button>
            </form>
          </Form>
        </div>
      </CommonModal>

      {addFileModal && (
        <Modal
          title={t("modals.addFile")}
          onClose={() => setAddFileModal(false)}
          content={
            <div>
              <form className="flex flex-col gap-4" onSubmit={handleAddFile}>
                <div>
                  <label
                    htmlFor="file"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("forms.upload")}
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <Button type="submit">{t("buttons.submit.file")}</Button>
              </form>
            </div>
          }
        />
      )}
    </>
  );
}
