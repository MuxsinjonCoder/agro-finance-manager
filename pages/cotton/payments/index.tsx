"use client";

import CommonModal from "@/components/CommonModal";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/pages/_app";
import {
  useFinanceContracts
} from "@/queries/contracts";
import { useCreatePay, useDeletePayment, useGetPay } from "@/queries/pay";
import { GotContractData } from "@/types/contracts";
import { CreatePaymentTypes, GotPays } from "@/types/pay";
import {
  TransactionStatus,
  TransactionType
} from "@/types/transactions";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState
} from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PaymentsTable from "../../../components/grain/payments/components/table";

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

  const onSubmit = async (data: CreatePaymentTypes) => {
    const submittingData = {
      contractId: Number(data?.contractId),
      paymentDate: String(data?.paymentDate),
      amountPaid: Number(data?.amountPaid.replace(/\D/g, "")),
      transactionType: selectedType,
    };

    createPay.mutate(submittingData as CreatePaymentTypes, {
      onSuccess: (data) => {
        if (data.data.status === "BAD_REQUEST") {
          toast.error(data.data.message);
        } else {
          setAddModal(false);
          reset();
          form.reset();
          setSelectedContract(null);
          setSelectedType("");
          refetchContracts();
          toast.message(t("messages.created"));
        }
      },
    });
    // console.log(submittingData);
  };

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
      <div className="min-w-full h-[99vh] overflow-auto relative border-gray-300 rounded-md">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("pay.title")}
          </h2>
        </div>
        <div className="flex items-center">
          <div className="flex items-center w-full justify-between py-4">
            <div className="flex w-full items-center justify-between gap-5">
              {/* <div className="w-[25%]">
                <label>{t("tables.searchContracts")}</label>
                <Input placeholder={t("buttons.filterPays")} />
              </div> */}
              {/* <div className="flex-col items-center space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0">
                <DateRangePicker
                  selectedRange={selectedRange} // Use tempRange to store selections
                  onChangeRange={setSelectedRange} // Update tempRange when date range changes
                />

                <Button
                  className="w-full"
                  onClick={() => {
                    setTempRange(selectedRange);
                    console.log(tempRange, "selectedRange");
                  }}
                  loading={isLoading && tempRange?.from !== undefined}
                >
                  {t("partner.searchByDate")}
                </Button>
              </div> */}
              {/* <div className="">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      {t("buttons.cols")} <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div> */}
              {/* <div className="ml-auto">
                <Button className="ml-2" onClick={() => setAddModal(true)}>
                  {t("modals.addPayment")}
                  <Plus />
                </Button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="mt-5 max-h-[85%] overflow-auto">
          <PaymentsTable />
        </div>
      </div>

      {/* pagination buttons */}
      {/* <div className="ml-auto">
        <Pagination currentPage={page + 1} totalPages={paysData?.pages || 1}>
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
            {Array.from({ length: paysData?.pages || 1 }).map((_, index) => (
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
              {page < (paysData?.pages || 1) - 1 && (
                <PaginationNext
                  onClick={() => setPage(page + 1)}
                  currentPage={page + 1}
                  totalPages={paysData?.pages || 1}
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div> */}

      {/* add modal */}
      <CommonModal
        title={t("modals.addPayment")}
        visible={addModal}
        onClose={() => setAddModal(false)}
      >
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-wrap justify-evenly gap-5"
            >
              {/* contract */}
              <div className="w-[46%]">
                <FormField
                  control={form.control}
                  name="contractId"
                  rules={{ required: t("forms.selectContractMsg") }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("forms.selectContract")}</FormLabel>
                      <FormControl>
                        <Select
                          value={selectedContract?.id.toString() || ""}
                          onValueChange={(value) => {
                            const contract =
                              financeContracts?.data?.find(
                                (c: GotContractData) =>
                                  c.id.toString() === value
                              ) || null;
                            setSelectedContract(contract);
                            field.onChange(value);
                          }}
                          required
                        >
                          <SelectTrigger className="focus:outline focus:outline-1 focus:outline-blue-500">
                            <SelectValue
                              placeholder={t("forms.selectContract")}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {financeContracts?.data?.length > 0 ? (
                              financeContracts?.data?.map(
                                (contract: GotContractData) => (
                                  <SelectItem
                                    className="max-w-[300px] truncate"
                                    key={contract.id}
                                    value={contract.id.toString()}
                                  >
                                    {contract.number}
                                  </SelectItem>
                                )
                              )
                            ) : (
                              <div>
                                <Link href={"/contracts"}>
                                  <Button>{t("modals.add")}</Button>
                                </Link>
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* transactionType */}
              <div className="w-[46%]">
                <FormField
                  control={form.control}
                  name="transactionType"
                  rules={{ required: t("forms.selectTypeMsg") }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("forms.selectType")}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            setSelectedType(value);
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="focus:outline focus:outline-1 focus:outline-blue-500">
                            <SelectValue placeholder={t("forms.selectType")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PAYMENT">
                              {t("forms.PAYMENT")}
                            </SelectItem>
                            <SelectItem value="PENALTY">
                              {t("forms.PENALTY")}
                            </SelectItem>
                            <SelectItem value="PERCENTAGE">
                              {t("forms.PERCENTAGE")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* paymentDate */}
              <div className="w-[46%]">
                <FormField
                  control={form.control}
                  name="paymentDate"
                  rules={{ required: t("forms.selectDateMsg") }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("tables.date")}</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline">
                              {field.value
                                ? format(parseISO(field.value), "dd.MM.yyyy")
                                : t("tables.date")}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? parseISO(field.value) : new Date()
                            }
                            onSelect={(date) =>
                              field.onChange(date?.toISOString())
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* amountPaid */}
              <div className="w-[46%]">
                <FormField
                  control={form.control}
                  name="amountPaid"
                  rules={{
                    required: t("forms.enterAmountMsg"),
                    validate: (value) =>
                      value !== "0" || "Summa 0 bo'lishi mumkin emas",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("forms.amountPaid")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            let numericValue = parseInt(value) || 0;

                            const maxValue =
                              selectedType === "PAYMENT"
                                ? selectedContract?.remainBalance || 0
                                : selectedType === "PENALTY"
                                  ? selectedContract?.penaltyAmount || 0
                                  : selectedType === "PERCENTAGE"
                                    ? selectedContract?.interestAmount || 0
                                    : 0;

                            if (numericValue > maxValue) {
                              numericValue = maxValue;
                            }

                            const formattedValue = numericValue
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                            field.onChange(formattedValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.amountPaid
                          ? null
                          : `${t("forms.needToPay")}: ${selectedType === "PAYMENT"
                            ? selectedContract?.remainBalance
                            : selectedType === "PENALTY"
                              ? selectedContract?.penaltyAmount
                              : selectedType === "PERCENTAGE"
                                ? selectedContract?.interestAmount
                                : 0
                          }`}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                variant={"add"}
                className="my-5"
                type="submit"
                loading={createPay.isLoading}
              >
                {t("buttons.submit.payment")}
              </Button>
            </form>
          </Form>
        </div>
      </CommonModal>
    </>
  );
}
