"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreatePayment } from "@/queries/grain/payments";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useAllPartners } from "@/queries/partners";

interface PropsTypes {
  setAddModal: (value: boolean) => void;
  addModal: boolean;
}

// regioins
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

//needed fields --> lander (always agroFond), borrower (partners), amount

// zod form schema
const formSchema = z.object({
  lander: z.string(),
  borrower: z.string().min(1, { message: "Qarz oluvchini tanlash majburiy" }),
  amount: z
    .number()
    .min(1, { message: "Kredit miqdori kiritish shart!" })
    .max(100, {
      message: "Kredit miqdori eng ko'pi bilan 100 xonali bo'lishi kerak",
    }),
});

const AddModal = ({ addModal, setAddModal }: PropsTypes) => {
  // halpers
  const { t } = useTranslation();

  //states
  const [formType, setFormType] = useState("give");

  // queries
  const createPayment = useCreatePayment();
  const { data: partnersList } = useAllPartners(0, 100);

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
      lander: "",
      borrower: "",
    },
  });

  //   functions
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values:", values);

    // createPayment.mutate(values, {
    //   onSuccess: (response: any) => {
    //     if (response.status === "OK") {
    //       form.reset();
    //       setAddModal(false);
    //       toast.success(t("messages.created"));
    //       setAddModal(false);
    //     } else {
    //       toast.error(t("messages.smtErr"));
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
        form.reset();
      }}
      title="Yangi to'lov qo'shish"
    >
      <div className="w-[200px] absolute top-5 right-10">
        <Select
          onValueChange={(value) => {
            setFormType(value);
          }}
          value={formType}
        >
          <SelectTrigger>
            <SelectValue placeholder="To'lov turini tanlang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="give">Kredit berish</SelectItem>
            <SelectItem value="pay">Kreditni to'lash</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        {formType == "give" ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center justify-between gap-5 flex-wrap"
            >
              <div className="w-[47%]">
                <FormField
                  control={form.control}
                  name="lander"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qarz beruvchi</FormLabel>
                      <Select disabled value={"AGRO_FOND"}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Hududni tanlang" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"AGRO_FOND"}>Agro Fond</SelectItem>
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
                  name="borrower"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qarz oluvchi</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Qarz oluvchini tanlang" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {partnersList?.data?.map(
                            (item: any, index: number) => (
                              <SelectItem key={index} value={item?.id}>
                                {item?.name}
                              </SelectItem>
                            )
                          )}
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
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kredit miqdori</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Kredit miqdorni kiriting"
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
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center justify-between gap-5 flex-wrap"
            >
              <div className="w-[47%]">
                <FormField
                  control={form.control}
                  name="borrower"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qarz to'lovchi</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Qarz to'lovchini tanlang" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {partnersList?.data?.map(
                            (item: any, index: number) => (
                              <SelectItem key={index} value={item?.id}>
                                {item?.name}
                              </SelectItem>
                            )
                          )}
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
                  name="lander"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qarz bergan</FormLabel>
                      <Select disabled value={"AGRO_FOND"}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Qarz berganni tanlang" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"AGRO_FOND"}>Agro Fond</SelectItem>
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
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Miqdori</FormLabel>
                      <FormControl>
                        <Input placeholder="Miqdorni kiriting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">Saqlash</Button>
            </form>
          </Form>
        )}
      </div>
    </CommonModal>
  );
};

export default AddModal;
