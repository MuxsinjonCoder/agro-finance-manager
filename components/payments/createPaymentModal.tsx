"use client"; 

import { useState } from "react";
import { useCreatePay } from "@/queries/pay";
import { toast } from "sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}



const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const createPayMutation = useCreatePay();

  const [formData, setFormData] = useState({
    contractId: "",
    paymentScheduleId: "",
    paymentDate: new Date().toISOString().slice(0, 16), // Format: YYYY-MM-DDTHH:mm
    amountPaid: "",
    interestAmount: "",
    penaltyAmount: "",
    transactionType: "PAYMENT",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.contractId || !formData.paymentScheduleId || !formData.amountPaid) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    createPayMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("To‘lov muvaffaqiyatli yaratildi!");
        setFormData({
          contractId: "",
          paymentScheduleId: "",
          paymentDate: new Date().toISOString().slice(0, 16),
          amountPaid: "",
          interestAmount: "",
          penaltyAmount: "",
          transactionType: "PAYMENT",
        });
        onClose(); // Modalni yopish
      },
      onError: () => {
        toast.error("To‘lovni yaratishda xatolik yuz berdi!");
      },
    });
  };

  if (!isOpen) return null; // Agar modal yopiq bo'lsa, hech narsa qaytarmaydi

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">To‘lov qo‘shish</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="number" name="contractId" value={formData.contractId} onChange={handleChange} placeholder="Contract ID" className="border p-2 w-full" />
          <input type="number" name="paymentScheduleId" value={formData.paymentScheduleId} onChange={handleChange} placeholder="Payment Schedule ID" className="border p-2 w-full" />
          <input type="datetime-local" name="paymentDate" value={formData.paymentDate} onChange={handleChange} className="border p-2 w-full" />
          <input type="number" name="amountPaid" value={formData.amountPaid} onChange={handleChange} placeholder="Amount Paid" className="border p-2 w-full" />
          <input type="number" name="interestAmount" value={formData.interestAmount} onChange={handleChange} placeholder="Interest Amount" className="border p-2 w-full" />
          <input type="number" name="penaltyAmount" value={formData.penaltyAmount} onChange={handleChange} placeholder="Penalty Amount" className="border p-2 w-full" />

          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-md">Bekor qilish</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={createPayMutation.isLoading}>
              {createPayMutation.isLoading ? "Yuborilmoqda..." : "Jo‘natish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
