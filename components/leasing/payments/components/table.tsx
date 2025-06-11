import { useGetPaysByRegion,useGetAllPayments } from "@/queries/pay";
import { GotPays, GotRegionPaysTypes } from "@/types/pay";
import { ActivityIcon, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PaymentsTablePropsTypes {
  page: number;
}

// region filter datas
// TASHKENT_CITY, TASHKENT, ANDIJAN, BUKHARA, FERGANA,
// JIZZAKH, KHOREZM, NAMANGAN, NAVOIY, KASHKADARYA,
//  SAMARKAND, SIRDARYA, SURKHANDARYA, KARAKALPAKSTAN

export default function PaymentsTable({ page }: PaymentsTablePropsTypes) {
  const { t } = useTranslation();

  // queries
  const { data: tashkentCityData } = useGetPaysByRegion(
    "TASHKENT_CITY",
    page,
    10
  );
  const { data: tashkentData } = useGetPaysByRegion("TASHKENT", page, 10);
  const { data: andijanData } = useGetPaysByRegion("ANDIJAN", page, 10);
  const { data: buxaraData } = useGetPaysByRegion("BUKHARA", page, 10);
  const { data: ferganaData } = useGetPaysByRegion("FERGANA", page, 10);
  const { data: jizzakhData } = useGetPaysByRegion("JIZZAKH", page, 10);
  const { data: khorezmData } = useGetPaysByRegion("KHOREZM", page, 10);
  const { data: namanganData } = useGetPaysByRegion("NAMANGAN", page, 10);
  const { data: navoiyData } = useGetPaysByRegion("NAVOIY", page, 10);
  const { data: kashkadaryaData } = useGetPaysByRegion("KASHKADARYA", page, 10);
  const { data: samarkandData } = useGetPaysByRegion("SAMARKAND", page, 10);
  const { data: sirdaryaData } = useGetPaysByRegion("SIRDARYA", page, 10);
  const { data: surkhandaryaData } = useGetPaysByRegion(
    "SURKHANDARYA",
    page,
    10
  );
  const { data: karakalpakstanData } = useGetPaysByRegion(
    "KARAKALPAKSTAN",
    page,
    10
  );

  const {data:allPaymentsData}=useGetAllPayments(1,100)


  return (
    <>
      <div className="min-w-full h-[70vh] overflow-auto relative border-gray-300 rounded-md">
        <table className="border-collapse min-w-full border border-gray-300 rounded-md shadow-sm">
          <thead className="bg-gray-50 z-10 sticky top-0 left-0 right-0">
            <tr>
              <th
                rowSpan={3}
                className="w-[50px] border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                №
              </th>
              <th
                colSpan={2}
                className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700"
              >
                {t("tables.grainCompany")}
              </th>
              <th
                colSpan={4}
                className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700"
              >
                {t("tables.grainCompanyFromDonat")}
              </th>
              <th
                colSpan={4}
                className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700"
              >
                {t("tables.grainComToLog")}
              </th>
              <th
                colSpan={4}
                className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700"
              >
                {t("tables.perSeason")}
              </th>
            </tr>
            <tr>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600"
              >
                {t("tables.name")}
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600"
              >
                {t("tables.stir")}
              </th>
              <th
                colSpan={2}
                className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600"
              >
                {t("tables.perDay")}
              </th>
              <th
                colSpan={2}
                className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600"
              >
                {t("tables.perSeason")}
              </th>
              <th
                colSpan={4}
                className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600"
              >
                {t("tables.perDay")}
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600"
              >
                {t("tables.count")}
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600"
              >
                {t("tables.mlnSum")}
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600"
              >
                %
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600"
              >
                {t("tables.diff")}
              </th>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
                {t("tables.count")}
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
                {t("tables.mlnSum")}
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
                {t("tables.count")}
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
                {t("tables.mlnSum")}
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
                {t("tables.count")}
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
                {t("tables.mlnSum")}
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
                %
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">
                {t("tables.diff")}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* tashkent city */}
            {tashkentCityData?.data?.data?.length > 0 ? (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Toshkent shaxar
                  </td>
                </tr>
                {tashkentCityData?.data?.data.map(
                  (item: GotRegionPaysTypes, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border border-gray-300 w-[170px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.name || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[120px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.stir || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginSum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px]  truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.drate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mcount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.msum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mrate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-base font-semibold text-black bg-white"
                  >
                    Toshkent shaxar
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 w-full">
                  <td colSpan={16} className="text-center py-2 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              </>
            )}

            {/* tashkent */}
            {tashkentData?.data?.data?.length > 0 ? (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Toshkent viloyat
                  </td>
                </tr>
                {tashkentData?.data?.data.map(
                  (item: GotRegionPaysTypes, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border border-gray-300 w-[170px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.name || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[120px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.stir || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginSum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px]  truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.drate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mcount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.msum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mrate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-base font-semibold text-black bg-white"
                  >
                    Toshkent viloyati
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 w-full">
                  <td colSpan={16} className="text-center py-2 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              </>
            )}

            {/* andijan */}
            {andijanData?.data?.data?.length > 0 ? (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Andijon viloyat
                  </td>
                </tr>
                {andijanData?.data?.data.map(
                  (item: GotRegionPaysTypes, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border border-gray-300 w-[170px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.name || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[120px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.stir || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginSum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px]  truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.drate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mcount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.msum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mrate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-base font-semibold text-black bg-white"
                  >
                    Andijon viloyati
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 w-full">
                  <td colSpan={16} className="text-center py-2 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              </>
            )}

            {/* BUKHARA */}
            {buxaraData?.data?.data?.length > 0 ? (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Buxoro viloyat
                  </td>
                </tr>
                {buxaraData?.data?.data.map(
                  (item: GotRegionPaysTypes, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border border-gray-300 w-[170px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.name || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[120px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.stir || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginSum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px]  truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.drate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mcount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.msum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mrate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-base font-semibold text-black bg-white"
                  >
                    Buxoro viloyati
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 w-full">
                  <td colSpan={16} className="text-center py-2 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              </>
            )}

            {/* FERGANA */}
            {ferganaData?.data?.data?.length > 0 ? (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Farg'ona viloyat
                  </td>
                </tr>
                {ferganaData?.data?.data.map(
                  (item: GotRegionPaysTypes, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border border-gray-300 w-[170px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.name || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[120px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.stir || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginSum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px]  truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.drate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mcount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.msum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mrate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-base font-semibold text-black bg-white"
                  >
                    Farg'ona viloyati
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 w-full">
                  <td colSpan={16} className="text-center py-2 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              </>
            )}

            {/* JIZZAKH */}
            {jizzakhData?.data?.data?.length > 0 ? (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Jizzah viloyat
                  </td>
                </tr>
                {jizzakhData?.data?.data.map(
                  (item: GotRegionPaysTypes, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border border-gray-300 w-[170px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.name || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[120px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.stir || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginSum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px]  truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.drate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mcount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.msum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mrate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-base font-semibold text-black bg-white"
                  >
                    Jizzah viloyati
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 w-full">
                  <td colSpan={16} className="text-center py-2 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              </>
            )}

            {/* KHOREZM */}
            {khorezmData?.data?.data?.length > 0 ? (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Xorazm viloyat
                  </td>
                </tr>
                {khorezmData?.data?.data.map(
                  (item: GotRegionPaysTypes, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border border-gray-300 w-[170px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.name || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[120px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.stir || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginSum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px]  truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.drate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mcount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.msum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mrate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-base font-semibold text-black bg-white"
                  >
                    Xorazm viloyati
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 w-full">
                  <td colSpan={16} className="text-center py-2 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              </>
            )}

            {/* NAMANGAN */}
            {namanganData?.data?.data?.length > 0 ? (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Namangan viloyat
                  </td>
                </tr>
                {namanganData?.data?.data.map(
                  (item: GotRegionPaysTypes, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border border-gray-300 w-[170px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.name || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[120px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.stir || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginSum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px]  truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.drate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mcount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.msum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mrate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-base font-semibold text-black bg-white"
                  >
                    Namangan viloyati
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 w-full">
                  <td colSpan={16} className="text-center py-2 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              </>
            )}

            {/* NAVOIY */}
            {navoiyData?.data?.data?.length > 0 ? (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Navoiy viloyat
                  </td>
                </tr>
                {navoiyData?.data?.data.map(
                  (item: GotRegionPaysTypes, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border border-gray-300 w-[170px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.name || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[120px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.stir || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginSum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px]  truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.drate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mcount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.msum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mrate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-base font-semibold text-black bg-white"
                  >
                    Navoiy viloyati
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 w-full">
                  <td colSpan={16} className="text-center py-2 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              </>
            )}

            {/* KASHKADARYA */}
            {kashkadaryaData?.data?.data?.length > 0 ? (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Qashqadaryo viloyat
                  </td>
                </tr>
                {kashkadaryaData?.data?.data.map(
                  (item: GotRegionPaysTypes, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border border-gray-300 w-[170px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.name || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[120px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.stir || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginSum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px]  truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.drate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mcount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.msum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mrate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-base font-semibold text-black bg-white"
                  >
                    Qashqadaryo viloyati
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 w-full">
                  <td colSpan={16} className="text-center py-2 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              </>
            )}

            {/* SAMARKAND */}
            {samarkandData?.data?.data?.length > 0 ? (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Samarqand viloyat
                  </td>
                </tr>
                {samarkandData?.data?.data.map(
                  (item: GotRegionPaysTypes, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border border-gray-300 w-[170px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.name || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[120px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.stir || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginSum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px]  truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.drate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mcount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.msum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mrate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-base font-semibold text-black bg-white"
                  >
                    Samarqand viloyati
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 w-full">
                  <td colSpan={16} className="text-center py-2 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              </>
            )}

            {/* SIRDARYA */}
            {sirdaryaData?.data?.data?.length > 0 ? (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Sirdaryo viloyat
                  </td>
                </tr>
                {sirdaryaData?.data?.data.map(
                  (item: GotRegionPaysTypes, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border border-gray-300 w-[170px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.name || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[120px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.stir || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginSum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px]  truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.drate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mcount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.msum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mrate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-base font-semibold text-black bg-white"
                  >
                    Sirdaryo viloyati
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 w-full">
                  <td colSpan={16} className="text-center py-2 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              </>
            )}

            {/* SURKHANDARYA */}
            {surkhandaryaData?.data?.data?.length > 0 ? (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Surxandaryo viloyat
                  </td>
                </tr>
                {surkhandaryaData?.data?.data.map(
                  (item: GotRegionPaysTypes, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border border-gray-300 w-[170px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.name || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[120px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.stir || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginSum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px]  truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.drate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mcount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.msum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mrate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-base font-semibold text-black bg-white"
                  >
                    Surxandaryo viloyati
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 w-full">
                  <td colSpan={16} className="text-center py-2 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              </>
            )}

            {/* KARAKALPAKSTAN */}
            {karakalpakstanData?.data?.data?.length > 0 ? (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Qoraqalpog'iston Republikasi
                  </td>
                </tr>
                {karakalpakstanData?.data?.data.map(
                  (item: GotRegionPaysTypes, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                        {page * 10 + (index + 1)}
                      </td>
                      <td className="border border-gray-300 w-[170px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.name || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[120px] truncate px-4 py-2 text-sm text-gray-700">
                        {item.stir || "-----"}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jdaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.jbeginSum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddayCount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.ddaySum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px]  truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.drate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mcount || 0}
                      </td>
                      <td className="border border-gray-300 w-[300px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.msum || 0}
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.mrate || 0} %
                      </td>
                      <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
                        {item.difference || 0}
                      </td>
                    </tr>
                  )
                )}
              </>
            ) : (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[110px] left-0 right-0 z-10 border-gray-300 text-center px-4 py-2 text-base font-semibold text-black bg-white"
                  >
                    Qoraqalpog'iston Republikasi
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 w-full">
                  <td colSpan={16} className="text-center py-2 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
