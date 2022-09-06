import {
  useReactTable,
  TableOptions,
  getCoreRowModel,
} from "@tanstack/react-table";
import React from "react";
import { PresentationalTable } from "./PresentationalTable";

export const Table: React.FC<Pick<TableOptions<any>, "data" | "columns">> = ({
  data,
  columns,
}) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return <PresentationalTable table={table} />;
};
