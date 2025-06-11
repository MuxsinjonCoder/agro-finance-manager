'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, ChevronRight, Printer, Sheet } from "lucide-react";
import Link from 'next/link';

import { useGetAllFarmerGrainReceptions } from '@/queries/grain-rec';
import { useState } from 'react';


const FarmerTable = () => {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(20)

  const { data: allFarmerGrainReceptions } = useGetAllFarmerGrainReceptions(page, size);
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day}.${month}.${year}`;
  };

  return (
    <main className="flex-1 py-10 px-2 bg-gray-50">
      <h1 className="text-xl font-bold text-center text-gray-500">"OMON" ФЕРМЕР ХЎЖАЛИГИ БЎЙИЧА 2025 ҲОСИЛИДАН ҒАЛЛА ҚАБУЛ ҚИЛИШНИНГ БОРИШИ</h1>

      <Table className="w-full mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2}>№</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={2}>юк хати</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>ҳосил тури</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>товар/урўғлик</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={3}>физик вазни, кг</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={2}>вақтинча сақлаш, кг</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>Транспорт рақами</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>ПК-10(A) рақами</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={3}>ғаллани қабул қилиш</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1}>санаси</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1}>рақами</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1}>жами</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1}>тара</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1}>соф</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1}>физик</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1}>конд.</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1}> қайд №</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1}>қабул вақти</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1}>қабул маскани</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allFarmerGrainReceptions?.data.map((item, index) => (
              <TableRow>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.id}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{formatDate(item.createdAt)}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.number}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.grainType}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.tovar}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.allWeight}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.tara}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.realWeight}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.physic}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.cond}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.vehicleNumber}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.pknumber}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.qaydNumber}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{formatDate(item.receptionTime)}</TableCell>
                <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" ><Link href={'/grain-products/reception-center'}>{item.receptionName}</Link></TableCell>
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

export default FarmerTable