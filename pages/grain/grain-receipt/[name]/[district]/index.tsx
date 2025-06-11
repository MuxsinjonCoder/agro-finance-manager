"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { DistrictTableDatas } from "../../../../../constants/districtTableDatas";
import { useUser } from "@/pages/_app";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  useGrainResiptsListByDistrict,
  useGrainResiptsListByDistrictName,
} from "@/queries/grain/grain-resipt";

const grainResiptsByDistrict = {
  data: {
    dtoList: [
      {
        farmerName: "Xo'jalik A",
        dtoList: [
          {},
          {
            contractWeight: 800,
            weight: 50,
            percent: 6.25,
            mweight: 200,
            mpercent: 25,
          },
          {
            contractWeight: 1200,
            weight: 80,
            percent: 6.67,
            mweight: 300,
            mpercent: 25,
          },
        ],
      },
      {
        farmerName: "Xo'jalik B",
        dtoList: [
          {},
          {
            contractWeight: 600,
            weight: 40,
            percent: 6.67,
            mweight: 150,
            mpercent: 25,
          },
          {
            contractWeight: 900,
            weight: 60,
            percent: 6.67,
            mweight: 200,
            mpercent: 22.22,
          },
        ],
      },
      {
        farmerName: "Xo'jalik C",
        dtoList: [
          {},
          {
            contractWeight: 700,
            weight: 45,
            percent: 6.43,
            mweight: 180,
            mpercent: 25.71,
          },
          {
            contractWeight: 1000,
            weight: 70,
            percent: 7,
            mweight: 250,
            mpercent: 25,
          },
        ],
      },
    ],
  },
};

export default function DistrictDataTable() {
  // helpers
  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "grain-grainreceipt"
  );
  const params = useParams();
  const name = params?.name || "";
  const district = params?.district || "";

  // queries
  // const { data: grainResiptsByDistrict } =
  //   useGrainResiptsListByDistrictName(district);

  // console.log("grainResiptsByDistrict", grainResiptsByDistrict);

  useEffect(() => {
    if (
      !access?.length &&
      access?.length != undefined &&
      access?.length != "undefined"
    ) {
      toast.error("Sizga bu sahifa uchun ruxsat yo'q!!!");
      router.push("/sitemap");
    }
  }, [access]);

  return (
    <>
      <div className="min-w-full overflow-auto relative border-gray-300 rounded-md">
        <h1 className="text-center text-lg font-medium opacity-70 mb-2">
          {district} bo'yicha qabul qilingan don mahsulotlari to'g'risida
          ma'lumotlar
        </h1>
        <div className="max-h-[90%] overflow-auto">
          <table className="border-collapse relative min-w-full border-2 border-gray-400 rounded-md shadow-sm">
            <thead className="bg-gray-50 top-0 left-0 right-0">
              <tr>
                <th
                  rowSpan={3}
                  className="w-[20px] border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                >
                  №
                </th>
                <th
                  rowSpan={3}
                  className="border-2 w-[250px] border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                >
                  Xo'jaliklar
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
              {grainResiptsByDistrict?.data?.dtoList?.map(
                (item: any, index: number) => (
                  <>
                    <tr className="hover:bg-gray-50">
                      <td className="border-2 border-gray-400 w-[50px] p-2 text-xs text-gray-700">
                        {index + 1}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs min-w-[200px] text-gray-700">
                        <Link
                          className="border-b-2 border-black hover:cursor-pointer"
                          href={`/grain/grain-receipt/${name}/${district}/${item?.farmerName}`}
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
                )
              )}
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
            {/* <tbody>
              {DistrictTableDatas?.find(
                (item) => item?.district == district
              ) ? (
                <>
                  {DistrictTableDatas?.find(
                    (item) => item?.district == district
                  )?.ajs?.map((aj: any, index: number) => (
                    <>
                      <tr className="hover:bg-gray-50">
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700">
                          {index + 1}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 min-w-[200px]">
                          <Link
                            className="border-b-2 border-black hover:cursor-pointer"
                            href={`/grain/grain-receipt/${name}/${district}/${aj.districtAj}`}
                          >
                            {aj?.districtAj}
                          </Link>
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.grainContractPlanTon}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.grainPerDayTon}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.grainPerDayPercent}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.grainPerDayPercent}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.grainPerDayPercent}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.seedContractPlanTon}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.seedPerDayTon}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.seedPerDayPercent}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.seedPerSeasonTon}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.seedPerSeasonPercent}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.temporarilyContractPlanTon}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.temporarilyPerDayTon}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.temporarilyPerDayPercent}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.temporarilyPerSeasonTon}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.temporarilyPerSeasonPercent}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.allContractPlanTon}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.allPerDayTon}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.allPerDayPercent}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.allPerSeasonTon}
                        </td>
                        <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                          {aj?.allPerSeasonPercent}
                        </td>
                      </tr>
                    </>
                  ))}
                  <tr className="hover:bg-gray-50">
                    <td className="border-2 border-gray-400 w-[50px] p-2 text-xs text-gray-700"></td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700">
                      Jami
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                    <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                      0
                    </td>
                  </tr>
                </>
              ) : (
                <tr className="hover:bg-gray-50">
                  <td
                    colSpan={21}
                    className="border-2 border-gray-400 px-4 py-10 opacity-60 text-xl text-gray-700 text-center"
                  >
                    Ma'lumotlar topilmadi
                  </td>
                </tr>
              )}
            </tbody> */}
          </table>
        </div>
      </div>
    </>
  );
}
