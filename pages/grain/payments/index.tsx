"use client";

import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
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
import { Calendar, CalendarCOS } from "@/components/ui/calendar";
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
import { useForm } from "react-hook-form";
import {
  useCreateFinancePartner,
  useDeleteFinancePartner,
  useFinancePartner,
  useFinancePartners,
} from "@/queries/partners";
import { CreatePartnerData, GetPartners } from "@/types/partners";
import {
  ArrowUpDown,
  ChevronDown,
  Edit,
  Eye,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import {
  useCreateFinanceContract,
  useDeleteFinanceContract,
  useFinanceContracts,
} from "@/queries/contracts";
import { CreateContract, GotContractData } from "@/types/contracts";
import {
  useDeleteFinanceCategory,
  useFinanceCategories,
} from "@/queries/categories";
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
import { toast } from "sonner";
import { CreateBudgetTypes, GotBudgetTypes } from "@/types/budget";
import { useTranslation } from "react-i18next";
import { useCreatePay, useDeletePayment, useGetPay } from "@/queries/pay";
import { CreatePaymentTypes, GotPays } from "@/types/pay";
import { formatNumberWithSpaces } from "@/helpers/textUtils";
import CalculatedModal from "@/components/PaymentsComponent/CalculatedModal";
import { DateRangePicker } from "@/components/date-range-picker";
import { DateRange } from "react-day-picker";
import CommonModal from "@/components/CommonModal";
import { SortHeaderColumn } from "@/components/ui/table";
import { useTransactionFilter } from "@/queries/transactions";
import {
  GotTransactions,
  TransactionStatus,
  TransactionType,
} from "@/types/transactions";
import Link from "next/link";
import PaymentsTable from "../../../components/grain/payments/components/table";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";
import { useUser } from "@/pages/_app";
import AddModal from "@/components/grain/payments/components/add-modal";

const MySwal = withReactContent(Swal);

export default function PaymentsPage() {
  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "grain-pays"
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

  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    TransactionStatus.Payment
  );
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.Payment
  );
  const [contractElements, setContractElements] = useState<number>(10);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );

  const [tempRange, setTempRange] = useState<DateRange | undefined>(
    selectedRange
  );

  const { data: financeContracts, refetch: refetchContracts } =
    useFinanceContracts(0, contractElements);

  useEffect(() => {
    setContractElements(financeContracts?.elements || 10);
  }, [financeContracts]);

  const deletePayment = useDeletePayment();
  const createPay = useCreatePay();

  const {
    data: paysData,
    isLoading,
    refetch: refetchPaysData,
  } = useGetPay(page, 10);

  const form = useForm({
    defaultValues: {
      contractId: undefined,
      paymentDate: new Date().toISOString(),
      amountPaid: undefined,
      interestAmount: undefined,
      penaltyAmount: undefined,
      transactionType: "",
    },
  });

  const { register, handleSubmit, reset } = form;

  const [addModal, setAddModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GotPays | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedContract, setSelectedContract] =
    useState<GotContractData | null>(null);
  const [selectedType, setSelectedType] = useState("");
  const [openCalculatedModal, setOpenCalculatedModal] =
    useState<boolean>(false);
  const [deletingPayment, setDeletingPayment] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    refetchPaysData();
  }, [tempRange]);

  const handleDeleteCategory = (id: any) => {
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
          deletePayment.mutate(id, {
            onSuccess: (response) => {
              if (response.status === "OK") {
                toast.message(t("messages.delEd"));
                refetchPaysData();
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
          });
        });
      },
    });
  };

  return (
    <>
      <div className="min-w-full h-[93vh] relative border-gray-300 rounded-md">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("pay.title")}
          </h2>
          <div className="ml-auto">
            <Button className="ml-2" onClick={() => setAddModal(true)}>
              {t("modals.addPayment")}
              <Plus />
            </Button>
          </div>
        </div>
        <div className="mt-5 max-h-[75vh] overflow-auto">
          <PaymentsTable />
        </div>
      </div>

      {/* add modal */}
      <AddModal addModal={addModal} setAddModal={setAddModal} />
    </>
  );
}
