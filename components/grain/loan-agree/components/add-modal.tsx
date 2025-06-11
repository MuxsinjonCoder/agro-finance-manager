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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllPartners } from "@/queries/partners";
import { useCreateLoanAgree } from "@/queries/grain/loan-agree";
import { toast } from "sonner";

interface PropsTypes {
  setAddModal: (value: boolean) => void;
  addModal: boolean;
}

// zod schema
const formSchema = z.object({
  contractNumber: z
    .string()
    .min(2, {
      message: "Kamida 2ta bo'lishi shart!",
    })
    .max(30, {
      message: "End ko'pi 30ta bo'lishi shart!",
    }),
  contractDate: z.string(),
  description: z.string(),
  price: z
    .number({
      required_error: "Narx kiritish shart!",
      invalid_type_error: "Narx raqam bo'lishi kerak!",
    })
    .min(0, {
      message: "Narx 0 dan kam bo'lmasligi kerak!",
    }),
  borrower: z
    .string({
      required_error: "Fermerni tanlash majburiy",
    })
    .min(1, { message: "Fermerni tanlash majburiy" }),
  gracePeriod: z.string({
    required_error: "Imtiyozli muddatni tanlash majburiy",
  }),
  startDate: z.string(),
  endDate: z.string(),
  percent: z
    .number({
      required_error: "Foiz kiritish shart!",
      invalid_type_error: "Foiz raqam bo'lishi kerak!",
    })
    .min(0, {
      message: "Foiz 0 dan kam bo'lmasligi kerak!",
    })
    .max(100, {
      message: "Foiz 100 dan ko'p bo'lmasligi kerak!",
    }),
  purpose: z
    .string()
    .min(2, {
      message: "Kamida 2ta bo'lishi shart!",
    })
    .max(30, {
      message: "End ko'pi 30ta bo'lishi shart!",
    }),
  penalty: z
    .number({
      required_error: "Jarimani kiritish shart!",
      invalid_type_error: "Jarima raqam bo'lishi kerak!",
    })
    .min(0, {
      message: "Jarima 0 dan kam bo'lmasligi kerak!",
    }),
});

const AddModal = ({ addModal, setAddModal }: PropsTypes) => {
  // halpers
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractNumber: "",
      price: undefined,
      contractDate: new Date().toISOString(),
      description: "",
      borrower: "",
      gracePeriod: undefined,
      startDate: new Date().toISOString(),
      endDate: new Date(new Date().getFullYear(), 11, 31).toISOString(),
      percent: undefined,
      purpose: "",
      penalty: undefined,
    },
  });

  // queries
  const { data: partnersList } = useAllPartners();
  const createLoanAgree = useCreateLoanAgree();

  // states
  const [withVat, setWithVat] = useState(false);
  const [basePrice, setBasePrice] = useState<number | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // use effects
  const priceValue = form.watch("price");
  useEffect(() => {
    if (priceValue !== undefined) {
      if (withVat) {
        const priceWithVat = basePrice ? basePrice * 1.12 : priceValue * 1.12;
        form.setValue("price", Math.round(priceWithVat));
      } else if (basePrice !== undefined) {
        form.setValue("price", basePrice);
      }
    }
  }, [withVat, priceValue, basePrice, form]);

  // functions
  function onSubmit(values: z.infer<typeof formSchema>) {
    const submitingData = {
      contractNumber: values?.contractNumber,
      amount: Number(values?.price),
      contractDate: values?.contractDate?.slice(0, 10),
      startDate: values?.startDate?.slice(0, 10),
      endDate: values?.endDate?.slice(0, 10),
      percentAmount: Number(values?.percent),
      description: values?.purpose,
      penaltyPercent: Number(values?.penalty),
      traffic: values?.description,
      qqs: withVat,
      partnerId: Number(values?.borrower),
    };

    console.log("submitingData:", submitingData);

    // createLoanAgree.mutate(submitingData, {
    //   onSuccess: (response: any) => {
    //     if (response.status == "OK") {
    //       toast.success(t("messages.created"));
    //       setAddModal(false);
    //       form.reset({
    //         contractNumber: "",
    //         price: undefined,
    //         contractDate: new Date().toISOString(),
    //         description: "",
    //         borrower: "",
    //         gracePeriod: "",
    //         startDate: new Date().toISOString(),
    //         endDate: new Date(new Date().getFullYear(), 11, 31).toISOString(),
    //         percent: undefined,
    //         purpose: "",
    //         penalty: undefined,
    //       });
    //       setWithVat(false);
    //       setBasePrice(undefined);
    //     } else {
    //       toast.error(response?.message);
    //     }
    //   },
    //   onError: (error: any) => {
    //     const errorMessage =
    //       error instanceof Error ? error.message : t("messages.smtErr");
    //     toast.error(errorMessage);
    //   },
    // });
  }

  return (
    <CommonModal
      visible={addModal}
      onClose={() => {
        setAddModal(false);
        form.reset({
          contractNumber: "",
          price: undefined,
          contractDate: new Date().toISOString(),
          description: "",
          borrower: "",
          gracePeriod: "",
          startDate: new Date().toISOString(),
          endDate: new Date(new Date().getFullYear(), 11, 31).toISOString(),
          percent: undefined,
          purpose: "",
          penalty: undefined,
        });
        setWithVat(false);
        setBasePrice(undefined);
      }}
      title="Shartnoma qo'shish"
    >
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center justify-between gap-5 flex-wrap"
          >
            <div className="w-[47%]">
              <FormField
                control={form.control}
                name="contractNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shartnoma raqami</FormLabel>
                    <FormControl>
                      <Input
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

            <div className="w-[47%] flex items-center gap-5">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qarz miqdori</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Qarz miqdori"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const newValue = e.target.value
                              ? Number(e.target.value)
                              : undefined;
                            field.onChange(newValue);
                            if (!withVat) setBasePrice(newValue);
                          }}
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
              <FormField
                control={form.control}
                name="borrower"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qarz oluvchi</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Qarz oluvchini tanlang" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {partnersList?.data?.map((item: any, index: number) => (
                          <SelectItem key={index} value={String(item.id)}>
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

            <div className="w-[47%]">
              <FormField
                control={form.control}
                name="contractDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("forms.contDate")}</FormLabel>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className="w-full">
                            {field.value
                              ? format(parseISO(field.value), "dd.MM.yyyy")
                              : "Sanani tanlang"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? parseISO(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(date?.toISOString());
                            setCalendarOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-[47%] flex items-center gap-5">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="gracePeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imtiyozli muddat</FormLabel>
                      <FormControl>
                        <Input
                          addonAfter={"oy"}
                          type="number"
                          placeholder="Imtiyozli muddatni kiriting"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-[47%]">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Boshlanish sanasi</FormLabel>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className="w-full">
                            {field.value
                              ? format(parseISO(field.value), "dd.MM.yyyy")
                              : "Sanani tanlang"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? parseISO(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(date?.toISOString());
                            setCalendarOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-[47%]">
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tugash sanasi</FormLabel>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className="w-full">
                            {field.value
                              ? format(parseISO(field.value), "dd.MM.yyyy")
                              : "Sanani tanlang"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? parseISO(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(date?.toISOString());
                            setCalendarOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-[47%] flex items-center gap-5">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="percent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Foiz miqdori</FormLabel>
                      <FormControl>
                        <Input
                          addonAfter={"%"}
                          type="number"
                          placeholder="Foiz miqdorini kiriting"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : undefined;
                            if (value !== undefined) {
                              if (value < 0) {
                                field.onChange(0);
                              } else if (value > 100) {
                                field.onChange(100);
                              } else {
                                field.onChange(value);
                              }
                            } else {
                              field.onChange(undefined);
                            }
                          }}
                          min={0}
                          max={100}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-[47%]">
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qarz maqsadi</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={31}
                        placeholder="Qarz maqsadini kiriting"
                        {...field}
                      />
                    </FormControl>
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
                          placeholder="Jarima foizini kiriting"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : undefined;
                            if (value !== undefined) {
                              if (value < 0) {
                                field.onChange(0);
                              } else if (value > 100) {
                                field.onChange(100);
                              } else {
                                field.onChange(value);
                              }
                            } else {
                              field.onChange(undefined);
                            }
                          }}
                          min={0}
                          max={100}
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

            <Button type="submit">Saqlash</Button>
          </form>
        </Form>
      </div>
    </CommonModal>
  );
};

export default AddModal;
