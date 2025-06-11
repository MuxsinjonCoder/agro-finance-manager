"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatStringWithSpaces } from "@/helpers/textUtils";
import { SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useCreateAttech } from "@/queries/attechments";
import { CreateAttechments } from "@/types/attechments";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  useFinanceContracts,
  useFinanceMainContracts,
} from "@/queries/contracts";
import { GotContractData, GotMainCont } from "@/types/contracts";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { boolean } from "zod";
import { Trash2 } from "lucide-react";

interface FormData {
  productType: string;
  quantity: string;
  price: number;
  totalAmount: number;
  withVat: boolean;
}

const options = [
  { id: 1, label: "Paxta" },
  { id: 2, label: "G'alla" },
  { id: 3, label: "Meva-savzavot" },
];

export default function AddAttachments({
  setAddAttechment,
}: {
  setAddAttechment: (value: boolean) => void;
  contractType: string;
}) {
  const { t } = useTranslation();

  //   main states
  const [mainContractsSize, setMainContractsSize] = useState(10);
  const [standardContractsSize, setStandardContractsSize] = useState(10);

  //   queries
  const allMainContracts = useFinanceMainContracts(0, mainContractsSize);
  const standartContracts = useFinanceContracts(0, standardContractsSize);
  const createAttech = useCreateAttech();
  const [savedAttechment, setSavedAttechment] = useState<CreateAttechments[]>(
    []
  );

  // forms
  const form = useForm<FormData>({
    defaultValues: {
      productType: "",
      quantity: "",
      price: undefined,
      totalAmount: undefined,
      withVat: false,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  //   useEffects for main and standard contracts
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
  //

  useEffect(() => {
    const quantity = Number(form.getValues("quantity")) || 0;
    const price = Number(form.getValues("price")) || 0;
    form.setValue("totalAmount", quantity * price);
  }, [form.watch("quantity"), form.watch("price")]);

  const onSubmit: SubmitHandler<CreateAttechments> = (data) => {
    const submitingData = {
      productType: String(data?.productType),
      quantity: Number(data?.quantity),
      price: Number(data?.price),
      totalAmount: Number(data?.totalAmount),
      withVat: data?.withVat,
    };

    createAttech.mutate(submitingData, {
      onSuccess: (res) => {
        form.reset();
        setAddAttechment(false);
      },
    });
  };

  const saveAttechment = () => {
    const productType = form.getValues("productType");
    const quantity = form.getValues("quantity");
    const price = form.getValues("price");
    const totalAmount = form.getValues("totalAmount");

    if (
      !productType ||
      !quantity ||
      price === undefined ||
      totalAmount === undefined
    ) {
      toast.error(t("messages.fillFields"));
      return;
    }

    const savingData = {
      productType,
      quantity,
      price,
      totalAmount,
      withVat: form.getValues("withVat"),
    };
    setSavedAttechment((prev) => [...prev, savingData]);
    form.reset({
      productType: "",
      quantity: "",
      price: undefined,
      totalAmount: undefined,
      withVat: false,
    });
  };

  const deleteSavedAttechment = (index: number) => {
    setSavedAttechment((item) =>
      item.filter((attechment, attechmentIndex) => attechmentIndex != index)
    );
  };

  return (
    <>
      {savedAttechment?.length > 0 ? (
        <div className="mb-5">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm font-normal text-left">
                <th className="border font-medium p-2">
                  {t("tables.productType")}
                </th>
                <th className="border font-medium p-2">
                  {t("tables.quantity")}
                </th>
                <th className="border font-medium p-2">{t("tables.price")}</th>
                <th className="border font-medium p-2">
                  {t("tables.totalAmount")}
                </th>
                <th className="border font-medium p-2">
                  {t("tables.withVat")}{" "}
                </th>
                <th className="border font-medium p-2">
                  {t("tables.actions")}{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {savedAttechment.map((item, index) => (
                <tr key={index} className="text-sm">
                  <td className="border p-2">{item.productType}</td>
                  <td className="border p-2">
                    {item.quantity.toLocaleString()}
                  </td>
                  <td className="border p-2">{item.price?.toLocaleString()}</td>
                  <td className="border p-2">
                    {item.totalAmount?.toLocaleString()}
                  </td>
                  <td className="border p-2">
                    {item.withVat ? t("buttons.y") : t("buttons.n")}
                  </td>
                  <td className="border p-2">
                    <Trash2
                      onClick={() => {
                        deleteSavedAttechment(index);
                      }}
                      className="mx-auto cursor-pointer text-red-600 size-5"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" px-2 flex flex-wrap gap-5 justify-between"
          >
            {/* product type */}
            <FormField
              control={form.control}
              name="productType"
              rules={{ required: t("forms.required") }}
              render={({ field }) => (
                <FormItem className="w-[48%]">
                  <FormLabel>{t("forms.productType")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("forms.selectProductType")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.id} value={option.label}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage>{errors.productType?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* quantity */}
            <FormField
              control={form.control}
              name="quantity"
              rules={{ required: t("forms.required") }}
              render={({ field }) => (
                <FormItem className="w-[48%]">
                  <FormLabel>{t("forms.amount")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("forms.amount")} />
                  </FormControl>
                  <FormMessage>{errors.quantity?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* price */}
            <FormField
              control={form.control}
              name="price"
              rules={{ required: t("forms.required") }}
              render={({ field, fieldState }) => (
                <FormItem className="w-[48%]">
                  <FormLabel>{t("forms.price")}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      value={
                        field.value
                          ? formatStringWithSpaces(String(field.value))
                          : ""
                      }
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "");
                        if (/^\d*$/.test(value)) {
                          field.onChange(value);
                        }
                      }}
                      className={`${
                        fieldState.invalid
                          ? "border-red-500 outline-red-500 focus:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage>{errors.price?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* total amount */}
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field, fieldState }) => (
                <FormItem className="w-[48%]">
                  <FormLabel>{t("forms.totalAmount")}</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      type="text"
                      {...field}
                      value={
                        field.value
                          ? formatStringWithSpaces(String(field.value))
                          : ""
                      }
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "");
                        if (/^\d*$/.test(value)) {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage>{errors.totalAmount?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="withVat"
              render={({ field, fieldState }) => (
                <FormItem className="w-[48%]">
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="qqs"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="qqs">{t("forms.withQQS")}</Label>
                    </div>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* save attechment */}
            <div>
              <Button
                onClick={() => {
                  saveAttechment();
                }}
                type="button"
                className="mb-5"
              >
                {t("buttons.saveAttechment")}
              </Button>
            </div>

            <div className="w-full flex justify-center">
              <Button className="mb-5" type="submit">
                {t("buttons.submit.attechment")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
