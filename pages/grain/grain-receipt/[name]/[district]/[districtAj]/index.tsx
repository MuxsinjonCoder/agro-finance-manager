"use client";

import { DistrictAjTableData } from "@/constants/districtAjTableData";
import { useUser } from "@/pages/_app";
import ImageMapper from "@/pages/image-mapper";
import { useGrainResiptsListByFarmName } from "@/queries/grain/grain-resipt";
import { format, parseISO } from "date-fns";
import { BookDown } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const grainResiptsByFarmName = {
  data: [
    {
      createdAt: "2025-06-01T10:00:00Z",
      receptionNumber: "REC001",
      type: "Tovar",
      brutto: 1000,
      tara: 50,
      netto: 950,
      conAmount: 900,
      grainClass: "1-sinf",
      pk10: "PK1001",
      vehicleNumber: "01 ABC 123",
      cargoNumber: "CAR001",
      cloudPaths: ["/images/rec001-1.jpg", "/images/rec001-2.jpg"],
    },
    {
      createdAt: "2025-06-02T12:30:00Z",
      receptionNumber: "REC002",
      type: "Urug'lik",
      brutto: 800,
      tara: 40,
      netto: 760,
      conAmount: 700,
      grainClass: "2-sinf",
      pk10: "PK1002",
      vehicleNumber: "02 XYZ 456",
      cargoNumber: "CAR002",
      cloudPaths: ["/images/rec002-1.jpg"],
    },
    {
      createdAt: "2025-06-03T15:45:00Z",
      receptionNumber: "REC003",
      type: "Vaqtincha saqlash",
      brutto: 1200,
      tara: 60,
      netto: 1140,
      conAmount: 1100,
      grainClass: "3-sinf",
      pk10: "PK1003",
      vehicleNumber: "03 DEF 789",
      cargoNumber: "CAR003",
      cloudPaths: [],
    },
  ],
};

export default function DistrictAjTable() {
  // halpers
  const params = useParams();
  const districtAj = params?.districtAj || "";
  const router = useRouter();
  const { user }: any = useUser();
  const access = user?.data?.role[0]?.dtoList?.filter(
    (item: any) => item?.name == "grain-grainreceipt"
  );

  // queries
  // const { data: grainResiptsByFarmName } = useGrainResiptsListByFarmName(
  //   0,
  //   10,
  //   districtAj
  // );

  // console.log("grainResiptsByFarmName", grainResiptsByFarmName);

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
      <div>
        <div className="min-w-full overflow-auto relative border-gray-300 rounded-md">
          <h1 className="text-center text-lg font-medium opacity-70 mb-2">
            {districtAj} bo'yicha g'alla qabul qilishning borishi
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
                    colSpan={2}
                    className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                  >
                    Yuk xati
                  </th>
                  <th
                    rowSpan={2}
                    className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                  >
                    Tovar / urug'lik
                  </th>
                  <th
                    colSpan={3}
                    className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                  >
                    Fizik vazni, kg
                  </th>
                  <th
                    rowSpan={2}
                    className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                  >
                    Kondision vazni, kg
                  </th>
                  <th
                    rowSpan={2}
                    className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                  >
                    Bug'doy sifati
                  </th>
                  <th
                    rowSpan={2}
                    className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                  >
                    PK-10 raqami
                  </th>
                  <th
                    rowSpan={2}
                    className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                  >
                    Transport raqami
                  </th>
                  <th
                    colSpan={4}
                    className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-700"
                  >
                    G'allani qabul qilish
                  </th>
                </tr>
                <tr>
                  <th className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-600">
                    Sanasi
                  </th>
                  <th className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-600">
                    Raqami
                  </th>
                  <th className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-600">
                    Jami
                  </th>
                  <th className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-600">
                    Tara
                  </th>
                  <th className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-600">
                    Sof
                  </th>
                  <th className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-600">
                    Qayd №
                  </th>
                  <th className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-600">
                    Qabul vaqti
                  </th>
                  <th className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-600">
                    Qabul maqsadi
                  </th>
                  <th className="border-2 border-gray-400 p-2 text-center text-xs font-semibold text-gray-600">
                    Rasmlar
                  </th>
                </tr>
              </thead>
              <tbody>
                {grainResiptsByFarmName?.data?.map(
                  (item: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700">
                        {index + 1}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700">
                        {item?.createdAt && typeof item.createdAt === "string"
                          ? parseISO(item.createdAt) instanceof Date &&
                            !isNaN(parseISO(item.createdAt).getTime())
                            ? format(parseISO(item.createdAt), "dd.MM.yyyy")
                            : "-----"
                          : "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.receptionNumber || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.type || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.brutto || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.tara || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.netto || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.conAmount || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.grainClass || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        <Link
                          className="border-b hover:opacity-80 border-black"
                          href={"#"}
                        >
                          {item?.pk10 || "-----"}
                        </Link>
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.vehicleNumber || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.cargoNumber || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.createdAt
                          ? new Date(item.createdAt).toLocaleTimeString(
                              "uz-UZ",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.type || "-----"}
                      </td>
                      <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                        {item?.cloudPaths?.length > 0 ? (
                          <span className="flex items-center gap-2 justify-center">
                            <Link
                              href={{
                                pathname: "/image-mapper",
                                query: {
                                  images: JSON.stringify(item?.cloudPaths),
                                },
                              }}
                            >
                              <BookDown className="text-primary cursor-pointer size-5" />
                            </Link>
                          </span>
                        ) : (
                          0
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
              {/* <tbody>
                {DistrictAjTableData?.find(
                  (item: any) => item?.districtAjItem == districtAj
                ) ? (
                  <>
                    {DistrictAjTableData?.find(
                      (item: any) => item?.districtAjItem == districtAj
                    )?.ajs?.map((aj: any, index: number) => (
                      <>
                        <tr className="hover:bg-gray-50">
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700">
                            {index + 1}
                          </td>
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700">
                            {aj?.date}
                          </td>
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                            {aj?.number}
                          </td>
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                            {aj?.productGrain}
                          </td>
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                            {aj?.phyTotal}
                          </td>
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                            {aj?.phyZero}
                          </td>
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                            {aj?.phyPure}
                          </td>
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                            {aj?.conAmount}
                          </td>
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                            {aj?.grainClass}
                          </td>
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                            <Link
                              className="border-b hover:opacity-80 border-black"
                              href={"#"}
                            >
                              {aj?.pk10}
                            </Link>
                          </td>
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                            {aj?.carNumber}
                          </td>
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                            {aj?.grainReceiveN}
                          </td>
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                            {aj?.receiveDate}
                          </td>
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                            {aj?.receivePurpose}
                          </td>
                          <td className="border-2 border-gray-400 p-2 text-xs text-gray-700 text-center">
                            {aj?.imageCount}
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
      </div>
    </>
  );
}
