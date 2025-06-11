import CommonModal from "@/components/CommonModal";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarCOS } from "@/components/ui/calendar";
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
import { useFinanceCategories } from "@/queries/categories";
import { useFinancePartners } from "@/queries/partners";
import { GotCategory } from "@/types/category";
import { GetPartners } from "@/types/partners";
import { PlusCircle, Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, UseFormReturn } from "react-hook-form";
import { format, parseISO, isAfter, isBefore } from "date-fns";
import { FileUpload } from "@/components/ui/uploader";
import {
  useAddContractFile,
  useCreateFinanceContract,
  useCreateFinanceMainContract,
  useFinanceContracts,
  useFinanceMainContracts,
} from "@/queries/contracts";
import { toast } from "sonner";
import {
  CreateContract,
  CreateMainContract,
  GotContractData,
  GotMainCont,
} from "@/types/contracts";
import { useUser } from "@/pages/_app";
import { createFinanceMainContract } from "@/api/financrContractApi";
import PartnerModal from "@/components/partners/create";
import { cn } from "@/lib/utils";
import { formatStringWithSpaces } from "@/helpers/textUtils";
import AddAttechments from "./add-attechment";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export enum ContractType {
  Standard = "STANDARD",
  Ordinary = "ORDINARY",
  Main = "MAIN",
}

interface AddModalProps {
  addModal: boolean;
  setAddModal: (value: boolean) => void;
  form: UseFormReturn<any>;
  defaultType?: ContractType;
  ordinaryContractType?: "STANDARD" | "MAIN" | "all";
  defaultContractId?: number;
  disableContractSelect?: boolean;
  data: GotContractData;
  loading?: boolean;
  selectedItem: any;
  setSelectedItem: (value: any) => void | null;
  refetchAllContractsList: any;
}

interface CustomFile extends File {
  cloudPath?: string;
  originName?: string;
}

export default function AddModal({
  addModal,
  setAddModal,
  form,
  defaultType = ContractType.Standard,
  ordinaryContractType,
  defaultContractId,
  disableContractSelect = false,
  loading = false,
  data,
  selectedItem,
  setSelectedItem,
  refetchAllContractsList,
}: AddModalProps) {
  const user = useUser();

  const contractDate = selectedItem?.contractDate;
  const startDate = selectedItem?.startDate;
  const endDate = selectedItem?.endDate;

  const [mainContractsSize, setMainContractsSize] = useState(10);
  const [standardContractsSize, setStandardContractsSize] = useState(10);

  const allMainContracts = useFinanceMainContracts(0, mainContractsSize);
  const standartContracts = useFinanceContracts(0, standardContractsSize);

  useEffect(() => {
    if (allMainContracts?.data?.elements > 0) {
      setMainContractsSize(allMainContracts?.data?.elements);
    }
  }, [allMainContracts?.data?.elements]);

  useEffect(() => {
    if (standartContracts?.data?.elements > 0) {
      setStandardContractsSize(standartContracts?.data?.elements);
    }
  }, [standartContracts?.data?.elements]);

  const mergedContractsList = useMemo(
    () => [
      ...(standartContracts?.data?.data ?? []),
      ...(allMainContracts?.data?.data ?? []),
    ],
    [standartContracts?.data?.data, allMainContracts?.data]
  );

  const contracts = useMemo(() => {
    if (ordinaryContractType === "STANDARD") {
      return standartContracts?.data?.data;
    } else if (ordinaryContractType === "MAIN") {
      return allMainContracts?.data?.data;
    }
    return mergedContractsList;
  }, [ordinaryContractType, standartContracts, allMainContracts]);

  const {
    data: financePartners,
    isLoading,
    error,
    refetch: financePartnersRefetch,
  } = useFinancePartners({
    page: 0,
    size: 100,
    type: "",
    from: "",
    to: "",
    dateTime: "",
  });
  const allCategories = useFinanceCategories(0, 100);
  const createContract = useCreateFinanceContract();
  const createMainContract = useCreateFinanceMainContract();
  const [currency, setCurrency] = useState("UZS");
  const [interestType, setInterestType] = useState("EVERY_MONTH");
  const [selectedPartner, setSelectedPartner] = useState<GetPartners | null>(
    null
  );
  const [partnerAddModal, setPartnerAddModal] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [contractType, setContractType] = useState<ContractType>(defaultType);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentForm, setCurrentForm] = useState(contractType);
  const [creatededMainCont, setCreatededMainCont] =
    useState<GotMainCont | null>(null);
  const [hasFiles, setHasFiles] = useState(false);
  const [selectedStandardContract, setSelectedStandardContract] = useState<
    any | null
  >(null);
  const [addAttechment, setAddAttechment] = useState(false);
  const mainContractId = form.watch("mainContractId");
  const standardId = form.watch("standardId");

  const [selectedMainContract, setSelectedMainContract] = useState<any | null>(
    null
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const categoryId = form.watch("categoryId");

  const [selectedCategory, setSelectedCategory] = useState<GotCategory | null>(
    null
  );
  const [showFinancialDirection, setShowFinancialDirection] = useState(false);
  const [newCreatedContract, setNewCreatedContract] = useState<any | null>(
    null
  );

  const needToShowMaxPenalty = selectedCategory?.name == "PAXTA";

  useEffect(() => {
    setSelectedCategory(
      allCategories?.data?.data?.find((item: any) => item?.id == categoryId) ||
        null
    );
  }, [categoryId, allCategories]);

  useEffect(() => {
    setShowFinancialDirection(
      selectedCategory?.name?.includes("Don ") ?? false
    );
  }, [selectedCategory]);

  useEffect(() => {
    if (contractType != defaultType) {
      setContractType(defaultType);
      resetForm();
    }

    if (selectedItem) {
      setFormValues();
    }
  }, [addModal, defaultType, selectedItem]);

  const { t } = useTranslation();

  const formValues = form.watch();
  useEffect(() => {
    if (
      formValues.partnerId ||
      formValues.categoryId ||
      formValues.financialDirection ||
      formValues.number ||
      formValues.status ||
      formValues.currencyType ||
      formValues.gracePeriod ||
      formValues.maxPenalty ||
      formValues.financingAmount ||
      formValues.interestRate ||
      formValues.penaltyRate ||
      formValues.ordinaryContractNumber ||
      formValues.mainContractId
    ) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [formValues]);

  const setFormValues = () => {
    form.setValue("number", selectedItem.number);
    form.setValue("status", selectedItem.status);
    form.setValue("currencyType", selectedItem.currencyType);
    form.setValue("contractDate", selectedItem.contractDate);
    form.setValue("startDate", selectedItem.startDate);
    form.setValue("endDate", selectedItem.endDate);
    form.setValue("categoryId", selectedItem.categoryDto?.id);
    form.setValue("financialDirection", selectedItem?.financialDirection);
    form.setValue("partnerIds", selectedItem.partnersDto[0]?.id);
  };

  useEffect(() => {
    if (data) {
      setFormValues();
    }
  }, [data, selectedItem, addModal]);

  const endDateDate = new Date(new Date().getFullYear(), 11, 31);
  const formattedDate = endDateDate.toISOString();

  const resetForm = () => {
    form.reset({
      partnerIds: [undefined],
      number: "",
      financingAmount: undefined,
      interestRate: undefined,
      penaltyRate: undefined,
      contractDate: new Date().toISOString(),
      startDate: new Date().toISOString(),
      endDate: formattedDate,
      terms: "",
      balance: 0,
      currencyType: "",
      files: [],
      gracePeriod: undefined,
      payDate: undefined,
      categoryDto: undefined,
    });
  };

  const handleCloseModal = () => {
    if (hasUnsavedChanges) {
      const confirmClose = window.confirm(
        "Your inputted data will be lost. Are you sure you want to close?"
      );
      if (confirmClose) {
        setAddModal(false);
        form.reset();
        setAddModal(false);
        form.reset();
        setFiles([]);
        resetForm();
        setContractType(ContractType?.Standard);
        setSelectedItem(null);
      }
    } else {
      setAddModal(false);
      form.reset();
    }
  };

  useEffect(() => {
    form.reset();
    setFiles([]);
    resetForm();
    resetForm();
    setTimeout(() => {
      setHasFiles(false);
    }, 0);
  }, [contractType, addModal]);

  const currentContract = useMemo(() => {
    return mergedContractsList?.find(
      (contract: any) =>
        contract.id === parseFloat(form.getValues("mainContractId"))
    );
  }, [
    contractType,
    mergedContractsList,
    defaultContractId,
    form.getValues("mainContractId"),
  ]);

  const onSubmit = async (data: CreateContract) => {
    form.clearErrors(["mainContractId", "standardId"]);

    const submittingData: CreateContract = {
      penaltyState: interestType,
      maxPenalty: Number(data?.maxPenalty) || 0,
      categoryId: Number(data?.categoryId),
      partnerIds: [Number(selectedPartner?.id)],
      balance: Number(data?.balance?.toString().replace(/\s/g, "").trim()),
      financingAmount: data?.financingAmount
        ? Number(data?.financingAmount?.toString().replace(/\s/g, "").trim())
        : 0,
      interestRate: data?.interestRate ? Number(data?.interestRate) : 0,
      penaltyRate: data?.penaltyRate ? Number(data?.penaltyRate) : 0,
      contractDate: format(
        new Date(data.contractDate),
        "yyyy-MM-dd'T'HH:mm:ss"
      ),
      startDate: new Date(data?.startDate).toISOString().slice(0, 19),
      endDate: new Date(data?.endDate).toISOString().slice(0, 19),
      terms: String(data?.terms),
      currencyType: String(currency) || "UZS",
      files,
      contractType: contractType,
      userId: user?.user?.data?.id,
      gracePeriod: Number(data?.gracePeriod),
      payDate: data?.payDate ? Number(data?.payDate) : undefined,
      contractNumber: String(data?.ordinaryContractNumber || ""),
      ...(data?.mainContractId
        ? { mainContractId: data.mainContractId }
        : { standardId: data.standardId }),
    };

    createContract.mutate(
      { ...submittingData, files },
      {
        onSuccess: (res) => {
          console.log("res", res);
          setAddModal(false);
          form.reset();
          toast.message(t("messages.created"));
          setFiles([]);
          setContractType(ContractType?.Standard);
          resetForm();
          refetchAllContractsList();
          setTimeout(() => {
            setHasFiles(false);
          }, 0);
        },
      }
    );
  };

  const onSubmitStandardContract = async (data: CreateContract) => {
    const submittingData: CreateContract = {
      penaltyState: interestType,
      maxPenalty: Number(data?.maxPenalty) || 0,
      categoryId: Number(data?.categoryId),
      financialDirection: String(data?.financialDirection),
      partnerIds: [Number(selectedPartner?.id)],
      number: String(data?.number),
      balance: Number(data?.balance?.toString().replace(/\s/g, "").trim()),
      financingAmount: data?.financingAmount
        ? Number(data?.financingAmount?.toString().replace(/\s/g, "").trim())
        : 0,
      interestRate: data?.interestRate ? Number(data?.interestRate) : 0,
      penaltyRate: data?.penaltyRate ? Number(data?.penaltyRate) : 0,
      contractDate: format(
        new Date(data.contractDate),
        "yyyy-MM-dd'T'HH:mm:ss"
      ),
      startDate: new Date(data?.startDate).toISOString().slice(0, 19),
      endDate: new Date(data?.endDate).toISOString().slice(0, 19),
      terms: String(data?.terms),
      currencyType: String(currency) || "UZS",
      files,
      contractType: contractType,
      userId: user?.user?.data?.id,
      gracePeriod: Number(data?.gracePeriod),
      payDate: data?.payDate ? Number(data?.payDate) : undefined,
      contractNumber: String(data?.contractNumber || ""),
      ...(data?.mainContractId
        ? { mainContractId: data.mainContractId }
        : { standardId: data.standardId }),
    };

    createContract.mutate(
      { ...submittingData, files },
      {
        onSuccess: (res) => {
          console.log("res", res);
          setAddModal(false);
          form.reset();
          toast.message(t("messages.created"));
          setFiles([]);
          setContractType(ContractType?.Standard);
          resetForm();
          refetchAllContractsList();
          setTimeout(() => {
            setHasFiles(false);
          }, 0);
        },
      }
    );
  };

  const onSubmitMainContract = async (
    data: CreateMainContract,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!files.length) {
      setHasFiles(false);
      return;
    }

    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;

    try {
      const submittingData: CreateMainContract = {
        userId: user?.user?.data?.id,
        number: String(data?.number),
        categoryId: Number(data?.categoryId),
        financialDirection: String(data?.financialDirection),
        status: String(data?.status),
        currencyType: String(currency) as "USD" | "EUR" | "RUB" | "UZS",
        contractType: "MAIN",
        contractDate: format(
          new Date(data.contractDate),
          "yyyy-MM-dd'T'HH:mm:ss"
        ),
        startDate: new Date(data?.startDate).toISOString().slice(0, 19),
        endDate: new Date(data?.endDate).toISOString().slice(0, 19),
        files,
        partnerId: Number(data?.partnerId),
      };

      createMainContract.mutate(
        { ...submittingData },
        {
          onSuccess: (response) => {
            toast.message(t("messages.created"));
            setSelectedPartner(null);
            setCreatededMainCont(response?.data);
            form.reset();
            setFiles([]);
            refetchAllContractsList();
            setHasFiles(false);
            if (submitter.name === "addAdditionalCont") {
              setContractType(ContractType?.Ordinary);
            } else {
              setAddModal(false);
            }
          },
        }
      );
    } catch (error) {
      console.error("Error submitting contract:", error);
      toast.error(t("messages.smtErr"));
    }
  };

  const handleFileChange = (files: File[]) => {
    if (files && files.length > 0) {
      setFiles((prev) => [
        ...prev.filter(
          (file) => !files.some((newFile) => newFile.name === file.name)
        ),
        ...files,
      ]);
      setHasFiles(true);
    } else {
      setHasFiles(false);
    }
  };

  const handleDelete = (index: number) => {
    setFiles((prev) => prev.toSpliced(index, 1));
  };

  const isFormValid = () => {
    const values = form.getValues();
    if (
      contractType === ContractType.Standard ||
      contractType === ContractType.Ordinary
    ) {
      return (
        hasFiles &&
        values.categoryId &&
        values.financialDirection &&
        values.mainContractId &&
        values.partnerIds.length > 0 &&
        values.number &&
        values.financingAmount !== undefined &&
        values.interestRate !== undefined &&
        values.penaltyRate !== undefined &&
        values.gracePeriod !== undefined &&
        values.currencyType &&
        values.contractType &&
        values.payDate !== undefined &&
        values.contractDate &&
        values.startDate &&
        values.endDate
      );
    }
    return (
      hasFiles &&
      values.number &&
      values.categoryId &&
      values.financialDirection &&
      values.partnerId &&
      values.status &&
      values.currencyType &&
      values.contractType &&
      values.startDate &&
      values.endDate &&
      values.contractDate
    );
  };

  return (
    <>
      <CommonModal
        visible={addModal}
        onClose={() => {
          handleCloseModal();
        }}
        title={t("modals.addCont")}
      >
        <div className="w-full">
          <div className="absolute top-5 w-[200px] right-20">
            <Select
              defaultValue={contractType}
              value={contractType}
              onValueChange={(value: ContractType) => {
                setContractType(value);
              }}
            >
              <SelectTrigger className="">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ContractType.Standard}>
                  {t("buttons.standart")}
                </SelectItem>
                <SelectItem value={ContractType.Ordinary}>
                  {t("buttons.ordinary")}
                </SelectItem>
                <SelectItem value={ContractType.Main}>
                  {t("buttons.main")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative overflow-hidden px-[5px]">
            <div>
              {contractType == "MAIN" ? (
                <>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmitMainContract as any)}
                      className="flex flex-wrap pb-16 justify-between gap-5 px-3"
                    >
                      {/* partner */}
                      <div className="w-[45%] flex items-end justify-between gap-1">
                        <div className="w-full">
                          <FormField
                            rules={{
                              required: {
                                value: true,
                                message: t("forms.selectPartnerPls"),
                              },
                              validate: (value) => {
                                return (
                                  (value && Number(value) != 0) ||
                                  t("forms.selectPartnerPls")
                                );
                              },
                            }}
                            control={form.control}
                            name="partnerId"
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel className="text-[13px]">
                                  {t("forms.selectPartner")}
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    value={
                                      String(field.value) ||
                                      String(selectedPartner?.categoryDto?.id)
                                    }
                                    defaultValue={String(selectedPartner?.id)}
                                    onValueChange={(value) => {
                                      field.onChange(value);

                                      const partner =
                                        financePartners?.data?.find(
                                          (partner: GetPartners) =>
                                            partner.id === Number(value)
                                        );

                                      setSelectedPartner(partner || null);
                                      if (partner) {
                                        form.setValue(
                                          "categoryId",
                                          partner.categoryDto.id
                                        );
                                      }
                                    }}
                                  >
                                    <SelectTrigger
                                      error={!!form.formState.errors.partnerId}
                                      className=""
                                    >
                                      <SelectValue>
                                        {field.value ? (
                                          financePartners?.data?.find(
                                            (p: GetPartners) =>
                                              p.id === Number(field.value)
                                          )?.name
                                        ) : (
                                          <span style={{ opacity: 0.5 }}>
                                            {t("forms.selectPartnerPls")}
                                          </span>
                                        )}
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {financePartners?.data?.map(
                                        (partner: GetPartners) => (
                                          <SelectItem
                                            key={partner.id}
                                            value={String(partner.id)}
                                          >
                                            {partner.name}
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
                        <div
                          onClick={() => {
                            setPartnerAddModal(true);
                          }}
                          className="p-2 cursor-pointer"
                        >
                          <PlusCircle />
                        </div>
                      </div>

                      {/* buni placeholderini chiqarish kerak */}
                      {/* categoryId */}
                      <div className="w-[45%] flex items-end justify-between gap-1">
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="categoryId"
                            rules={{
                              required: {
                                value: true,
                                message: t("forms.required"),
                              },
                              validate: (value) => {
                                return (
                                  (value && Number(value) !== 0) ||
                                  (selectedPartner?.categoryDto?.id &&
                                    Number(selectedPartner.categoryDto.id) !==
                                      0) ||
                                  t("forms.required")
                                );
                              },
                            }}
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel
                                  className={`text-[13px] ${
                                    fieldState.error ? "text-red-500" : ""
                                  }`}
                                >
                                  {t("forms.selectCategory")}
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    value={
                                      field.value
                                        ? String(field.value)
                                        : selectedPartner?.categoryDto?.id
                                        ? String(selectedPartner.categoryDto.id)
                                        : undefined
                                    }
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                    defaultValue={
                                      selectedPartner?.categoryDto?.id
                                        ? String(selectedPartner.categoryDto.id)
                                        : undefined
                                    }
                                  >
                                    <SelectTrigger
                                      error={!!fieldState.error}
                                      className=""
                                    >
                                      <SelectValue
                                        className="opacity-50"
                                        placeholder={t(
                                          "forms.selectCategoryPls"
                                        )}
                                      />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {allCategories?.data?.data?.map(
                                        (category: GotCategory) => (
                                          <SelectItem
                                            key={category.id}
                                            value={String(category.id)}
                                          >
                                            {category.name}
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
                      </div>

                      {/* financialDirection */}
                      {showFinancialDirection && (
                        <div className="w-[45%] flex items-end justify-between gap-1">
                          <div className="w-full">
                            <FormField
                              control={form.control}
                              name="financialDirection"
                              rules={{ required: t("forms.required") }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-[13px]">
                                    {t("forms.amountTracing")}
                                  </FormLabel>
                                  <FormControl>
                                    <Select
                                      value={field.value}
                                      onValueChange={(value) => {
                                        field.onChange(value);
                                      }}
                                    >
                                      <SelectTrigger
                                        error={
                                          !!form.formState.errors.categoryId
                                        }
                                        className="text-xs"
                                      >
                                        <SelectValue
                                          placeholder={t("forms.amountTracing")}
                                        />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem
                                          className="text-xs"
                                          value="IMTIYOZLI_KREDIT"
                                        >
                                          {t(
                                            "forms.financialDirection.IMTIYOZLI_KREDIT"
                                          )}
                                        </SelectItem>
                                        <SelectItem
                                          className="text-xs"
                                          value="ERKIN_MABLAG"
                                        >
                                          {t(
                                            "forms.financialDirection.ERKIN_MABLAG"
                                          )}
                                        </SelectItem>
                                        <SelectItem
                                          className="text-xs"
                                          value="TASHISH_XARAJATI"
                                        >
                                          {t(
                                            "forms.financialDirection.TASHISH_XARAJATI"
                                          )}
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}

                      {/* contractDate */}
                      <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          name="contractDate"
                          rules={{
                            required: {
                              value: true,
                              message: t("forms.required"),
                            },
                          }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel
                                className={
                                  fieldState.error ? "text-red-500" : ""
                                }
                              >
                                {t("forms.contDate")}
                              </FormLabel>
                              <Popover
                                open={calendarOpen}
                                onOpenChange={setCalendarOpen}
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button variant="outline">
                                      {field.value
                                        ? format(
                                            parseISO?.(field.value),
                                            "dd.MM.yyyy"
                                          )
                                        : "Select Date"}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <Calendar
                                    mode="single"
                                    selected={
                                      field.value
                                        ? parseISO?.(field.value)
                                        : undefined
                                    }
                                    onSelect={(date) => {
                                      field.onChange(date?.toISOString());
                                      setCalendarOpen(false);
                                    }}
                                    disabled={(date) =>
                                      (startDate &&
                                        isAfter(date, parseISO?.(startDate))) ||
                                      (endDate &&
                                        isAfter(date, parseISO?.(endDate)))
                                    }
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* contractNumber */}
                      <div className="w-[45%] ">
                        <FormField
                          key={"contractNumber"}
                          control={form.control}
                          name="number"
                          rules={{ required: t("forms.required") }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                {t("forms.contractNumber")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  maxLength={20}
                                  // {...field}
                                  onBlur={(e) => field.onChange(e.target.value)}
                                  placeholder={t("forms.contNum")}
                                  className={`${
                                    fieldState.invalid
                                      ? "border-red-500 outline-red-500 focus:ring-red-500"
                                      : ""
                                  }`}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* status */}
                      <div className="w-[45%] flex items-end justify-between gap-1">
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="status"
                            rules={{
                              required: {
                                value: true,
                                message: t("forms.required"),
                              },
                            }}
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel
                                  className={`text-[13px] ${
                                    fieldState.error ? "text-red-500" : ""
                                  }`}
                                >
                                  {t("forms.status")}
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    value={field.value as any}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                  >
                                    <SelectTrigger
                                      error={!!fieldState.error}
                                      className=""
                                    >
                                      <SelectValue
                                        className="opacity-50"
                                        placeholder={t("forms.selectStatus")}
                                      />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="ACTIVE">
                                        {t("common.statuses.active")}
                                      </SelectItem>
                                      <SelectItem value="CLOSED">
                                        {t("common.statuses.closed")}
                                      </SelectItem>
                                      <SelectItem value="OVERDUE">
                                        {t("common.statuses.overdue")}
                                      </SelectItem>
                                      <SelectItem value="CREATE">
                                        {t("common.statuses.create")}
                                      </SelectItem>
                                      <SelectItem value="SUSPEND">
                                        {t("common.statuses.suspended")}
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* currencyType */}
                      <div className="w-[45%] flex items-end justify-between gap-1">
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="currencyType"
                            // rules={{ required: t("forms.required") }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[13px]">
                                  {t("forms.currencyType")}
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    value={field.value || "UZS"}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                  >
                                    <SelectTrigger
                                      error={
                                        !!form.formState.errors.currencyType
                                      }
                                      className=" "
                                    >
                                      <SelectValue
                                        className="opacity-50"
                                        placeholder={t("forms.selectCurrency")}
                                      />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="USD">USD</SelectItem>
                                      <SelectItem value="EUR">EUR</SelectItem>
                                      <SelectItem value="RUB">RUB</SelectItem>
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

                      {/* startDate */}
                      {/* <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          name="startDate"
                          rules={{ required: t("forms.required") }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("forms.sDate")}</FormLabel>
                              <FormControl>
                                <CalendarCOS
                                  mode="single"
                                  value={String(field.value)}
                                  onChange={(date) => {
                                    field.onChange(date);
                                  }}
                                  disabled={(date) =>
                                    (contractDate &&
                                      isBefore(date, parseISO(contractDate))) ||
                                    (startDate &&
                                      isBefore(date, parseISO(startDate)))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div> */}

                      {/* endDate */}
                      <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          name="endDate"
                          rules={{
                            required: {
                              value: true,
                              message: t("forms.required"),
                            },
                          }}
                          render={({ field, fieldState }) => {
                            return (
                              <FormItem>
                                <FormLabel
                                  className={
                                    fieldState.error ? "text-red-500" : ""
                                  }
                                >
                                  {t("forms.eDate")}
                                </FormLabel>
                                <CalendarCOS
                                  mode="single"
                                  value={
                                    endDate &&
                                    format(parseISO(endDate), "dd.MM.yyyy")
                                  }
                                  onChange={(_, date) => {
                                    field.onChange(date?.toISOString());
                                  }}
                                  disabled={(date) =>
                                    (contractDate &&
                                      isBefore(date, parseISO(contractDate))) ||
                                    (startDate &&
                                      isBefore(date, parseISO(startDate)))
                                  }
                                />
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>

                      {/* Ilova qo'shish */}
                      <div className="w-[45%] mt-3">
                        <Button
                          onClick={() => {
                            setAddAttechment(true);
                          }}
                        >
                          {t("buttons.addAttechment")}
                        </Button>
                      </div>

                      {/*add additional contract  */}
                      <div className="w-[45%]">
                        <Button
                          variant={"outline"}
                          className=" bg-[#3BB5DC] text-white"
                          type="submit"
                          name="addAdditionalCont"
                          loading={createMainContract.isLoading}
                          onClick={() => {
                            if (!files.length) {
                              setHasFiles(false);
                            }
                          }}
                        >
                          {t("buttons.addAdditionalCont")}
                        </Button>
                      </div>

                      {/* multi file upload */}
                      <div className="w-full space-y-2">
                        <FileUpload
                          onChange={handleFileChange}
                          accept=".pdf, image/* , .docx"
                          error={!hasFiles && form.formState.submitCount > 0}
                        />
                        {!hasFiles && form.formState.submitCount > 0 && (
                          <p className="text-red-500 text-xs">
                            {t("forms.required")}
                          </p>
                        )}
                        <div className="space-y-2">
                          {files?.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between border-primary p-2 border rounded-md"
                            >
                              <span className="truncate">
                                {file?.name || file?.originName}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(index)}
                              >
                                <Trash className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="fixed bg-white bottom-0 left-0 right-0">
                        <Button
                          className="mx-5 mb-5 w-[93%]"
                          variant={"add"}
                          type="submit"
                          loading={createMainContract.isLoading}
                          name="submit"
                          onClick={() => {
                            if (!files.length) {
                              setHasFiles(false);
                            }
                          }}
                        >
                          {t("buttons.submit.contract")}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </>
              ) : contractType == "ORDINARY" ? (
                <>
                  {/* qo'shimcha kelishuv */}
                  {/* ORDINARY */}
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-wrap pb-16 justify-between gap-5 px-3"
                    >
                      {/* mainContractId  */}
                      <div className="w-[45%] flex items-end justify-between gap-1">
                        <div className="w-full">
                          <FormField
                            rules={{
                              required: {
                                value: true,
                                message: t("forms.selectMainCont"),
                              },
                              validate: (value) => {
                                return (
                                  (value && Number(value) != 0) ||
                                  t("forms.selectPartnerPls")
                                );
                              },
                            }}
                            control={form.control}
                            name="mainContractId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[13px]">
                                  {t("buttons.main")}
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    value={
                                      String(field.value) ||
                                      String(selectedMainContract?.id)
                                    }
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                      setSelectedMainContract(
                                        allMainContracts?.data?.data?.find(
                                          (partner: any) =>
                                            partner.id === Number(value)
                                        ) || null
                                      );
                                    }}
                                  >
                                    <SelectTrigger
                                      error={
                                        !!form.formState.errors.mainContractId
                                      }
                                      className=""
                                    >
                                      <SelectValue>
                                        {field.value ? (
                                          allMainContracts?.data?.data?.find(
                                            (c: GotMainCont) =>
                                              String(c.id) === field.value
                                          )?.number
                                        ) : (
                                          <span style={{ opacity: 0.5 }}>
                                            {selectedItem?.number ||
                                              allMainContracts?.data?.data?.find(
                                                (contract: any) =>
                                                  contract.id ==
                                                  selectedMainContract
                                              )?.number ||
                                              t("forms.selectMainCont")}
                                          </span>
                                        )}
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {allMainContracts?.data?.data?.map(
                                        (mainCont: GotMainCont) => (
                                          <SelectItem
                                            key={mainCont.id}
                                            value={String(mainCont.id)}
                                          >
                                            {mainCont.number}
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
                      </div>

                      {/* partner */}
                      {/* <div className="w-[45%] flex items-end justify-between gap-1">
                        <div className="w-full">
                          <FormField
                            rules={{
                              required: {
                                value: true,
                                message: t("forms.selectPartnerPls"),
                              },
                              validate: (value) => {
                                return (
                                  (value && Number(value) != 0) ||
                                  t("forms.selectPartnerPls")
                                );
                              },
                            }}
                            control={form.control}
                            name="partnerId"
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel className="text-[13px]">
                                  {t("forms.selectPartner")}
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    value={
                                      String(field.value) ||
                                      String(selectedPartner?.categoryDto?.id)
                                    }
                                    defaultValue={String(selectedPartner?.id)}
                                    onValueChange={(value) => {
                                      field.onChange(value);

                                      const partner =
                                        financePartners?.data?.find(
                                          (partner: GetPartners) =>
                                            partner.id === Number(value)
                                        );

                                      setSelectedPartner(partner || null);
                                      if (partner) {
                                        form.setValue(
                                          "categoryId",
                                          partner.categoryDto.id
                                        );
                                      }
                                    }}
                                  >
                                    <SelectTrigger
                                      error={!!form.formState.errors.partnerId}
                                      className=""
                                    >
                                      <SelectValue>
                                        {field.value ? (
                                          financePartners?.data?.find(
                                            (p: GetPartners) =>
                                              p.id === Number(field.value)
                                          )?.name
                                        ) : (
                                          <span style={{ opacity: 0.5 }}>
                                            {t("forms.selectPartnerPls")}
                                          </span>
                                        )}
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {financePartners?.data?.map(
                                        (partner: GetPartners) => (
                                          <SelectItem
                                            key={partner.id}
                                            value={String(partner.id)}
                                          >
                                            {partner.name}
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
                        <div
                          onClick={() => {
                            setPartnerAddModal(true);
                          }}
                          className="p-2 cursor-pointer"
                        >
                          <PlusCircle />
                        </div>
                      </div> */}

                      {/* categoryId */}
                      <div className="w-[45%] flex items-end justify-between gap-1">
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="categoryId"
                            rules={{ required: t("forms.required") }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[13px]">
                                  {t("forms.selectCategory")}
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    value={field.value || "19"}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                  >
                                    <SelectTrigger
                                      error={!!form.formState.errors.categoryId}
                                      className=""
                                    >
                                      <SelectValue>
                                        {field.value ? (
                                          allCategories?.data?.data?.find(
                                            (c: GotCategory) =>
                                              String(c.id) === field.value
                                          )?.name
                                        ) : (
                                          <span style={{ opacity: 0.5 }}>
                                            {t("forms.selectCategoryPls")}
                                          </span>
                                        )}
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {allCategories?.data?.data?.map(
                                        (category: GotCategory) => (
                                          <SelectItem
                                            key={category.id}
                                            value={String(category.id)}
                                          >
                                            {category.name}
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
                      </div>

                      {/* financialDirection */}
                      {showFinancialDirection && (
                        <div className="w-[45%] flex items-end justify-between gap-1">
                          <div className="w-full">
                            <FormField
                              control={form.control}
                              name="financialDirection"
                              rules={{ required: t("forms.required") }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-[13px]">
                                    {t("forms.amountTracing")}
                                  </FormLabel>
                                  <FormControl>
                                    <Select
                                      value={field.value}
                                      onValueChange={(value) => {
                                        field.onChange(value);
                                      }}
                                    >
                                      <SelectTrigger
                                        error={
                                          !!form.formState.errors.categoryId
                                        }
                                        className="focus:outline text-xs focus:outline-1 "
                                      >
                                        <SelectValue
                                          placeholder={t("forms.amountTracing")}
                                        />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem
                                          className="text-xs"
                                          value="IMTIYOZLI_KREDIT"
                                        >
                                          {t(
                                            "forms.financialDirection.IMTIYOZLI_KREDIT"
                                          )}
                                        </SelectItem>
                                        <SelectItem
                                          className="text-xs"
                                          value="ERKIN_MABLAG"
                                        >
                                          {t(
                                            "forms.financialDirection.ERKIN_MABLAG"
                                          )}
                                        </SelectItem>
                                        <SelectItem
                                          className="text-xs"
                                          value="TASHISH_XARAJATI"
                                        >
                                          {t(
                                            "forms.financialDirection.TASHISH_XARAJATI"
                                          )}
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}

                      {/* contractDate */}
                      <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          name="contractDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("forms.contDate")}</FormLabel>
                              <Popover
                                open={calendarOpen}
                                onOpenChange={setCalendarOpen}
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button variant="outline">
                                      {field.value
                                        ? format(
                                            parseISO(field.value),
                                            "dd.MM.yyyy"
                                          )
                                        : selectedMainContract?.contractDate
                                        ? format(
                                            parseISO(
                                              selectedMainContract.contractDate
                                            ),
                                            "dd.MM.yyyy"
                                          )
                                        : selectedStandardContract?.contractDate
                                        ? format(
                                            parseISO(
                                              selectedStandardContract.contractDate
                                            ),
                                            "dd.MM.yyyy"
                                          )
                                        : format(
                                            parseISO("2025-03-05T11:39:05"),
                                            "dd.MM.yyyy"
                                          )}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <Calendar
                                    mode="single"
                                    selected={
                                      field.value
                                        ? parseISO(field.value)
                                        : selectedMainContract?.contractDate
                                        ? parseISO(
                                            selectedMainContract.contractDate
                                          )
                                        : selectedStandardContract?.contractDate
                                        ? parseISO(
                                            selectedStandardContract.contractDate
                                          )
                                        : parseISO("2025-03-05T11:39:05")
                                    }
                                    onSelect={(date) => {
                                      field.onChange(date?.toISOString());
                                      setCalendarOpen(false);
                                    }}
                                    disabled={(date) =>
                                      (startDate &&
                                        isAfter(date, parseISO(startDate))) ||
                                      (endDate &&
                                        isAfter(date, parseISO(endDate)))
                                    }
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* contractNumber */}
                      <div className="w-[45%]">
                        <FormField
                          key={"contractNumber"}
                          control={form.control}
                          name="ordinaryContractNumber"
                          rules={{ required: t("forms.required") }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                Qoshimcha kelishuv raqami
                              </FormLabel>
                              <FormControl>
                                <Input
                                  maxLength={20}
                                  // {...field}
                                  // value={field.value || ""}
                                  // placeholder={t("forms.contNum")}
                                  onBlur={(e) => field.onChange(e.target.value)}
                                  className={`${
                                    fieldState.invalid
                                      ? "border-red-500 outline-red-500 focus:ring-red-500"
                                      : ""
                                  }`}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* penaltyRate */}
                      <div className="w-[45%] relative">
                        <FormField
                          control={form.control}
                          name="penaltyRate"
                          rules={{ required: t("forms.required") }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                {t("forms.penRate")}
                              </FormLabel>
                              <FormControl>
                                <div className="relative w-full flex items-center justify-between">
                                  <Input
                                    {...field}
                                    value={
                                      field.value === -1
                                        ? ""
                                        : field.value ||
                                          selectedMainContract?.penaltyRate ||
                                          selectedStandardContract?.penaltyRate ||
                                          ""
                                    }
                                    type="number"
                                    min={0}
                                    max={100}
                                    step="0.01"
                                    textRight
                                    error={!!fieldState.invalid}
                                    onChange={(e) => {
                                      let value = e.target.value;
                                      if (value === "") {
                                        field.onChange("");
                                        return;
                                      }
                                      let numValue = parseFloat(value);
                                      if (!isNaN(numValue)) {
                                        if (numValue > 100) numValue = 100;
                                        if (numValue < 0) numValue = 0;
                                        field.onChange(numValue);
                                      }
                                    }}
                                    addonAfterWidth={35}
                                    addonAfter={"%"}
                                    addonBeforeWidth={100}
                                    addonBefore={
                                      <select
                                        tabIndex={-1}
                                        value={
                                          interestType ||
                                          selectedMainContract?.penaltyState ||
                                          selectedStandardContract?.penaltyState ||
                                          "EVERY_DAY"
                                        }
                                        onChange={(e) =>
                                          setInterestType(e.target.value)
                                        }
                                        className="max-w-[70px] text-sm cursor-pointer right-2 bg-transparent border-none text-gray-500 outline-none"
                                      >
                                        <option value="EVERY_DAY">
                                          {t("forms.panTypeD")}
                                        </option>
                                        <option value="EVERY_WORK_DAY">
                                          {t("forms.panTypeWD")}
                                        </option>
                                        <option value="EVERY_WEEK">
                                          {t("forms.panTypeY")}
                                        </option>
                                        <option value="EVERY_MONTH">
                                          {t("forms.panTypeM")}
                                        </option>
                                      </select>
                                    }
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* interestRate */}
                      <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          name="interestRate"
                          rules={{ required: t("forms.required") }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                {t("forms.intRate")}
                              </FormLabel>
                              <FormControl>
                                <div className="relative w-full flex items-center justify-between">
                                  <Input
                                    {...field}
                                    value={
                                      field.value === -1
                                        ? ""
                                        : field.value ||
                                          selectedMainContract?.interestRate ||
                                          selectedStandardContract?.interestRate ||
                                          ""
                                    }
                                    type="number"
                                    min={0}
                                    max={100}
                                    step="0.01"
                                    textRight
                                    className={`appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                                    error={!!fieldState.invalid}
                                    onChange={(e) => {
                                      let value = e.target.value;
                                      if (value === "") {
                                        field.onChange("");
                                        return;
                                      }
                                      let numValue = parseFloat(value);
                                      if (!isNaN(numValue)) {
                                        if (numValue > 100) numValue = 100;
                                        if (numValue < 0) numValue = 0;
                                        field.onChange(numValue);
                                      }
                                    }}
                                    addonAfterWidth={35}
                                    addonAfter={"%"}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* financingAmount */}
                      <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          key={"financingAmount"}
                          name="financingAmount"
                          rules={{ required: t("forms.required") }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                {t("forms.finAmo")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  // {...field}
                                  onBlur={(e) => field.onChange(e.target.value)}
                                  textRight
                                  value={
                                    field.value
                                      ? formatStringWithSpaces(field.value)
                                      : selectedMainContract?.financingAmount
                                      ? formatStringWithSpaces(
                                          selectedMainContract.financingAmount
                                        )
                                      : selectedStandardContract?.financingAmount
                                      ? formatStringWithSpaces(
                                          selectedStandardContract.financingAmount
                                        )
                                      : ""
                                  }
                                  onChange={(e) => {
                                    const value = e.target.value.replace(
                                      /\s/g,
                                      ""
                                    );
                                    if (/^\d*$/.test(value)) {
                                      field.onChange(value);
                                    }
                                  }}
                                  className={`${
                                    fieldState.invalid
                                      ? "border-red-500 outline-red-500 focus:ring-red-500"
                                      : ""
                                  }`}
                                  addonAfter={
                                    <select
                                      className="text-sm"
                                      tabIndex={-1}
                                      value={
                                        currency ||
                                        selectedMainContract?.currencyType ||
                                        selectedStandardContract?.currencyType ||
                                        "UZS"
                                      }
                                      onChange={(e) =>
                                        setCurrency(e.target.value)
                                      }
                                    >
                                      <option value="UZS">UZS</option>
                                      <option value="USD">USD</option>
                                      <option value="EUR">EUR</option>
                                      <option value="RUB">RUB</option>
                                    </select>
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* maxPenalty */}
                      <div className="w-[45%] relative">
                        <FormField
                          control={form.control}
                          name="maxPenalty"
                          rules={{ required: t("forms.required") }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel
                                className={
                                  fieldState.error ? "text-red-500" : ""
                                }
                              >
                                {t("forms.maxPen")}
                              </FormLabel>
                              <FormControl>
                                <div className="relative w-full flex items-center justify-between">
                                  <Input
                                    {...field}
                                    value={
                                      field.value === -1
                                        ? ""
                                        : field.value ||
                                          selectedMainContract?.maxPenalty ||
                                          selectedStandardContract?.maxPenalty ||
                                          ""
                                    }
                                    type="number"
                                    min={0}
                                    max={100}
                                    step="0.01"
                                    textRight
                                    error={!!fieldState.error}
                                    addonAfterWidth={35}
                                    addonAfter={"%"}
                                    onChange={(e) => {
                                      let value = e.target.value;
                                      if (value === "") {
                                        field.onChange("");
                                        return;
                                      }
                                      let numValue = parseFloat(value);
                                      if (!isNaN(numValue)) {
                                        if (numValue > 100) numValue = 100;
                                        if (numValue < 0) numValue = 0;
                                        field.onChange(numValue);
                                      }
                                    }}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* gracePeriod */}
                      <div className="w-[45%] relative">
                        <FormField
                          control={form.control}
                          name="gracePeriod"
                          rules={{ required: t("forms.required") }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                {t("forms.gracePeriod")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={
                                    field.value ??
                                    selectedMainContract?.gracePeriod ??
                                    selectedStandardContract?.gracePeriod ??
                                    ""
                                  }
                                  type="number"
                                  min={0}
                                  textRight
                                  error={!!fieldState.error}
                                  addonAfterWidth={50}
                                  addonAfter={t("forms.month")}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "") {
                                      field.onChange(null);
                                    } else {
                                      const numValue = parseInt(value, 10);
                                      if (!isNaN(numValue) && numValue >= 0) {
                                        field.onChange(numValue);
                                      }
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* startDate */}
                      {/* <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          name="startDate"
                          rules={{ required: t("forms.required") }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("forms.sDate")}</FormLabel>
                              <FormControl>
                                <CalendarCOS
                                  mode="single"
                                  value={
                                    field.value ||
                                    (selectedMainContract?.startDate &&
                                      format(
                                        parseISO(
                                          selectedMainContract.startDate
                                        ),
                                        "dd.MM.yyyy"
                                      )) ||
                                    (selectedStandardContract?.startDate &&
                                      format(
                                        parseISO(
                                          selectedStandardContract.startDate
                                        ),
                                        "dd.MM.yyyy"
                                      )) ||
                                    ""
                                  }
                                  onChange={(date) => {
                                    field.onChange(date);
                                  }}
                                  disabled={(date) =>
                                    (contractDate &&
                                      isBefore(date, parseISO(contractDate))) ||
                                    (startDate &&
                                      isBefore(date, parseISO(startDate)))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div> */}

                      {/* endDate */}
                      <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          name="endDate"
                          rules={{
                            required: {
                              value: true,
                              message: t("forms.required"),
                            },
                          }}
                          render={({ field, fieldState }) => {
                            return (
                              <FormItem>
                                <FormLabel
                                  className={
                                    fieldState.error ? "text-red-500" : ""
                                  }
                                >
                                  {t("forms.eDate")}
                                </FormLabel>
                                <CalendarCOS
                                  mode="single"
                                  value={
                                    field.value ||
                                    (selectedMainContract?.endDate &&
                                      format(
                                        parseISO(selectedMainContract.endDate),
                                        "dd.MM.yyyy"
                                      )) ||
                                    (selectedStandardContract?.endDate &&
                                      format(
                                        parseISO(
                                          selectedStandardContract.endDate
                                        ),
                                        "dd.MM.yyyy"
                                      )) ||
                                    ""
                                  }
                                  onChange={(_, date) => {
                                    field.onChange(date?.toISOString());
                                  }}
                                  disabled={(date) =>
                                    (contractDate &&
                                      isBefore(date, parseISO(contractDate))) ||
                                    (startDate &&
                                      isBefore(date, parseISO(startDate)))
                                  }
                                />
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>

                      {/* payDate */}
                      <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          name="payDate"
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                {t("forms.payDate")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t("forms.payDatePlc")}
                                  min={1}
                                  max={30}
                                  error={!!fieldState.error}
                                  value={
                                    isNaN(parseFloat(field.value))
                                      ? selectedMainContract?.payDate ||
                                        selectedStandardContract?.payDate ||
                                        ""
                                      : field.value
                                  }
                                  onChange={(event) => {
                                    const value = event.target.value;
                                    if (value === "") {
                                      field.onChange(null);
                                      return;
                                    }
                                    let numValue = parseFloat(value);
                                    if (!isNaN(numValue) && numValue > 0) {
                                      if (numValue > 30) numValue = 30;
                                      field.onChange(numValue);
                                      event.target.value = numValue.toString();
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* change contract date */}
                      <div className="w-[45%] mt-0 flex gap-3 flex-col">
                        <div className="w-full mt-0 flex gap-2 flex-col">
                          <div className="flex items-center space-x-2">
                            <Switch id="canChangeContractDate" />
                            <Label htmlFor="canChangeContractDate">
                              {t("forms.canChangeContractDate")}
                            </Label>
                          </div>
                        </div>

                        {/* change pay date */}
                        <div className="w-full mt-0 flex gap-2 flex-col">
                          <div className="flex items-center space-x-2">
                            <Switch id="canChangePayDate" />
                            <Label htmlFor="canChangePayDate">
                              {t("forms.canChangePayDate")}
                            </Label>
                          </div>
                        </div>
                      </div>

                      {/* terms */}
                      {/* <div className="w-full">
                        <FormField
                          control={form.control}
                          name="terms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                {t("forms.terms")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={
                                    field.value ||
                                    selectedMainContract?.terms ||
                                    selectedStandardContract?.terms ||
                                    ""
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div> */}

                      {/* files */}
                      <div className="w-full space-y-2">
                        <FileUpload
                          onChange={handleFileChange}
                          accept=".pdf, image/* , .docx"
                          error={
                            !files.length && form.formState.submitCount > 0
                          }
                        />
                        {!hasFiles && form.formState.submitCount > 0 && (
                          <p className="text-red-500 text-xs">
                            {t("forms.required")}
                          </p>
                        )}
                        <div className="space-y-2">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between border-primary p-2 border rounded-md"
                            >
                              <span className="truncate">
                                {file?.name || file?.originName}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(index)}
                              >
                                <Trash className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="fixed bg-white bottom-0 left-0 right-0">
                        <Button
                          className="mx-5 mb-5 w-[93%]"
                          variant={"add"}
                          type="submit"
                          loading={createContract.isLoading}
                          onClick={() => {
                            if (!files.length) {
                              setHasFiles(false);
                            }
                          }}
                        >
                          {t("buttons.submit.contract")}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </>
              ) : (
                <>
                  {/* shartnoma */}
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmitStandardContract)}
                      className="flex flex-wrap pb-16 relative justify-between gap-5 px-3"
                    >
                      {/* partner */}
                      <div className="w-[45%] flex items-end justify-between gap-1">
                        <div className="w-full">
                          <FormField
                            rules={{
                              required: {
                                value: true,
                                message: t("forms.selectPartnerPls"),
                              },
                              validate: (value) => {
                                return (
                                  (value && Number(value) != 0) ||
                                  t("forms.selectPartnerPls")
                                );
                              },
                            }}
                            control={form.control}
                            name="partnerId"
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel className="text-[13px]">
                                  {t("forms.selectPartner")}
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    value={
                                      String(field.value) ||
                                      String(selectedPartner?.categoryDto?.id)
                                    }
                                    defaultValue={String(selectedPartner?.id)}
                                    onValueChange={(value) => {
                                      field.onChange(value);

                                      const partner =
                                        financePartners?.data?.find(
                                          (partner: GetPartners) =>
                                            partner.id === Number(value)
                                        );

                                      setSelectedPartner(partner || null);
                                      if (partner) {
                                        form.setValue(
                                          "categoryId",
                                          partner.categoryDto.id
                                        );
                                      }
                                    }}
                                  >
                                    <SelectTrigger
                                      error={!!form.formState.errors.partnerId}
                                      className=""
                                    >
                                      <SelectValue>
                                        {field.value ? (
                                          financePartners?.data?.find(
                                            (p: GetPartners) =>
                                              p.id === Number(field.value)
                                          )?.name
                                        ) : (
                                          <span style={{ opacity: 0.5 }}>
                                            {t("forms.selectPartnerPls")}
                                          </span>
                                        )}
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {financePartners?.data?.map(
                                        (partner: GetPartners) => (
                                          <SelectItem
                                            key={partner.id}
                                            value={String(partner.id)}
                                          >
                                            {partner.name}
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
                        <div
                          onClick={() => {
                            setPartnerAddModal(true);
                          }}
                          className="p-2 cursor-pointer"
                        >
                          <PlusCircle />
                        </div>
                      </div>

                      {/* categoryId */}
                      <div className="w-[45%] flex items-end justify-between gap-1">
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="categoryId"
                            rules={{ required: t("forms.required") }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[13px]">
                                  {t("forms.selectCategory")}
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    value={field.value || "19"}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                  >
                                    <SelectTrigger
                                      error={!!form.formState.errors.categoryId}
                                      className=""
                                    >
                                      <SelectValue>
                                        {field.value ? (
                                          allCategories?.data?.data?.find(
                                            (c: GotCategory) =>
                                              String(c.id) === field.value
                                          )?.name
                                        ) : (
                                          <span style={{ opacity: 0.5 }}>
                                            {t("forms.selectCategoryPls")}
                                          </span>
                                        )}
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {allCategories?.data?.data?.map(
                                        (category: GotCategory) => (
                                          <SelectItem
                                            key={category.id}
                                            value={String(category.id)}
                                          >
                                            {category.name}
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
                      </div>

                      {/* financialDirection */}
                      {showFinancialDirection && (
                        <div className="w-[45%] flex items-end justify-between gap-1">
                          <div className="w-full">
                            <FormField
                              control={form.control}
                              name="financialDirection"
                              rules={{ required: t("forms.required") }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-[13px]">
                                    {t("forms.amountTracing")}
                                  </FormLabel>
                                  <FormControl>
                                    <Select
                                      value={field.value}
                                      onValueChange={(value) => {
                                        field.onChange(value);
                                      }}
                                    >
                                      <SelectTrigger
                                        error={
                                          !!form.formState.errors.categoryId
                                        }
                                        className="text-xs "
                                      >
                                        <SelectValue
                                          placeholder={t("forms.amountTracing")}
                                        />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem
                                          className="text-xs"
                                          value="IMTIYOZLI_KREDIT"
                                        >
                                          {t(
                                            "forms.financialDirection.IMTIYOZLI_KREDIT"
                                          )}
                                        </SelectItem>
                                        <SelectItem
                                          className="text-xs"
                                          value="ERKIN_MABLAG"
                                        >
                                          {t(
                                            "forms.financialDirection.ERKIN_MABLAG"
                                          )}
                                        </SelectItem>
                                        <SelectItem
                                          className="text-xs"
                                          value="TASHISH_XARAJATI"
                                        >
                                          {t(
                                            "forms.financialDirection.TASHISH_XARAJATI"
                                          )}
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}

                      {/* contractDate */}
                      <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          name="contractDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("forms.contDate")}</FormLabel>
                              <Popover
                                open={calendarOpen}
                                onOpenChange={setCalendarOpen}
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button variant="outline">
                                      {field.value
                                        ? format(
                                            parseISO(field.value),
                                            "dd.MM.yyyy"
                                          )
                                        : format(
                                            parseISO("2025-03-05T11:39:05"),
                                            "dd.MM.yyyy"
                                          )}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <Calendar
                                    mode="single"
                                    selected={
                                      field.value
                                        ? parseISO(field.value)
                                        : parseISO("2025-03-05T11:39:05")
                                    }
                                    onSelect={(date) => {
                                      field.onChange(date?.toISOString());
                                      setCalendarOpen(false);
                                    }}
                                    disabled={(date) =>
                                      (startDate &&
                                        isAfter(date, parseISO(startDate))) ||
                                      (endDate &&
                                        isAfter(date, parseISO(endDate)))
                                    }
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* contractNumber */}
                      <div className="w-[45%]">
                        <FormField
                          key={"contractNumber"}
                          control={form.control}
                          name="contractNumber"
                          rules={{ required: t("forms.required") }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                {t("forms.contractNumber")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  maxLength={20}
                                  // {...field}
                                  onBlur={(e) => field.onChange(e.target.value)}
                                  placeholder={t("forms.contNum")}
                                  className={`${
                                    fieldState.invalid
                                      ? "border-red-500 outline-red-500 focus:ring-red-500"
                                      : ""
                                  }`}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* penaltyRate */}
                      <div className="w-[45%] relative">
                        <FormField
                          control={form.control}
                          name="penaltyRate"
                          rules={{ required: t("forms.required") }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                {t("forms.penRate")}
                              </FormLabel>
                              <FormControl>
                                <div className="relative w-full flex items-center justify-between">
                                  <Input
                                    {...field}
                                    value={
                                      field.value === -1 ? "" : field.value
                                    }
                                    type="number"
                                    min={0}
                                    max={100}
                                    step="0.01"
                                    textRight
                                    error={!!fieldState.invalid}
                                    onChange={(e) => {
                                      let value = e.target.value;
                                      if (value === "") {
                                        field.onChange("");
                                        return;
                                      }
                                      let numValue = parseFloat(value);
                                      if (!isNaN(numValue)) {
                                        if (numValue > 100) numValue = 100;
                                        if (numValue < 0) numValue = 0;
                                        field.onChange(numValue);
                                      }
                                    }}
                                    addonAfterWidth={30}
                                    addonAfter={"%"}
                                    addonBeforeWidth={100}
                                    addonBefore={
                                      <select
                                        tabIndex={-1}
                                        value={interestType}
                                        onChange={(e) =>
                                          setInterestType(e.target.value)
                                        }
                                        className=" max-w-[70px] text-sm cursor-pointer right-2 bg-transparent border-none text-gray-500 outline-none"
                                      >
                                        <option value="EVERY_DAY">
                                          {t("forms.panTypeD")}
                                        </option>
                                        <option value="EVERY_WORK_DAY">
                                          {t("forms.panTypeWD")}
                                        </option>
                                        <option value="EVERY_WEEK">
                                          {t("forms.panTypeY")}
                                        </option>
                                        <option value="EVERY_MONTH">
                                          {t("forms.panTypeM")}
                                        </option>
                                      </select>
                                    }
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* interestRate */}
                      <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          name="interestRate"
                          rules={{ required: t("forms.required") }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                {t("forms.intRate")}
                              </FormLabel>
                              <FormControl>
                                <div className="relative w-full flex items-center justify-between">
                                  <Input
                                    {...field}
                                    value={
                                      field.value === -1 ? "" : field.value
                                    }
                                    type="number"
                                    min={0}
                                    max={100}
                                    step="0.01"
                                    textRight
                                    className={`appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                                      fieldState.invalid
                                        ? "border-red-500 outline-red-500 focus:ring-red-500"
                                        : ""
                                    }`}
                                    onChange={(e) => {
                                      let value = e.target.value;
                                      if (value === "") {
                                        field.onChange("");
                                        return;
                                      }
                                      let numValue = parseFloat(value);
                                      if (!isNaN(numValue)) {
                                        if (numValue > 100) numValue = 100;
                                        if (numValue < 0) numValue = 0;
                                        field.onChange(numValue);
                                      }
                                    }}
                                    addonAfterWidth={30}
                                    addonAfter={"%"}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* financingAmount */}
                      <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          key={"financingAmount"}
                          name="financingAmount"
                          rules={{ required: t("forms.required") }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                {t("forms.finAmo")}
                              </FormLabel>
                              <FormControl>
                                <div className="relative flex items-center">
                                  <Input
                                    type="text"
                                    // {...field}
                                    onBlur={(e) =>
                                      field.onChange(e.target.value)
                                    }
                                    textRight
                                    value={
                                      field.value
                                        ? formatStringWithSpaces(field.value)
                                        : ""
                                    }
                                    onChange={(e) => {
                                      const value = e.target.value.replace(
                                        /\s/g,
                                        ""
                                      );
                                      if (/^\d*$/.test(value)) {
                                        field.onChange(value);
                                      }
                                    }}
                                    className={`${
                                      fieldState.invalid
                                        ? "border-red-500 outline-red-500 focus:ring-red-500"
                                        : ""
                                    }`}
                                    addonAfter={
                                      <select
                                        className="text-sm"
                                        tabIndex={-1}
                                        value={currency}
                                        onChange={(e) =>
                                          setCurrency(e.target.value)
                                        }
                                      >
                                        <option value="UZS">UZS</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="RUB">RUB</option>
                                      </select>
                                    }
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* maxPenalty */}

                      {needToShowMaxPenalty && (
                        <div className="w-[45%] relative">
                          <FormField
                            control={form.control}
                            name="maxPenalty"
                            rules={{ required: t("forms.required") }}
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel
                                  className={
                                    fieldState.error ? "text-red-500" : ""
                                  }
                                >
                                  {t("forms.maxPen")}
                                </FormLabel>
                                <FormControl>
                                  <div className="relative w-full flex items-center justify-between">
                                    <Input
                                      {...field}
                                      value={
                                        field.value === -1 ? "" : field.value
                                      }
                                      type="number"
                                      min={0}
                                      max={100}
                                      step="0.01"
                                      textRight
                                      error={!!fieldState.error}
                                      addonAfterWidth={30}
                                      addonAfter={"%"}
                                      onChange={(e) => {
                                        let value = e.target.value;
                                        if (value === "") {
                                          field.onChange("");
                                          return;
                                        }
                                        let numValue = parseFloat(value);
                                        if (!isNaN(numValue)) {
                                          if (numValue > 100) numValue = 100;
                                          if (numValue < 0) numValue = 0;
                                          field.onChange(numValue);
                                        }
                                      }}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}

                      {/* gracePeriod */}
                      <div className="w-[45%] relative">
                        <FormField
                          control={form.control}
                          name="gracePeriod"
                          rules={{ required: t("forms.required") }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                {t("forms.gracePeriod")}
                              </FormLabel>
                              <FormControl>
                                <div className="relative w-full flex items-center justify-between">
                                  <Input
                                    {...field}
                                    type="number"
                                    min={0}
                                    textRight
                                    error={!!fieldState.error} // error ni to'g'ri ishlatish uchun !! qo'shildi
                                    addonAfterWidth={50}
                                    addonAfter={t("forms.month")}
                                    value={
                                      field.value ??
                                      (selectedMainContract?.gracePeriod ||
                                        selectedStandardContract?.gracePeriod ||
                                        "")
                                    }
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      if (value === "") {
                                        field.onChange(null);
                                      } else {
                                        const numValue = parseInt(value, 10);
                                        if (!isNaN(numValue) && numValue >= 0) {
                                          field.onChange(numValue);
                                        }
                                      }
                                    }}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* startDate */}
                      {/* <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          name="startDate"
                          rules={{ required: t("forms.required") }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("forms.sDate")}</FormLabel>
                              <FormControl>
                                <CalendarCOS
                                  mode="single"
                                  value={field.value}
                                  onChange={(date) => {
                                    field.onChange(date);
                                  }}
                                  disabled={(date) =>
                                    (contractDate &&
                                      isBefore(date, parseISO(contractDate))) ||
                                    (startDate &&
                                      isBefore(date, parseISO(startDate)))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div> */}

                      {/* endDate */}
                      <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          name="endDate"
                          rules={{
                            required: {
                              value: true,
                              message: t("forms.required"),
                            },
                          }}
                          render={({ field, fieldState }) => {
                            return (
                              <FormItem>
                                <FormLabel
                                  className={
                                    fieldState.error ? "text-red-500" : ""
                                  }
                                >
                                  {t("forms.eDate")}
                                </FormLabel>
                                <CalendarCOS
                                  mode="single"
                                  value={
                                    endDate &&
                                    format(parseISO(endDate), "dd.MM.yyyy")
                                  }
                                  onChange={(_, date) => {
                                    field.onChange(date?.toISOString());
                                  }}
                                  disabled={(date) =>
                                    (contractDate &&
                                      isBefore(date, parseISO(contractDate))) ||
                                    (startDate &&
                                      isBefore(date, parseISO(startDate)))
                                  }
                                />
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>

                      {/* payDate */}
                      <div className="w-[45%]">
                        <FormField
                          control={form.control}
                          name="payDate"
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                {t("forms.payDate")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t("forms.payDatePlc")}
                                  min={1}
                                  max={31}
                                  error={!!fieldState.error}
                                  value={
                                    isNaN(parseFloat(field.value))
                                      ? ""
                                      : field.value
                                  }
                                  onChange={(event) => {
                                    const value = event.target.value;
                                    if (value === "") {
                                      field.onChange(null);
                                      return;
                                    }
                                    let numValue = parseFloat(value);
                                    if (!isNaN(numValue) && numValue > 0) {
                                      if (numValue > 31) numValue = 31;
                                      field.onChange(numValue);
                                      event.target.value = numValue.toString();
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Ilova qo'shish */}
                      <div className="w-[45%] mt-0">
                        <Button
                          onClick={() => {
                            setAddAttechment(true);
                          }}
                        >
                          {t("buttons.addAttechment")}
                        </Button>
                      </div>

                      {/* change contract date */}
                      <div className="w-[45%] mt-0 flex gap-3 flex-col">
                        <div className="w-full mt-0 flex gap-2 flex-col">
                          <div className="flex items-center space-x-2">
                            <Switch id="canChangeContractDate" />
                            <Label htmlFor="canChangeContractDate">
                              {t("forms.canChangeContractDate")}
                            </Label>
                          </div>
                        </div>

                        {/* change pay date */}
                        <div className="w-full mt-0 flex gap-2 flex-col">
                          <div className="flex items-center space-x-2">
                            <Switch id="canChangePayDate" />
                            <Label htmlFor="canChangePayDate">
                              {t("forms.canChangePayDate")}
                            </Label>
                          </div>
                        </div>
                      </div>

                      {/* terms */}
                      {/* <div className="w-full">
                        <FormField
                          control={form.control}
                          name="terms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[13px]">
                                {t("forms.terms")}
                              </FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div> */}

                      {/* multi file upload */}
                      <div className="w-full space-y-2">
                        <FileUpload
                          onChange={handleFileChange}
                          accept=".pdf, image/* , .docx"
                          error={!hasFiles && form.formState.submitCount > 0}
                        />
                        {!hasFiles && form.formState.submitCount > 0 && (
                          <p className="text-red-500 text-xs">
                            {t("forms.required")}
                          </p>
                        )}
                        <div className="space-y-2">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between border-primary p-2 border rounded-md"
                            >
                              <span className="truncate">{file.name}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(index)}
                              >
                                <Trash className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="fixed bg-white bottom-0 left-0 right-0">
                        <Button
                          className="mx-5 mb-5 w-[93%]"
                          variant={"add"}
                          type="submit"
                          loading={createContract.isLoading}
                          onClick={() => {
                            if (files?.length < 0) {
                              setHasFiles(false);
                            }
                          }}
                        >
                          {t("buttons.submit.contract")}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </CommonModal>

      <PartnerModal
        addPartnerModal={partnerAddModal}
        setAddPartnerModal={setPartnerAddModal}
        onPartnerCreated={(partner) => {
          form.setValue("partnerIds", String(partner.id));
          setSelectedPartner(partner);
        }}
      />

      <CommonModal
        visible={addAttechment}
        onClose={() => {
          setAddAttechment(false);
        }}
        title={t("buttons.addAttechment")}
      >
        <AddAttechments
          setAddAttechment={setAddAttechment}
          contractType={contractType}
        />
      </CommonModal>
    </>
  );
}
