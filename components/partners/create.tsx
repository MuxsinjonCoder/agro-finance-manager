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
import { CreateDistrict, CreatePartnerData, Partner } from "@/types/partners";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ArrowLeft, ArrowRight, ChevronDown, Trash, X } from "lucide-react";
import { Input } from "../ui/input";
import { t } from "i18next";
import {
  checkMfo,
  useAllPartners,
  useCreateDistrict,
  useCreateFinancePartner,
  useDistrictsByRegion,
} from "@/queries/partners";
import { toast } from "sonner";
import { useFinanceCategories } from "@/queries/categories";
import AddOrgModal from "./add-org";

interface PartnerModalProps {
  addPartnerModal: boolean;
  setAddPartnerModal: (state: boolean) => void;
  onPartnerCreated?: (partner: any) => void;
}

interface OrgTypes {
  region: string;
  district: string;
  org: string;
  org_id: any;
}

const regions = [
  { name: "Toshkent Shahri", value: "TASHKENT_CITY" },
  { name: "Toshkent", value: "TASHKENT" },
  { name: "Andijon", value: "ANDIJAN" },
  { name: "Buxoro", value: "BUKHARA" },
  { name: "Farg‘ona", value: "FERGANA" },
  { name: "Jizzax", value: "JIZZAKH" },
  { name: "Xorazm", value: "KHOREZM" },
  { name: "Namangan", value: "NAMANGAN" },
  { name: "Navoiy", value: "NAVOIY" },
  { name: "Qashqadaryo", value: "KASHKADARYA" },
  { name: "Samarqand", value: "SAMARKAND" },
  { name: "Sirdaryo", value: "SIRDARYA" },
  { name: "Surxondaryo", value: "SURKHANDARYA" },
  { name: "Qoraqalpog‘iston", value: "KARAKALPAKSTAN" },
];

const PartnerModal: React.FC<PartnerModalProps> = ({
  addPartnerModal,
  setAddPartnerModal,
  onPartnerCreated,
}) => {
  const allCategories = useFinanceCategories(0, 100);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const partnerForm = useForm<CreatePartnerData>({
    defaultValues: {
      name: "",
      partnerType: "BANK",
      categoryId: null,
      currencyType: ["UZS"],
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
    register,
    handleSubmit,
    trigger,
    getValues,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors, touchedFields },
  } = partnerForm;
  const allPartners = useAllPartners(0, 10);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bankList",
  });

  const initialOrgs = Array.from({ length: 50 }, (_, i) => ({
    name: `Tashkilot ${i + 1}`,
    id: i + 1,
  }));

  // Watch the last bank entry
  const lastBank = fields.length > 0 ? fields[fields.length - 1] : null;
  const lastBankValues = watch(`bankList.${fields.length - 1}`);

  const isLastBankFilled =
    lastBankValues?.bankName?.trim() &&
    lastBankValues?.mfo?.trim() &&
    lastBankValues?.accountNumber?.trim();

  const [step, setStep] = useState(1);
  const [bankId, setBankId] = useState(null);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [addOrgModal, setAddOrgModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Partner | null>(null);

  const selectedOrgLocation = selectedOrg?.districtDto?.[0] || null;

  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState(0);
  const [org, setOrg] = useState("");
  const [addNewModal, setAddNewModal] = useState(false);
  const { data: regionsDistrict, refetch: refetchDistricts } =
    useDistrictsByRegion(region);
  const [newType, setNewType] = useState("");
  const [newDistrict, setNewDistrict] = useState("");
  const [newError, setNewError] = useState(false);
  const createDistrict = useCreateDistrict();

  useEffect(() => {
    if (selectedOrgLocation) {
      setRegion(selectedOrgLocation?.region || "");
      setDistrict(selectedOrgLocation?.id);
    }
  }, [selectedOrgLocation, region, district]);

  const handleChange = (label: string, value: string) => {
    // if (label === "Region") setRegion(value);
    // if (label === "District") setDistrict(value);
    if (label === "Organization") setOrg(value);
  };

  const requiredFieldsByStep = new Map<number, string[]>([
    [1, ["categoryId", "partnerType", "name", "currencyType", "inn"]],
    [2, ["bankList.0.bankName", "bankList.0.mfo", "bankList.0.accountNumber"]],
    [3, []], // No required fields for contact_info
  ]);

  const requiredFields = requiredFieldsByStep.get(step) || [];
  const createPartner = useCreateFinancePartner();

  const formValues = watch();
  React.useEffect(() => {
    if (
      formValues.categoryId ||
      formValues.inn ||
      formValues.name ||
      formValues.contact_info.fio ||
      formValues.contact_info.phone ||
      formValues.bankList[0].bankName ||
      formValues.bankList[0].accountNumber ||
      formValues.bankList[0].mfo
    ) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [formValues]);

  React.useEffect(() => {
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

  const handleCheckMfo = async (mfo: number, index: number) => {
    const res = await checkMfo(mfo); // ✅ Call the function normally

    if (res?.data) {
      clearErrors(`bankList.${index}.mfo`); // ✅ Clears error if valid
      return true;
    } else {
      setError(`bankList.${index}.mfo`, {
        type: "manual",
        message: t("forms.mfoexist"), // ❌ Show error when invalid
      });
      return false;
    }
  };

  // Function to move to the next step with validation
  const nextStep = async () => {
    const requiredFields = requiredFieldsByStep.get(step) || [];
    const isValid = await trigger(requiredFields as any);

    if (isValid) {
      if (step === 2) {
        // Get all bankList entries
        const bankList = getValues("bankList");

        for (let i = 0; i < bankList.length; i++) {
          const mfo = bankList[i]?.mfo?.trim(); // Ensure MFO exists
          const name = bankList[i]?.bankName?.trim(); // Ensure MFO exists
          const accN = bankList[i]?.accountNumber?.trim(); // Ensure MFO exists

          if (!mfo) {
            setError(`bankList.${i}.mfo`, {
              type: "manual",
              message: t("forms.mfoRequired"), // Show error if MFO is missing
            });
            return;
          }

          if (!name) {
            setError(`bankList.${i}.bankName`, {
              type: "manual",
              message: t("forms.bankNameRequired"), // Show error if MFO is missing
            });
            return;
          }

          if (!accN) {
            setError(`bankList.${i}.accountNumber`, {
              type: "manual",
              message: t("forms.accountNumberRequired"), // Show error if MFO is missing
            });
            return;
          }

          const isMfoValid = await handleCheckMfo(Number(mfo), i);
          if (!isMfoValid) return; // Stop if any MFO is invalid
        }
      }

      setStep((prev) => prev + 1);
    }
  };

  const addBank = async () => {
    const lastIndex = fields.length - 1;
    const lastMfo = getValues(`bankList.${lastIndex}.mfo`);

    const isMfoValid = await handleCheckMfo(Number(lastMfo), lastIndex);
    if (!isMfoValid) return;

    clearErrors(`bankList.${lastIndex}.mfo`); // ✅ Ensure errors are cleared
    append({ bankName: "", mfo: "", accountNumber: "" });
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

  // Function to go to the previous step
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleCloseModal = () => {
    if (hasUnsavedChanges) {
      const confirmClose = window.confirm(
        "Your inputted data will be lost. Are you sure you want to close?"
      );
      if (confirmClose) {
        setAddPartnerModal(false);
        reset(); // Reset the form
      }
    } else {
      setAddPartnerModal(false);
      reset(); // Reset the form
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, ""); // Allow only numbers

    if (value.length > 9) return; // Limit to 9 digits

    partnerForm.setValue("contact_info.phone", value, { shouldValidate: true });
  };

  const handleSubmitPartner = async (data: CreatePartnerData) => {
    const submittingData = {
      ...data,
      contact_info: {
        ...data.contact_info,
        phone: `+998${data.contact_info.phone}`,
      },
      districtId: district,
    };

    createPartner.mutate(submittingData, {
      onSuccess: (res) => {
        if (res.status === "BAD_REQUEST") {
          toast.message(`${t("messages.err")} ${res.message}`);
        } else if (res.status === "NOT_FOUND") {
          toast.message(`${t("messages.err")} ${res.message}`);
        } else if (res.status === "OK") {
          console.log(res.data, "res.data");
          onPartnerCreated?.(res.data);

          partnerForm.reset();
          setAddPartnerModal(false);
          toast.message(t("messages.created"));
          setStep(1);
        }
      },
    });
  };

  const handleDistrictSubmit = () => {
    const newErrors = {
      region: !region,
      value: !newDistrict,
    };

    if (newErrors.region || newErrors.value) {
      setNewError(true);
    } else {
      const submittingData = {
        region: region,
        district: newDistrict,
      };
      console.log("submittingData", submittingData);
      createDistrict.mutate(submittingData, {
        onSuccess: (res) => {
          if (res.status === "BAD_REQUEST") {
            toast.message(`${t("messages.err")} ${res.message}`);
          } else if (res.status === "NOT_FOUND") {
            toast.message(`${t("messages.err")} ${res.message}`);
          } else if (res.status === "OK") {
            console.log(res.data, "res.data");
            toast.message(t("messages.created"));
          }
        },
      });
      setAddNewModal(false);
      setNewDistrict("");
      setNewError(false);
    }
  };

  return (
    <>
      {/* add partner modal */}
      <CommonModal
        visible={addPartnerModal}
        title={t("partner.add")}
        onClose={() => {
          handleCloseModal();
          setDistrict(0);
          setRegion("");
        }}
      >
        <div className="absolute top-2 w-[200px] right-20">
          <Select
            value={selectedOrg?.id?.toString()}
            onValueChange={(value: string) => {
              const selectedItem = allPartners?.data?.data?.find(
                (item: Partner) => item?.id.toString() === value
              );

              setSelectedOrg(selectedItem);
            }}
          >
            <SelectTrigger className="focus:outline focus:outline-1 focus:outline-blue-500">
              <SelectValue placeholder={t("forms.selectOrg")} />
            </SelectTrigger>
            <SelectContent>
              {allPartners?.data?.data?.map((item: Partner) => (
                <SelectItem key={item.id} value={item?.id.toString()}>
                  {item.name}
                </SelectItem>
              ))}
              <Button onClick={() => setAddOrgModal(true)} variant={"outline"}>
                {t("buttons.seeAll")}
              </Button>
            </SelectContent>
          </Select>
        </div>
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

                {/* Step 1: Basic Info */}
                <TabsContent value="step1">
                  <div className="space-y-5 my-2">
                    <div className="flex gap-2">
                      {/* viloyat */}
                      <div className="w-full flex flex-col gap-3">
                        <label className="" htmlFor="region">
                          {t("forms.region.label")}
                        </label>
                        <Select
                          value={region}
                          onValueChange={(val) => setRegion(val)}
                        >
                          <SelectTrigger className="focus:outline focus:outline-1 focus:outline-blue-500">
                            <SelectValue placeholder={t("forms.region.pls")} />
                          </SelectTrigger>
                          <SelectContent>
                            {regions?.map((item) => (
                              <SelectItem key={item?.value} value={item?.value}>
                                {item?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* tuman */}
                      <div className="w-full flex flex-col gap-3">
                        <label className="" htmlFor="region">
                          {t("forms.district.label")}
                        </label>
                        <Select
                          value={district ? district.toString() : ""}
                          onValueChange={(val) => setDistrict(Number(val))}
                        >
                          <SelectTrigger className="focus:outline focus:outline-1 focus:outline-blue-500">
                            <SelectValue
                              placeholder={
                                district
                                  ? regionsDistrict?.data?.find(
                                      (item: CreateDistrict) =>
                                        item?.id === district
                                    )?.name ?? t("forms.district.pls")
                                  : t("forms.district.pls")
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {regionsDistrict?.data?.map(
                              (item: CreateDistrict) => (
                                <SelectItem
                                  key={item?.id}
                                  value={item?.id.toString()}
                                >
                                  {item?.name}
                                </SelectItem>
                              )
                            )}
                            <Button
                              onClick={() => {
                                setAddNewModal(true);
                                setNewType("district");
                              }}
                              variant="outline"
                            >
                              {t("modals.add")}
                            </Button>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <FormField
                        control={partnerForm.control}
                        name="categoryId"
                        rules={{ required: t("forms.categoryRequired") }}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel
                              className={errors.categoryId ? "text-black" : ""}
                            >
                              <div className="py-3">{t("tables.category")}</div>
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(Number(value));
                                  partnerForm.trigger("categoryId");
                                }}
                              >
                                <SelectTrigger
                                  className={
                                    errors.categoryId
                                      ? "border-red-500 focus:outline-red-500"
                                      : "focus:outline focus:outline-1 focus:outline-blue-500"
                                  }
                                >
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
                          <FormItem className="w-full">
                            <FormLabel
                              className={errors.partnerType ? "text-black" : ""}
                            >
                              <div className="py-3">
                                {t("forms.partnerType")}
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger
                                  className={
                                    errors.partnerType
                                      ? "border-red-500 focus:outline-red-500"
                                      : "focus:outline focus:outline-1 focus:outline-blue-500"
                                  }
                                >
                                  <SelectValue
                                    placeholder={t("forms.partnerType")}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="AGRO_FONT">
                                    AGRO_FONT
                                  </SelectItem>
                                  <SelectItem value="BANK">
                                    {t("forms.partnerTypes.bank")}
                                  </SelectItem>
                                  <SelectItem value="LEASING_COMPANY">
                                    {t("forms.partnerTypes.leasingCompany")}
                                  </SelectItem>
                                  <SelectItem value="FARM">
                                    {t("forms.partnerTypes.farm")}
                                  </SelectItem>
                                  <SelectItem value="DON">
                                    {t("forms.partnerTypes.grain")}
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
                    </div>

                    <div className="flex gap-2">
                      <FormField
                        control={partnerForm.control}
                        name="name"
                        rules={{ required: t("forms.nameRequired") }}
                        render={({ field, fieldState }) => (
                          <FormItem className="w-full">
                            <FormLabel
                              className={errors.name ? "text-black" : ""}
                            >
                              <div className="py-3">{t("forms.name")}</div>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={t("forms.entername")}
                                className={
                                  fieldState.invalid
                                    ? "border-red-500 focus:outline-red-500"
                                    : "focus:outline focus:outline-1 focus:outline-blue-500"
                                }
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
                            value: /^\d{9}$/, // Must be exactly 9 digits
                            message: t("forms.innInvalid"), // Show error message if invalid
                          },
                        }}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel
                              className={errors.inn ? "text-black" : ""}
                            >
                              <div className="py-3">{t("forms.inn")}</div>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={t("forms.enterinn")}
                                maxLength={9}
                                type="text"
                                inputMode="numeric"
                                onInput={(e) => {
                                  e.currentTarget.value =
                                    e.currentTarget.value.replace(/\D/g, "");
                                }}
                                className={
                                  errors.categoryId
                                    ? "border-red-500 focus:outline-red-500"
                                    : "focus:outline focus:outline-1 focus:outline-blue-500"
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={partnerForm.control}
                      name="currencyType"
                      rules={{
                        required: true,
                        validate: (value) => value.length > 0,
                      }}
                      render={({ field, formState }) => (
                        <FormItem>
                          <FormLabel
                            className={errors.currencyType ? "text-black" : ""}
                          >
                            <div className="py-3">
                              {t("forms.currencyType")}
                            </div>
                          </FormLabel>
                          <FormControl>
                            <MultiSelectCurrencyDropdown
                              field={field}
                              data={["USD", "EUR", "UZS"]}
                              error={errors.currencyType}
                              defaultValue={
                                formState.defaultValues
                                  ?.currencyType as CreatePartnerData["currencyType"]
                              }
                            />
                          </FormControl>
                          {errors.currencyType && (
                            <FormMessage>
                              {errors.currencyType.message}
                            </FormMessage>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                {/* Step 2: Bank Details */}
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
                                <div className="py-3">
                                  {t("forms.bankName")}
                                </div>
                              </FormLabel>
                              <Input
                                {...register(`bankList.${index}.bankName`, {
                                  required: t("forms.bankNameRequired"),
                                })}
                                placeholder={t("forms.enterbankName")}
                                className={
                                  errors.bankList?.[index]?.bankName
                                    ? "border-red-500 focus:ring-red-500"
                                    : ""
                                }
                              />
                              {errors.bankList?.[index]?.bankName && (
                                <FormMessage>
                                  {errors.bankList[index]?.bankName?.message}
                                </FormMessage>
                              )}
                            </div>

                            <div className="w-full">
                              <FormLabel>
                                <div className="py-3">{t("forms.mfo")}</div>
                              </FormLabel>
                              <Input
                                {...register(`bankList.${index}.mfo`, {
                                  required: t("forms.mfoRequired"),
                                  pattern: {
                                    value: /^\d{5}$/, // Ensures exactly 5 digits
                                    message: t("forms.mfoInvalid"),
                                  },
                                  maxLength: {
                                    value: 5,
                                    message: t("forms.mfoInvalid"),
                                  },
                                })}
                                placeholder={t("forms.entermfo")}
                                type="text"
                                maxLength={5}
                                inputMode="numeric"
                                className={`rounded-md w-full 
    ${
      errors.bankList?.[index]?.mfo
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-blue-500"
    }
  `}
                                onInput={(e) => {
                                  e.currentTarget.value =
                                    e.currentTarget.value.replace(/\D/g, "");
                                }}
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
                              <div className="py-3">
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
                              type="text"
                              maxLength={20}
                              inputMode="numeric"
                              onInput={(e) => {
                                e.currentTarget.value =
                                  e.currentTarget.value.replace(/\D/g, "");
                              }}
                              className={
                                errors.bankList?.[index]?.accountNumber
                                  ? "border-red-500 focus:ring-red-500"
                                  : ""
                              }
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

                    {/* Add New Bank Button */}
                    <Button
                      type="button"
                      onClick={
                        //() => append({ bankName: "", mfo: "", accountNumber: "" })
                        addBank
                      }
                      disabled={!isLastBankFilled}
                      className="my-2 max-w-[200px]"
                    >
                      + {t("forms.addBank")}
                    </Button>
                  </div>
                </TabsContent>

                {/* Step 3: Contact Info */}
                <TabsContent value="step3">
                  <div className="space-y-4">
                    <FormField
                      control={partnerForm.control}
                      name="contact_info.fio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="py-3">{t("forms.fio")}</div>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={t("forms.enterfio")}
                            />
                          </FormControl>
                          {touchedFields.contact_info?.fio &&
                            errors.contact_info?.fio && (
                              <FormMessage>
                                {errors.contact_info.fio.message}
                              </FormMessage>
                            )}
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2">
                      <FormField
                        control={partnerForm.control}
                        name="contact_info.phone"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>
                              <div className="py-3">{t("forms.phone")}</div>
                            </FormLabel>
                            <FormControl>
                              <div className="relative w-full">
                                <input
                                  type="tel"
                                  pattern="[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}"
                                  maxLength={9}
                                  {...field}
                                  className="block w-full pl-14 px-2 py-[5px] border rounded"
                                  onChange={handlePhoneChange}
                                  value={field.value}
                                />
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                  +998
                                </span>
                              </div>
                            </FormControl>
                            {touchedFields.contact_info?.phone &&
                              errors.contact_info?.phone && (
                                <FormMessage>
                                  {errors.contact_info.phone.message}
                                </FormMessage>
                              )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={partnerForm.control}
                        name="contact_info.email"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>
                              <div className="py-3">{t("forms.email")}</div>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                {...field}
                                placeholder="email@example.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-end mt-4 gap-2">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("buttons.previous")}
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  variant="default"
                  onClick={nextStep}
                  className={`ml-auto ${step === 1 ? "w-1/2" : ""}`}
                >
                  {t("buttons.next")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit(handleSubmitPartner)}
                  type="submit"
                  variant="default"
                  loading={createPartner.isLoading}
                  className="w-full ml-auto"
                >
                  {t("buttons.submit.partners")}
                </Button>
              )}
            </div>
          </Form>
        </FormProvider>
      </CommonModal>

      <AddOrgModal
        addOrgModal={addOrgModal}
        setAddOrgModal={setAddOrgModal}
        setSelectedOrg={setSelectedOrg}
        selectedOrg={selectedOrg}
      />

      {/* add district modal */}
      <CommonModal
        visible={addNewModal}
        onClose={() => setAddNewModal(false)}
        title={
          newType == "org"
            ? t("forms.org.label")
            : newType == "region"
            ? t("forms.region.label")
            : newType == "district"
            ? t("forms.district.label")
            : t("forms.org.label")
        }
      >
        <div>
          {newType == "district" ? (
            <div>
              {/* viloyat */}
              <div className="mb-5">
                <label className="mb-2" htmlFor="region">
                  {t("forms.region.label")}
                </label>
                <Select
                  value={region}
                  onValueChange={(val) => handleChange("Region", val)}
                >
                  <SelectTrigger
                    className={`focus:outline focus:outline-1 focus:outline-blue-500`}
                  >
                    <SelectValue placeholder={t("forms.region.pls")} />
                  </SelectTrigger>
                  <SelectContent>
                    {regions?.map((item) => (
                      <SelectItem key={item?.value} value={item?.value}>
                        {item?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* tuman input */}
              <div>
                <label className="mb-2" htmlFor="region">
                  {t("forms.district.label")}
                </label>
                <Input
                  type="text"
                  value={newDistrict}
                  onChange={(e) => {
                    setNewDistrict(e.target.value);
                    setNewError(false);
                  }}
                  className={newError ? "border-red-500" : ""}
                  placeholder={t("forms.district.enter")}
                />
                {newError && (
                  <p className="text-red-500 text-sm">
                    {t("forms.district.errMsg")}
                  </p>
                )}
                <Button className="mt-5" onClick={handleDistrictSubmit}>
                  {t("buttons.add")}
                </Button>
              </div>
            </div>
          ) : (
            "None"
          )}
        </div>
      </CommonModal>
    </>
  );
};

const MultiSelectCurrencyDropdown: React.FC<{
  data: string[];
  field: any;
  defaultValue?: CreatePartnerData["currencyType"];
  error: any;
}> = ({ data, field, defaultValue = [], error }) => {
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
      <PopoverTrigger asChild className={error ? "border-red-500" : ""}>
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

export default PartnerModal;
