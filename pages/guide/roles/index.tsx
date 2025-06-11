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
  useUpdateRolePermissions,
} from "@/queries/roles";
import { CreateRoleRequest, UpdateRoleRequest, Role } from "@/types/role";
import {
  ArrowUpDown,
  ChevronDown,
  Edit,
  Eye,
  MoreVertical,
  Plus,
  Trash2,
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
import AddRoleForm from "@/components/guide/roles/add-form";
import PermissionsModal from "@/components/guide/roles/perms-modal";
import EditRoleForm from "@/components/guide/roles/edit-form";
import PermissionsModalData from "@/components/guide/roles/perms-modal";
import { useRouter } from "next/navigation";
import { useUser } from "@/pages/_app";

const staticRolesData = {
  data: [
    {
      id: "1",
      name: "Administrator",
      createdAt: "2023-10-01T08:30:00Z",
      permissions: [
        { page: "Dashboard", actions: ["read", "write", "delete"] },
        { page: "Users", actions: ["read", "write"] },
      ],
    },
    {
      id: "2",
      name: "Editor",
      createdAt: "2023-09-15T10:15:00Z",
      permissions: [
        { page: "Dashboard", actions: ["read"] },
        { page: "Articles", actions: ["read", "write"] },
      ],
    },
    {
      id: "3",
      name: "Viewer",
      createdAt: "2023-08-20T14:45:00Z",
      permissions: [
        { page: "Dashboard", actions: ["read"] },
        { page: "Reports", actions: ["read"] },
      ],
    },
    {
      id: "4",
      name: "Manager",
      createdAt: "2023-07-05T09:20:00Z",
      permissions: [
        { page: "Dashboard", actions: ["read", "write"] },
        { page: "Users", actions: ["read"] },
      ],
    },
    {
      id: "5",
      name: "Contributor",
      createdAt: "2023-06-18T16:10:00Z",
      permissions: [
        { page: "Articles", actions: ["read", "write"] },
        { page: "Comments", actions: ["read", "write"] },
      ],
    },
    {
      id: "6",
      name: "Moderator",
      createdAt: "2023-05-22T11:05:00Z",
      permissions: [
        { page: "Comments", actions: ["read", "write", "delete"] },
        { page: "Users", actions: ["read"] },
      ],
    },
    {
      id: "7",
      name: "Analyst",
      createdAt: "2023-04-30T13:50:00Z",
      permissions: [
        { page: "Reports", actions: ["read", "write"] },
        { page: "Dashboard", actions: ["read"] },
      ],
    },
    {
      id: "8",
      name: "Developer",
      createdAt: "2023-03-10T15:35:00Z",
      permissions: [
        { page: "Settings", actions: ["read", "write"] },
        { page: "Dashboard", actions: ["read"] },
      ],
    },
    {
      id: "9",
      name: "Support",
      createdAt: "2023-02-28T12:25:00Z",
      permissions: [
        { page: "Tickets", actions: ["read", "write"] },
        { page: "Dashboard", actions: ["read"] },
      ],
    },
    {
      id: "10",
      name: "Guest",
      createdAt: "2023-01-14T09:55:00Z",
      permissions: [{ page: "Dashboard", actions: ["read"] }],
    },
  ],
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

export default function RolesPage() {
  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "guide-roles"
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
  const [selectedRole, setSelectedRole] = useState<any | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [permsModalOpen, setPermsModalOpen] = useState(false);
  const [editRoleModal, setEditRoleModal] = useState(false);
  const [editingRole, setEditingRole] = useState<any | null>(null);
  const [editingPermissions, setEditingPermissions] = useState<any>();
  const [updatedDatas, setUpdatedDatas] = useState<any | null>(null);

  const [permissions, setPermissions] = useState<Permissions>({
    Grain: {
      get: false,
      add: false,
      update: false,
      delete: false,
    },
    Cotton: {
      get: false,
      add: false,
      update: false,
      delete: false,
    },
    Fruit: {
      get: false,
      add: false,
      update: false,
      delete: false,
    },
    Analysis: {
      get: false,
      add: false,
      update: false,
      delete: false,
    },
  });

  // Hooks
  const { data: rolesData, isLoading } = {
    data: staticRolesData,
    isLoading: false,
  };

  const { t } = useTranslation();
  // const { data: rolesData, isLoading } = useRoles();
  const createRole = useCreateRole();
  const deleteRole = useDeleteRole();
  const updateRole = useUpdateRole();
  const updatePermissions = useUpdateRolePermissions();

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
    setSelectedRole(null);
    form.reset();
  };

  const handleCloseDeleteModal = () => {
    setConfirmDeleteModal(false);
    setSelectedRole(null);
  };

  const handleDelete = (role: Role) => {
    setSelectedRole(role);
    setConfirmDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRole) {
      console.log("deleting");
      // deleteRole.mutate(selectedRole.id, {
      //   onSuccess: (response) => {
      //     if (response.status === "OK") {
      //       toast.message(t("messages.delEd"));
      //       handleCloseDeleteModal();
      //     } else {
      //       toast.error(response?.message);
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

  const handleClearAllChecks = () => {
    setPermissions({
      Grain: {
        get: false,
        add: false,
        update: false,
        delete: false,
      },
      Cotton: {
        get: false,
        add: false,
        update: false,
        delete: false,
      },
      Fruit: {
        get: false,
        add: false,
        update: false,
        delete: false,
      },
      Analysis: {
        get: false,
        add: false,
        update: false,
        delete: false,
      },
    });
  };

  const onSubmit = (data: any) => {
    console.log("data", data);
    // createRole.mutate(data, {
    //   onSuccess: (response: any) => {
    //     if (response.status === "OK") {
    //       toast.success(t("messages.created"));
    //       setAddModal(false);
    //       form.reset();
    //       handleClearAllChecks();
    //     } else {
    //       toast.error(t("messages.smtErr"));
    //     }
    //   },
    //   onError: (error: any) => {
    //     const errorMessage =
    //       error instanceof Error ? error.message : t("messages.smtErr");
    //     toast.error(errorMessage);
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
      cell: ({ row }: { row: { index: number } }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: t("tables.name"),
      cell: ({ row }) => (
        <div className="min-w-[150px] max-w-[300px] truncate">
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: t("tables.createdAt"),
      cell: ({ row }) =>
        format(new Date(row.getValue("createdAt")), "dd.MM.yyyy"),
    },
    {
      accessorKey: "permissions",
      header: t("roles.perms"),
      cell: ({ row }) => (
        <div>
          <Eye
            className="text-primary ml-1 size-5  cursor-pointer hover:scale-[1.2] transition-all duration-300"
            onClick={() => {
              setPermsModalOpen(true);
              setSelectedRole(row?.original);
            }}
          />
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
            <div>
              <Trash2
                onClick={() => handleDelete(role)}
                className="size-5 text-red-500 mr-2 cursor-pointer transition-all duration-300 hover:scale-[1.2]"
              />
            </div>
            <div>
              <Edit
                onClick={(e) => {
                  setEditRoleModal(true);
                  setEditingRole(role);
                }}
                className="size-5 mr-2 cursor-pointer transition-all duration-300 hover:scale-[1.2]"
              />
            </div>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: rolesData?.data || [],
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
            {t("roles.title")}
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
              <Plus className="mr-2 h-4 w-4" /> {t("roles.add")}
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
      </div>

      {/* add modal */}
      <CommonModal
        width="650px"
        title={t("roles.addRole")}
        visible={addModal}
        onClose={() => {
          handleCloseAddEditModal();
          handleClearAllChecks();
        }}
      >
        <AddRoleForm
          onSubmit={onSubmit}
          form={form}
          createRole={createRole}
          handleClearAllChecks={handleClearAllChecks}
          permissions={permissions}
          setPermissions={setPermissions}
        />
      </CommonModal>

      {/* confirm delete modal */}
      <CommonModal
        width="650px"
        visible={confirmDeleteModal}
        onClose={handleCloseDeleteModal}
        title="Rostdan ham shu rolni o'chirmoqchimisiz?"
      >
        <div className="flex items-center justify-between gap-5 ">
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            {t("buttons.nCan")}
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            loading={deleteRole.isLoading}
          >
            {t("buttons.yDel")}
          </Button>
        </div>
      </CommonModal>

      {/* permissions see modal */}
      <CommonModal
        width="650px"
        title={`${t("roles.perms")}: ${selectedRole?.name}`}
        visible={permsModalOpen}
        onClose={() => {
          setPermsModalOpen(false);
          setSelectedRole(null);
        }}
      >
        {selectedRole && <PermissionsModalData selectedRole={selectedRole} />}
      </CommonModal>

      {/* edit role modal */}
      <CommonModal
        width="650px"
        title={"Rolni tahrirlash"}
        visible={editRoleModal}
        onClose={() => {
          setEditRoleModal(false);
        }}
      >
        <EditRoleForm
          editForm={editForm}
          updateRole={updateRole}
          permissions={permissions}
          setPermissions={setPermissions}
          editingRole={editingRole}
          setEditRoleModal={setEditRoleModal}
          setEditingPermissions={setEditingPermissions}
        />
      </CommonModal>
    </>
  );
}
