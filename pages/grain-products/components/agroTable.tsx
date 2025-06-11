import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
const AgroTable = () => {

  return (
    <main className="flex-1 py-10 px-2 bg-gray-50">
      <h1 className="text-xl font-bold text-center">"NURDAVLET AGRO FAYZ" FERMER XO‘JALIGI</h1>
      {/* <Card className="mt-4"> */}
      {/* <CardContent className="p-0"> */}
      <Table className="w-full border-collapse mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 border text-center" rowSpan={2}>№</TableHead>
            <TableHead className="px-4 py-2 border text-center" colSpan={2}>yuk xati</TableHead>
            <TableHead className="px-4 py-2 border text-center" rowSpan={2}>hosil turi</TableHead>
            <TableHead className="px-4 py-2 border text-center" rowSpan={2}>tovar / urug‘lik</TableHead>
            <TableHead className="px-4 py-2 border text-center" colSpan={3}>fizik vazni, kg</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="px-4 py-2 border text-center">sanasi</TableHead>
            <TableHead className="px-4 py-2 border text-center">raqami</TableHead>
            <TableHead className="px-4 py-2 border text-center">jami</TableHead>
            <TableHead className="px-4 py-2 border text-center">tara</TableHead>
            <TableHead className="px-4 py-2 border text-center">sof</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { id: 1, sanasi: "18.03.2025", raqami: "001", hosilTuri: "G‘alla", tovarUruglik: "Bug‘doy", jami: 1200, tara: 100, sof: 1100 },
            { id: 2, sanasi: "19.03.2025", raqami: "002", hosilTuri: "Makkajo‘xori", tovarUruglik: "Jo‘xori", jami: 1500, tara: 120, sof: 1380 },
            { id: 3, sanasi: "19.03.2025", raqami: "002", hosilTuri: "Makkajo‘xori", tovarUruglik: "Jo‘xori", jami: 1500, tara: 120, sof: 1380 },
            { id: 4, sanasi: "19.03.2025", raqami: "002", hosilTuri: "Makkajo‘xori", tovarUruglik: "Jo‘xori", jami: 1500, tara: 120, sof: 1380 },
            { id: 5, sanasi: "19.03.2025", raqami: "002", hosilTuri: "Makkajo‘xori", tovarUruglik: "Jo‘xori", jami: 1500, tara: 120, sof: 1380 },
            { id: 6, sanasi: "19.03.2025", raqami: "002", hosilTuri: "Makkajo‘xori", tovarUruglik: "Jo‘xori", jami: 1500, tara: 120, sof: 1380 },
            { id: 7, sanasi: "19.03.2025", raqami: "002", hosilTuri: "Makkajo‘xori", tovarUruglik: "Jo‘xori", jami: 1500, tara: 120, sof: 1380 },
            { id: 8, sanasi: "19.03.2025", raqami: "002", hosilTuri: "Makkajo‘xori", tovarUruglik: "Jo‘xori", jami: 1500, tara: 120, sof: 1380 },
            { id: 9, sanasi: "19.03.2025", raqami: "002", hosilTuri: "Makkajo‘xori", tovarUruglik: "Jo‘xori", jami: 1500, tara: 120, sof: 1380 },
            { id: 10, sanasi: "19.03.2025", raqami: "002", hosilTuri: "Makkajo‘xori", tovarUruglik: "Jo‘xori", jami: 1500, tara: 120, sof: 1380 },
            { id: 11, sanasi: "19.03.2025", raqami: "002", hosilTuri: "Makkajo‘xori", tovarUruglik: "Jo‘xori", jami: 1500, tara: 120, sof: 1380 },
          ].map((row) => (
            <TableRow key={row.id}>
              <td className="px-4 py-2 border text-center">{row.id}</td>
              <td className="px-4 py-2 border text-center">{row.sanasi}</td>
              <td className="px-4 py-2 border text-center">{row.raqami}</td>
              <td className="px-4 py-2 border text-center">{row.hosilTuri}</td>
              <td className="px-4 py-2 border text-center">{row.tovarUruglik}</td>
              <td className="px-4 py-2 border text-center">{row.jami}</td>
              <td className="px-4 py-2 border text-center">{row.tara}</td>
              <td className="px-4 py-2 border text-center">{row.sof}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* </CardContent> */}
      {/* </Card> */}
    </main>




  );
};

export default AgroTable;
