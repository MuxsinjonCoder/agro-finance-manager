'use client'

import { useCreateLabGrainReception } from "@/queries/grain-rec";
import { GrainAcceptanceLaboratory } from "@/types/grain-rec";
import { useState } from "react";
import { toast } from "sonner";

const LabratoryPage = () => {
    // Состояние для хранения данных формы
  const [formData, setFormData] = useState<GrainAcceptanceLaboratory>({
    acceptanceDate: '',
    documentNumber: '',
    completeness: '',
    cropTypeId: 1,
    impurity: 0,
    grainMixture: '',
    productType: 'GRAIN',
    moisture: 0,
    gluten: '',
    physicalWeight: 0,
    cropClassId: 1,
    vitreousness: 0,
    isApproved: false,
    farmerId: 2 // Added farmerId with a default value
  });

  const createGrainReceptionLab = useCreateLabGrainReception();

  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Обработчик отправки формы
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log('Отправленные данные:', formData);
    try {
      createGrainReceptionLab.mutate(formData, {
       onSuccess: (response) => {
         if (response.status === "OK") {
           
           toast.success("Qabul qilindI!");
           handleReset()
       
         } else {
           toast.error("Xatolik");
         }
       },
       onError: (error) => {
         const errorMessage =
           error instanceof Error ? error.message : "Xatolik";
         toast.error(errorMessage);
       },
     });
    
     } catch (err) {
       console.error('Error submitting form:', err);
      //  setSubmitError(err instanceof Error ? err.message : 'An unknown error occurred');
     } finally {
      //  setIsSubmitting(false);
     }
  };

  // Обработчик очистки формы
  const handleReset = () => {
    setFormData({
      acceptanceDate: '',
      documentNumber: '',
      completeness: '',
      cropTypeId: 0,
      impurity: 0,
      grainMixture: '',
      productType: 'GRAIN',
      moisture: 0,
      gluten: '',
      physicalWeight: 0,
      cropClassId: 0,
      vitreousness: 0,
      isApproved: false,
      farmerId: 0 // Added farmerId with a default value
    });
  };

  return (
    <div className="flex-1 p-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Лаборатория натижалари</h1>
          <h2 className="text-xl font-semibold text-gray-600">"NURDAVLET AGRO FAYZ" FERMER XO'JALIGI</h2>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* First column */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Қабул санаси</label>
              <input 
                type="datetime-local"  // Изменено с date на datetime-local
                name="acceptanceDate"
                value={formData.acceptanceDate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                
               />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Юк хати рақами</label>
              <input 
                type="text" 
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Тўлалиги</label>
              <input 
                 type="text" 
                 name="completeness"
                 value={formData.completeness}
                 onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

           {/* Toggle Switch */}
           <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                type="checkbox" 
                name="isApproved"
                checked={formData.isApproved}
                onChange={handleChange}
               className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-700">Тасдиқланган</span>
              </label>
            </div>
          </div>

          {/* Second column */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Хосил тури</label>
              <select 
              name="cropType"
              value={formData.cropTypeId}
              onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value={1}>Bug'doy</option>
                <option value={2}>Arpa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ифлослиги,%</label>
              <input 
                type="number" 
                name="impurity"
                value={formData.impurity}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Дон аралашмаси</label>
              <input 
              type="text" 
              name="grainMixture"
              value={formData.grainMixture}
              onChange={handleChange} 
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Third column */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Товар/уруғлик</label>
              <select 
              name="productType"
              value={formData.productType}
              onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="PRODUCT">Товар</option>
                <option value="GRAIN">Уруғлик</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Намлиги,%</label>
              <input 
                type="number" 
                name="moisture"
                value={formData.moisture}
                onChange={handleChange} 
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Клейковин</label>
              <input 
               type="text" 
               name="gluten"
               value={formData.gluten}
               onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Fourth column */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Физик вазни,кг</label>
              <input 
                 type="number" 
                 name="physicalWeight"
                 value={formData.physicalWeight}
                 onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Синфи</label>
              <select 
              value={formData.cropClassId}
              onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value={1}>1-синф</option>
                <option value={2}>2-синф</option>
                <option value={3}>3-синф</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Стекловидность,%</label>
              <input 
                type="number" 
                name="vitreousness"
                value={formData.vitreousness}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-5">
         {/* Кнопка с активными стилями */}
          <button 
           type="submit"
           className="
            px-5 py-2.5 
            bg-blue-600 
            text-white 
            text-sm 
            font-medium 
            rounded-md 
            hover:bg-blue-700 
            transition-colors
            focus:outline-none
            active:bg-blue-800
            active:scale-95
            active:shadow-inner
          ">
            Сақлаш
          </button>
          <button
           onClick={handleReset}
           className="
            px-5 py-2.5 
            bg-red-600 
            text-white 
            text-sm 
            font-medium 
            rounded-md 
            hover:bg-red-700 
            transition-colors
            focus:outline-none
            active:bg-red-800
            active:scale-95
            active:shadow-inner
          ">
              Ўчириш
          </button>
    
        </div>
        </form>
      </div>
    </div>
  )
}

export default LabratoryPage