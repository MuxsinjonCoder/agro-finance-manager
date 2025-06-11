import React, { useEffect, useState } from "react";
import CommonModal from "../CommonModal";
import { Form, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { GotCategory } from "@/types/category";
import { Button } from "../ui/button";
import { CreatePartnerData } from "@/types/partners";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDown, Trash, X } from "lucide-react";
import { Input } from "../ui/input";
import { t } from "i18next";
import { toast } from "sonner";
import { useFinancePartner, useUpdateFinancePartner } from "@/queries/partners";
import { useFinanceCategories } from "@/queries/categories";
import Loading from "../loading";

interface PartnerEditModalProps {
  editPartnerModal: boolean;
  setEditPartnerModal: (state: boolean) => void;
  id: string;
}

const PartnerEditModal: React.FC<PartnerEditModalProps> = ({
  editPartnerModal,
  setEditPartnerModal,
  id,
}) => {
  const { data, isLoading, refetch } = useFinancePartner(id);
  const updatePartner = useUpdateFinancePartner();
  const allCategories = useFinanceCategories(0, 100);
  const [step, setStep] = useState(1);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const partnerForm = useForm<CreatePartnerData>({
    defaultValues: {
      name: "",
      partnerType: "BANK",
      categoryId: null,
      currencyType: [], // Initialize as an empty array
      inn: "",
      bankList: [], // Initialize as an empty array
      contact_info: {
        fio: "",
        phone: "",
        email: "",
      },
    },
  });

  const {
    control,
    register,
    handleSubmit,
    trigger,
    getValues,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = partnerForm;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bankList",
  });

  const lastBank = fields.length > 0 ? fields[fields.length - 1] : null;
  const lastBankValues = watch(`bankList.${fields.length - 1}`);

  const isLastBankFilled =
    lastBankValues?.bankName?.trim() &&
    lastBankValues?.mfo?.trim() &&
    lastBankValues?.accountNumber?.trim();

  const requiredFieldsByStep = new Map<number, string[]>([
    [1, ["categoryId", "partnerType", "name", "currencyType.0", "inn"]],
    [2, ["bankList.0.bankName", "bankList.0.mfo", "bankList.0.accountNumber"]],
    [3, ["contact_info.fio", "contact_info.phone", "contact_info.email"]],
  ]);

  const requiredFields = requiredFieldsByStep.get(step) || [];

  useEffect(() => {
    if (data?.data) {
      const {
        name,
        partnerType,
        categoryDto,
        currencyType,
        inn,
        bankDto,
        contact_info,
      } = data.data;

      setValue("name", name);
      setValue("partnerType", partnerType);
      setValue("categoryId", categoryDto?.id || null);
      setValue("currencyType", currencyType || []); // Ensure currencyType is an array
      setValue("inn", inn);
      setValue("bankList", bankDto || []); // Ensure bankList is an array
      setValue("contact_info", contact_info);
    }
  }, [data, setValue]);

  useEffect(() => {
    const isStepValid = requiredFields.every((field) =>
      partnerForm.getValues(field as keyof CreatePartnerData)
    );

    setIsNextDisabled(!isStepValid);
  }, [
    step,
    ...requiredFields.map((field) =>
      partnerForm.watch(field as keyof CreatePartnerData)
    ),
  ]);

  const nextStep = async () => {
    const requiredFields = requiredFieldsByStep.get(step) || [];
    const isValid = await trigger(requiredFields as any);

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const trigStep = async (stepId: number) => {
    if (stepId > step) {
      const requiredFields = requiredFieldsByStep.get(step) || [];
      const isValid = await trigger(requiredFields as any);

      if (isValid) {
        setStep(stepId);
      }
    } else {
      setStep(stepId);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length > 9) return;
    setValue("contact_info.phone", value, { shouldValidate: true });
  };

  const onSubmit = async (data: CreatePartnerData) => {
    updatePartner.mutate(
      { id: id, data: { ...data } },
      {
        onSuccess: (res) => {
          if (res.status === "BAD_REQUEST") {
            toast.message(`${t("messages.err")} ${res.message}`);
          } else if (res.status === "NOT_FOUND") {
            toast.message(`${t("messages.err")} ${res.message}`);
          } else if (res.status === "OK") {
            partnerForm.reset();
            setEditPartnerModal(false);
            toast.message(t("messages.created"));
            setStep(1);
          }
        },
      }
    );
  };

  return (
    <CommonModal
      title={t("buttons.ed")}
      visible={editPartnerModal}
      onClose={() => setEditPartnerModal(false)}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <FormProvider {...partnerForm}>
          <Form {...partnerForm}>
            <div>
              <Tabs defaultValue="step1" value={`step${step}`}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    onClick={() => trigStep(1)}
                    value="step1"
                    className="data-[state=active]:bg-[#3BB5DC] data-[state=active]:text-white"
                  >
                    {t("forms.basicInfo")}
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => trigStep(2)}
                    value="step2"
                    className="data-[state=active]:bg-[#3BB5DC] data-[state=active]:text-white"
                  >
                    {t("forms.bankInfo")}
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => trigStep(3)}
                    value="step3"
                    className="data-[state=active]:bg-[#3BB5DC] data-[state=active]:text-white"
                  >
                    {t("forms.contactInfo")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="step1">
                  <div className="space-y-5 my-2">
                    <FormField
                      control={partnerForm.control}
                      name="categoryId"
                      rules={{ required: t("forms.categoryRequired") }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="font-bold">
                              {t("tables.category")}
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(Number(value));
                                partnerForm.trigger("categoryId");
                              }}
                              defaultValue={String(data?.data?.categoryDto?.id)}
                            >
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={t("forms.selectCategory")}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {allCategories?.data?.data.map(
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
                          {errors.categoryId && (
                            <FormMessage>
                              {errors.categoryId.message}
                            </FormMessage>
                          )}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={partnerForm.control}
                      name="partnerType"
                      rules={{ required: t("forms.partnerTypeRequired") }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="font-bold">
                              {t("forms.partnerType")}
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={t("forms.partnerType")}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="BANK">Bank</SelectItem>
                                <SelectItem value="LEASING_COMPANY">
                                  Leasing Company
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {errors.partnerType && (
                            <FormMessage>
                              {errors.partnerType.message}
                            </FormMessage>
                          )}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={partnerForm.control}
                      name="name"
                      rules={{ required: t("forms.nameRequired") }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="font-bold">{t("forms.name")}</div>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={t("forms.entername")}
                            />
                          </FormControl>
                          {errors.name && (
                            <FormMessage>{errors.name.message}</FormMessage>
                          )}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={partnerForm.control}
                      name="inn"
                      rules={{
                        required: t("forms.innRequired"),
                        pattern: {
                          value: /^\d{9}$/,
                          message: t("forms.innInvalid"),
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="font-bold">{t("forms.inn")}</div>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={t("forms.enterinn")}
                              maxLength={9}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={partnerForm.control}
                      name="currencyType"
                      rules={{
                        required: true,
                        validate: (value) => value.length > 0,
                      }}
                      render={({ field, formState }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="font-bold">
                              {t("forms.currencyType")}
                            </div>
                          </FormLabel>
                          <FormControl>
                            <MultiSelectCurrencyDropdown
                              field={field}
                              data={["USD", "EUR", "UZS"]}
                              defaultValue={data?.data?.currencyType || []} // Pass fetched currencyType
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="step2">
                  <div className="flex flex-col items-end">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex w-full items-center my-2"
                      >
                        <div className="flex flex-col space-y-2 w-full">
                          <div className="flex gap-2">
                            <div className="w-full">
                              <FormLabel>
                                <div className="text-[14px]  pb-1">
                                  {t("forms.bankName")}
                                </div>
                              </FormLabel>
                              <Input
                                {...register(`bankList.${index}.bankName`, {
                                  required: t("forms.bankNameRequired"),
                                })}
                                placeholder={t("forms.enterbankName")}
                              />
                              {errors.bankList?.[index]?.bankName && (
                                <FormMessage>
                                  {errors.bankList[index]?.bankName?.message}
                                </FormMessage>
                              )}
                            </div>

                            <div className="w-full">
                              <FormLabel>
                                <div className="text-[14px]  pb-1">
                                  {t("forms.mfo")}
                                </div>
                              </FormLabel>
                              <Input
                                {...register(`bankList.${index}.mfo`, {
                                  required: t("forms.mfoRequired"),
                                  pattern: {
                                    value: /^\d{5}$/,
                                    message: t("forms.mfoInvalid"),
                                  },
                                })}
                                placeholder={t("forms.entermfo")}
                                maxLength={5}
                              />
                              {errors.bankList?.[index]?.mfo?.message && (
                                <FormMessage>
                                  {errors.bankList[index]?.mfo?.message}
                                </FormMessage>
                              )}
                            </div>
                          </div>

                          <div>
                            <FormLabel>
                              <div className="text-[14px]  pb-1">
                                {t("forms.accountNumber")}
                              </div>
                            </FormLabel>
                            <Input
                              {...register(`bankList.${index}.accountNumber`, {
                                required: t("forms.accountNumberRequired"),
                                pattern: {
                                  value: /^\d{20}$/,
                                  message: t("forms.accountNumberInvalid"),
                                },
                              })}
                              placeholder={t("forms.enteraccountNumber")}
                              maxLength={20}
                            />
                            {errors.bankList?.[index]?.accountNumber
                              ?.message && (
                              <FormMessage>
                                {errors.bankList[index]?.accountNumber?.message}
                              </FormMessage>
                            )}
                          </div>
                        </div>
                        {fields.length > 1 && (
                          <Trash
                            onClick={() => remove(index)}
                            className="cursor-pointer text-red-500 mx-2"
                          />
                        )}
                      </div>
                    ))}

                    <Button
                      type="button"
                      onClick={() =>
                        append({ bankName: "", mfo: "", accountNumber: "" })
                      }
                      disabled={!isLastBankFilled}
                      className="my-2 max-w-[200px]"
                    >
                      + {t("forms.addBank")}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="step3">
                  <div className="space-y-4">
                    <FormField
                      control={partnerForm.control}
                      name="contact_info.fio"
                      rules={{ required: t("forms.fioRequired") }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="text-[14px] ">{t("forms.fio")}</div>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={t("forms.enterfio")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={partnerForm.control}
                      name="contact_info.phone"
                      rules={{ required: t("forms.phoneRequired") }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="text-[14px] ">
                              {t("forms.phone")}
                            </div>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <input
                                type="tel"
                                pattern="[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}"
                                maxLength={9}
                                {...field}
                                className="block w-full pl-14 p-2 border rounded"
                                onChange={handlePhoneChange}
                                value={field.value}
                              />
                              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                +998
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={partnerForm.control}
                      name="contact_info.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="text-[14px] ">
                              {t("forms.email")}
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              placeholder={t("forms.enteremail")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              {step > 1 && (
                <Button type="button" variant="default" onClick={prevStep}>
                  {t("buttons.previous")}
                </Button>
              )}
              {step < 3 ? (
                <Button type="button" variant="default" onClick={nextStep}>
                  {t("buttons.next")}
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit(onSubmit)}
                  type="submit"
                  variant="default"
                  className="w-full"
                >
                  {t("buttons.submit.partners")}
                </Button>
              )}
            </div>
          </Form>
        </FormProvider>
      )}
    </CommonModal>
  );
};

const MultiSelectCurrencyDropdown: React.FC<{
  data: string[];
  field: any;
  defaultValue?: CreatePartnerData["currencyType"];
}> = ({ data, field, defaultValue = [] }) => {
  const [open, setOpen] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] =
    useState<string[]>(defaultValue);

  const toggleSelection = (currency: string) => {
    if (selectedCurrencies.includes(currency)) {
      setSelectedCurrencies(selectedCurrencies.filter((i) => i !== currency));
      field.onChange(selectedCurrencies.filter((i) => i !== currency));
    } else {
      const newSelection = [...selectedCurrencies, currency];
      setSelectedCurrencies(newSelection);
      field.onChange(newSelection);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex justify-between items-center"
        >
          <div className="flex gap-1 flex-wrap">
            {selectedCurrencies.length
              ? selectedCurrencies.map((currency) => (
                  <div
                    key={currency}
                    className="flex items-center gap-1 px-2 bg-primary text-white rounded-full"
                  >
                    {currency}
                    <button
                      className="ml-1 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelection(currency);
                      }}
                    >
                      <X className="w-1 h-1 cursor-pointer" />
                    </button>
                  </div>
                ))
              : t("forms.selectCurrency")}
          </div>
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2 max-h-60 overflow-auto">
        {data?.map((currency) => (
          <div
            key={currency}
            className={`cursor-pointer px-3 py-2 my-1 rounded-md hover:bg-gray-100 ${
              selectedCurrencies.includes(currency) ? "bg-gray-200" : ""
            }`}
            onClick={() => toggleSelection(currency)}
          >
            {currency}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default PartnerEditModal;