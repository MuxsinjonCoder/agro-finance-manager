import CommonModal from "@/components/CommonModal";
import { useFinanceContractMonitoring } from "@/queries/contracts";
import { GotContractData, MonitoringContract } from "@/types/contracts";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { GotDocs } from "@/types/doc";
import { format } from "date-fns";

interface MonitoringModalProps {
  selectedItem: GotContractData | null;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const formatNumber = (value: number) => {
  return parseFloat(value.toFixed(2));
};

export default function MonitoringModal(props: MonitoringModalProps) {
  const { selectedItem, showModal, setShowModal } = props;
  const { data, isLoading } = useFinanceContractMonitoring(
    Number(selectedItem?.id)
  );

  const { t } = useTranslation();

  const columns: ColumnDef<MonitoringContract>[] = useMemo(
    () => [
      {
        accessorKey: "monthNumber",
        header: t("tables.month"),
      },
      {
        accessorKey: "totalBalance",
        header: t("tables.totalBalance"),
        cell: ({ row }) => formatNumber(row.getValue("totalBalance")),
      },
      {
        accessorKey: "monthlyBalance",
        header: t("tables.monthlyBalance"),
        cell: ({ row }) => formatNumber(row.getValue("monthlyBalance")),
      },
      {
        accessorKey: "monthlyInterestBalance",
        header: t("tables.monthlyInterestBalance"),
        cell: ({ row }) => formatNumber(row.getValue("monthlyInterestBalance")),
      },
      {
        accessorKey: "startDate",
        header: t("tables.startDate"),
        cell: ({ row }) =>
          format(new Date(row.getValue("startDate")), "dd.MM.yyyy"),
      },
      {
        accessorKey: "endDate",
        header: t("tables.endDate"),
        cell: ({ row }) =>
          format(new Date(row.getValue("endDate")), "dd.MM.yyyy"),
      },
    ],
    [t]
  );

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <CommonModal
      width="800px"
      visible={showModal}
      onClose={() => setShowModal(false)}
      title={t("modals.monitoring")}
      loading={isLoading}
    >
      <div>
        {data?.status === "OK" && data.data.length > 0 && (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </CommonModal>
  );
}
