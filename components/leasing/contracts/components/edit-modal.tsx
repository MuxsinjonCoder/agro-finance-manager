import CommonModal from "@/components/CommonModal";
import { Button } from "@/components/ui/button";
import { CalendarCOS } from "@/components/ui/calendar";
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
import { GetPartners } from "@/types/partners";
import { PlusCircle, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UseFormReturn } from "react-hook-form";
import {
  AttachmentsTypes,
  EditingContract,
  GotContractData,
} from "@/types/contracts";
import { toast } from "sonner";
import {
  useAddContractFile,
  useDeleteContractFile,
  useUpdateFinanceContract,
} from "@/queries/contracts";
import {
  useCreateFinancePartner,
  useFinancePartners,
} from "@/queries/partners";
import { useFinanceCategories } from "@/queries/categories";
import { format, parseISO, isAfter, isBefore } from "date-fns";
import { formatStringWithSpaces } from "@/helpers/textUtils";
import { FileUpload } from "@/components/ui/uploader";
import { useQueryClient } from "react-query";

interface EditModalProps {
  editModal: boolean;
  setEditModal: (value: boolean) => void;
  form: UseFormReturn<any>;
  selectedItem: GotContractData | null;
  setSelectedItem: any;
  loading: boolean;
  refetch: () => void;
}

interface categoryTypes {
  createdAt: string;
  description: string;
  id: number;
  name: string;
  updatedAt: string | null;
}

interface CustomFile extends File {
  cloudPath?: string;
  originName?: string;
}

export default function EditModal({
  editModal,
  setEditModal,
  form,
  selectedItem,
  setSelectedItem,
  loading,
  refetch,
}: EditModalProps) {
  if (!form) {
    return null; // yoki boshqa default holat
  }

  const queryClient = useQueryClient();
  const updateContract = useUpdateFinanceContract();
  const createPartner = useCreateFinancePartner();
  const allCategories = useFinanceCategories(0, 100000);
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

  const { mutate: uploadFiles, isLoading: uploadFilesLoading } =
    useAddContractFile();
  const deleteContractFile = useDeleteContractFile();
  const [editInterestType, setEditInterestType] = useState(
    selectedItem?.penaltyState || "EVERY_MONTH"
  );
  const [partnerAddModal, setPartnerAddModal] = useState(false);
  const [currency, setCurrency] = useState("UZS");
  const [editFileModal, setEditFileModal] = useState(false);
  const [editFiles, setEditFiles] = useState<CustomFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<AttachmentsTypes | null>(
    null
  );
  const [selectedPartner, setSelectedPartner] = useState<GetPartners | null>(
    null
  );
  const [deletingFile, setDeletingFile] = useState<AttachmentsTypes[] | null>(
    null
  );
  const [regetFiles, setRegetFiles] = useState(false);

  const { t } = useTranslation();

  const contractDate = selectedItem?.contractDate;
  const startDate = selectedItem?.startDate;
  const endDate = selectedItem?.endDate;

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
      // form.setValue("categoryId", selectedItem.categoryDto?.id || 0);
      // form.setValue("payDate", 1);
      // form.setValue(
      //     "partnerIds",
      //     selectedItem.partnersDto?.map(
      //         (partner: { id: number }) => partner.id
      //     ) || [0]
      // );

      form.reset({
        ...selectedItem,
        payDate: selectedItem?.payDate,
        partnerIds: selectedItem?.partnersDto?.[0]?.id,
      });
      // form.setValue("number", selectedItem.number || "");
      // form.setValue("financingAmount", selectedItem.financingAmount || 0);
      // form.setValue("interestRate", selectedItem.interestRate || 0);
      // form.setValue("penaltyRate", selectedItem.penaltyRate || 0);
      // form.setValue("contractDate", selectedItem.contractDate || "");
      // form.setValue("startDate", selectedItem.startDate || "");
      // form.setValue("endDate", selectedItem.endDate || "");
      // form.setValue("terms", selectedItem.terms || "");
      // form.setValue("balance", selectedItem.balance || 0);
      // form.setValue("currencyType", selectedItem.currencyType || "");
      // form.setValue("files", selectedItem.paths || []);
    }
  }, [selectedItem, form, editModal]);

  // console.log(selectedItem , 'selectedItem')

  const editSubmit = async (data: EditingContract) => {
    const submittingData: EditingContract = {
      penaltyState: editInterestType,
      cronMaxRate: Number(data?.cronMaxRate),
      partnerIds: [Number(data?.partnerIds)],
      number: String(data?.number),
      financingAmount: Number(
        data?.financingAmount?.toString().replace(/\s/g, "").trim()
      ),
      interestRate: Number(data?.interestRate),
      penaltyRate: Number(data?.penaltyRate),
      balance: Number(data?.balance),
      currencyType: String(data?.currencyType),
      contractDate: format(
        new Date(data?.contractDate),
        "yyyy-MM-dd'T'HH:mm:ss"
      ),
      startDate: new Date(data?.startDate).toISOString().slice(0, 19),
      endDate: new Date(data?.endDate).toISOString().slice(0, 19),
      terms: String(data?.terms),
      gracePeriod: Number(data?.gracePeriod),
      contractType:
        Number(data?.financingAmount?.toString().replace(/\s/g, "").trim()) > 0
          ? "STANDARD"
          : "MAIN",
      payDate: data?.payDate,
    };

    updateContract.mutate(
      { id: String(selectedItem?.id), data: submittingData },
      {
        onSuccess: () => {
          setEditModal(false);
          form.reset();
          setSelectedItem(null);
          toast.message(t("modals.editSuccess"));
        },
      }
    );
  };

  const handleEditFiles = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem?.id) return;
    console.log("submit");

    const formData = new FormData();

    if (editFiles.length > 0) {
      editFiles.forEach((file) => formData.append("files", file));
    } else if (selectedItem?.paths?.length > 0) {
      selectedItem.paths.forEach((path: string) =>
        formData.append("files", path)
      );
    }

    uploadFiles(
      { id: Number(selectedItem?.id), data: formData },
      {
        onSuccess: (data) => {
          if (data.data.status === "OK") {
            toast.message(t("messages.uploaded"));

            // queryClient.setQueryData(
            //   ["financeContract", selectedItem?.id],
            //   (old: any) => {
            //     if (!old || !old.data) {
            //       console.warn("No data in cache for the specified key.");
            //       return old;
            //     }

            //     return {
            //       data: {
            //         ...old.data,
            //         attachments: [
            //           ...(old.data.attachments ?? []),
            //           ...(formData.get("files") ?? []),
            //         ],
            //       },
            //     };
            //   }
            // );

            setEditFileModal(false);
            setEditFiles(() => []);
            refetch();
          } else {
            toast.message(t("messages.smtErr"));
          }
        },
      }
    );
  };

  const handleEditFileChange = (files: File[]) => {
    setEditFiles(files);
  };

  const handleDeleteEditFile = (deleteFile: any) => {
    console.log(deleteFile);
    console.log(editFiles, "editFiles");
    if (deleteFile?.id) {
      deleteContractFile.mutate(
        {
          fileId: deleteFile?.id,
          contractId: Number(selectedItem?.id),
        },
        {
          onSuccess: () => {
            toast.message(t("messages.delEd"));

            // queryClient.setQueryData(
            //   ["financeContract", selectedItem?.id],
            //   (old: any) => {
            //     console.log("Old cache data:", old);

            //     if (!old) return old; // Если кеша нет, ничего не делаем

            //     console.log(old, "old");
            //     console.log(selectedFile, "selectedFile");
            //     return {
            //       ...old,
            //       data: {
            //         ...old.data,
            //         attachments: old.data.attachments?.filter(
            //           (file: any) => file?.id !== deleteFile.id
            //         ),
            //       },
            //     };
            //   }
            // );

            setEditFiles((files) =>
              files.filter((file: any) => file?.id !== deleteFile.id)
            );

            console.log(
              queryClient.getQueryData(["financeContract", selectedItem?.id]),
              "new cache data"
            );

            console.log(editFiles, "editFiles");
          },
        }
      );
    } else {
      setEditFiles(editFiles.filter((file) => file !== selectedFile));
    }
  };

  return (
    <>
      {/* edit contact modal */}
      <CommonModal
        visible={editModal}
        onClose={() => {
          setEditModal(false);
          form.reset();
          setSelectedItem(null);
        }}
        loading={loading}
        title={t("modals.editCont")}
      >
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form?.handleSubmit(editSubmit)}
              className="flex flex-wrap justify-between gap-5"
            >
              {/* category */}
              <div className="w-[45%]">
                <FormField
                  defaultValue={selectedItem?.categoryDto?.id}
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        {t("forms.selectCategory")}
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={String(selectedItem?.categoryDto?.id)}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t("forms.selectCategory")}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {allCategories?.data?.data.map(
                              (category: categoryTypes) => (
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

              {/* partner */}
              <div className="w-[45%] flex items-end justify-between gap-1">
                <div className="w-full">
                  <FormField
                    defaultValue={selectedItem?.partnersDto?.id}
                    control={form.control}
                    name="partnerIds"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[13px]">
                          {t("forms.selectPartner")}
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              const selected = financePartners?.data?.find(
                                (partner: GetPartners) =>
                                  String(partner.id) === value
                              );
                              setSelectedPartner(selected || null);
                            }}
                            defaultValue={String(
                              selectedItem?.partnersDto?.[0]?.id
                            )}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t("forms.selectPartner")}
                              />
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
                  onClick={() => setPartnerAddModal(true)}
                  className="p-2 cursor-pointer"
                >
                  <PlusCircle />
                </div>
              </div>

              {/* number */}
              <div className="w-[45%]">
                <FormField
                  control={form.control}
                  name="number"
                  rules={{ required: true }}
                  render={({ field }) => {
                    useEffect(() => {
                      if (!field.value && selectedItem?.number) {
                        field.onChange(selectedItem.number);
                      }
                    }, [selectedItem?.number, field]);
                    return (
                      <FormItem>
                        <FormLabel className="text-[13px]">
                          {t("forms.number")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              {/* contractDate */}
              <div className="w-[45%]">
                <FormField
                  control={form.control}
                  name="contractDate"
                  rules={{ required: true }}
                  render={({ field }) => {
                    useEffect(() => {
                      if (!field.value && selectedItem?.contractDate) {
                        field.onChange(selectedItem.contractDate);
                      }
                    }, [selectedItem?.contractDate, field]);

                    return (
                      <FormItem>
                        <FormLabel className="text-[13px]">
                          {t("forms.contDate")}
                        </FormLabel>
                        <CalendarCOS
                          mode="single"
                          selected={
                            field.value ? parseISO(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          // disabled={(date) =>
                          //   (startDate && isAfter(date, parseISO(startDate))) ||
                          //   (endDate && isAfter(date, parseISO(endDate)))
                          // }
                        />
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              {/* financingAmount */}
              <div className="w-[45%]">
                <FormField
                  control={form.control}
                  name="financingAmount"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        {t("forms.finAmo")}
                      </FormLabel>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            inputMode="numeric"
                            {...field}
                            value={
                              field.value
                                ? formatStringWithSpaces(field.value)
                                : ""
                            }
                            textRight
                            onChange={(e) => {
                              const value = e.target.value.replace(/\s/g, "");
                              if (/^\d*$/.test(value)) {
                                field.onChange(value);
                              }
                            }}
                            addonAfterWidth={100}
                            addonAfter={
                              <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="bg-transparent border-none text-gray-500 outline-none"
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

              {/* interestRate */}
              <div className="w-[45%]">
                <FormField
                  control={form.control}
                  name="interestRate"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        {t("forms.intRate")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          inputMode="numeric"
                          min={0}
                          max={100}
                          onChange={(e) => {
                            let value = parseFloat(e.target.value);
                            if (isNaN(value)) value = 0;
                            if (value > 100) value = 100;
                            if (value < 0) value = 0;
                            field.onChange(value);
                          }}
                          textRight
                          addonAfterWidth={35}
                          addonAfter={"%"}
                          addonBeforeWidth={100}
                          addonBefore={
                            <select
                              value={editInterestType}
                              onChange={(e) =>
                                setEditInterestType(e.target.value)
                              }
                              className="max-w-[70px] cursor-pointer right-2 bg-transparent border-none text-gray-500 outline-none"
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
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        {t("forms.penRate")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min={0}
                          max={100}
                          step="any"
                          textRight
                          addonAfterWidth={35}
                          addonAfter={"%"}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlar qabul qilinadi
                            let numericValue = Math.min(100, Number(value)); // 100dan oshmasligi uchun
                            field.onChange(numericValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* max penalty rate */}
              <div className="w-[45%] relative">
                <FormField
                  control={form.control}
                  name="cronMaxRate"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        {t("forms.maxPen")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          inputMode="numeric"
                          min={0}
                          max={100}
                          textRight
                          step="any"
                          addonAfterWidth={35}
                          addonAfter={"%"}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlar qabul qilinadi
                            let numericValue = Math.min(100, Number(value)); // 100dan oshmasligi uchun
                            field.onChange(numericValue);
                          }}
                        />
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
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel
                        className={fieldState.error ? "text-red-500" : ""}
                      >
                        {t("forms.gracePeriod")}
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full flex items-center justify-between">
                          <Input
                            defaultValue={selectedItem?.gracePeriod}
                            {...field}
                            type="number"
                            min={0}
                            textRight
                            addonAfterWidth={50}
                            addonAfter={t("forms.month")}
                            error={!!fieldState.error}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* startDate */}
              <div className="w-[45%]">
                <FormField
                  control={form.control}
                  name="startDate"
                  rules={{ required: true }}
                  render={({ field }) => {
                    useEffect(() => {
                      if (!field.value && selectedItem?.startDate) {
                        field.onChange(selectedItem.startDate);
                      }
                    }, [selectedItem?.startDate, field]);

                    return (
                      <FormItem>
                        <FormLabel className="text-[13px]">
                          {t("forms.sDate")}
                        </FormLabel>
                        <CalendarCOS
                          mode="single"
                          selected={
                            field.value ? parseISO(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          // disabled={(date) =>
                          //   (contractDate &&
                          //     isBefore(date, parseISO(contractDate))) ||
                          //   (endDate && isAfter(date, parseISO(endDate)))
                          // }
                        />
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              {/* endDate */}
              <div className="w-[45%]">
                <FormField
                  control={form.control}
                  name="endDate"
                  rules={{ required: true }}
                  render={({ field }) => {
                    useEffect(() => {
                      if (!field.value && selectedItem?.endDate) {
                        field.onChange(selectedItem.endDate);
                      }
                    }, [selectedItem?.endDate, field]);

                    return (
                      <FormItem>
                        <FormLabel className="text-[13px]">
                          {t("forms.eDate")}
                        </FormLabel>
                        <CalendarCOS
                          mode="single"
                          selected={
                            field.value ? parseISO(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          // disabled={(date) =>
                          //   (contractDate &&
                          //     isBefore(date, parseISO(contractDate))) ||
                          //   (startDate && isBefore(date, parseISO(startDate)))
                          // }
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        {t("forms.payDate")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          min={1}
                          max={30}
                          {...field}
                          value={
                            isNaN(parseFloat(field.value)) ? "" : field.value
                          }
                          onChange={(event) => {
                            const value = event.target.value;
                            if (value === "") {
                              field.onChange(null);
                              return;
                            }
                            let numValue = parseFloat(value);
                            if (
                              !isNaN(numValue) &&
                              numValue > 0 &&
                              numValue <= 30
                            ) {
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

              {/* file edit modal button */}
              <div className="w-full" onClick={() => setEditFileModal(true)}>
                <FormField
                  name="terms"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="cursor-pointer"
                          type="button"
                          value={t("modals.editFile")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                variant={"add"}
                className="mt-5"
                type="submit"
                loading={updateContract.isLoading}
              >
                {t("buttons.submit.contract")}
              </Button>
            </form>
          </Form>
        </div>
      </CommonModal>

      {/* edit files modal */}
      <CommonModal
        visible={editFileModal}
        onClose={() => {
          setEditFileModal(false);
          setEditFiles([]);
        }}
        title={t("modals.editFile")}
        width="500px"
      >
        <div>
          <form onSubmit={handleEditFiles}>
            <div className="max-full space-y-2">
              <div className="w-full flex justify-center items-center">
                <FileUpload
                  onChange={handleEditFileChange}
                  defaultValues={editFiles}
                />
                <Button
                  variant={"add"}
                  className="w-[50%] flex justify-center items-center mx-auto px-4 py-2.5"
                  type="submit"
                  loading={uploadFilesLoading}
                >
                  {t("buttons.submit.files")}
                </Button>
              </div>
              <div className="space-y-2">
                {editFiles?.map((file: any, index: number) => (
                  <div
                    key={file?.id || index}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <a href={file?.cloudPath} target="_blank">
                      <span className="truncate max-w-[220px]">
                        {file?.originName || file?.name}
                      </span>
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedFile(() => file);
                        handleDeleteEditFile(file);
                      }}
                      type="button"
                      loading={
                        selectedFile?.id === file?.id
                          ? deleteContractFile.isLoading
                          : false
                      }
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </CommonModal>
    </>
  );
}
