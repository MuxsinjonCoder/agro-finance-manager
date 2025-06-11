"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { RegionTableDatas } from "../../../../constants/regionTableDatas";
import { useUser } from "@/pages/_app";
import { toast } from "sonner";
import { useEffect } from "react";
import { useGrainResiptsListByRegionName } from "@/queries/grain/grain-resipt";

const grainResiptsListByRegion = {
  data: {
    dtoList: [
      {
        farmerName: "Andijon tumani",
        dtoList: [
          {},
          {
            contractWeight: 2000,
            weight: 150,
            percent: 7.5,
            mweight: 600,
            mpercent: 30,
          },
          {
            contractWeight: 3000,
            weight: 200,
            percent: 6.67,
            mweight: 900,
            mpercent: 30,
          },
        ],
      },
      {
        farmerName: "Asaka tumani",
        dtoList: [
          {},
          {
            contractWeight: 1800,
            weight: 120,
            percent: 6.67,
            mweight: 500,
            mpercent: 27.78,
          },
          {
            contractWeight: 2500,
            weight: 180,
            percent: 7.2,
            mweight: 700,
            mpercent: 28,
          },
        ],
      },
      {
        farmerName: "Baliqchi tumani",
        dtoList: [
          {},
          {
            contractWeight: 2200,
            weight: 140,
            percent: 6.36,
            mweight: 550,
            mpercent: 25,
          },
          {
            contractWeight: 3200,
            weight: 210,
            percent: 6.56,
            mweight: 800,
            mpercent: 25,
          },
        ],
      },
    ],
  },
};

export default function RegionDataTable() {
  // hapers
  const params = useParams();
  const name = params?.name || "";

  // queries
  // const { data: grainResiptsListByRegion } =
  //   useGrainResiptsListByRegionName(name);

  // console.log("grainResiptsListByRegion:", grainResiptsListByRegion);

  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "grain-grainreceipt"
  );

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
          {name} bo'yicha qabul qilingan don mahsulotlari to'g'risida
          ma'lumotlar
        </h1>
        <div className="max-h-[87vh] overflow-auto">
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
                  className="border-2 w-[150px] border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                >
                  Tumanlar
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
              {grainResiptsListByRegion?.data?.dtoList?.map(
                (item: any, index: number) => (
                  <>
                    <tr className="hover:bg-gray-50">
                      <td className="border-2 border-gray-400 w-[50px] p-2 text-xs text-gray-700">
                        {index + 1}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs min-w-[200px] text-gray-700">
                        <Link
                          className="border-b-2 border-black hover:cursor-pointer"
                          href={`/grain/grain-receipt/${name}/${item?.farmerName}`}
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
              {RegionTableDatas?.find((item) => item?.region == name) ? (
                <>
                  {RegionTableDatas?.find(
                    (item) => item?.region == name
                  )?.ajs?.map((aj: any, index) => (
                    <>
                      <tr key={index} className="hover:bg-gray-50">
                        <td
                          colSpan={21}
                          className="border-2 sticky top-28 bg-white left-0 right-0 text-center font-medium border-gray-300 p-2 text-xs"
                        >
                          "{aj?.aj}" <span className="font-normal">AJ</span>
                        </td>
                      </tr>
                      {aj?.districts?.map(
                        (ajDistrict: any, ajDistrictIndex: number) => (
                          <tr className="hover:bg-gray-50">
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700">
                              {ajDistrictIndex + 1}
                            </td>
                            <td className="border-2 min-w-[150px] border-gray-400 p-2 text-xs text-gray-700">
                              <Link
                                className="border-b-2 border-black hover:cursor-pointer"
                                href={`/grain/grain-receipt/${name}/${ajDistrict?.district}`}
                              >
                                {ajDistrict?.district}
                              </Link>
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.grainContractPlanTon}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.grainPerDayTon}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.grainPerDayPercent}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.grainPerDayPercent}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.grainPerDayPercent}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.seedContractPlanTon}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.seedPerDayTon}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.seedPerDayPercent}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.seedPerSeasonTon}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.seedPerSeasonPercent}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.temporarilyContractPlanTon}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.temporarilyPerDayTon}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.temporarilyPerDayPercent}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.temporarilyPerSeasonTon}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.temporarilyPerSeasonPercent}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.allContractPlanTon}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.allPerDayTon}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.allPerDayPercent}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.allPerSeasonTon}
                            </td>
                            <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                              {ajDistrict?.allPerSeasonPercent}
                            </td>
                          </tr>
                        )
                      )}
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
                  ))}
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
