'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDeleteGrainReception, useGetAllGrainReceptions, useGetSingleGrainReception,useUpdateGrainReception } from '@/queries/grain-reception';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CommonModal from "@/components/CommonModal";
import { toast } from 'sonner';
import { useGetAllCombines, useGetAllCountirs, useGetAllTranportsTypes, useGetProducts, useGetProductTypes } from '@/queries/scale';
import { GrainReceptionData } from '@/types/grainReception';




const GrainReceptionTable = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(8);
    const [addModal, setAddModal] = useState(false);
    const [addEditModal, setAddEditModal] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editFormData, setEditFormData] = useState<GrainReceptionData | null>(null);




    const { data: allProducts } = useGetProducts(page, size);
    const { data: allProductTypes } = useGetProductTypes(page, size);
    const { data: transportTypes } = useGetAllTranportsTypes(page, size);
    const { data: countirs } = useGetAllCountirs(page, size);
    const { data: combines } = useGetAllCombines(page, size);
    
  
    const { data: allGrainReceptions } = useGetAllGrainReceptions(page, size);
    const { data: singleGrainReceptions } = useGetSingleGrainReception(editingId||0);
    const { mutate: deleteReception } = useDeleteGrainReception(deletingId||0);
    const { mutate: updateReception } = useUpdateGrainReception();
  
    const totalPages = Math.ceil(Number(allGrainReceptions?.elements)/ size) || 1;
  
    const handlePrevious = () => {
      if (page > 0) {
        setPage(page - 1);
      }
    };
  
    const handleNext = () => {
      if (page < totalPages - 1) {
        setPage(page + 1);
      }
    };
  
    const handleEdit = (id: number) => {
        setEditingId(id);
      };
    
      useEffect(() => {
        if (singleGrainReceptions?.data) {
          setEditFormData(singleGrainReceptions.data);
          setAddEditModal(true);
        }
      }, [singleGrainReceptions]);
   


    const handleEditFormChange = (field: keyof GrainReceptionData, value: any) => {
        setEditFormData(prev => ({
          ...prev!,
          [field]: value
        }));
      };
  

      const handleConfirmEditing = async () => {
        if (!editingId || !editFormData) return;
        
        try {
            console.log(editFormData);
            
          updateReception(
            { body: editFormData, id: editingId },
            {
              onSuccess: () => {
                setAddEditModal(false);
                setEditingId(null);
                setEditFormData(null);
              },
              onError: (error) => {
                toast.error(error.message);
              }
            }
          );
        } catch (error) {
          toast.error('Yangilashda xatolik yuz berdi');
        }
      };



    const handleDelete = (id: number) => {
      setDeletingId(id);
      setAddModal(true);
    };
  
    const handleConfirmDelete = async () => {
        console.log(deletingId);
      if (!deletingId) return;
      try {
        deleteReception(deletingId, {
            onSuccess: () => {
              setAddModal(false);
              setDeletingId(null);
              toast('O`chirildi!')
            },
            onError: (error) => {
              toast("O'chirishda xatolik:");
              setAddModal(false);
              setDeletingId(null);
            }
          });
           
      } catch (error) {
        toast('O`chirishda xatolik')
      } finally {
        setDeletingId(null);
      }
    };
  

  

  return (
    <main className="flex-1 p-20">
      <h1 className="text-4xl font-bold text-center">Mahsulotlar qabuli</h1>
      <Card className="mt-6">
        <CardContent className="p-0">
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-2 border text-center" rowSpan={2}>№</TableHead>
                <TableHead className="px-4 py-2 border text-center" rowSpan={2}>Fermer Xojaligi</TableHead>
                <TableHead className="px-4 py-2 border text-center" colSpan={2}>Adress</TableHead>
                <TableHead className="px-4 py-2 border text-center" colSpan={2}>Mahsulot</TableHead>
                <TableHead className="px-4 py-2 border text-center" rowSpan={2}>Yuk xati raqami</TableHead>
                <TableHead className="px-4 py-2 border text-center" rowSpan={2}>Transport turi</TableHead>
                <TableHead className="px-4 py-2 border text-center" rowSpan={2}>Qabul qilish raqami</TableHead>
                <TableHead className="px-4 py-2 border text-center" rowSpan={2}>Kontir</TableHead>
                <TableHead className="px-4 py-2 border text-center" colSpan={3}>fizik vazni, kg</TableHead>
                <TableHead className="px-4 py-2 border text-center" colSpan={3} rowSpan={2}>Tahrirlash</TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="px-4 py-2 border text-center">Viloyat</TableHead>
                <TableHead className="px-4 py-2 border text-center">Tuman</TableHead>
                <TableHead className="px-4 py-2 border text-center">Mahsulot nomi</TableHead>
                <TableHead className="px-4 py-2 border text-center">Turi/navi</TableHead>
                <TableHead className="px-4 py-2 border text-center">jami</TableHead>
                <TableHead className="px-4 py-2 border text-center">tara</TableHead>
                <TableHead className="px-4 py-2 border text-center">sof</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {allGrainReceptions?.data.map((row,i) => (
                <TableRow key={row.id}>
                  <td className="px-4 py-2 border text-center">{row.id}</td>
                  <td className="px-4 py-2 border text-center">{row.name}</td>
                  <td className="px-4 py-2 border text-center">{row.regions || 'Viloyat kiritilmagan'}</td>
                  <td className="px-4 py-2 border text-center">{row.district}</td>
                  <td className="px-4 py-2 border text-center">Mahsulot</td>
                  <td className="px-4 py-2 border text-center">Turi/navi</td>
                  <td className="px-4 py-2 border text-center">{row.shipmentNumber}</td>
                  <td className="px-4 py-2 border text-center">{row.truckNumber}</td>
                  <td className="px-4 py-2 border text-center">{row.receptionNumber}</td>
                  <td className="px-4 py-2 border text-center">{row.contrId}</td>
                  <td className="px-4 py-2 border text-center">{row.totalWeight}</td>
                  <td className="px-4 py-2 border text-center">100</td>
                  <td className="px-4 py-2 border text-center">{row.totalWeight - 100}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                     className='bg-white text-blue-500 hover:bg-blue-500  hover:border-blue-500 active:bg-blue-900 active:bg-border-900 hover:text-white font-bold py-2 px-4 border border-blue-500 rounded'
                      onClick={()=>handleEdit(row.id)}
                     >
                      Yangilash
                    </button>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button 
                     className='bg-white hover:bg-red-500 hover:border-red-500 hover:text-white active:bg-red-900 active:border-red-900 text-red-500 font-bold py-2 px-4 border border-red-700 rounded'
                     onClick={()=>handleDelete(row.id)}
                     >
                      O'chirish
                    </button>
                  </td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/*  pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination currentPage={0} totalPages={0}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
               onClick={handlePrevious}
               disabled={page === 0}
               className={page === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} currentPage={0}              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setPage(index)}
                  isActive={index === page}
                  className={index === page ? "bg-blue-500 text-white" : ""}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
               onClick={handleNext}
               disabled={page === totalPages - 1}
               className={page === totalPages - 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} currentPage={0} totalPages={0}              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    {/* Delete modal */}
      <CommonModal
        visible={addModal}
        title={'Haqiqatdan ham bu ma\'lumotni o\'chirmoqchimisiz?'}
        onClose={() => {
          setAddModal(false);
          setDeletingId(null);
        }}
      >
        <div className='flex justify-center p-4 gap-4'>
          <button
            className='bg-green-500 hover:bg-green-700 hover:border-green-500 hover:text-white active:bg-green-900 active:border-green-900 text-white font-bold py-2 px-4 border border-green-500 rounded'
            onClick={handleConfirmDelete}
          >
            Ha
          </button>
          <button
            className='bg-red-500 hover:bg-red-700 hover:border-red-500 hover:text-white active:bg-red-900 active:border-red-900 text-white font-bold py-2 px-4 border border-red-500 rounded'
            onClick={() => {
              setAddModal(false);
              setDeletingId(null);
            }}
          >
            Yo'q
          </button>
        </div>
      </CommonModal>
      {/* Edit Modal */}
      <CommonModal
        visible={addEditModal}
        title={'Tahrirlash'}
        onClose={() => {
          setAddEditModal(false);
          setEditingId(null);
        }}
      >
        <div className='flex justify-center p-4 gap-4'>
          {editFormData && (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleConfirmEditing();
            }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Left column */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <h3 className="font-medium mb-1">Mahsulot</h3>
                      <select
                        className='w-full p-2 border rounded text-gray-800'
                        value={editFormData.productId}
                        onChange={(e) => handleEditFormChange('productId', parseInt(e.target.value))}
                        required
                      >
                        {allProducts?.data?.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Turi <span className="text-red-500">*</span></h3>
                      <select
                        className='w-full p-2 border rounded text-gray-800'
                        value={editFormData.typeId}
                        onChange={(e) => handleEditFormChange('typeId', parseInt(e.target.value))}
                        required
                      >
                        {allProductTypes?.data?.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Yuk xati raqami</h3>
                    <input
                      className='w-full p-2 border rounded text-gray-800'
                      value={editFormData.shipmentNumber}
                      onChange={(e) => handleEditFormChange('shipmentNumber', e.target.value)}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Transport turi</h3>
                    <select
                      className="w-full p-2 border rounded text-gray-800"
                      value={editFormData.vehicleId}
                      onChange={(e) => handleEditFormChange('vehicleId', parseInt(e.target.value))}
                    >
                      {transportTypes?.data?.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Middle column */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium mb-1">Transport raqami <span className="text-red-500">*</span></h3>
                    <input
                      className='w-full p-2 border rounded text-gray-800'
                      value={editFormData.truckNumber}
                      onChange={(e) => handleEditFormChange('truckNumber', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Qabul qilish raqami <span className="text-red-500">*</span></h3>
                    <input
                      className='w-full p-1 border rounded text-gray-800'
                      value={editFormData.receptionNumber}
                      onChange={(e) => handleEditFormChange('receptionNumber', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Daftardagi No <span className="text-red-500">*</span></h3>
                    <input
                      className='w-full p-2 border rounded text-gray-800'
                      value={editFormData.combinePaperNumber}
                      onChange={(e) => handleEditFormChange('combinePaperNumber', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium mb-1">Qabul qiluvchi</h3>
                    <input
                      className="w-full p-2 border rounded text-gray-800"
                      value={editFormData.userId?.toString() || ''}
                      onChange={(e) => handleEditFormChange('userId', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Kombayn raqami</h3>
                    <select
                      className="w-full p-2 border rounded text-gray-800"
                      value={editFormData.combineId}
                      onChange={(e) => handleEditFormChange('combineId', parseInt(e.target.value))}
                    >
                      {combines?.data?.map((combine) => (
                        <option key={combine.id} value={combine.id}>
                          {combine.number}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Kontur</h3>
                    <select
                      className="w-full p-2 border rounded text-gray-800"
                      value={editFormData.contrId}
                      onChange={(e) => handleEditFormChange('contrId', parseInt(e.target.value))}
                    >
                      {countirs?.data?.map((countir) => (
                        <option key={countir.id} value={countir.id}>
                          {countir.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <h3 className="font-medium mb-1">Jami vazn <span className="text-red-500">*</span></h3>
              <div className="mb-6 bg-white text-gray-800 text-6xl font-bold text-center p-6 rounded">
                <input
                  className="w-full text-center"
                  type="number"
                  value={editFormData.totalWeight}
                  onChange={(e) => handleEditFormChange('totalWeight', parseFloat(e.target.value))}
                  required
                />
              </div>
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition disabled:bg-green-300"
                >
                  Saqlash
                </button>
                <button
                  type="button"
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                  onClick={() => setAddEditModal(false)}
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          )}
        </div>
      </CommonModal>
    </main>
  );
};

export default GrainReceptionTable;

