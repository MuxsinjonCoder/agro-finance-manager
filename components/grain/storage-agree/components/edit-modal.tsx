"use client";

import React, { useEffect } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllPartners } from "@/queries/partners";
import { toast } from "sonner";
import {
  useCreateStorageAgree,
  useUpdateStorageAgree,
} from "@/queries/grain/storage-agree";

interface PropsTypes {
  setEditModal: (value: boolean) => void;
  editModal: boolean;
  selectedItem?: {
    id: string;
    partnersDto: any;
    number: string;
    contractDate: string;
    endDate: string;
    penaltyPercent: number;
    description: string;
  };
}

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
  keeper: z
    .number({
      required_error: "Qabul qiluvchini tanlash majburiy",
    })
    .min(1, { message: "Qabul qiluvchini tanlash majburiy" }),
  endDate: z.string(),
  penalty: z
    .number({
      required_error: "Jarimani kiritish shart!",
      invalid_type_error: "Jarima raqam bo'lishi kerak!",
    })
    .min(0, {
      message: "Jarima 0 dan kam bo'lmasligi kerak!",
    }),
});

const EditModal = ({ editModal, setEditModal, selectedItem }: PropsTypes) => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractNumber: selectedItem?.number || "",
      contractDate: selectedItem?.contractDate || new Date().toISOString(),
      description: selectedItem?.description || "",
      keeper: selectedItem?.partnersDto?.id || undefined,
      endDate:
        selectedItem?.endDate ||
        new Date(new Date().getFullYear(), 11, 1).toISOString(),
      penalty: selectedItem?.penaltyPercent || undefined,
    },
  });

  const { data: partnersList } = useAllPartners(0, 100);
  const updateReqAssign = useUpdateStorageAgree();

  useEffect(() => {
    form.reset({
      contractNumber: selectedItem?.number || "",
      contractDate: selectedItem?.contractDate || new Date().toISOString(),
      description: selectedItem?.description || "",
      keeper: selectedItem?.partnersDto?.id || undefined,
      endDate:
        selectedItem?.endDate ||
        new Date(new Date().getFullYear(), 11, 1).toISOString(),
      penalty: selectedItem?.penaltyPercent || undefined,
    });
  }, [selectedItem, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const submitingData = {
      partnerId: values?.keeper,
      number: values?.contractNumber,
      contractDate: values?.contractDate,
      endDate: values?.endDate,
      penaltyPercent: values?.penalty,
      description: values?.description,
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

  return (
    <CommonModal
      visible={editModal}
      onClose={() => setEditModal(false)}
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

            <div className="min-w-[47%]">
              <FormField
                control={form.control}
                name="keeper"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qabul qiluvchi</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Qabul qiluvchini tanlash" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {partnersList?.data?.map((item: any, index: number) => (
                          <SelectItem key={index} value={String(item?.id)}>
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
                    <Popover>
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
                    <Popover>
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

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </CommonModal>
  );
};

export default EditModal;
