"use client";

import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import {
  CSSProperties,
  useEffect,
  useMemo,
  useState,
  useCallback,
  Fragment,
} from "react";
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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldArray, useForm } from "react-hook-form";
import {
  useCreateFinancePartner,
  useFinancePartners,
} from "@/queries/partners";
import { CreatePartnerData, GetPartners } from "@/types/partners";
import {
  ArrowUpDown,
  Calendar1,
  ChevronDown,
  Clock,
  DollarSign,
  Edit,
  File,
  FileText,
  Hash,
  ListCollapse,
  MoreHorizontal,
  MoreVertical,
  Paperclip,
  Percent,
  Plus,
  PlusCircle,
  Search,
  Tag,
  Trash,
  Trash2,
  Users,
  X,
  ChevronRight,
  Eye,
  Info,
  Download,
  CalendarIcon,
} from "lucide-react";
import {
  useAddContractFile,
  useAllContracts,
  useCreateFinanceContract,
  useDeleteContractFile,
  useDeleteFinanceContract,
  useDownloadExcel,
  useFilterFinanceContracts,
  useFinanceContract,
  useFinanceContracts,
  useFinanceMainContracts,
  useGetContractByNumber,
  useUpdateFinanceContract,
} from "@/queries/contracts";
import {
  AttachmentsTypes,
  CreateContract,
  EditingContract,
  GotContractData,
} from "@/types/contracts";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  useReactTable,
  ExpandedState,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import PartnerModal from "@/components/partners/create";
import { PopoverPortal } from "@radix-ui/react-popover";
import { useTransactionsByContractId } from "@/queries/transactions";
import CalculatedModal from "@/components/PaymentsComponent/CalculatedModal";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Loading from "@/components/loading";
import withReactContent from "sweetalert2-react-content";
import {
  useOrdinaryContractsByMainContractId,
  useOrdinaryContractsByContractId,
} from "@/queries/contracts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface categoryTypes {
  createdAt: string;
  description: string;
  id: number;
  name: string;
  updatedAt: string | null;
}
import AddModal, {
  ContractType,
} from "../../../components/cotton/contracts/components/add-modal";
import EditModal from "../../../components/cotton/contracts/components/edit-modal";
import Modal from "@/components/ui/modal";
import { TransactionType } from "@/types/transactions";
import Loader from "@/components/ui/loader";
import axiosInstance from "@/api/axios";
import CommonModal from "@/components/CommonModal";
import MonitoringModal from "../../../components/cotton/contracts/components/monitoring-modal";
import Cookies from "js-cookie";
import { DateRangePicker } from "@/components/date-range-picker";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useUser } from "@/pages/_app";

const staticData = {
  docsList: {
    data: [
      {
        id: 1,
        number: "CONT-001",
        contractType: "MAIN",
        createdAt: "2025-01-15T10:00:00Z",
        categoryDto: { name: "Category A" },
        partnersDto: [{ name: "Partner A" }],
        financingAmount: 100000,
        interestRate: 5,
        interestAmount: 5000,
        gracePeriod: 3,
        startDate: "2025-01-15T00:00:00Z",
        endDate: "2025-12-31T00:00:00Z",
        status: "ACTIVE",
        balance: 95000,
        penaltyRate: 2,
        terms: "Standard terms for contract",
        currencyType: "UZS",
        paths: ["https://example.com/files/doc1.pdf"],
        hasOrdinary: false,
        attachments: [
          {
            cloudPath: "https://example.com/files/doc1.pdf",
            originName: "doc1.pdf",
            contentType: "application/pdf",
          },
        ],
      },
      {
        id: 2,
        number: "CONT-002",
        contractType: "STANDARD",
        createdAt: "2025-02-20T12:30:00Z",
        categoryDto: { name: "Category B" },
        partnersDto: [{ name: "Partner B" }],
        financingAmount: 200000,
        interestRate: 6,
        interestAmount: 12000,
        gracePeriod: 2,
        startDate: "2025-02-20T00:00:00Z",
        endDate: "2025-11-30T00:00:00Z",
        status: "CREATE",
        balance: 188000,
        penaltyRate: 3,
        terms: "Additional agreement terms",
        currencyType: "USD",
        paths: ["https://example.com/files/doc2.pdf"],
        hasOrdinary: true,
        attachments: [
          {
            cloudPath: "https://example.com/files/doc2.pdf",
            originName: "doc2.pdf",
            contentType: "application/pdf",
          },
        ],
      },
      {
        id: 3,
        number: "CONT-003",
        contractType: "MAIN",
        createdAt: "2025-03-10T15:45:00Z",
        categoryDto: { name: "Category C" },
        partnersDto: [{ name: "Partner C" }],
        financingAmount: 150000,
        interestRate: 4,
        interestAmount: 6000,
        gracePeriod: 1,
        startDate: "2025-03-10T00:00:00Z",
        endDate: "2025-10-31T00:00:00Z",
        status: "OVERDUE",
        balance: 144000,
        penaltyRate: 1,
        terms: "Custom terms for contract",
        currencyType: "UZS",
        paths: ["https://example.com/files/doc3.pdf"],
        hasOrdinary: false,
        attachments: [
          {
            cloudPath: "https://example.com/files/doc3.pdf",
            originName: "doc3.pdf",
            contentType: "application/pdf",
          },
        ],
      },
    ],
    pages: 3,
  },
};

interface CustomFile extends File {
  cloudPath?: string;
  originName?: string;
}

const MySwal = withReactContent(Swal);

export default function ContractsPage() {
  const userToken = Cookies.get("token");
  const pageSize = 10;

  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "cotton-conts"
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

  const [excelFrom, setExcelFrom] = useState<Date | undefined>(undefined);
  const [excelTo, setExcelTo] = useState<Date | undefined>(undefined);

  const updateContract = useUpdateFinanceContract();
  const allMainContracts = useFinanceMainContracts(0, 1000000);
  const [page, setPage] = useState<number>(0);
  const [number, setNumber] = useState<any | undefined>("");
  const [contractType, setContractType] = useState<"MAIN" | "STANDARD" | "all">(
    "all"
  );

  // const { data: typedContracts } = useFilterFinanceContracts(
  //   page,
  //   10,
  //   contractType
  // );
  const { mutateAsync: downloadExcel } = useDownloadExcel(
    excelFrom,
    excelTo,
    contractType
  );
  const [showTransactions, setShowTransactions] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any | null>(
    null
  );
  const {
    data: singleContract,
    isLoading: singleContractLoading,
    error: singleContractError,
    refetch: refetchSingle,
  } = useFinanceContract(
    parseFloat(selectedItem?.id as string) || null,
    selectedItem?.contractType as ContractType
  );
  const deleteContract = useDeleteFinanceContract();
  const { data: allTypeContracts, refetch: allTypeContractsRefetch } =
    useAllContracts(page, 5, contractType == "all");

  const allContracts = useFinanceContracts(page, 10);
  const debouncedNumber = useDebounce(number);
  const gotContractByNumber = useGetContractByNumber(debouncedNumber);
  const {
    data: mainContracts,
    isLoading: contractsLoading,
    error: contractsError,
    refetch: refetchAllContracts,
  } = useFinanceMainContracts(page, 10);

  useEffect(() => {
    refetchAllContracts();
  }, [contractType]);

  const endDateDate = new Date(new Date().getFullYear(), 11, 31);
  const formattedDate = endDateDate.toISOString();

  const form = useForm<CreateContract>({
    defaultValues: {
      categoryId: undefined,
      partnerIds: [undefined],
      number: "",
      financingAmount: 0,
      // interestRate: 0,
      // penaltyRate: 0,
      contractDate: new Date().toISOString(),
      startDate: new Date().toISOString(),
      endDate: formattedDate,
      terms: "",
      balance: 0,
      currencyType: "UZS",
      files: [],
      payDate: undefined,
      gracePeriod: "",
      status: "ACTIVE",
      mainContractId: selectedItem?.id,
      ordinaryContractNumber: "",
    },
  });

  const partnerForm = useForm<CreatePartnerData>({
    defaultValues: {
      name: "",
      partnerType: "BANK",
      categoryId: 13,
      currencyType: ["USD"],
      inn: "",
      bankList: [{ bankName: "", mfo: "", accountNumber: "" }],
      contact_info: {
        fio: "",
        phone: "",
        email: "",
      },
    },
  });
  const {
    control,
    register: partnerRegister,
    handleSubmit,
    watch,
    reset,
  } = partnerForm;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "bankList",
  });

  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.Percentage
  );

  const [addModal, setAddModal] = useState(false);
  const [singleModal, setSingleModal] = useState(false);
  const [showMonitoringModal, setShowMonitoringModal] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [partnerAddModal, setPartnerAddModal] = useState(false);
  const [editFiles, setEditFiles] = useState<CustomFile[]>([]);
  const [editModal, setEditModal] = useState(false);
  const [editFileModal, setEditFileModal] = useState(false);
  const [selectExcelDate, setSelectExcelDate] = useState(false);
  const [deletingFile, setDeletingFile] = useState<AttachmentsTypes[] | null>(
    null
  );
  const [regetFiles, setRegetFiles] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<any | null>(
    null
  );
  const [selectedPartner, setSelectedPartner] = useState<GetPartners | null>(
    null
  );
  const [currency, setCurrency] = useState("UZS");
  const [statusChange, setStatusChange] = useState(false);
  const [openCalculatedModal, setOpenCalculatedModal] = useState<{
    contractId: string;
    open: boolean;
    type: string;
    status: string;
  }>({
    contractId: "",
    open: false,
    type: "",
    status: "",
  });

  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [expandedContracts, setExpandedContracts] = useState<{
    [key: string]: any[];
  }>({});
  const [partnerDtoPOV, setPartnerDtoPOV] = useState(false);

  const {
    data: transactions,
    refetch: transactionRefetch,
    isLoading: isTransactionLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useTransactionsByContractId({
    contractId: selectedItem?.id || "",
    page: 0,
    size: 10,
    status: "PENDING",
    type: transactionType,
  });

  const loadMoreTransactions = useCallback(() => {
    if (!isTransactionLoading && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isTransactionLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: isTransactionLoading || isFetchingNextPage,
    hasNextPage: !!hasNextPage,
    onLoadMore: loadMoreTransactions,
    disabled: false,
    rootMargin: "0px 0px 400px 0px",
  });

  useEffect(() => {
    if (selectedPartner) {
      setCurrency(selectedPartner?.currencyType || "UZS");
      form.setValue(
        "categoryId",
        (selectedPartner as any)?.categoryDto?.id || 0
      );
    }
  }, [selectedPartner]);

  useEffect(() => {
    if (selectedItem?.id && singleModal) {
      transactionRefetch();
    }
  }, [selectedItem, singleModal, transactionType]);

  const { t } = useTranslation();

  useEffect(() => {
    if (selectedItem && Array.isArray(selectedItem.attachments)) {
      setDeletingFile([...selectedItem.attachments]);
    } else {
      setDeletingFile([]);
    }
  }, [selectedItem, regetFiles]);

  useEffect(() => {
    if (selectedItem && Array.isArray(selectedItem.attachments)) {
      setEditFiles([...selectedItem.attachments]);
    } else {
      setEditFiles([]);
    }
  }, [selectedItem, editFileModal]);

  useEffect(() => {
    if (selectedItem) {
      form.setValue("categoryId", selectedItem.categoryDto?.id || 0);
      form.setValue(
        "partnerIds",
        selectedItem.partnersDto?.map(
          (partner: { id: number }) => partner.id
        ) || [0]
      );
      form.setValue("number", selectedItem.number || "");
      form.setValue("financingAmount", selectedItem.financingAmount || 0);
      form.setValue("interestRate", selectedItem.interestRate || 0);
      form.setValue("penaltyRate", selectedItem.penaltyRate || 0);
      form.setValue("contractDate", selectedItem.contractDate || "");
      form.setValue("startDate", selectedItem.startDate || "");
      form.setValue("endDate", selectedItem.endDate || "");
      form.setValue("terms", selectedItem.terms || "");
      form.setValue("balance", selectedItem.balance || 0);
      form.setValue("currencyType", selectedItem.currencyType || "");
      form.setValue("files", selectedItem.paths || []);
      form.setValue("mainContractId", selectedItem.id || 0);
    }
  }, [selectedItem, form, editModal, addModal]);

  const refetchAllContractsList = () => {
    allTypeContractsRefetch();
    refetchAllContracts();
  };

  const handleDeleteCategory = (id: string, contractType: string) => {
    const contractToDelete = staticData.docsList.data.find(
      (contract: any) => contract.id === id
    );

    if (contractToDelete?.status !== "CREATE") {
      toast.message(t("messages.cannotDelete"));
      return;
    }
    MySwal.fire({
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
        popup: "rounded-lg shadow-lg",
        container: "p-0",
        title: "text-2xl font-bold text-gray-900",
        actions: "p-6",
        cancelButton: "text-black",
      },
      width: "400px",
      background: "white",
      allowOutsideClick: false,
      preConfirm: async () => {
        MySwal.showLoading();
        return new Promise((resolve) => {
          deleteContract.mutate(
            { id, contractType },
            {
              onSuccess: (response) => {
                if (response.status === "OK") {
                  toast.message(t("messages.delEd"));
                  allTypeContractsRefetch();
                  resolve(true);
                } else {
                  toast.message(response.message || t("messages.err"));
                  resolve(false);
                }
              },
              onError: () => {
                toast.message(t("messages.err"));
                resolve(false);
              },
            }
          );
        });
      },
    });
  };

  const customFilter = (row: any, columnId: string, filterValue: string) => {
    const getValue = (obj: any, path: string) =>
      path.split(".").reduce((acc, key) => acc?.[key], obj);

    const value = getValue(row?.original, columnId);

    if (typeof value === "string") {
      return value.toLowerCase().includes(filterValue.toLowerCase());
    } else if (Array.isArray(value)) {
      return value.some((item) =>
        typeof item === "string"
          ? item.toLowerCase().includes(filterValue.toLowerCase())
          : item?.name?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return false;
  };

  const columns: any[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-xs w-[30px]">№</div>,
      cell: ({ row }:any) => (
        <div className="text-xs">{page * 10 + (row?.index + 1)}</div>
      ),
    },
    {
      accessorKey: "number",
      header: () => <div className="text-xs">{t("tables.number")}</div>,
      cell: ({ row }:any) => (
        <div className="text-xs truncate min-w-[200px] max-w-[320px]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {row?.original?.number?.length > 5
                  ? `${row?.original?.number}`
                  : row?.original?.number || "-----"}
              </TooltipTrigger>
              <TooltipContent>
                <p>{row?.original?.number}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
    {
      accessorKey: "contractType",
      header: () => (
        <div className="text-xs truncate">{t("tables.contractType")}</div>
      ),
      cell: ({ row }:any) => (
        <div className="text-xs truncate w-[100px]">
          {row?.original?.contractType == "MAIN"
            ? t("buttons.main")
            : row?.original?.contractType == "STANDARD"
            ? t("buttons.standart")
            : t("buttons.standart")}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="text-xs truncate">{t("tables.createdAt")}</div>
      ),
      cell: ({ row }:any) => (
        <div className="max-w-[300px] text-xs truncate ">
          {format(parseISO(row?.original?.createdAt), "dd.MM.yyyy") || "-----"}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: () => (
        <div className="text-xs truncate">{t("tables.category")}</div>
      ),
      cell: ({ row }:any) => (
        <div className="w-[120px] text-xs truncate ">
          {row?.original?.categoryDto?.name || "-----"}
        </div>
      ),
      filterFn: customFilter,
    },
    {
      accessorKey: "partner",
      header: () => (
        <div className="text-xs truncate">{t("tables.partner")}</div>
      ),
      cell: ({ row }:any) => (
        <div className="w-[120px] text-xs truncate ">
          {row?.original?.partnersDto?.[0]?.name || "-----"}
        </div>
      ),
      filterFn: customFilter,
    },
    {
      accessorKey: "finAmo",
      header: () => (
        <div className="text-xs truncate"> {t("tables.finAmo")}</div>
      ),
      cell: ({ row }:any) => (
        <div className="min-w-[200px] max-w-[320px] text-xs truncate ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {row?.original?.financingAmount?.toLocaleString() || "-----"}
              </TooltipTrigger>
              <TooltipContent>
                <p>{row?.original?.financingAmount?.toLocaleString()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
    {
      accessorKey: "intRate2",
      header: () => (
        <div className="text-xs truncate">{t("tables.intRate")}</div>
      ),
      cell: ({ row }:any) => (
        <div className="text-xs truncate">
          {row?.original?.interestRate || 0} %
        </div>
      ),
    },
    {
      accessorKey: "intRate",
      header: () => <div className="text-xs truncate">{t("forms.intAmo")}</div>,
      cell: ({ row }:any) => (
        <div className="max-w-[300px] text-xs truncate  flex justify-start items-center gap-2">
          <span
            onClick={() => {
              setSelectedItem(row?.original);
              setSingleModal(true);
              setSelectedDetail(row?.original);
            }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {row?.original?.interestAmount > 5
                    ? `${row?.original?.interestAmount
                        ?.toLocaleString()
                        .slice(0, 5)}...`
                    : row?.original?.interestAmount?.toLocaleString() ||
                      "-----"}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{row?.original?.interestAmount?.toLocaleString()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          <Search
            onClick={() =>
              setOpenCalculatedModal({
                contractId: row?.original?.id,
                open: true,
                type: "PERCENTAGE",
                status: "COUNTED",
              })
            }
            className="text-[#3BB5DC] w-[18px] cursor-pointer"
          />
        </div>
      ),
    },
    {
      accessorKey: "gracePeriod",
      header: () => (
        <div className="text-xs truncate">{t("forms.gracePeriod")}</div>
      ),
      cell: ({ row }:any) => (
        <div className="text-xs truncate">
          {`${row?.getValue("gracePeriod") || 0} ${t("forms.month")}`}
        </div>
      ),
    },
    {
      accessorKey: "sDate",
      header: () => (
        <div className="text-xs w-[100px] truncate">{t("tables.sDate")}</div>
      ),
      cell: ({ row }:any) => (
        <div className="text-xs w-[100px] truncate">
          {format(parseISO(row?.original?.startDate), "dd.MM.yyyy") || "-----"}
        </div>
      ),
    },
    {
      accessorKey: "eDate",
      header: () => (
        <div className="text-xs w-[100px] truncate">{t("tables.eDate")}</div>
      ),
      cell: ({ row }:any) => (
        <div className="text-xs truncate">
          {format(parseISO(row?.original?.endDate), "dd.MM.yyyy") || "-----"}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="text-xs truncate">{t("tables.status")}</div>
      ),
      cell: ({ row }:any) => (
        <div className="text-xs truncate w-[130px] font-bold">
          <div
            className={`text-xs truncate ${
              row?.getValue("status") === "CREATE"
                ? "text-blue-500"
                : row?.getValue("status") === "ACTIVE"
                ? "text-green-500"
                : row?.getValue("status") === "CLOSED"
                ? "text-gray-500"
                : row?.getValue("status") === "OVERDUE"
                ? "text-red-500"
                : row?.getValue("status") === "SUSPEND"
                ? "text-yellow-500"
                : "text-black"
            }`}
          >
            {row?.getValue("status") === "CREATE"
              ? t("common.statuses.create")
              : row?.getValue("status") === "ACTIVE"
              ? t("common.statuses.active")
              : row?.getValue("status") === "CLOSED"
              ? t("common.statuses.closed")
              : row?.getValue("status") === "OVERDUE"
              ? t("common.statuses.overdue")
              : row?.getValue("status") === "SUSPEND"
              ? t("common.statuses.suspended")
              : "------"}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      header: () => (
        <div
          className={`text-xs truncate ${
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
      meta: {
        sticky: true,
        className: "sticky right-0",
      },
      cell: ({ row }:any) => {
        const status = row?.getValue("status") as keyof typeof statusMap;
        return (
          <div
            className={`${
              access &&
              access[0]?.actions &&
              access[0].actions[0]?.action != "all"
                ? "hidden"
                : ""
            }`}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <MoreVertical className="w-4 h-4 text-[#3BB5DC]" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <div className="flex flex-col gap-2">
                  <div className="">
                    {status === "ACTIVE" ? (
                      <div>
                        <div
                          onClick={() => {
                            setSelectedItem(row?.original);
                            setStatusChange(true);
                          }}
                          className={`text-xs truncate font-bold cursor-pointer border py-2 px-4 rounded-2xl hover:opacity-80 ${statusMap["CLOSED"]?.color}`}
                        >
                          {statusMap["CLOSED"]?.local}
                        </div>
                        <div
                          onClick={() => {
                            setSelectedItem({
                              ...row?.original,
                              status: "OVERDUE",
                            });
                            setStatusChange(true);
                          }}
                          className={`text-xs truncate font-bold cursor-pointer border py-2 px-4 rounded-2xl hover:opacity-80 ${statusMap["SUSPEND"]?.color}`}
                        >
                          {statusMap["SUSPEND"]?.local}
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setSelectedItem(row?.original);
                          setStatusChange(true);
                        }}
                        className={`text-xs truncate font-bold cursor-pointer border py-2 px-4 rounded-2xl hover:opacity-80 ${statusMap[status]?.action.color}`}
                      >
                        {statusMap[status]?.action.label}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    className="justify-start text-xs truncate"
                    onClick={() =>
                      handleDeleteCategory(
                        row?.original?.id,
                        row?.original?.contractType
                      )
                    }
                    style={{
                      display:
                        row.original.status === "CREATE" ? "flex" : "none",
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500 mr-2" />
                    {t("buttons.del")}
                  </Button>
                  {row?.original?.status == "CREATE" ? (
                    <Button
                      variant="ghost"
                      className="justify-start text-xs truncate"
                      onClick={() => {
                        setEditModal(true);
                        setSelectedItem(row?.original);
                      }}
                    >
                      <Edit className="w-4 h-4 text-green-500 mr-2" />
                      {t("buttons.ed")}
                    </Button>
                  ) : null}
                  <Button
                    variant="ghost"
                    className="justify-start text-xs truncate"
                    onClick={() => {
                      setSelectedItem(row?.original);
                      setSingleModal(true);
                    }}
                  >
                    <ListCollapse className="w-4 h-4 text-[#3BB5DC] mr-2" />
                    {t("buttons.det")}
                  </Button>
                  {row?.original?.contractType == "MAIN" && (
                    <Button
                      variant="ghost"
                      className="justify-start text-xs truncate"
                      onClick={() => {
                        setSelectedItem(row?.original);
                        setDefaultType(ContractType.Ordinary);
                        setAddModal(true);
                      }}
                    >
                      <PlusCircle className="w-4 h-4 text-blue-500 mr-2" />
                      {t("modals.addAdditionalAgreement")}
                    </Button>
                  )}
                  {row.original.contractType === "STANDARD" && (
                    <Button
                      variant="ghost"
                      className="justify-start text-xs truncate"
                      onClick={() => {
                        setSelectedItem(row?.original);
                        setShowMonitoringModal(true);
                      }}
                    >
                      <Eye className="w-4 h-4 text-blue-500 mr-2" />
                      {t("modals.monitoring")}
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      },
    },
    {
      id: "expander",
      header: () => null,
      cell: ({ row }:any) => {
        return row.original.hasOrdinary ? (
          <button
            className={`${
              access &&
              access[0]?.actions &&
              access[0].actions[0]?.action != "all"
                ? "hidden"
                : ""
            }`}
            onClick={() => {
              row.getIsExpanded()
                ? row.getToggleExpandedHandler()()
                : handleRowExpand(row);
            }}
            style={{ cursor: "pointer" }}
          >
            {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
          </button>
        ) : null;
      },
    },
  ];

  const table = useReactTable({
    data: staticData.docsList.data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    columnResizeMode: "onChange",
    enableColumnResizing: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
    },
  });

  const handleStatusChange = (newStatus: string) => {
    const submittingData: EditingContract = {
      status: newStatus,
      financingAmount: 0,
      interestRate: 0,
      penaltyRate: 0,
    };

    console.log("submittingData:", submittingData);

    // updateContract.mutate(
    //   { id: String(selectedItem?.id), data: submittingData },
    //   {
    //     onSuccess: () => {
    //       setStatusChange(false);
    //       setSelectedItem(null);
    //     },
    //   }
    // );
  };

  const handleDownload = async (attachment: any) => {
    try {
      const response = await fetch(attachment.cloudPath);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(
        new Blob([blob], { type: attachment.contentType })
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = attachment.originName;
      document.body.appendChild(link);
      link.click();

      allTypeContractsRefetch();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      toast.error(t("messages.err"));
    }
  };

  const statusTitleMap = {
    CREATE: "modals.toActive",
    ACTIVE: "modals.toClose",
    CLOSED: "modals.toOverdue",
    OVERDUE: "modals.toSuspend",
    SUSPEND: "modals.toActive",
  } as const;

  const [defaultType, setDefaultType] = useState<ContractType>(
    ContractType.Standard
  );

  const { mutate: fetchOrdinaryContractsByMainContractId } =
    useOrdinaryContractsByMainContractId();

  const { mutate: fetchOrdinaryContractsByContractId } =
    useOrdinaryContractsByContractId();

  const handleRowExpand = (row: any) => {
    const contractId = row.original.id;
    const contractType = row.original.contractType;
    const isMainContract = contractType === "MAIN";

    if (row.getIsExpanded()) {
      row.getToggleExpandedHandler()();
      return;
    }

    setExpandedContracts((prev) => ({
      ...prev,
      [contractId]: [],
    }));

    const onSuccess = (data: any) => {
      setExpandedContracts((prev) => ({
        ...prev,
        [contractId]: data?.data || [],
      }));
      row.getToggleExpandedHandler()();
    };

    if (isMainContract) {
      fetchOrdinaryContractsByMainContractId(contractId, { onSuccess });
    } else {
      fetchOrdinaryContractsByContractId(contractId, { onSuccess });
    }
  };

  const statusMap = {
    CREATE: {
      color: "text-green-500",
      label: t("common.statuses.active"),
      local: t("common.statuses.create"),
      action: {
        label: t("common.statuses.activate"),
        color: "text-green-500",
      },
    },
    ACTIVE: {
      color: "text-gray-500",
      label: t("common.statuses.closed"),
      local: t("common.statuses.active"),
      action: {
        label: t("common.statuses.close"),
        color: "text-gray-500",
      },
    },
    CLOSED: {
      color: "text-red-500",
      label: t("common.statuses.overdue"),
      local: t("common.statuses.close"),
      action: {
        label: t("common.statuses.overdue"),
        color: "text-red-500",
      },
    },
    OVERDUE: {
      color: "text-yellow-500",
      label: t("common.statuses.suspend"),
      local: t("common.statuses.overdue"),
      action: {
        label: t("common.statuses.suspend"),
        color: "text-yellow-500",
      },
    },
    SUSPEND: {
      color: "text-yellow-500",
      label: t("common.statuses.suspended"),
      local: t("common.statuses.suspend"),
      action: {
        label: t("common.statuses.activate"),
        color: "text-green-500",
      },
    },
  };

  const handleDownloadExcel = async () => {
    if (!excelFrom || !excelTo) {
      console.error("Please select both from and to dates");
      return;
    }

    try {
      const response = await axiosInstance.get("/contract/downloadExcel", {
        params: {
          from: excelFrom.toISOString(),
          to: excelTo.toISOString(),
        },
        responseType: "blob",
      });

      console.log("Excel download response:", {
        status: response.status,
        headers: response.headers,
        data: response.data,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `contracts-${excelFrom.toISOString().slice(0, 10)}-to-${excelTo
          .toISOString()
          .slice(0, 10)}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      if (axios.isAxiosError(error)) {
        console.error("Error details:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
      }
      throw error;
    }
  };

  return (
    <>
      <div className="w-full h-[99vh] overflow-hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("conts.title")}
          </h2>
        </div>
        <div className="flex items-start flex-col lg:flex-row lg:items-end justify-between py-4">
          <div className="w-full md:w-[25%]">
            <label className="text-xs lg:text-sm">
              {t("tables.searchContracts")}
            </label>
            <Input
              max={9999999999999999}
              placeholder={t("buttons.filterConts")}
              value={number}
              onChange={(event) => {
                const value = event.target.value;
                const numValue = Number(value);
                if (
                  value === "" ||
                  (!isNaN(numValue) && numValue <= 9999999999999999)
                ) {
                  setNumber(numValue || "");
                }
              }}
              className={`max-w-sm ${
                number > 9999999999999999
                  ? "border-red-500 outline-red-500 focus:ring-red-500"
                  : ""
              }`}
            />
          </div>
          <div className="flex items-end justify-between gap-5 flex-wrap lg:hidden">
            <div className="w-[35%] mt-5 lg:mt-0 lg:w-auto text-xs lg:ml-7">
              <label className="text-xs lg:text-sm" htmlFor="contractType">
                {t("buttons.contType")}
              </label>
              <Select
                onValueChange={(value) => {
                  setContractType(value as "MAIN" | "STANDARD" | "all");
                  setPage(0);
                }}
                defaultValue="all"
              >
                <SelectTrigger className="w-[180px] text-xs">
                  <SelectValue placeholder={t("buttons.contTypePls")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("buttons.cont")}</SelectItem>
                  <SelectItem value="MAIN">{t("buttons.main")}</SelectItem>
                  <SelectItem value="STANDARD">
                    {t("buttons.standart")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[35%] mt-5 lg:mt-0 lg:w-full text-xs items-center justify-end gap-5">
              <div
                className={`text-xs w-[150px] truncate ${
                  access &&
                  access[0]?.actions &&
                  access[0].actions[0]?.action != "all"
                    ? "hidden"
                    : ""
                }`}
              >
                <Button
                  onClick={() => {
                    setAddModal(true);
                    setDefaultType(ContractType.Standard);
                  }}
                >
                  <Plus className="hidden lg:block" />
                  <span className="text-xs lg:text-sm w-[140px] truncate lg:w-full">
                    {" "}
                    {t("modals.addCont")}
                  </span>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-[35%] hidden lg:block mt-5 lg:mt-0 lg:w-auto text-xs lg:ml-7">
            <label className="text-xs lg:text-sm" htmlFor="contractType">
              {t("buttons.contType")}
            </label>
            <Select
              onValueChange={(value) => {
                setContractType(value as "MAIN" | "STANDARD" | "all");
                setPage(0);
              }}
              defaultValue="all"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("buttons.contTypePls")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("buttons.cont")}</SelectItem>
                <SelectItem value="MAIN">{t("buttons.main")}</SelectItem>
                <SelectItem value="STANDARD">
                  {t("buttons.standart")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[35%] hidden lg:flex mt-5 lg:mt-0 lg:w-full text-xs items-center justify-end gap-5">
            <div
              className={`text-xs ${
                access &&
                access[0]?.actions &&
                access[0].actions[0]?.action != "all"
                  ? "hidden"
                  : ""
              }`}
            >
              <Button
                onClick={() => {
                  setAddModal(true);
                  setDefaultType(ContractType.Standard);
                }}
              >
                <Plus className="size-3 lg:size-5" />
                {t("modals.addCont")}
              </Button>
            </div>
          </div>
        </div>
        <div className="max-h-[67%] mt-5 overflow-auto">
          <div className="rounded-md border ">
            <Table>
              <TableHeader>
                {table?.getHeaderGroups().map((headerGroup) => (
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
                {table?.getRowModel().rows.length > 0 ? (
                  table?.getRowModel().rows.map((row) => (
                    <Fragment key={row.id}>
                      <TableRow>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            onClick={() => {
                              const notOpenCells = [
                                "actions",
                                "expander",
                                "penRate",
                                "intRate",
                                "intRate2",
                                "balance",
                              ];
                              if (!notOpenCells.includes(cell.column.id)) {
                                setSelectedItem(row?.original);
                                setSingleModal(true);
                                setSelectedDetail(row?.original);
                              }
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                      {row.getIsExpanded() && (
                        <TableRow>
                          <TableCell colSpan={columns.length} className="p-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                              {expandedContracts[row.original.id]?.length ===
                              0 ? (
                                <p className="text-center">
                                  {t("common.noData")}
                                </p>
                              ) : (
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="text-xs truncate">
                                        N
                                      </TableHead>
                                      <TableHead className="text-xs">
                                        {t("tables.number")}
                                      </TableHead>
                                      <TableHead className="text-xs">
                                        {t("tables.createdAt")}
                                      </TableHead>
                                      <TableHead className="text-xs">
                                        {t("tables.category")}
                                      </TableHead>
                                      <TableHead className="text-xs">
                                        {t("tables.partner")}
                                      </TableHead>
                                      <TableHead className="text-xs">
                                        {t("tables.finAmo")}
                                      </TableHead>
                                      <TableHead className="text-xs">
                                        {t("tables.balance")}
                                      </TableHead>
                                      <TableHead className="text-xs">
                                        {t("tables.intRate")}
                                      </TableHead>
                                      <TableHead className="text-xs">
                                        {t("forms.intAmo")}
                                      </TableHead>
                                      <TableHead className="text-xs">
                                        {t("tables.penRate")}
                                      </TableHead>
                                      <TableHead className="text-xs">
                                        {t("forms.gracePeriod")}
                                      </TableHead>
                                      <TableHead className="text-xs">
                                        {t("tables.sDate")}
                                      </TableHead>
                                      <TableHead className="text-xs">
                                        {t("tables.eDate")}
                                      </TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {expandedContracts[row.original.id] ? (
                                      expandedContracts[row.original.id].map(
                                        (contract, index) => (
                                          <TableRow key={contract.id}>
                                            <TableCell className="text-xs truncate">
                                              {index + 1}
                                            </TableCell>
                                            <TableCell className="text-xs truncate">
                                              {contract.number}
                                            </TableCell>
                                            <TableCell className="text-xs truncate">
                                              {format(
                                                parseISO(contract?.createdAt),
                                                "dd.MM.yyyy"
                                              )}
                                            </TableCell>
                                            <TableCell className="text-xs truncate">
                                              {contract.categoryDto?.name ||
                                                "-----"}
                                            </TableCell>
                                            <TableCell className="text-xs truncate">
                                              {contract.partnersDto?.[0]
                                                ?.name || "-----"}
                                            </TableCell>
                                            <TableCell className="text-xs truncate">
                                              {contract.financingAmount?.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-xs truncate">
                                              {contract.balance?.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-xs truncate">
                                              {contract.interestRate || 0}%
                                            </TableCell>
                                            <TableCell className="text-xs truncate">
                                              {contract.interestAmount?.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-xs truncate">
                                              {contract.penaltyRate}%
                                            </TableCell>
                                            <TableCell className="text-xs truncate">{`${
                                              contract.gracePeriod || 0
                                            } ${t("forms.month")}`}</TableCell>
                                            <TableCell className="text-xs truncate">
                                              {format(
                                                parseISO(
                                                  row?.original?.startDate
                                                ),
                                                "dd.MM.yyyy"
                                              )}
                                            </TableCell>
                                            <TableCell className="text-xs truncate">
                                              {format(
                                                parseISO(
                                                  row?.original?.endDate
                                                ),
                                                "dd.MM.yyyy"
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )
                                    ) : (
                                      <TableRow>
                                        <TableCell
                                          colSpan={13}
                                          className="text-center"
                                        >
                                          <Loading />
                                        </TableCell>
                                      </TableRow>
                                    )}
                                  </TableBody>
                                </Table>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      <p className="text-gray-500">{t("common.noData")}</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div
            className={`mt-2 ${
              access &&
              access[0]?.actions &&
              access[0].actions[0]?.action != "all"
                ? "hidden"
                : ""
            }`}
          >
            <Button
              onClick={() => {
                setSelectExcelDate(true);
              }}
              className="flex items-center justify-evenly gap-5"
            >
              <Download /> {t("buttons.downloadExcel")}
            </Button>
          </div>
          <div className="ml-auto">
            <Pagination
              currentPage={page + 1}
              totalPages={staticData.docsList.pages}
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
                  length: staticData.docsList.pages,
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
      </div>

      <CommonModal
        visible={selectExcelDate}
        onClose={() => {
          setSelectExcelDate(false);
          setExcelFrom(undefined);
          setExcelTo(undefined);
        }}
        title={t("forms.selectExcelDate")}
      >
        <div>
          <div>
            <div className="flex gap-4 justify-evenly py-2">
              <div className="space-y-2">
                <span className="text-sm font-medium">From date</span>
                <Calendar
                  mode="single"
                  selected={excelFrom}
                  onSelect={(date) =>
                    setExcelFrom(
                      date ? new Date(date.toISOString()) : undefined
                    )
                  }
                  disabled={(date) => (excelTo ? date > excelTo : false)}
                  initialFocus
                />
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">To date</span>
                <Calendar
                  mode="single"
                  selected={excelTo}
                  onSelect={(date) =>
                    setExcelTo(date ? new Date(date.toISOString()) : undefined)
                  }
                  disabled={(date) => (excelFrom ? date < excelFrom : false)}
                  initialFocus
                />
              </div>
            </div>
            <Button onClick={handleDownloadExcel} className="mt-5 mb-3">
              {t("buttons.downloadExcel")}
            </Button>
          </div>
        </div>
      </CommonModal>

      {statusChange && (
        <CommonModal
          onClose={() => {
            setStatusChange(false);
            setSelectedItem(null);
          }}
          visible={statusChange}
          title={t(
            statusTitleMap[
              selectedItem?.status as keyof typeof statusTitleMap
            ] || ""
          )}
          titleSize="md"
          width="400px"
        >
          <div className="flex items-center justify-between gap-5 mt-5">
            <Button
              onClick={() => {
                setStatusChange(false);
              }}
              variant={"ghost"}
            >
              {t("buttons.nCan")}
            </Button>

            <Button
              onClick={() => {
                const statusMap = {
                  CREATE: "ACTIVE",
                  ACTIVE: "CLOSED",
                  CLOSED: "OVERDUE",
                  OVERDUE: "SUSPEND",
                  SUSPEND: "ACTIVE",
                };

                handleStatusChange(
                  statusMap[selectedItem?.status as keyof typeof statusMap]
                );
              }}
              variant={"default"}
              loading={updateContract.isLoading}
            >
              {t("buttons.yChange")}
            </Button>
          </div>
        </CommonModal>
      )}

      <AddModal
        refetchAllContractsList={refetchAllContractsList}
        data={singleContract?.data}
        loading={singleContractLoading}
        defaultType={defaultType}
        disableContractSelect={defaultType === ContractType.Ordinary}
        ordinaryContractType={contractType}
        defaultContractId={selectedItem?.id as any}
        selectedItem={selectedItem as any}
        addModal={addModal}
        form={form}
        setAddModal={setAddModal}
        setSelectedItem={setSelectedItem}
      />

      <MonitoringModal
        selectedItem={selectedItem}
        showModal={showMonitoringModal}
        setShowModal={setShowMonitoringModal}
      />

      <EditModal
        editModal={editModal}
        form={form}
        selectedItem={singleContract?.data}
        loading={singleContractLoading}
        setEditModal={setEditModal}
        setSelectedItem={setSelectedItem}
        refetch={refetchSingle}
      />

      <PartnerModal
        addPartnerModal={partnerAddModal}
        setAddPartnerModal={setPartnerAddModal}
        onPartnerCreated={(partner: GetPartners) => {
          // form.setValue("partnerIds", [Number(partner.id)]);
          // setSelectedPartner(
          //   () =>
          //     financePartners?.data?.find((p: GetPartners) => p.id === partner.id) ||
          //     null
          // );
        }}
      />

      {singleModal && (
        <Modal
          closeOnOutsideClick={false}
          title={t("tables.expander")}
          onClose={() => {
            setSingleModal(false);
            setShowTransactions(true);
            setSelectedItem(null);
          }}
          content={
            <div>
              {singleContractLoading ? (
                <div className="flex justify-center py-8">
                  <Loading />
                </div>
              ) : singleContractError ? (
                <div className="flex flex-col items-center justify-center p-6 text-red-600">
                  <p className="text-xl font-bold">
                    {(singleContractError as any)?.response?.data?.message ||
                      t("messages.err")}
                  </p>
                  <p className="text-base mt-2">{t("messages.smtErr")}</p>
                  <Button
                    variant="outline"
                    onClick={() => refetchSingle()}
                    className="mt-4 border-red-600 text-red-600 hover:bg-red-50"
                  >
                    {t("buttons.retry")}
                  </Button>
                </div>
              ) : !singleContract?.data ? (
                <div className="flex flex-col items-center justify-center p-6 text-red-600">
                  <p className="text-xl font-bold">{t("messages.err")}</p>
                  <p className="text-base mt-2">{t("messages.smtErr")}</p>
                  <Button
                    variant="outline"
                    onClick={() => refetchSingle()}
                    className="mt-4 border-red-600 text-red-600 hover:bg-red-50"
                  >
                    {t("buttons.retry")}
                  </Button>
                </div>
              ) : (
                <div className="flex gap-6">
                  <div
                    className={`${
                      showTransactions ? "w-auto" : "w-full"
                    } transition-all duration-300 ease-in-out`}
                  >
                    <div className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl">
                      <div className="overflow-x-auto shadow-lg max-w-6xl mx-auto">
                        <table className="bg-white w-[400px] rounded-lg shadow-md">
                          <tbody className="text-gray-800">
                            {[
                              {
                                label: t("tables.partner"),
                                value: (
                                  <>
                                    <div className="flex truncate max-w-[300px] items-center justify-between cursor-pointer">
                                      {selectedItem?.partnersDto[0]?.name}
                                      <span
                                        onMouseEnter={() =>
                                          setPartnerDtoPOV(true)
                                        }
                                        onMouseLeave={() =>
                                          setPartnerDtoPOV(false)
                                        }
                                      >
                                        <Info className="text-blue-600" />
                                      </span>
                                    </div>
                                    <Popover open={partnerDtoPOV}>
                                      <PopoverTrigger asChild>
                                        <span></span>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-[500px] ml-72 p-4">
                                        <div className="flex flex-col gap-4">
                                          <div className="flex items-start border-b pb-2 border-dashed gap-10">
                                            <h3 className="opacity-50 text-xs w-[50%]">
                                              {t("forms.name")}
                                            </h3>
                                            <p className="text-xs truncate max-w-[300px]">
                                              {selectedItem?.partnersDto[0]
                                                ?.name || "-----"}
                                            </p>
                                          </div>
                                          <div className="flex text-xs items-start border-b pb-2 border-dashed gap-10">
                                            <h3 className="opacity-50 text-xs w-[50%]">
                                              {t("forms.partnerType")}
                                            </h3>
                                            <p>
                                              {selectedItem?.partnersDto[0]
                                                ?.partnerType || "-----"}
                                            </p>
                                          </div>
                                          <div className="flex items-start border-b pb-2 text-xs border-dashed gap-10">
                                            <h3 className="opacity-50 w-[50%] text-xs">
                                              {t("forms.inn")}
                                            </h3>
                                            <p>
                                              {selectedItem?.partnersDto[0]
                                                ?.inn || "-----"}
                                            </p>
                                          </div>
                                          <div className="flex items-start border-b pb-2 text-xs border-dashed gap-10">
                                            <h3 className="opacity-50 w-[50%] text-xs">
                                              {t("forms.amountPaid")}
                                            </h3>
                                            <p>
                                              {`${
                                                selectedItem?.partnersDto[0]
                                                  ?.amountPaid != undefined
                                                  ? selectedItem?.partnersDto[0]
                                                      ?.amountPaid
                                                  : 0
                                              } 
                                            ${
                                              selectedItem?.partnersDto[0]
                                                ?.currencyType[0]
                                            }` || 0}
                                            </p>
                                          </div>
                                          <div className="flex items-start border-b pb-2 text-xs border-dashed gap-10">
                                            <h3 className="opacity-50 w-[50%] text-xs">
                                              {t("tables.refundedAmount")}
                                            </h3>
                                            <p>
                                              {`${
                                                selectedItem?.partnersDto[0]
                                                  ?.refundedAmount != undefined
                                                  ? selectedItem?.partnersDto[0]
                                                      ?.refundedAmount
                                                  : 0
                                              } 
                                            ${
                                              selectedItem?.partnersDto[0]
                                                ?.currencyType[0]
                                            }` || 0}
                                            </p>
                                          </div>
                                          <div className="flex items-start border-b pb-2 text-xs border-dashed gap-10">
                                            <h3 className="opacity-50 w-[50%] text-xs">
                                              {t("tables.receivedAmount")}
                                            </h3>
                                            <p>{`${
                                              selectedItem?.partnersDto[0]
                                                ?.receivedAmount != undefined
                                                ? selectedItem?.partnersDto[0]
                                                    ?.receivedAmount
                                                : 0 || 0
                                            } 
                                               ${
                                                 selectedItem?.partnersDto[0]
                                                   ?.currencyType[0]
                                               }`}</p>
                                          </div>
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                  </>
                                ),
                              },
                              {
                                label: t("tables.category"),
                                value: (
                                  <div className="truncate max-w-[300px]">
                                    {selectedItem?.categoryDto?.name}
                                  </div>
                                ),
                              },
                              {
                                label: t("tables.number"),
                                value: (
                                  <div className="truncate max-w-[300px]">
                                    {selectedItem?.number}
                                  </div>
                                ),
                              },
                              {
                                label: t("tables.status"),
                                value: (
                                  <div
                                    className={` 
                                    ${
                                      selectedItem?.status === "CREATE"
                                        ? "text-blue-500"
                                        : selectedItem?.status === "ACTIVE"
                                        ? "text-green-500"
                                        : selectedItem?.status === "CLOSED"
                                        ? "text-gray-500"
                                        : selectedItem?.status === "OVERDUE"
                                        ? "text-red-500"
                                        : selectedItem?.status === "SUSPEND"
                                        ? "text-yellow-500"
                                        : "text-black"
                                    }`}
                                  >
                                    {selectedItem?.status === "CREATE"
                                      ? t("common.statuses.create")
                                      : selectedItem?.status === "ACTIVE"
                                      ? t("common.statuses.active")
                                      : selectedItem?.status === "CLOSED"
                                      ? t("common.statuses.closed")
                                      : selectedItem?.status === "OVERDUE"
                                      ? t("common.statuses.overdue")
                                      : selectedItem?.status === "SUSPEND"
                                      ? t("common.statuses.suspended")
                                      : t("common.statuses.suspended")}
                                  </div>
                                ),
                                className: "text-green-600 font-medium",
                              },
                              {
                                label: t("tables.finAmo"),
                                value: (
                                  <div className="truncate max-w-[300px]">{`${
                                    selectedItem?.financingAmount != undefined
                                      ? selectedItem?.financingAmount?.toLocaleString()
                                      : 0
                                  } ${selectedItem?.currencyType}`}</div>
                                ),
                              },
                              {
                                label: t("tables.intRate"),
                                value: (
                                  <div className="truncate max-w-[300px]">{`${
                                    selectedItem?.interestRate || 0
                                  } %`}</div>
                                ),
                              },
                              {
                                label: t("tables.penRate"),
                                value: (
                                  <div className="truncate max-w-[300px]">{`${
                                    selectedItem?.penaltyRate || 0
                                  } %`}</div>
                                ),
                              },
                              {
                                label: t("tables.sDate"),
                                value: (
                                  <div className="truncate max-w-[300px]">
                                    {selectedItem?.startDate &&
                                      new Date(selectedItem.startDate)
                                        .toLocaleDateString("en-GB", {
                                          day: "2-digit",
                                          month: "2-digit",
                                          year: "numeric",
                                        })
                                        .replace(/\//g, ".")}
                                  </div>
                                ),
                              },
                              {
                                label: t("tables.eDate"),
                                value: (
                                  <div className="truncate max-w-[300px]">
                                    {selectedItem?.endDate &&
                                      new Date(selectedItem.endDate)
                                        .toLocaleDateString("en-GB", {
                                          day: "2-digit",
                                          month: "2-digit",
                                          year: "numeric",
                                        })
                                        .replace(/\//g, ".")}
                                  </div>
                                ),
                              },
                              {
                                label: t("tables.contractDate"),
                                value: (
                                  <div className="truncate max-w-[300px]">
                                    {selectedItem?.contractDate &&
                                      new Date(selectedItem.contractDate)
                                        .toLocaleDateString("en-GB", {
                                          day: "2-digit",
                                          month: "2-digit",
                                          year: "numeric",
                                        })
                                        .replace(/\//g, ".")}
                                  </div>
                                ),
                              },
                              {
                                label: t("tables.balance"),
                                value: (
                                  <div className="truncate max-w-[300px]">{`${
                                    selectedItem?.balance != undefined
                                      ? selectedItem?.balance?.toLocaleString()
                                      : 0
                                  } ${selectedItem?.currencyType}`}</div>
                                ),
                              },
                            ].map((item, index) => (
                              <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                              >
                                <td className="py-4 px-6 font-medium text-muted-foreground text-xs">
                                  {item.label}
                                </td>
                                <td className={`py-4 px-6 text-xs`}>
                                  {item.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {selectedItem?.terms && (
                        <div className="mt-8">
                          <h3 className="text-2xl text-gray-900 mb-4 border-b-2 border-indigo-500 pb-2">
                            {t("tables.terms")}
                          </h3>
                          <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="font-medium truncate line-clamp-5 max-w-[300px] text-xs">
                              {selectedItem?.terms || "-----"}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mt-8">
                        <h3 className="text-lg text-gray-900 mb-4 border-b-2 border-indigo-500 pb-2">
                          {t("tables.attachments")}
                        </h3>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                          {selectedItem?.attachments?.length ?? 0 > 0 ? (
                            <div className="flex gap-6 flex-wrap">
                              {selectedItem?.attachments.map(
                                (attachment: any, index: number) => (
                                  <button
                                    key={index}
                                    onClick={() => handleDownload(attachment)}
                                    className="text-[#3BB5DC] hover:opacity-70 flex items-center gap-2 transition-colors"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m-9 6h18M5 5h14a2 2 0 002-2V3a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2z"
                                      />
                                    </svg>
                                    <span className="font-medium max-w-[100px] truncate">
                                      {attachment?.originName}
                                    </span>
                                  </button>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-gray-600 text-lg">
                              {t("common.noData")}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-8 text-sm text-gray-600">
                        <p>
                          {t("tables.createdAt")}{" "}
                          {selectedItem?.createdAt &&
                            new Date(selectedItem?.createdAt)
                              .toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })
                              .replace(/\//g, ".") +
                              " " +
                              new Date(
                                selectedItem?.createdAt
                              ).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {showTransactions && (
                    <div className="w-[500px] p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl sticky top-0 h-fit transition-all duration-300 ease-in-out transform translate-x-0 opacity-100">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm text-gray-900 mb-4 border-b-2 border-indigo-500 pb-2">
                          {t("modals.singleDetailSMT")}
                        </h3>
                      </div>

                      <div className="mb-4">
                        <Select
                          value={transactionType}
                          onValueChange={(value) =>
                            setTransactionType(value as TransactionType)
                          }
                        >
                          <SelectTrigger className="w-full text-xs">
                            <SelectValue placeholder="Выберите тип транзакции" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(TransactionType).map((type) => (
                              <SelectItem
                                className="text-xs"
                                key={type}
                                value={type}
                              >
                                {t(`modals.details.${type}`)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div
                        ref={rootRef}
                        className="overflow-x-auto shadow-lg max-h-[600px] overflow-y-auto"
                      >
                        <table className="min-w-full bg-white rounded-lg">
                          <thead className="sticky top-0 text-xs z-10">
                            <tr className="bg-[#3BB5DC] text-white uppercase tracking-widest text-xs">
                              <th className="py-2 px-4 text-left text-xs font-semibold">
                                {t("tables.id")}
                              </th>
                              <th className="py-2 px-4 text-left text-xs font-semibold">
                                {t("tables.date")}
                              </th>
                              <th className="py-2 px-4 text-left text-xs font-semibold">
                                {t("forms.type")}
                              </th>
                              <th className="py-2 px-4 text-left text-xs font-semibold">
                                {t("tables.amount")}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-800">
                            {transactions?.pages?.flatMap((page: any) =>
                              page.data.map((transaction: any) => (
                                <tr
                                  key={transaction.id}
                                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                  <td className="py-3 px-4 text-xs">
                                    {transaction.id}
                                  </td>
                                  <td className="py-3 px-4 text-xs">
                                    {new Date(
                                      transaction.createdAt
                                    ).toLocaleDateString("ru-RU", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    })}
                                  </td>
                                  <td className="py-3 px-4 text-xs">
                                    {transaction.type}
                                  </td>
                                  <td className="py-3 px-4 text-xs">
                                    {transaction.amount.toLocaleString()}
                                  </td>
                                </tr>
                              ))
                            )}
                            {(!transactions?.pages?.length ||
                              transactions.pages.every(
                                (page: any) => !page.data.length
                              )) && (
                              <tr>
                                <td
                                  colSpan={4}
                                  className="py-4 text-center text-xs text-gray-500"
                                >
                                  {t("common.noData")}
                                </td>
                              </tr>
                            )}
                            {(isTransactionLoading || isFetchingNextPage) && (
                              <tr ref={sentryRef}>
                                <td colSpan={4} className="py-4">
                                  <div className="flex justify-center">
                                    <Loading />
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          }
        />
      )}

      <CalculatedModal
        status={openCalculatedModal.status}
        type={openCalculatedModal.type}
        contractId={openCalculatedModal.contractId}
        open={openCalculatedModal.open}
        onClose={() =>
          setOpenCalculatedModal({ ...openCalculatedModal, open: false })
        }
      />
    </>
  );
}
