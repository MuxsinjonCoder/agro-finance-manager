"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CommonModal from "@/components/CommonModal";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllPartners } from "@/queries/partners";
import { toast } from "sonner";
import { Check, Trash } from "lucide-react";
import { useUpdateReqAssign } from "@/queries/grain/req-assign";

const baseFormSchema = z.object({
  contractNumber: z
    .string()
    .min(2, { message: "Kamida 2ta bo'lishi shart!" })
    .max(30, { message: "End ko'pi 30ta bo'lishi shart!" }),
  partnerId: z
    .string({ required_error: "Fermerni tanlash majburiy" })
    .min(1, { message: "Fermerni tanlash majburiy" }),
  description: z.string(),
  penalty: z
    .number({
      required_error: "Jarimani kiritish shart!",
      invalid_type_error: "Jarima raqam bo'lishi kerak!",
    })
    .min(0, { message: "Jarima 0 dan kam bo'lmasligi kerak!" }),
});

const attachmentSchema = z.object({
  productName: z
    .string()
    .min(2, { message: "Kamida 2ta bo'lishi shart!" })
    .max(30, { message: "End ko'pi 30ta bo'lishi shart!" }),
  productWeight: z
    .string({
      required_error: "Miqdor kiritish shart!",
      invalid_type_error: "Miqdor raqam bo'lishi kerak!",
    })
    .min(0, { message: "Miqdor 0 dan kam bo'lmasligi kerak!" }),
  productPrice: z
    .string({
      required_error: "Narx kiritish shart!",
      invalid_type_error: "Narx raqam bo'lishi kerak!",
    })
    .min(0, { message: "Narx 0 dan kam bo'lmasligi kerak!" }),
  allPrice: z.number(),
});

const formSchema = z.intersection(baseFormSchema, attachmentSchema);

export default function EditModal({
  editModal,
  selectedItem,
  setEditModal,
}: any) {
  const { t } = useTranslation();
  const [attechment, setAttechment] = useState<any[] | null[]>([]);
  const [withVat, setWithVat] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(
      (attechment.length > 0 ? baseFormSchema : formSchema) as typeof formSchema
    ),
    values: {
      contractNumber: selectedItem?.contractNumber || "contract number",
      partnerId: String(selectedItem?.partnersDto?.id) || "",
      description: selectedItem?.traffic || "",
      penalty: selectedItem?.penalty || undefined,
      productName: "",
      productWeight: "",
      productPrice: "",
      allPrice: 0,
    },
  });

  const { data: partnersList } = useAllPartners(0, 1000);
  const updateReqAssign = useUpdateReqAssign();

  const priceValue = form.watch("productPrice");
  const quantityValue = form.watch("productWeight");

  useEffect(() => {
    if (selectedItem?.applicationDtoList) {
      setAttechment(
        selectedItem.applicationDtoList.map((item: any) => ({
          productName: item.productName,
          productWeight: item.productWeight,
          productPrice: item.productPrice,
          allPrice: item.allPrice,
          withVat: item.qqos,
          id: item.id,
        }))
      );
    }
  }, [selectedItem]);

  useEffect(() => {
    const calculateTotal = () => {
      if (priceValue !== undefined && quantityValue !== undefined) {
        const baseTotal = Number(priceValue) * Number(quantityValue);
        const total = withVat ? baseTotal * 1.12 : baseTotal;
        form.setValue("allPrice", Math.round(total));
      } else {
        form.setValue("allPrice", 0);
      }
    };
    calculateTotal();
  }, [priceValue, quantityValue, withVat, form]);

  const handlePriceChange = (value: number | undefined) => {
    if (!withVat && value !== undefined) {
      console.log("value: ", value);
    }
  };

  function handleOnSubmit(values: z.infer<typeof formSchema>) {
    const submitingData: any = {
      contractNumber: values.contractNumber,
      penalty: Number(values.penalty),
      traffic: values.description,
      partnerId: Number(values.partnerId),
      applicationList: attechment.map((item) => ({
        productWeight: Number(item.productWeight),
        productPrice: Number(item.productPrice),
        allPrice: item.allPrice,
        productName: item.productName,
        qqos: item.withVat,
      })),
    };

    console.log("submitingData:", submitingData);

    // updateReqAssign.mutate(
    //   { id: selectedItem?.id, data: submitingData },
    //   {
    //     onSuccess: (response: any) => {
    //       if (response.status === "OK") {
    //         toast.success(t("messages.updated"));
    //         setEditModal(false);
    //         form.reset();
    //         setWithVat(false);
    //         setAttechment([]);
    //       } else {
    //         toast.error(t("messages.smtErr"));
    //       }
    //     },
    //     onError: (error: any) => {
    //       const errorMessage =
    //         error instanceof Error ? error.message : t("messages.smtErr");
    //       toast.error(errorMessage);
    //     },
    //   }
    // );
  }

  const handleSaveAttachment = () => {
    const values = form.getValues();
    if (values.productName && values.productWeight && values.productPrice) {
      const newAttachment = {
        productName: values.productName,
        productWeight: values.productWeight,
        productPrice: values.productPrice,
        allPrice: values.allPrice,
        withVat: withVat,
      };
      setAttechment((prev) => [...prev, newAttachment]);
      form.setValue("productName", "");
      form.setValue("productWeight", "" as any);
      form.setValue("productPrice", "" as any);
      form.setValue("allPrice", 0);
    }
  };

  const handleDeleteAttachment = (index: number) => {
    setAttechment((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <CommonModal
      width="700px"
      visible={editModal}
      onClose={() => {
        setEditModal(false);
        form.reset();
        setWithVat(false);
        setAttechment([]);
      }}
      title="Topshiriq shartnomani tahrirlash"
    >
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="flex items-center justify-between gap-5 flex-wrap"
          >
            <div className="min-w-[47%]">
              <FormField
                control={form.control}
                name="contractNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shartnoma raqami</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={selectedItem?.contractNumber}
                        maxLength={31}
                        placeholder="Shartnoma raqamini kiriting"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="min-w-[47%]">
              <FormField
                control={form.control}
                name="partnerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hamkor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Hamkorni tanlash" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {partnersList?.data?.map((item: any) => (
                          <SelectItem key={item.id} value={String(item.id)}>
                            {item?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-[47%] flex items-center gap-5">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="penalty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jarima foizi</FormLabel>
                      <FormControl>
                        <Input
                          addonAfter={"%"}
                          type="number"
                          step="0.01"
                          placeholder="Jarima foizini kiriting"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            let value = e.target.value
                              ? Number(e.target.value)
                              : undefined;
                            if (value !== undefined && value > 100) {
                              value = 100;
                            }
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="min-w-[47%]">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tarif</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={31}
                        placeholder="Tarifni yozing"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border border-gray-200 mt-5 w-full"></div>
            <h3 className="w-full text-xl leading-3 -mb-6">Ilovalar</h3>

            {/* table */}
            <div className="w-full my-5">
              <table className="border-collapse w-full shadow-sm">
                <thead className="bg-gray-50">
                  <tr className="flex items-center justify-between w-full">
                    <th className="w-[35px] border-2 rounded-tl-md border-gray-400 p-2 text-center text-xs font-semibold text-gray-700">
                      №
                    </th>
                    <th className="w-[150%] border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700">
                      Nomi
                    </th>
                    <th className="w-[70%] border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700">
                      Miqdori
                    </th>
                    <th className="w-[90%] border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700">
                      Narxi
                    </th>
                    <th className="w-[50px] border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700">
                      QQS
                    </th>
                    <th className="w-[120%] border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700">
                      Jami summa
                    </th>
                    <th className="w-[105px] border-2 rounded-tr-md border-gray-400 p-2 text-center text-xs font-semibold text-gray-700">
                      -
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attechment?.length > 0 ? (
                    attechment?.map((item: any, index: number) => (
                      <tr
                        key={index}
                        className="flex items-center justify-between w-full"
                      >
                        <th className="w-[95px] border-2 border-gray-400 p-2 truncate text-center text-xs font-semibold text-gray-700">
                          {index + 1}
                        </th>
                        <th className="w-[150%] border-2 border-gray-400 p-2 truncate text-center text-xs font-semibold text-gray-700">
                          {item?.productName || "---"}
                        </th>
                        <th className="w-[70%] border-2 border-gray-400 p-2 truncate text-center text-xs font-semibold text-gray-700">
                          {(item?.productWeight || 0)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                        </th>
                        <th className="w-[90%] border-2 border-gray-400 p-2 truncate text-center text-xs font-semibold text-gray-700">
                          {(item?.productPrice || 0)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                        </th>
                        <th className="w-[180px] border-2 border-gray-400 p-2 truncate text-center text-xs font-semibold text-gray-700">
                          <Check
                            className={`text-primary size-4 mx-auto  ${
                              item?.withVat ? "block" : "opacity-0"
                            }`}
                          />
                        </th>
                        <th className="w-[120%] border-2 border-gray-400 p-2 truncate text-center text-xs font-semibold text-gray-700">
                          {(item?.allPrice || 0)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                        </th>
                        <th className="w-[100px] border-2 border-gray-400 p-2 truncate text-center text-xs font-semibold text-gray-700">
                          <Trash
                            className="text-red-600 size-4 cursor-pointer transition-all duration-300 hover:scale-[1.2]"
                            onClick={() => handleDeleteAttachment(index)}
                          />
                        </th>
                      </tr>
                    ))
                  ) : (
                    <tr className="flex items-center justify-between w-full">
                      <td className="w-full border-2 py-2 opacity-70 rounded-b-md border-gray-400 p-2 text-center text-xs font-semibold text-gray-700">
                        Ilova qo'shilmagan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="min-w-[47%]">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mahsulot nomi</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={31}
                        placeholder="Mahsulot nomini kiriting"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="min-w-[47%]">
              <FormField
                control={form.control}
                name="productWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mahsulot miqdori</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          addonAfter={"tonna"}
                          type="text"
                          placeholder="Mahsulot miqdorini kiriting"
                          {...field}
                          value={
                            field.value
                              ? field.value
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                              : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value.replace(/\s/g, "");
                            field.onChange(value ? Number(value) : undefined);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="min-w-[47%] flex items-center gap-2">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="productPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mahsulot narxi</FormLabel>
                      <FormControl>
                        <Input
                          addonAfter={"UZS"}
                          type="text"
                          placeholder="1 tonna narxi"
                          {...field}
                          value={
                            field.value
                              ? field.value
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                              : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value.replace(/\s/g, "");
                            field.onChange(value ? Number(value) : undefined);
                            handlePriceChange(
                              value ? Number(value) : undefined
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="min-w-[47%] flex items-center gap-2">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="allPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jami narxi</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          type="text"
                          placeholder="1 tonna narxi"
                          {...field}
                          value={
                            field.value
                              ? field.value
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                              : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col-reverse items-center gap-1">
                <Switch
                  id="vat"
                  checked={withVat}
                  onCheckedChange={(checked) => setWithVat(checked)}
                />
                <Label htmlFor="vat">QQS</Label>
              </div>
            </div>

            <div className="min-w-[47%]">
              <Button
                type="button"
                variant={"outline"}
                onClick={handleSaveAttachment}
              >
                Ilovani saqlash
              </Button>
            </div>

            <div className="w-full">
              <Button className="w-full" type="submit">
                Saqlash
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </CommonModal>
  );
}
