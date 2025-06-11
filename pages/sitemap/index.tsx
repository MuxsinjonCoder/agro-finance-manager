import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useUser } from "@/pages/_app";
import {
  FileText,
  ClipboardList,
  FileSignature,
  Archive,
  BarChart,
  Calculator,
  CreditCard,
  ClipboardCheck,
  Package,
  Sprout,
  Warehouse,
  Book,
  Clover,
  Percent,
  ShoppingCart,
  Axe,
  Vegan,
  Gavel,
  HandCoins,
  Settings2,
  KeySquare,
  Users,
  Handshake,
  Grid,
  PanelsTopLeft,
  Wheat,
  LucideIcon,
} from "lucide-react";

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

export default function SiteMap() {
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

  const sidebarItems = [
    {
      id: 1,
      label: t("layout.nav.overview"),
      items: [
        {
          title: t("layout.nav.overview"),
          path: "/",
          icon: PanelsTopLeft,
        },
      ],
    },
    {
      id: 2,
      label: t("layout.nav.appPage"),
      items: [
        {
          title: t("layout.nav.grain"),
          path: "",
          icon: Wheat,
          subItems: [
            {
              title: t("layout.nav.grainreceipt"),
              path: "/grain/grain-receipt",
              icon: FileText,
            },
            {
              title: t("layout.nav.requiredAssign"),
              path: "/grain/required-assignment",
              icon: ClipboardList,
            },
            {
              title: t("layout.nav.loanAgreement"),
              path: "/grain/loan-agreement",
              icon: FileSignature,
            },
            {
              title: t("layout.nav.storage Agree"),
              path: "/grain/storage-agreement",
              icon: Archive,
            },
            {
              title: t("layout.nav.returnGraph"),
              path: "/grain/return-graph",
              icon: BarChart,
            },
            {
              title: t("layout.nav.lastAmo"),
              path: "/grain/final-accounts",
              icon: Calculator,
            },
            {
              title: t("layout.nav.pays"),
              path: "/grain/payments",
              icon: CreditCard,
            },
            {
              title: t("layout.nav.orders"),
              path: "",
              icon: ClipboardCheck,
              subItems: [
                {
                  title: t("layout.nav.comGrain"),
                  path: "/grain/orders/commodity-grain",
                  icon: Package,
                },
                {
                  title: t("layout.nav.seed"),
                  path: "/grain/orders/seed",
                  icon: Sprout,
                },
              ],
            },
            {
              title: t("layout.nav.epicCap"),
              path: "/grain/epic-capacity",
              icon: Warehouse,
            },
            {
              title: t("layout.nav.instructs"),
              path: "/grain/instructions",
              icon: Book,
            },
          ],
        },
        {
          title: t("layout.nav.cotton"),
          path: "",
          icon: Clover,
          subItems: [
            {
              title: t("layout.nav.docs"),
              path: "/cotton/document",
              icon: FileText,
            },
            {
              title: t("layout.nav.conts"),
              path: "/cotton/contracts",
              icon: FileSignature,
            },
            {
              title: t("layout.nav.apps"),
              path: "/cotton/applications",
              icon: ClipboardList,
            },
            {
              title: t("layout.nav.percents"),
              path: "/cotton/percents",
              icon: Percent,
            },
            {
              title: t("layout.nav.pays"),
              path: "/cotton/payments",
              icon: CreditCard,
            },
            {
              title: t("layout.nav.cortD"),
              path: "/cotton/court-decisions",
              icon: Axe,
            },
            {
              title: t("layout.nav.receivingProducts"),
              path: "/cotton/receiving-products",
              icon: ShoppingCart,
            },
          ],
        },
        {
          title: t("layout.nav.fruit"),
          path: "",
          icon: Vegan,
          subItems: [
            {
              title: t("layout.nav.docs"),
              path: "/fruits/document",
              icon: FileText,
            },
            {
              title: t("layout.nav.conts"),
              path: "/fruits/contracts",
              icon: FileSignature,
            },
            {
              title: t("layout.nav.apps"),
              path: "/fruits/applications",
              icon: ClipboardList,
            },
            {
              title: t("layout.nav.percents"),
              path: "/fruits/percents",
              icon: Percent,
            },
            {
              title: t("layout.nav.pays"),
              path: "/fruits/payments",
              icon: CreditCard,
            },
            {
              title: t("layout.nav.cortD"),
              path: "/fruits/court-decisions",
              icon: Gavel,
            },
            {
              title: t("layout.nav.receivingProducts"),
              path: "/fruits/receiving-products",
              icon: ShoppingCart,
            },
          ],
        },
        {
          title: t("layout.nav.leasing"),
          path: "",
          icon: HandCoins,
          subItems: [
            {
              title: t("layout.nav.docs"),
              path: "/leasing/document",
              icon: FileText,
            },
            {
              title: t("layout.nav.conts"),
              path: "/leasing/contracts",
              icon: FileSignature,
            },
            {
              title: t("layout.nav.apps"),
              path: "/leasing/applications",
              icon: ClipboardList,
            },
            {
              title: t("layout.nav.percents"),
              path: "/leasing/percents",
              icon: Percent,
            },
            {
              title: t("layout.nav.pays"),
              path: "/leasing/payments",
              icon: CreditCard,
            },
            {
              title: t("layout.nav.cortD"),
              path: "/leasing/court-decisions",
              icon: Gavel,
            },
            {
              title: t("layout.nav.receivingProducts"),
              path: "/leasing/receiving-products",
              icon: ShoppingCart,
            },
          ],
        },
        {
          title: t("layout.nav.guide"),
          path: "",
          icon: Settings2,
          subItems: [
            {
              title: t("layout.nav.roles"),
              path: "/guide/roles",
              icon: KeySquare,
            },
            { title: t("layout.nav.users"), path: "/guide/users", icon: Users },
            {
              title: t("layout.nav.parts"),
              path: "/guide/partners",
              icon: Handshake,
            },
            {
              title: t("layout.nav.cats"),
              path: "/guide/categories",
              icon: Grid,
            },
          ],
        },
      ],
    },
  ];

  const filteredItems = sidebarItems.map((group) => ({
    ...group,
    items: filterItemsByPermission(group.items),
  }));

  const hasItems = filteredItems.some((group) => group.items.length > 0);

  if (!hasItems) {
    return (
      <div className="fixed inset-0 bg-white z-50">
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-600">Sizga foydalanish huquqi mavjud emas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="pt-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Site Map</h1>
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredItems.map((group) => (
            <div key={group.id}>
              {group.items.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {group.label}
                  </h2>
                  <ul className="flex flex-wrap gap-10 justify-between">
                    {group.items.map((item: any) => (
                      <li key={item.path || item.title}>
                        {item.path && item.path !== "" ? (
                          <Link
                            href={item.path}
                            className="flex items-center text-primary hover:underline"
                          >
                            {item.icon && (
                              <item.icon className="w-5 h-5 mr-2" />
                            )}
                            {item.title}
                          </Link>
                        ) : (
                          <span className="flex items-center text-gray-900">
                            {item.icon && (
                              <item.icon className="w-5 h-5 mr-2" />
                            )}
                            {item.title}
                          </span>
                        )}
                        {item.subItems && (
                          <ul className="ml-6 mt-2 space-y-2">
                            {item.subItems.map((subItem: any) => (
                              <li key={subItem.path}>
                                <Link
                                  href={subItem.path}
                                  className="flex items-center text-gray-700 hover:text-primary"
                                >
                                  {subItem.icon && (
                                    <subItem.icon className="w-4 h-4 mr-2" />
                                  )}
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
