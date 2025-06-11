
'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetAllAltegGrainReceptions, useGetAllFarmerGrainReceptions } from '@/queries/grain-rec';
import { ChevronLeft, ChevronRight, HardDriveDownload, Printer, Sheet } from "lucide-react";
import Link from 'next/link';




const CorporationsTable = () => {
  const { data: altegData, isLoading: AltegDataLoading, isError } = useGetAllAltegGrainReceptions(0, 10)
  const { data: farmerData, isLoading: farmerDataLoading, isError: farmerDataError } = useGetAllFarmerGrainReceptions(0, 10)


  return (
    <main className="flex-1 py-10 px-2 bg-gray-50">
      <h1 className="text-xl font-bold text-center text-gray-500">"ҒАЛЛА ALTEG" АЖ БЎЙИЧА 2025 ҲОСИЛИДАН ҒАЛЛА ҚАБУЛ ҚИЛИШНИНГ БОРИШИ</h1>
      <Table className="w-full mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={3}>№</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={3}>Қабул масканлари</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={6}>БИР КУНДА</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={6}>МАВСУМ БОШИДАН,тн</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={3}>узилиш (сс.мм)</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2}>физик вазнда</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2}>конд. вазн</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2}>скидка</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2}>накидка</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={2}>шундан,тн</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>физик вазнда</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>конд. вазн</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>скидка</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>накидка</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={2}>шундан,тн</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>жарима</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>сақлаш</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>жарима</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>сақлаш</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {altegData?.data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.id}</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" ><Link href={'/grain-products/reception-center'}>"AGROFAYZ"AJ</Link></TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.bphysic}</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.bkond}</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.bdiscount}</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.bnakidka}</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.bpenalty}</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.bsaving}</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.mphysic}</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.mkond}</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.mdiscount}</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.mnakidka}</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.mpenalty}</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{item.msaving}</TableCell>
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

export default CorporationsTable