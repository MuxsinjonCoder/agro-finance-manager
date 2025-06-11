"use client";

import { useState } from "react";
import {
  useGetProducts,
  useGetProductTypes,
  useGetAllTranportsTypes,
  useGetAllCountirs,
  useGetAllCombines,
  useGetPartnerByFilter
} from "@/queries/scale";

import { PartnerDataItem } from "@/types/scale";
import { GrainReceptionData, GrainReceptionReqBodyType } from "@/types/grainReception";
import { useCreateGrainReception } from "@/queries/grain-reception";
import { toast } from "sonner";


const ScaleForm = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [formData, setFormData] = useState<GrainReceptionData>({
productId: 2,
  vehicleId: 2,
  contrId: 2,
  typeId: 6,
  userId: 67,
  combineId: 1,
  partnerId: 90,
  id: 2,
  district: "",
  name: "",
  regions: null,
  truckNumber: "",
  shipmentNumber: "",
  receptionNumber: "",
  combinePaperNumber: "",
  totalWeight: 12324,
  createdAt: String(Date.now()) ,
  updatedAt: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [partnerFilters, setPartnerFilters] = useState<{ name?: string; inn?: string; type?: string }>({
    type: "FARM",
  });

  // API data hooks
  const { data: allProducts } = useGetProducts(page, size);
  const { data: allProductTypes } = useGetProductTypes(page, size);
  const { data: transportTypes } = useGetAllTranportsTypes(page, size);
  const { data: countirs } = useGetAllCountirs(page, size);
  const { data: combines } = useGetAllCombines(page, size);
  const { data: farmersData, isLoading: isFarmersLoading } = useGetPartnerByFilter(
    partnerFilters,
    !!partnerFilters.name
  );


//Api create hook
const createGrainReception = useCreateGrainReception();




  const handleChange = (field: keyof typeof partnerFilters, value: string) => {
    setPartnerFilters((prev) => ({
      ...prev,
      [field]: value.trim(),
    }));
   
    
  };

  const handleFormChange = (field: keyof GrainReceptionData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFarmerSelect = (farmer: PartnerDataItem) => {
    const district = farmer.districtDto?.[0];
    setFormData(prev => ({
      ...prev,
      partnerId:farmer.id,
      userId: 67,
      district: district?.name || "",
      regions: district?.region || "",
      name: farmer.name || ""
    }));
  };
  
  const handleReset = () => {
    setFormData({
      productId: 0,
      vehicleId: 0,
      contrId: 0,
      typeId: 0,
      userId: 0,
      combineId: 0,
      partnerId: 0,
      id: 0,
      district: '',
      name: '',
      regions: '',
      truckNumber: '',
      shipmentNumber: '',
      receptionNumber: '',
      combinePaperNumber: '',
      totalWeight: 0,
      createdAt: '',// ISO format datetime
      updatedAt: ''
    });
 
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      
     createGrainReception.mutate(formData, {
      
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
      setSubmitError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="p-4 bg-[#29ABE2] text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">ҒАЛЛАНИ ҚАБУЛ ҚИЛИШ</h1>
        
        {/* Search section */}
        <div className="mb-4 flex items-center gap-4">
          <h2 className="text-lg whitespace-nowrap">F/X qidirish</h2>
          <input
            className="w-full p-2 border rounded text-gray-800"
            placeholder="Қидирув..."
            value={partnerFilters.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <button
            className="bg-blue-900 text-white px-8 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isFarmersLoading}
          >
            {isFarmersLoading ? "Qidirilmoqda..." : 'Qidirish'}
          </button>
        </div>

        {/* Info table */}
        <div className="mb-6 bg-white rounded overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600">
                <th className="p-2 border bg-[#29ABE2]">FIX номланиши</th>
                <th className="p-2 border bg-[#29ABE2]">Шартнома</th>
                <th className="p-2 border bg-[#29ABE2]">Худуд</th>
                <th className="p-2 border bg-[#29ABE2]">Туман</th>
              </tr>
            </thead>
            <tbody>
              {farmersData?.data && farmersData.data.map((farmer) => {
                const district = farmer.districtDto?.[0];
                return (
                  <tr 
                    key={farmer.id} 
                    // className={`hover:bg-gray-50 cursor-pointer ${selectedFarmer?.id === farmer.id ? 'bg-blue-100' : ''}`}
                    onClick={() => handleFarmerSelect(farmer)}
                  >
                    <td className="py-2 px-4 border-b text-gray-800 text-center">{farmer.name}</td>
                    <td className="py-2 px-4 border-b text-gray-800 text-center">{farmer.inn}</td>
                    <td className="py-2 px-4 border-b text-gray-800 text-center">{district?.region || "Viloyat yo'q"}</td>
                    <td className="py-2 px-4 border-b text-gray-800 text-center">{district?.name || "Tuman yo'q"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Form sections */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Left column */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <h3 className="font-medium mb-1">Маҳсулот <span className="text-red-500">*</span></h3>
                  <select
                    className='w-full p-2 border rounded text-gray-800'
                    value={formData.productId}
                    onChange={(e) => handleFormChange('productId', Number(e.target.value))}
                    required
                  >
                    <option value="">Танланг</option>
                    {allProducts?.data && allProducts.data.map((product) => (
                      <option key={product.id} value={product.id} className="text-blue-900">
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Тури <span className="text-red-500">*</span></h3>
                  <select
                    className={`w-full p-2 border rounded text-gray-800`}
                    value={formData.typeId}
                    onChange={(e) => handleFormChange('typeId', Number(e.target.value))}
                    required
                  >
                    <option value="">Танланг</option>
                    {allProductTypes?.data && allProductTypes.data.map((type) => (
                      <option key={type.id} value={type.id} className="text-blue-900">
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Юк хати рақами</h3>
                <input
                  className={`w-full p-2 border rounded text-gray-800`}
                  value={formData.shipmentNumber}
                  onChange={(e) => handleFormChange('shipmentNumber', e.target.value)}
                />
              </div>
              <div>
                <h3 className="font-medium mb-1">Транспорт тури</h3>
                <select
                  className="w-full p-2 border rounded text-gray-800"
                  value={formData.vehicleId}
                  onChange={(e) => handleFormChange('vehicleId', Number(e.target.value))}
                >
                  <option value="">Танланг</option>
                  {transportTypes?.data && transportTypes.data.map((type) => (
                    <option key={type.id} value={type.id} className="text-blue-900">
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Middle column */}
            <div className="space-y-3">
              <div>
                <h3 className="font-medium mb-1">Транспорт рақами <span className="text-red-500">*</span></h3>
                <input
                  className={`w-full p-2 border rounded text-gray-800`}
                  placeholder="Мисол: 01A123AA"
                  value={formData.truckNumber}
                  onChange={(e) => handleFormChange('truckNumber', e.target.value)}
                  required
                />
              </div>
              <div>
                <h3 className="font-medium mb-1">Қабул қилиш рақами <span className="text-red-500">*</span></h3>
                <input
                  className={`w-full p-1 border rounded text-gray-800`}
                  value={formData.receptionNumber}
                  onChange={(e) => handleFormChange('receptionNumber', e.target.value)}
                  required
                />
              </div>
              <div>
                <h3 className="font-medium mb-1">Кобайн дафтаридаги No <span className="text-red-500">*</span></h3>
                <input
                  className={`w-full p-2 border rounded text-gray-800`}
                  value={formData.combinePaperNumber}
                  onChange={(e) => handleFormChange('combinePaperNumber', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-3">
              <div>
                <h3 className="font-medium mb-1">Қабул қилиш</h3>
                <input
                  className="w-full p-2 border rounded text-gray-800"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                />
              </div>
              <div>
                <h3 className="font-medium mb-1">Кобайн рақами</h3>
                <select
                  className="w-full p-2 border rounded text-gray-800"
                  value={formData.combineId}
                  onChange={(e) => handleFormChange('combineId', Number(e.target.value))}
                >
                  <option value="">Танланг</option>
                  {combines?.data && combines.data.map((combine) => (
                    <option key={combine.id} value={combine.id} className="text-blue-900">
                      {combine.number}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h3 className="font-medium mb-1">Контур</h3>
                <select
                  className="w-full p-2 border rounded text-gray-800"
                  value={formData.contrId}
                  onChange={(e) => handleFormChange('contrId', Number(e.target.value))}
                >
                  <option value="">Танланг</option>
                  {countirs?.data && countirs.data.map((countir) => (
                    <option key={countir.id} value={countir.id} className="text-blue-900">
                      {countir.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Weight display */}
          <h3 className="font-medium mb-1">Jami vazn <span className="text-red-500">*</span></h3>
          <div className="mb-6 bg-white text-gray-800 text-6xl font-bold text-center p-6 rounded">
            <input
              className="w-full text-center"
              type="number"
              value={formData.totalWeight}
              onChange={(e) => handleFormChange('totalWeight', e.target.value)}
              required
            />
          </div>

          {/* Error message */}
          {submitError && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {submitError}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition disabled:bg-green-300"
        
            >
              {(isSubmitting ) ? 'Сақланиётган...' : 'Сақлаш'}
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
              onClick={handleReset}
            >
              Бекор қилиш
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
            >
              Давом этиш
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScaleForm;