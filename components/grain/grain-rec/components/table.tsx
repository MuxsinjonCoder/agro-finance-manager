import { useGrainResiptsListAllRegion } from "@/queries/grain/grain-resipt";
import { GotGrainReceipt } from "@/types/grainReceipt";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const allRegionsData = {
  data: {
    dtoList: [
      {
        farmerName: "Andijon viloyati",
        dtoList: [
          {},
          {
            contractWeight: 5000,
            weight: 300,
            percent: 6,
            mweight: 1200,
            mpercent: 24,
          },
          {
            contractWeight: 8000,
            weight: 500,
            percent: 6.25,
            mweight: 2000,
            mpercent: 25,
          },
        ],
      },
      {
        farmerName: "Farg'ona viloyati",
        dtoList: [
          {},
          {
            contractWeight: 4500,
            weight: 250,
            percent: 5.56,
            mweight: 1000,
            mpercent: 22.22,
          },
          {
            contractWeight: 7000,
            weight: 400,
            percent: 5.71,
            mweight: 1800,
            mpercent: 25.71,
          },
        ],
      },
      {
        farmerName: "Namangan viloyati",
        dtoList: [
          {},
          {
            contractWeight: 6000,
            weight: 350,
            percent: 5.83,
            mweight: 1500,
            mpercent: 25,
          },
          {
            contractWeight: 9000,
            weight: 600,
            percent: 6.67,
            mweight: 2200,
            mpercent: 24.44,
          },
        ],
      },
    ],
  },
};

export default function GrainReceiptPage() {
  // hapers
  const { t } = useTranslation();

  // queries
  // const { data: allRegionsData } = useGrainResiptsListAllRegion();
  // console.log("allRegionsData in main page: ", allRegionsData?.data?.dtoList);

  //states

  return (
    <>
      <div className="min-w-full max-h-[87vh] overflow-auto relative border-gray-300 rounded-md">
        <table className="border-collapse min-w-full border-2 border-gray-400 rounded-md shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th
                rowSpan={3}
                className="w-[50px] border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
              >
                №
              </th>
              <th
                rowSpan={3}
                className="border-2 w-[150px] border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
              >
                Viloyatlar
              </th>
              <th
                colSpan={5}
                className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
              >
                Tovar bug'doy
              </th>
              <th
                colSpan={5}
                className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
              >
                Urug'lik bug'doy
              </th>
              <th
                colSpan={5}
                className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
              >
                Vaqtincha saqlash uchun
              </th>
              <th
                colSpan={5}
                className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
              >
                Jami
              </th>
            </tr>
            <tr>
              <th
                rowSpan={2}
                className="border-2 w-[70px] border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
              >
                Shartnomavi reja, tonna
              </th>
              <th
                colSpan={2}
                className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
              >
                Bir kunda
              </th>
              <th
                colSpan={2}
                className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
              >
                Mavsum boshidan
              </th>
              <th
                rowSpan={2}
                className="border-2 w-[70px] border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
              >
                Shartnomavi reja, tonna
              </th>
              <th
                colSpan={2}
                className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
              >
                Bir kunda
              </th>
              <th
                colSpan={2}
                className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
              >
                Mavsum boshidan
              </th>
              <th
                rowSpan={2}
                className="border-2 w-[70px] border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
              >
                Shartnomavi reja, tonna
              </th>
              <th
                colSpan={2}
                className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
              >
                Bir kunda
              </th>
              <th
                colSpan={2}
                className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
              >
                Mavsum boshidan
              </th>
              <th
                rowSpan={2}
                className="border-2 w-[70px] border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
              >
                Shartnomavi reja, tonna
              </th>
              <th
                colSpan={2}
                className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
              >
                Bir kunda
              </th>
              <th
                colSpan={2}
                className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600"
              >
                Mavsum boshidan
              </th>
            </tr>
            <tr>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                Tonna
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                %
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                Tonna
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                %
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                Tonna
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                %
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                Tonna
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                %
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                Tonna
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                %
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                Tonna
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                %
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                Tonna
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                %
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                Tonna
              </th>
              <th className="border-2 border-gray-400 p-2 text-center text-xs font-medium text-gray-600">
                %
              </th>
            </tr>
          </thead>
          <tbody>
            {allRegionsData?.data?.dtoList?.map((item: any, index: number) => (
              <>
                <tr className="hover:bg-gray-50">
                  <td className="border-2 border-gray-400 w-[50px] p-2 text-xs text-gray-700">
                    {index + 1}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs min-w-[200px] text-gray-700">
                    <Link
                      className="border-b-2 border-black hover:cursor-pointer"
                      href={`/grain/grain-receipt/${item?.farmerName}`}
                    >
                      {item?.farmerName}
                    </Link>
                  </td>
                  {/* tovar */}
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.contractWeight || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.weight || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.percent || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.mweight || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.mpercent || 0}
                  </td>

                  {/* urug'lik */}
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.mpercent || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.mpercent || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.mpercent || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.mpercent || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.mpercent || 0}
                  </td>

                  {/* vaqtincha saqlash */}
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.mpercent || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.mpercent || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.mpercent || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.mpercent || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[1]?.mpercent || 0}
                  </td>

                  {/* jami */}
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[2]?.mpercent || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[2]?.mpercent || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[2]?.mpercent || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[2]?.mpercent || 0}
                  </td>
                  <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                    {item?.dtoList[2]?.mpercent || 0}
                  </td>
                </tr>
              </>
            ))}
            <tr className="hover:bg-gray-50">
              <td className="border-2 border-gray-400 w-[50px] p-2 text-xs text-gray-700"></td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700">
                Jami
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
              <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center min-w-[100px]">
                0
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
