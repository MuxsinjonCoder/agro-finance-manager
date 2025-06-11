"use client";

import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useFinanceCategories,
  useCreateFinanceCategory,
  useDeleteFinanceCategory,
  useFinanceCategory,
  useUpdateFinanceCategory,
} from "@/queries/categories";
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
  Edit,
  FileText,
  MoreHorizontal,
  MoreVertical,
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import Loader from "@/components/ui/loader";
import Swal from "sweetalert2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateCategory, GotCategory } from "@/types/category";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useUser } from "@/pages/_app";

const staticFinanceCategories = {
  data: [
    {
      id: "1",
      name: "Salary",
      description: "Monthly salary income",
      createdAt: "2023-10-01T08:30:00Z",
    },
    {
      id: "2",
      name: "Freelance",
      description: "Income from freelance work",
      createdAt: "2023-09-15T10:15:00Z",
    },
    {
      id: "3",
      name: "Investments",
      description: "Income from various investments",
      createdAt: "2023-08-20T14:45:00Z",
    },
    {
      id: "4",
      name: "Rent",
      description: "Income from rental properties",
      createdAt: "2023-07-05T09:20:00Z",
    },
    {
      id: "5",
      name: "Bonus",
      description: "Annual bonus from employer",
      createdAt: "2023-06-18T16:10:00Z",
    },
    {
      id: "6",
      name: "Gifts",
      description: "Money received as gifts",
      createdAt: "2023-05-22T11:05:00Z",
    },
    {
      id: "7",
      name: "Side Projects",
      description: "Income from side projects",
      createdAt: "2023-04-30T13:50:00Z",
    },
    {
      id: "8",
      name: "Dividends",
      description: "Dividends from stocks",
      createdAt: "2023-03-10T15:35:00Z",
    },
    {
      id: "9",
      name: "Royalties",
      description: "Royalties from intellectual property",
      createdAt: "2023-02-28T12:25:00Z",
    },
    {
      id: "10",
      name: "Other Income",
      description: "Miscellaneous income sources",
      createdAt: "2023-01-14T09:55:00Z",
    },
  ],
  pages: 1,
};

const staticSingleCtg = {
  data: {
    id: "1",
    name: "Salary",
    description: "Monthly salary income",
    createdAt: "2023-10-01T08:30:00Z",
  },
};

export default function DataTableDemo() {
  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "guide-cats"
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

  const [page, setPage] = React.useState<number>(0);
  const [selectedCtg, setSelectedCtg] = React.useState("");

  const [singleModal, setSingleModal] = React.useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const {
    data: financeCategories,
    isLoading,
    error,
  } = { data: staticFinanceCategories, error: false, isLoading: false };
  const {
    data: singleCtg,
    isLoading: singleCtgLoading,
    error: singleCtgError,
    refetch: refetchSingle,
  } = {
    data: staticSingleCtg,
    error: false,
    isLoading: false,
    refetch: () => {},
  };

  // const {
  //   data: financeCategories,
  // isLoading,
  // error,
  // } = useFinanceCategories(page, 10);
  // const {
  //   data: singleCtg,
  // isLoading: singleCtgLoading,
  // error: singleCtgError,
  // refetch: refetchSingle,
  // } = useFinanceCategory(selectedCtg);
  const createCategory = useCreateFinanceCategory();
  const updateCategory = useUpdateFinanceCategory();
  const deleteCategory = useDeleteFinanceCategory();
  const { register, handleSubmit, watch, reset, setValue } =
    useForm<CreateCategory>();

  const { t } = useTranslation();

  const formValues = watch();
  React.useEffect(() => {
    if (formValues.name || formValues.description) {
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
        reset(); // Reset the form
      }
    } else {
      setAddModal(false);
    }
  };

  function useDebounce(cb: string, delay: number) {
    const [debounceValue, setDebounceValue] = React.useState(cb);
    React.useEffect(() => {
      const handler = setTimeout(() => {
        setDebounceValue(cb);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [cb, delay]);
    return debounceValue;
  }

  const onSubmit: SubmitHandler<CreateCategory> = (data) => {
    console.log(data);
    // createCategory.mutate(data, {
    //   onSuccess: (res) => {
    //     if (res.status === "BAD_REQUEST") {
    //       toast.error(res.message);
    //     } else if (res.status === "OK") {
    //       setAddModal(false);
    //       reset();
    //       setHasUnsavedChanges(false);
    //       toast.message(t("messages.created"));
    //     }
    //   },
    //   onError: () => {
    //     toast.error(t("err"));
    //   },
    // });
  };

  const onSubmitUpdate: SubmitHandler<CreateCategory> = (data) => {
    updateCategory.mutate(
      { id: selectedCtg, data: { ...data } },
      {
        onSuccess: () => {
          setEditModal(false);
          reset();
          refetchSingle();
          toast.message(t("messages.updated"));
        },
        // onError: () => toast.error(t("err")),
      }
    );
  };

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
        // deleteCategory.mutate(id, {
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

  const columns: ColumnDef<GotCategory>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>{page * 10 + (row?.index + 1)}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div className="flex cursor-pointer min-w-[150px] max-w-[300px] truncate items-center">
          {t("tables.name")}
        </div>
      ),
      cell: ({ row }) => (
        <div className="capitalize min-w-[150px] max-w-[300px] truncate">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: t("tables.desc"),
      cell: ({ row }) => (
        <div className="min-w-[150px] max-w-[300px] truncate">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: t("tables.createdAt"),
      cell: ({ row }) => (
        <div className="min-w-[150px] max-w-[300px] truncate">
          {format(new Date(row.getValue("createdAt")), "dd.MM.yyyy")}
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
      cell: ({ row }) => (
        <div
          className={`flex justify-center ${
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
                  handleDelete(row.original.id);
                }}
              >
                <Trash2 className="w-4 h-4 text-red-500 mr-2" />{" "}
                {t("buttons.del")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCtg(row.original.id);
                  setEditModal(true);
                  setValue("name", row.original.name);
                  setValue("description", row.original.description);
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
    () => financeCategories?.data ?? [],
    [financeCategories]
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-[99vh] overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{t("cat.title")}</h2>
        <div
          className={`${
            access &&
            access[0]?.actions &&
            access[0].actions[0]?.action != "all"
              ? "hidden"
              : ""
          }`}
        >
          <Button className="ml-2" onClick={() => setAddModal(true)}>
            {t("cat.add")}
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
                      setSelectedCtg(row.getValue("id"));
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
            totalPages={financeCategories?.pages || 1}
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
              {Array.from({ length: financeCategories?.pages || 1 }).map(
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
                {page < (financeCategories?.pages || 1) - 1 && (
                  <PaginationNext
                    onClick={() => setPage(page + 1)}
                    currentPage={page + 1}
                    totalPages={financeCategories?.pages || 1}
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <CommonModal
          title={t("cat.add")}
          visible={addModal}
          onClose={handleCloseModal}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder={t("forms.name")}
              {...register("name", { required: true })}
              className="mb-2"
            />
            <Input
              placeholder={t("forms.desc")}
              {...register("description", { required: true })}
              className="mb-2"
            />
            <div className="flex gap-2 justify-end">
              <Button
                onClick={handleCloseModal}
                className="text-end"
                variant="outline"
              >
                {t("buttons.can")}
              </Button>
              <Button type="submit" className="text-end">
                {t("buttons.submit.categories")}
              </Button>
            </div>
          </form>
        </CommonModal>

        <CommonModal
          title={t("buttons.ed")}
          visible={editModal}
          onClose={() => (setEditModal(false), reset())}
        >
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            <Input
              {...register("name", { required: true })}
              placeholder={t("forms.name")}
              className="mb-2"
            />
            <Input
              {...register("description", { required: true })}
              placeholder={t("forms.desc")}
              className="mb-2"
            />
            <div className="flex p-1 gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => (setEditModal(false), reset())}
              >
                {t("buttons.can")}
              </Button>
              <Button type="submit">{t("buttons.ed")}</Button>
            </div>
          </form>
        </CommonModal>

        <CommonModal
          visible={singleModal}
          onClose={() => setSingleModal(false)}
          title={t("buttons.det")}
        >
          {singleCtgLoading ? (
            <div className="flex justify-center py-6">
              <Loader />
            </div>
          ) : singleCtgError ? (
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
                  <FileText className="w-5 h-5 text-blue-500" />{" "}
                  {singleCtg?.data?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* ID */}
                <div className="text-gray-700">
                  <span className="font-semibold">{t("tables.id")}: </span>
                  {singleCtg?.data?.id}
                </div>

                {/* Description */}
                <div className="text-gray-600">
                  <span className="font-semibold">
                    {t("tables.description")}:{" "}
                  </span>
                  {singleCtg?.data?.description || t("common.noDescription")}
                </div>

                {/* Created At Date */}
                <div className="text-gray-500 text-sm">
                  <span className="font-semibold">
                    {t("tables.createdAt")}:{" "}
                  </span>
                  {new Date(singleCtg?.data?.createdAt).toLocaleDateString()}{" "}
                  {new Date(singleCtg?.data?.createdAt).toLocaleTimeString()}
                </div>
              </CardContent>
            </Card>
          )}
        </CommonModal>
      </div>
    </div>
  );
}
