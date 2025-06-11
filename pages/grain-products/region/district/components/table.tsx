
'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetAllDistrictGrainReceptions, useGetAllFarmerGrainReceptions, useGetFarmerById } from '@/queries/grain-rec';

import { ChevronLeft, ChevronRight, HardDriveDownload, Printer, Sheet } from "lucide-react";
import Link from 'next/link';
import { useState } from 'react';

const DistrictTable = () => {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(20)

  const { data: allDistrictGrainReceptions } = useGetAllDistrictGrainReceptions(page, size);
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day}.${month}.${year}`;
  };

  return (
    <main className="flex-1 py-10 px-2 bg-gray-50">
      <h1 className="text-xl font-bold text-center text-gray-500">ЯНГИЙЎЛ ТУМАНИ БЎЙИЧА 2025 ҲОСИЛИДАН ҒАЛЛА ҚАБУЛ ҚИЛИШНИНГ БОРИШИ</h1>

      <Table className="w-full mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={3}>№</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={3}>Fermer xo'jaliklari</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={2}>шартнома</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={4}>БИР КУНДА</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={5}>МАВСУМ БОШИДАН</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={3}>ШУ СОАТГАЧА</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={3}>узилиш (сс.мм)</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2}>ga</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2}>tn</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2}>тн</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2}>фоиз</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={2}>шундан,тн</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>тн</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>фоиз</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>қолдиқ</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={2}>шундан,тн</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>кеча</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>фарқи</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>фарқи</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>жарима</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>сақлаш</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>жарима</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>сақлаш</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allDistrictGrainReceptions?.data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.id}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" ><Link href={'/grain-products/region/district/farm'}>
                  <FarmerNameCell farmerId={item.id} />

                </Link></TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.shDa}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.shTn}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.btn}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.bpercent}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.bpenalty}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.bsave}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.mtn}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.mpercent}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.mrest}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.mpenalty}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.msave}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.shDa}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.shDifferent1}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.shDifferent2}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.cutting}</TableCell>
              </TableRow>
            ))
          }

        </TableBody>
      </Table>
      <div className="flex mt-6 justify-between">
        <div className="flex flex-wrap gap-3 p-3 bg-white rounded-xl">
          {/* Date Picker */}
          <div className="flex items-center justify-between border border-gray-300 w-40 bg-gray-50 rounded-md">
            <button className="p-1.5 text-gray-600 hover:bg-gray-200 active:bg-gray-300 transition">
              <ChevronLeft size={14} />
            </button>
            <span className="text-gray-800 text-xs">18.03.2025</span>
            <button className="p-1.5 text-gray-600 hover:bg-gray-200 active:bg-gray-300 transition">
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Select Options */}
          {/* Select - Hammasi */}
          <select className="border border-gray-300 bg-white text-gray-700 text-xs px-3 py-1.5 rounded-md shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option>Hammasi</option>
            <option>aaa</option>
            <option>bbb</option>
            <option>ccc</option>
          </select>

          {/* Select - Fizik vaznda */}
          <select className="border border-gray-300 bg-white text-gray-700 text-xs px-3 py-1.5 rounded-md shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option>Fizik vaznda</option>
            <option>sof vaznda</option>
            <option>a vaznda</option>
          </select>

          {/* Select - Hosil turi */}
          <select className="border border-gray-300 bg-white text-gray-700 text-xs px-3 py-1.5 rounded-md shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option>Hosil turi</option>
            <option>1-tur</option>
            <option>2-tur</option>
          </select>
          {/* Select - Sinfi */}
          <select className="border border-gray-300 bg-white text-gray-700 text-xs px-3 py-1.5 rounded-md shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option>Sinfi</option>
            <option>2-sinf</option>
            <option>3-sinf</option>
          </select>


          {/* Download Button */}
          {/* <button className="flex items-center gap-1.5 bg-green-600 border border-green-600 text-white px-3 py-1.5 rounded-md shadow-md hover:bg-green-700 active:bg-green-800 transition">
      <HardDriveDownload size={14} />
      <span className="text-xs">Ф/х кесимида</span>
    </button> */}
        </div>

        <div className="flex flex-wrap gap-3 p-3 bg-white rounded-xl">
          {/* Excel Button */}
          <button className="flex items-center gap-1.5 bg-green-600 text-white px-4 py-1.5 rounded-md shadow-md hover:bg-green-700 active:bg-green-800 transition">
            <Sheet size={14} />
            <span className="text-xs">Excel</span>
          </button>

          {/* Print Button */}
          <button className="flex items-center gap-1.5 bg-green-600 text-white px-4 py-1.5 rounded-md shadow-md hover:bg-green-700 active:bg-green-800 transition">
            <Printer size={14} />
            <span className="text-xs">чоп этиш</span>
          </button>
        </div>
      </div>

    </main>
  )
}

export default DistrictTable



// Separate component to handle farmer data fetching
function FarmerNameCell({ farmerId }: { farmerId: number }) {
  const { data: farmer, isLoading, isError } = useGetFarmerById(Number(farmerId));

  if (isLoading) return <span>Loading farmer...</span>;
  if (isError) return <span>Error loading farmer</span>;

  return <span>{farmer?.data?.name || 'Unknown'}</span>;
}