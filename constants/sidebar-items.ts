import {
  File,
  Inbox,
  Send,
  Receipt,
  KeySquare,
  LucideIcon,
  PanelsTopLeft,
  ContactRoundIcon,
  AppWindow,
  ChartBarStacked,
  Landmark,
  Scale,
  Percent,
  HandCoins,
  FileText,
  Users,
  DollarSign,
  TruckIcon,
  Wheat,
  Logs,
  Clover,
  Vegan,
  BarChart,
  Calculator,
  CreditCard,
  ClipboardCheck,
  Archive,
  Sprout,
  Warehouse,
  Book,
  Grid,
  ShoppingCart,
  Settings2,
  Axe,
  Handshake,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  FileSignature,
  FilePlus,
  LayoutGrid,
  Gavel,
  Package,
  ClipboardList,
} from "lucide-react";
import { useUser } from "@/pages/_app";

export interface NavSubItem {
  icon: any;
  title: string;
  path: string;
  subItems?: any;
}
export interface NavMainItem {
  title: string;
  path: string;
  icon?: LucideIcon;
  isActive?: boolean;
  subItems?: NavSubItem[];
}

export interface NavGroup {
  id: number;
  label: string;
  items: NavMainItem[];
}
const basePath = "/";

export const getSidebarItems = () => {
  const { t } = useTranslation();
  const { user }: any = useUser();
  const userRole = user?.data?.role[0];
  const permissions = userRole?.dtoList?.map((perm: any) => perm.name) || [];

  const filterItemsByPermission = (items: NavMainItem[]): NavMainItem[] => {
    return items
      .map((item) => {
        // Special handling for overview section
        if (item.path === basePath && !item.subItems) {
          return permissions.includes("overview-overview") ? item : null;
        }

        if (item.subItems) {
          const filteredSubItems = item.subItems.filter((subItem) =>
            permissions.some(
              (perm: string) =>
                subItem.path.includes(perm.split("-")[0]) &&
                subItem.title === t(`layout.nav.${perm.split("-")[1]}`)
            )
          );

          if (filteredSubItems.length > 0) {
            return { ...item, subItems: filteredSubItems };
          }
          return null;
        }
        return permissions.some((perm: string) => item.path.includes(perm))
          ? item
          : null;
      })
      .filter((item): item is NavMainItem => item !== null);
  };

  const sidebarItems: NavGroup[] = [
    {
      id: 1,
      label: t("layout.nav.overview"),
      items: [
        {
          title: t("layout.nav.overview"),
          path: basePath,
          icon: PanelsTopLeft,
          isActive: true,
        },
      ],
    },
    {
      id: 2,
      label: t("layout.nav.appPage"),
      items: [
        // grain
        {
          title: t("layout.nav.grain"),
          path: "",
          icon: Wheat,
          subItems: [
            {
              title: t("layout.nav.grainreceipt"),
              path: `${basePath}/grain/grain-receipt`,
              icon: FileText,
            },
            {
              title: t("layout.nav.requiredAssign"),
              path: `${basePath}/grain/required-assignment`,
              icon: ClipboardList,
            },
            {
              title: t("layout.nav.loanAgreement"),
              path: `${basePath}/grain/loan-agreement`,
              icon: FileSignature,
            },
            {
              title: t("layout.nav.storageAgree"),
              path: `${basePath}/grain/storage-agreement`,
              icon: Archive,
            },
            {
              title: t("layout.nav.returnGraph"),
              path: `${basePath}/grain/return-graph`,
              icon: BarChart,
            },
            {
              title: t("layout.nav.lastAmo"),
              path: `${basePath}/grain/final-accounts`,
              icon: Calculator,
            },
            {
              title: t("layout.nav.pays"),
              path: `${basePath}/grain/payments`,
              icon: CreditCard,
            },
            {
              title: t("layout.nav.orders"),
              path: "",
              icon: ClipboardCheck,
              subItems: [
                {
                  title: t("layout.nav.comGrain"),
                  path: `${basePath}/grain/orders/commodity-grain`,
                  icon: Package,
                },
                {
                  title: t("layout.nav.seed"),
                  path: `${basePath}/grain/orders/seed`,
                  icon: Sprout,
                },
              ],
            },
            {
              title: t("layout.nav.epicCap"),
              path: `${basePath}/grain/epic-capacity`,
              icon: Warehouse,
            },
            {
              title: t("layout.nav.instructs"),
              path: `${basePath}/grain/instructions`,
              icon: Book,
            },
          ],
        },
        // cotton
        {
          title: t("layout.nav.cotton"),
          path: "",
          icon: Clover,
          subItems: [
            {
              title: t("layout.nav.docs"),
              path: `${basePath}/cotton/document`,
              icon: FileText,
            },
            {
              title: t("layout.nav.conts"),
              path: `${basePath}/cotton/contracts`,
              icon: FileSignature,
            },
            {
              title: t("layout.nav.apps"),
              path: `${basePath}/cotton/applications`,
              icon: ClipboardList,
            },
            {
              title: t("layout.nav.percents"),
              path: `${basePath}/cotton/percents`,
              icon: Percent,
            },
            {
              title: t("layout.nav.pays"),
              path: `${basePath}/cotton/payments`,
              icon: CreditCard,
            },
            {
              title: t("layout.nav.cortD"),
              path: `${basePath}/cotton/court-decisions`,
              icon: Axe,
            },
            {
              title: t("layout.nav.receivingProducts"),
              path: `${basePath}/cotton/receiving-products`,
              icon: ShoppingCart,
            },
          ],
        },
        // guide
        {
          title: t("layout.nav.guide"),
          path: "",
          icon: Settings2,
          subItems: [
            {
              title: t("layout.nav.roles"),
              path: `/guide/roles`,
              icon: KeySquare,
            },
            {
              title: t("layout.nav.users"),
              path: `${basePath}/guide/users`,
              icon: Users,
            },
            {
              title: t("layout.nav.parts"),
              path: `${basePath}/guide/partners`,
              icon: Handshake,
            },
            {
              title: t("layout.nav.cats"),
              path: `${basePath}/guide/categories`,
              icon: Grid,
            },
          ],
        },
      ],
    },
  ];

  // return sidebarItems.map((group) => ({
  //   ...group,
  //   items: filterItemsByPermission(group.items),
  // }));
  return sidebarItems;
};
