import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function PaymentsTable() {
  const { t } = useTranslation();
  const [page] = useState(0);

  // Static data for each region
  const tashkentCityData = {
    data: {
      data: [
        {
          id: 1,
          name: "Company A",
          stir: "123456789",
          jdayCount: 10,
          jdaySum: 1000000,
          jbeginCount: 20,
          jbeginSum: 2000000,
          ddayCount: 5,
          ddaySum: 500000,
          drate: 50,
          difference: 100000,
          mcount: 15,
          msum: 1500000,
          mrate: 75,
        },
        {
          id: 2,
          name: "Company B",
          stir: "987654321",
          jdayCount: 15,
          jdaySum: 1500000,
          jbeginCount: 25,
          jbeginSum: 2500000,
          ddayCount: 10,
          ddaySum: 1000000,
          drate: 60,
          difference: 200000,
          mcount: 20,
          msum: 2000000,
          mrate: 80,
        },
      ],
    },
  };

  const tashkentData = {
    data: {
      data: [
        {
          id: 1,
          name: "Company C",
          stir: "456789123",
          jdayCount: 8,
          jdaySum: 800000,
          jbeginCount: 18,
          jbeginSum: 1800000,
          ddayCount: 4,
          ddaySum: 400000,
          drate: 45,
          difference: 80000,
          mcount: 12,
          msum: 1200000,
          mrate: 65,
        },
      ],
    },
  };

  const andijanData = {
    data: {
      data: [
        {
          id: 1,
          name: "Company D",
          stir: "789123456",
          jdayCount: 12,
          jdaySum: 1200000,
          jbeginCount: 22,
          jbeginSum: 2200000,
          ddayCount: 6,
          ddaySum: 600000,
          drate: 55,
          difference: 120000,
          mcount: 18,
          msum: 1800000,
          mrate: 70,
        },
      ],
    },
  };

  const buxaraData = {
    data: {
      data: [
        {
          id: 1,
          name: "Company E",
          stir: "321654987",
          jdayCount: 9,
          jdaySum: 900000,
          jbeginCount: 19,
          jbeginSum: 1900000,
          ddayCount: 5,
          ddaySum: 500000,
          drate: 50,
          difference: 90000,
          mcount: 14,
          msum: 1400000,
          mrate: 70,
        },
      ],
    },
  };

  const ferganaData = {
    data: {
      data: [
        {
          id: 1,
          name: "Company F",
          stir: "654987321",
          jdayCount: 11,
          jdaySum: 1100000,
          jbeginCount: 21,
          jbeginSum: 2100000,
          ddayCount: 6,
          ddaySum: 600000,
          drate: 55,
          difference: 110000,
          mcount: 16,
          msum: 1600000,
          mrate: 75,
        },
      ],
    },
  };

  const jizzakhData = {
    data: {
      data: [
        {
          id: 1,
          name: "Company G",
          stir: "987321654",
          jdayCount: 7,
          jdaySum: 700000,
          jbeginCount: 17,
          jbeginSum: 1700000,
          ddayCount: 3,
          ddaySum: 300000,
          drate: 40,
          difference: 70000,
          mcount: 10,
          msum: 1000000,
          mrate: 60,
        },
      ],
    },
  };

  const khorezmData = {
    data: {
      data: [
        {
          id: 1,
          name: "Company H",
          stir: "159357486",
          jdayCount: 14,
          jdaySum: 1400000,
          jbeginCount: 24,
          jbeginSum: 2400000,
          ddayCount: 7,
          ddaySum: 700000,
          drate: 60,
          difference: 140000,
          mcount: 21,
          msum: 2100000,
          mrate: 85,
        },
      ],
    },
  };

  const namanganData = {
    data: {
      data: [
        {
          id: 1,
          name: "Company I",
          stir: "753951486",
          jdayCount: 13,
          jdaySum: 1300000,
          jbeginCount: 23,
          jbeginSum: 2300000,
          ddayCount: 7,
          ddaySum: 700000,
          drate: 65,
          difference: 130000,
          mcount: 20,
          msum: 2000000,
          mrate: 80,
        },
      ],
    },
  };

  const navoiyData = {
    data: {
      data: [
        {
          id: 1,
          name: "Company J",
          stir: "357159852",
          jdayCount: 6,
          jdaySum: 600000,
          jbeginCount: 16,
          jbeginSum: 1600000,
          ddayCount: 3,
          ddaySum: 300000,
          drate: 35,
          difference: 60000,
          mcount: 9,
          msum: 900000,
          mrate: 55,
        },
      ],
    },
  };

  const kashkadaryaData = {
    data: {
      data: [
        {
          id: 1,
          name: "Company K",
          stir: "852963741",
          jdayCount: 10,
          jdaySum: 1000000,
          jbeginCount: 20,
          jbeginSum: 2000000,
          ddayCount: 5,
          ddaySum: 500000,
          drate: 50,
          difference: 100000,
          mcount: 15,
          msum: 1500000,
          mrate: 75,
        },
      ],
    },
  };

  const samarkandData = {
    data: {
      data: [
        {
          id: 1,
          name: "Company L",
          stir: "258369147",
          jdayCount: 16,
          jdaySum: 1600000,
          jbeginCount: 26,
          jbeginSum: 2600000,
          ddayCount: 8,
          ddaySum: 800000,
          drate: 65,
          difference: 160000,
          mcount: 24,
          msum: 2400000,
          mrate: 90,
        },
      ],
    },
  };

  const sirdaryaData = {
    data: {
      data: [
        {
          id: 1,
          name: "Company M",
          stir: "147258369",
          jdayCount: 5,
          jdaySum: 500000,
          jbeginCount: 15,
          jbeginSum: 1500000,
          ddayCount: 2,
          ddaySum: 200000,
          drate: 30,
          difference: 50000,
          mcount: 7,
          msum: 700000,
          mrate: 45,
        },
      ],
    },
  };

  const surkhandaryaData = {
    data: {
      data: [
        {
          id: 1,
          name: "Company N",
          stir: "963852741",
          jdayCount: 17,
          jdaySum: 1700000,
          jbeginCount: 27,
          jbeginSum: 2700000,
          ddayCount: 9,
          ddaySum: 900000,
          drate: 70,
          difference: 170000,
          mcount: 26,
          msum: 2600000,
          mrate: 95,
        },
      ],
    },
  };

  const karakalpakstanData = {
    data: {
      data: [
        {
          id: 1,
          name: "Company O",
          stir: "741852963",
          jdayCount: 4,
          jdaySum: 400000,
          jbeginCount: 14,
          jbeginSum: 1400000,
          ddayCount: 2,
          ddaySum: 200000,
          drate: 25,
          difference: 40000,
          mcount: 6,
          msum: 600000,
          mrate: 40,
        },
      ],
    },
  };

  return (
    <>
      <div className="">
        <table className="border-separate border-spacing-0 min-w-full border border-gray-300 rounded-md shadow-sm">
          <thead className="bg-gray-50 sticky top-0 left-0 right-0">
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
            {tashkentCityData?.data?.data?.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[115px] left-0 right-0 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Toshkent shaxar
                  </td>
                </tr>
                {tashkentCityData.data.data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                      {page * 10 + (index + 1)}
                    </td>
                    <td className="border border-gray-300 min-w-[170px] truncate px-4 py-2 text-sm text-gray-700">
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
                    <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
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
                ))}
              </>
            )}

            {/* tashkent */}
            {tashkentData?.data?.data?.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[115px] left-0 right-0 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Toshkent viloyat
                  </td>
                </tr>
                {tashkentData.data.data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                      {page * 10 + (index + 1)}
                    </td>
                    <td className="border border-gray-300 min-w-[170px] truncate px-4 py-2 text-sm text-gray-700">
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
                    <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
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
                ))}
              </>
            )}

            {/* andijan */}
            {andijanData?.data?.data?.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[115px] left-0 right-0 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Andijon viloyat
                  </td>
                </tr>
                {andijanData.data.data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                      {page * 10 + (index + 1)}
                    </td>
                    <td className="border border-gray-300 min-w-[170px] truncate px-4 py-2 text-sm text-gray-700">
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
                    <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
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
                ))}
              </>
            )}

            {/* BUKHARA */}
            {buxaraData?.data?.data?.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[115px] left-0 right-0 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Buxoro viloyat
                  </td>
                </tr>
                {buxaraData.data.data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                      {page * 10 + (index + 1)}
                    </td>
                    <td className="border border-gray-300 min-w-[170px] truncate px-4 py-2 text-sm text-gray-700">
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
                    <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
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
                ))}
              </>
            )}

            {/* FERGANA */}
            {ferganaData?.data?.data?.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[115px] left-0 right-0 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Farg'ona viloyat
                  </td>
                </tr>
                {ferganaData.data.data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                      {page * 10 + (index + 1)}
                    </td>
                    <td className="border border-gray-300 min-w-[170px] truncate px-4 py-2 text-sm text-gray-700">
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
                    <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
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
                ))}
              </>
            )}

            {/* JIZZAKH */}
            {jizzakhData?.data?.data?.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[115px] left-0 right-0 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Jizzah viloyat
                  </td>
                </tr>
                {jizzakhData.data.data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                      {page * 10 + (index + 1)}
                    </td>
                    <td className="border border-gray-300 min-w-[170px] truncate px-4 py-2 text-sm text-gray-700">
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
                    <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
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
                ))}
              </>
            )}

            {/* KHOREZM */}
            {khorezmData?.data?.data?.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[115px] left-0 right-0 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Xorazm viloyat
                  </td>
                </tr>
                {khorezmData.data.data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                      {page * 10 + (index + 1)}
                    </td>
                    <td className="border border-gray-300 min-w-[170px] truncate px-4 py-2 text-sm text-gray-700">
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
                    <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
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
                ))}
              </>
            )}

            {/* NAMANGAN */}
            {namanganData?.data?.data?.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[115px] left-0 right-0 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Namangan viloyat
                  </td>
                </tr>
                {namanganData.data.data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                      {page * 10 + (index + 1)}
                    </td>
                    <td className="border border-gray-300 min-w-[170px] truncate px-4 py-2 text-sm text-gray-700">
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
                    <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
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
                ))}
              </>
            )}

            {/* NAVOIY */}
            {navoiyData?.data?.data?.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[115px] left-0 right-0 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Navoiy viloyat
                  </td>
                </tr>
                {navoiyData.data.data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                      {page * 10 + (index + 1)}
                    </td>
                    <td className="border border-gray-300 min-w-[170px] truncate px-4 py-2 text-sm text-gray-700">
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
                    <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
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
                ))}
              </>
            )}

            {/* KASHKADARYA */}
            {kashkadaryaData?.data?.data?.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[115px] left-0 right-0 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Qashqadaryo viloyat
                  </td>
                </tr>
                {kashkadaryaData.data.data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                      {page * 10 + (index + 1)}
                    </td>
                    <td className="border border-gray-300 min-w-[170px] truncate px-4 py-2 text-sm text-gray-700">
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
                    <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
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
                ))}
              </>
            )}

            {/* SAMARKAND */}
            {samarkandData?.data?.data?.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[115px] left-0 right-0 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Samarqand viloyat
                  </td>
                </tr>
                {samarkandData.data.data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                      {page * 10 + (index + 1)}
                    </td>
                    <td className="border border-gray-300 min-w-[170px] truncate px-4 py-2 text-sm text-gray-700">
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
                    <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
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
                ))}
              </>
            )}

            {/* SIRDARYA */}
            {sirdaryaData?.data?.data?.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[115px] left-0 right-0 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Sirdaryo viloyat
                  </td>
                </tr>
                {sirdaryaData.data.data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                      {page * 10 + (index + 1)}
                    </td>
                    <td className="border border-gray-300 min-w-[170px] truncate px-4 py-2 text-sm text-gray-700">
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
                    <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
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
                ))}
              </>
            )}

            {/* SURKHANDARYA */}
            {surkhandaryaData?.data?.data?.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[115px] left-0 right-0 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Surxandaryo viloyat
                  </td>
                </tr>
                {surkhandaryaData.data.data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                      {page * 10 + (index + 1)}
                    </td>
                    <td className="border border-gray-300 min-w-[170px] truncate px-4 py-2 text-sm text-gray-700">
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
                    <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
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
                ))}
              </>
            )}

            {/* KARAKALPAKSTAN */}
            {karakalpakstanData?.data?.data?.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={16}
                    className="border sticky top-[115px] left-0 right-0 border-gray-300 text-center px-4 py-2 text-sm font-semibold text-black bg-white"
                  >
                    Qoraqalpog'iston Respublikasi
                  </td>
                </tr>
                {karakalpakstanData.data.data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 w-[30px] px-4 py-2 text-sm text-gray-700">
                      {page * 10 + (index + 1)}
                    </td>
                    <td className="border border-gray-300 min-w-[170px] truncate px-4 py-2 text-sm text-gray-700">
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
                    <td className="border border-gray-300 w-[100px] truncate px-4 py-2 text-sm text-gray-700 text-center">
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
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
