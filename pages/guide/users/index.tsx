"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useRoles,
  useCreateRole,
  useDeleteRole,
  useUpdateRole,
} from "@/queries/roles";
import { CreateRoleRequest, UpdateRoleRequest } from "@/types/role";
import {
  ArrowUpDown,
  ChevronDown,
  Edit,
  Eye,
  MoreVertical,
  Plus,
  PlusCircle,
  Trash2,
  UserRoundX,
} from "lucide-react";
import { toast } from "sonner";
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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTranslation, getI18n } from "react-i18next";
import { format } from "date-fns";
import Modal from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getPermissionData from "@/constants/get-permission-data";
import PermissionsModalData from "@/components/guide/roles/perms-modal";
import {
  useDeleteUser,
  useDeleteUserRole,
  useGetAllUsers,
} from "@/queries/users";
import { GotUsers } from "@/types/users";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AddUserForm from "@/components/guide/users/add-user-moda";
import AddroleToUser from "@/components/guide/users/add-role-to-user";
import EditUserForm from "@/components/guide/users/edit-user-form";
import DeleteRoleFromUser from "@/components/guide/users/delete-role-from-user";
import { useUser } from "@/pages/_app";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const staticAllUsers = {
  data: [
    {
      id: "1",
      fullName: "John Doe",
      email: "john.doe@example.com",
      role: [
        {
          id: "1",
          name: "Admin",
          permissions: [
            { page: "Dashboard", actions: ["read", "write", "delete"] },
            { page: "Users", actions: ["read", "write"] },
          ],
        },
      ],
    },
    {
      id: "2",
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      role: [
        {
          id: "2",
          name: "Editor",
          permissions: [
            { page: "Dashboard", actions: ["read"] },
            { page: "Articles", actions: ["read", "write"] },
          ],
        },
      ],
    },
    {
      id: "3",
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: [
        {
          id: "3",
          name: "Viewer",
          permissions: [
            { page: "Dashboard", actions: ["read"] },
            { page: "Reports", actions: ["read"] },
          ],
        },
      ],
    },
    {
      id: "4",
      fullName: "Bob Brown",
      email: "bob.brown@example.com",
      role: [
        {
          id: "4",
          name: "Manager",
          permissions: [
            { page: "Dashboard", actions: ["read", "write"] },
            { page: "Users", actions: ["read"] },
          ],
        },
      ],
    },
    {
      id: "5",
      fullName: "Charlie Davis",
      email: "charlie.davis@example.com",
      role: [],
    },
    {
      id: "6",
      fullName: "David Wilson",
      email: "david.wilson@example.com",
      role: [
        {
          id: "5",
          name: "Contributor",
          permissions: [
            { page: "Articles", actions: ["read", "write"] },
            { page: "Comments", actions: ["read", "write"] },
          ],
        },
      ],
    },
    {
      id: "7",
      fullName: "Eve Martinez",
      email: "eve.martinez@example.com",
      role: [
        {
          id: "6",
          name: "Moderator",
          permissions: [
            { page: "Comments", actions: ["read", "write", "delete"] },
            { page: "Users", actions: ["read"] },
          ],
        },
      ],
    },
    {
      id: "8",
      fullName: "Frank Anderson",
      email: "frank.anderson@example.com",
      role: [],
    },
    {
      id: "9",
      fullName: "Grace Lee",
      email: "grace.lee@example.com",
      role: [
        {
          id: "7",
          name: "Analyst",
          permissions: [
            { page: "Reports", actions: ["read", "write"] },
            { page: "Dashboard", actions: ["read"] },
          ],
        },
      ],
    },
    {
      id: "10",
      fullName: "Henry Clark",
      email: "henry.clark@example.com",
      role: [
        {
          id: "8",
          name: "Developer",
          permissions: [
            { page: "Settings", actions: ["read", "write"] },
            { page: "Dashboard", actions: ["read"] },
          ],
        },
      ],
    },
  ],
  pages: 1,
};

const roleFormSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  permissions: z.array(
    z.object({
      page: z.string(),
      actions: z.array(z.string()),
    })
  ),
});

interface Permissions {
  [key: string]: {
    [key: string]: boolean;
  };
}

type RoleFormValues = z.infer<typeof roleFormSchema>;

export default function userPage() {
  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "guide-users"
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

  // State
  const [page, setPage] = useState<number>(0);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<GotUsers | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [permsModalOpen, setPermsModalOpen] = useState(false);
  const [editRoleModal, setEditRoleModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [addRoleModal, setAddRoleModal] = useState(false);
  const [newCreatedUser, setNewCreatedUser] = useState<any | null>(null);
  const [deleteRoleModal, setDeleteRoleModal] = useState(false);
  const [deletingRoleFromUser, setDeletingRoleFromUser] = useState<any | null>(
    null
  );

  // Hooks
  const {
    data: allUsers,
    isLoading,
    refetch,
  } = { data: staticAllUsers, isLoading: false, refetch: () => {} };

  const { t } = useTranslation();
  // const { data: allUsers, isLoading, refetch } = useGetAllUsers(page, 10);
  const createRole = useCreateRole();
  const deleteUser = useDeleteUser();
  const updateRole = useUpdateRole();
  const deleteUserRole = useDeleteUserRole();

  const PERMISSIONS_DATA = getPermissionData();

  // Form
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: "",
      permissions: [],
    },
  });

  const editForm = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: "",
      permissions: [],
    },
  });

  const { fields, prepend, remove } = useFieldArray({
    control: form.control,
    name: "permissions",
  });

  const {
    fields: editFileds,
    prepend: editPrepend,
    remove: editRemove,
  } = useFieldArray({
    control: editForm.control,
    name: "permissions",
  });

  // Handlers
  const handleCloseAddEditModal = () => {
    setAddModal(false);
    setEditModal(false);
    setSelectedUser(null);
    form.reset();
  };

  const handleCloseDeleteModal = () => {
    setConfirmDeleteModal(false);
    setSelectedUser(null);
  };

  const handleAddPermission = () => {
    prepend(
      {
        page: "",
        actions: [],
      },
      { shouldFocus: true }
    );
  };

  const handlePageSelect = (value: string, index: number) => {
    form.setValue(`permissions.${index}.page`, value);
    const selectedPage = PERMISSIONS_DATA.find((p) => p.name === value);
    const activePermissions =
      selectedPage?.permissions
        .filter((permission) => permission.active)
        .map((permission) => permission.value) || [];
    form.setValue(`permissions.${index}.actions`, activePermissions);
  };

  const handlePermissionChange = (
    checked: boolean,
    currentValue: string[],
    permissionValue: string,
    onChange: (value: string[]) => void
  ) => {
    const newValue = checked
      ? [...currentValue, permissionValue]
      : currentValue.filter((value) => value !== permissionValue);
    onChange(newValue);
  };

  const handleDelete = (role: GotUsers) => {
    setSelectedUser(role);
    setConfirmDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      console.log("deleting");
      // deleteUser.mutate(selectedUser.id, {
      //   onSuccess: (response) => {
      //     if (response.status === "OK") {
      //       toast.message(t("messages.delEd"));
      //       handleCloseDeleteModal();
      //     } else {
      //       toast.error(t("messages.smtErr"));
      //     }
      //   },
      //   onError: (error) => {
      //     const errorMessage =
      //       error instanceof Error ? error.message : t("messages.smtErr");
      //     toast.error(errorMessage);
      //   },
      // });
    }
  };

  const handleDeleteUserRole = () => {
    if (deletingRoleFromUser) {
      console.log("deleting");
      // deleteUserRole.mutate(
      //   {
      //     userId: deletingRoleFromUser?.id,
      //     roleId: deletingRoleFromUser?.role[0]?.id,
      //   },
      //   {
      //     onSuccess: (response) => {
      //       if (response.status === "OK") {
      //         toast.message(t("messages.delEd"));
      //         setDeletingRoleFromUser(null);
      //         setDeleteRoleModal(false);
      //       } else {
      //         toast.error(t("messages.smtErr"));
      //       }
      //     },
      //     onError: (error) => {
      //       console.log("error", error);
      //       const errorMessage =
      //         error instanceof Error ? error.message : t("messages.smtErr");
      //       toast.error(errorMessage);
      //     },
      //   }
      // );
    }
  };

  const onEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = editForm.getValues();

    const updateData: UpdateRoleRequest = {
      id: editingUser.id,
      name: data.name,
    };

    console.log("updateData", updateData);
    // toast.error(t("messages.err"));
    setEditRoleModal(false);

    // updateRole.mutate(updateData, {
    //   onSuccess: () => {
    //     editForm.reset();
    //     setEditRoleModal(false);
    //     setEditingUser(null);
    //     toast.success(t("messages.updated"));
    //   },
    // });
  };

  // Helpers
  const isPageSelected = (pageName: string, currentIndex: number) => {
    return fields.some(
      (_, index) =>
        index !== currentIndex &&
        form.watch(`permissions.${index}.page`) === pageName
    );
  };

  const getAvailablePages = () => {
    const selectedPages = fields.map((_, index) =>
      form.watch(`permissions.${index}.page`)
    );
    return PERMISSIONS_DATA.filter(
      (page) => !selectedPages.includes(page.name)
    );
  };

  // Table configuration
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "№",
      cell: ({ row }: { row: { index: number } }) => (
        <div>{page * 10 + (row.index + 1)}</div>
      ),
    },
    {
      accessorKey: "name",
      header: t("tables.fullName"),
      cell: ({ row }) => (
        <div className="min-w-[150px] max-w-[300px] truncate">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="truncate">{row.original.fullName}</div>
              </TooltipTrigger>
              <TooltipContent>{row.original.fullName}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: t("tables.email"),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="truncate">{row.original.email || "-----"}</div>
              </TooltipTrigger>
              <TooltipContent>{row.original.email || "-----"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: t("tables.role"),
      cell: ({ row }) => (
        <div>
          <div className="max-w-[90%] truncate">
            {row?.original?.role[0]?.name ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      onClick={() => {
                        setPermsModalOpen(true);
                        setSelectedUser(row?.original);
                      }}
                      className="truncate cursor-pointer"
                    >
                      {row?.original?.role[0]?.name}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {row?.original?.role[0]?.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <span className="text-red-600 font-medium">Rol berilmagan</span>
            )}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
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
          {t("tables.actions")}
        </div>
      ),
      cell: ({ row }) => {
        const role = row.original;
        return (
          <div
            className={`flex items-center gap-5 ${
              access &&
              access[0]?.actions &&
              access[0].actions[0]?.action != "all"
                ? "hidden"
                : ""
            }`}
          >
            <Popover>
              <PopoverTrigger asChild>
                <MoreVertical className="cursor-pointer transition-all duration-300 hover:scale-[1.2]" />
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="flex flex-col gap-5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          onClick={() => handleDelete(role)}
                          className="flex items-center gap-0 max-w-44 truncate cursor-pointer"
                        >
                          <Trash2 className="size-5 text-red-500 mr-2 cursor-pointer transition-all duration-300 hover:scale-[1.2]" />
                          <span className="text-xs">O'chirish</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Foydalanuvchini o'chirish</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          onClick={(e) => {
                            setEditRoleModal(true);
                            setEditingUser(role);
                          }}
                          className="flex items-center cursor-pointer gap-0 max-w-44 truncate"
                        >
                          <Edit className="size-5 text-primary mr-2 cursor-pointer transition-all duration-300 hover:scale-[1.2]" />
                          <span className="text-xs">Tahrirlash</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        Foydalanuvchini tahrirlash
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div>
                    {row?.original?.role[0]?.name ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              onClick={() => {
                                setDeletingRoleFromUser(row?.original);
                                setDeleteRoleModal(true);
                              }}
                              className="flex items-center gap-2 max-w-44 cursor-pointer truncate"
                            >
                              <UserRoundX className="text-red-600 transition-all duration-300 hover:scale-[1.2] cursor-pointer size-5" />
                              <span className="text-xs">Rolni o'chirish</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>Rolni o'chirish</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              onClick={() => {
                                setAddRoleModal(true);
                                setNewCreatedUser({ data: row?.original });
                              }}
                              className="flex items-center gap-2 max-w-44 truncate cursor-pointer"
                            >
                              <PlusCircle className="size-5 text-primary cursor-pointer transition-all duration-300 hover:scale-[1.2]" />
                              <span className="text-xs">Rol biriktirish</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>Rol biriktirish</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: allUsers?.data || [],
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
          <h2 className="text-xl lg:text-3xl font-bold tracking-tight">
            {t("layout.nav.users")}
          </h2>
          <div
            className={`flex items-center space-x-2 ${
              access &&
              access[0]?.actions &&
              access[0].actions[0]?.action != "all"
                ? "hidden"
                : ""
            }`}
          >
            <Button
              onClick={() => setAddModal(true)}
              loading={createRole.isLoading}
            >
              <Plus className="mr-2 h-4 w-4 hidden lg:block" />{" "}
              <span className="text-xs lg:text-sm">{t("buttons.addUser")}</span>
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
                      <TableHead className="text-[14px]" key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24">
                      <div className="flex justify-center items-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
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
        {/* pagination buttons */}
        <div className="ml-auto">
          <Pagination currentPage={page + 1} totalPages={allUsers?.pages || 1}>
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
              {Array.from({ length: allUsers?.pages || 1 }).map((_, index) => (
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
                {page < (allUsers?.pages || 1) - 1 && (
                  <PaginationNext
                    onClick={() => setPage(page + 1)}
                    currentPage={page + 1}
                    totalPages={allUsers?.pages || 1}
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* add modal */}
      <CommonModal
        width="650px"
        title={t("buttons.addUser")}
        visible={addModal}
        onClose={() => {
          setAddModal(false);
        }}
      >
        <AddUserForm
          setAddModal={setAddModal}
          refetch={refetch}
          setAddRoleModal={setAddRoleModal}
          setNewCreatedUser={setNewCreatedUser}
        />
      </CommonModal>

      {/* confirm delete user modal */}
      <CommonModal
        width="650px"
        visible={confirmDeleteModal}
        onClose={handleCloseDeleteModal}
        title="Rostdan ham foydalanuvchini o'chirmoqchimisiz?"
      >
        <div className="flex items-center justify-between gap-5 ">
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            {t("buttons.nCan")}
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            loading={deleteUser.isLoading}
          >
            {t("buttons.yDel")}
          </Button>
        </div>
      </CommonModal>

      {/* permissions see modal */}
      <CommonModal
        width="650px"
        title={`${t("roles.perms")}: ${selectedUser?.fullName}`}
        visible={permsModalOpen}
        onClose={() => {
          setPermsModalOpen(false);
          setSelectedUser(null);
        }}
      >
        <PermissionsModalData selectedRole={selectedUser?.role[0]} />
      </CommonModal>

      {/* edit role modal */}
      <CommonModal
        width="450px"
        title={"Foydalanuvchi ma'lumotlarini o'zgartirish"}
        visible={editRoleModal}
        onClose={() => {
          setEditRoleModal(false);
          setEditingUser(null);
          refetch();
        }}
      >
        <EditUserForm
          setEditRoleModal={setEditRoleModal}
          editingUser={editingUser}
        />
      </CommonModal>

      {/* add role modal */}
      <CommonModal
        width="400px"
        visible={addRoleModal}
        onClose={() => {
          setAddRoleModal(false);
          setNewCreatedUser(null);
          refetch();
        }}
        title="Foydalanuvchiga role qo'shish"
      >
        <AddroleToUser
          newCreatedUser={newCreatedUser}
          setAddRoleModal={setAddRoleModal}
          refetch={refetch}
        />
      </CommonModal>

      {/* confirm delete role modal */}
      <CommonModal
        visible={deleteRoleModal}
        onClose={() => {
          setDeleteRoleModal(false);
          setDeletingRoleFromUser(null);
        }}
        title="Rostdan ham foydalanuvchidan roleni o'chirmoqchimisiz?"
      >
        <div className="flex items-center justify-between gap-5 ">
          <Button variant="secondary" onClick={() => setDeleteRoleModal(false)}>
            {t("buttons.nCan")}
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteUserRole}
            loading={deleteUserRole.isLoading}
          >
            {t("buttons.yDel")}
          </Button>
        </div>
      </CommonModal>
    </>
  );
}
