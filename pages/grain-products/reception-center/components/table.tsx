'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronLeft, ChevronRight, HardDriveDownload, Printer, Sheet } from "lucide-react";
import Link from 'next/link';
const ReceptionCenterTable = () => {
  return (
    <main className="flex-1 py-10 px-2 bg-gray-50">
      <h1 className="text-xl font-bold text-center text-gray-500">"O'zbekiston DQQSH" БЎЙИЧА 2025 ҲОСИЛИДАН ҒАЛЛА ҚАБУЛ ҚИЛИШНИНГ БОРИШИ</h1>
      <h2 className="text-md font-bold text-center text-gray-500">тарозибон: Даврон, тел: 99830-380-22</h2>

      <Table className="w-full mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={2}>қайт этилган</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>топширувчи хўжалик</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>туман</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>юк хати</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>ҳосил тури</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={2} colSpan={1}>товар/уруғлик</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={3}>физик вазни, кг</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={5}>лаборатория хулосаси</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1} >№</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>вақти</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>брутто</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>тара</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>метто</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>ифлослик</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>намлик</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>синф</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>катура</TableHead>
            <TableHead className="px-4 py-2 border-2 text-center text-gray-700 font-semibold text-md bg-gray-100/50" rowSpan={1} colSpan={1}>аралаш</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3].map((item, index) => (
            <TableRow key={index}>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >{index + 1}</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" ><Link href={'/grain-products/region/district'}>19.08.2024  12:19:30</Link></TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >0</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >0</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >0</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >0</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >0</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >0</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >0</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >0</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >0</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >0</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >0</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >0</TableCell>
              <TableCell className="px-4 py-2 border-2 text-center text-gray-500 font-semibold text-md bg-gray-100" >0</TableCell>
            </TableRow>
          ))
          }



        </TableBody>
      </Table>
      <div className="flex flex-col mt-6">
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

        <button className="flex mt-6
      w-[200px] items-center gap-1.5 bg-blue-600 text-white px-4 py-1.5 rounded-md shadow-md hover:bg-blue-700 active:bg-blue-800 transition">
          <Printer size={14} />
          <span className="text-xs">Dalolatnomani ko'rish</span>
        </button>
      </div>


    </main>




  )
}

export default ReceptionCenterTable