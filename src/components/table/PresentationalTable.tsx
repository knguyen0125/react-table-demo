import { Box, BoxProps, Table as MantineTable } from "@mantine/core";
import { flexRender, Table as ReactTable } from "@tanstack/react-table";
import React, { PropsWithChildren } from "react";
import { TbArrowUp, TbArrowDown, TbArrowsUpDown } from "react-icons/tb";

const TableHead: React.FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => {
  return (
    <Box
      component="thead"
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[2],
      })}
      {...rest}
    >
      {children}
    </Box>
  );
};

const TableHeadRow: React.FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => {
  return (
    <Box component="tr" {...rest}>
      {children}
    </Box>
  );
};

const TableHeadCell: React.FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => {
  return (
    <Box component="th" {...rest}>
      {children}
    </Box>
  );
};

export const PresentationalTable: React.FC<{ table: ReactTable<any> }> = ({
  table,
}) => {
  return (
    <MantineTable>
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableHeadRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHeadCell key={header.id}>
                {header.isPlaceholder ? null : (
                  <Box
                    sx={[
                      header.column.getCanSort()
                        ? {
                            cursor: "pointer",
                            userSelect: "none",
                          }
                        : {},
                      {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      },
                    ]}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Box component="span" sx={() => ({ flex: "1" })}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Box>
                    <span>
                      {header.column.getCanSort()
                        ? {
                            asc: <Box component={TbArrowUp} />,
                            desc: <TbArrowDown />,
                          }[header.column.getIsSorted() as string] ?? (
                            <TbArrowsUpDown />
                          )
                        : null}
                    </span>
                  </Box>
                )}
              </TableHeadCell>
            ))}
          </TableHeadRow>
        ))}
      </TableHead>
      <Box component="tbody">
        {table.getRowModel().rows.map((row) => (
          <Box component="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box component="td" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Box component="tfoot">
        {table.getFooterGroups().map((footerGroup) => (
          <Box component="tr" key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <Box component="td" key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </MantineTable>
  );
};
