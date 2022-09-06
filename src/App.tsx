import { createColumnHelper, SortingState } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { Table } from "./components/table/Table";
import { Text, Box } from "@mantine/core";
import moment, { Moment } from "moment";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { bookings, Booking, listings } from "./makeData";
import { FilterBar } from "./FilterBar";
import axios from "axios";

function formatDateRange(start: moment.Moment, end: moment.Moment) {
  const isSameMonth = start.isSame(end, "month");
  const isSameYear = start.isSame(end, "year");

  const startDateFormat = `D${isSameMonth ? "" : " MMM"}${
    isSameYear ? "" : ", YYYY"
  }`;

  return `${start.format(startDateFormat)} - ${end.format("D MMM, YYYY")}`;
}

function formatListingName(listingId: number) {
  const listing = listings.find((l) => l.id === listingId);
  return `${listing?.referenceNumber} (${listing?.id})`;
}

const BookingDetailsTable: React.FC<{ data: Booking[] }> = ({ data }) => {
  const columnHelper = createColumnHelper<Booking>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("status", {
        header: () => <Text>Status</Text>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("id", {
        header: () => <Text>Ref</Text>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("to", {
        header: "Dates & location",
        cell: (info) => (
          <div>
            <div>
              {formatDateRange(
                moment(info.row.original["from"]),
                moment(info.row.original["to"])
              )}
            </div>
            <div>{formatListingName(info.row.original["listingId"])}</div>
          </div>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("createdAt", {
        header: () => <Text>Created</Text>,
        cell: (info) => {
          if (!info.getValue()) {
            return null;
          }

          const createdAt = moment(info.getValue());
          if (moment().diff(createdAt, "d") < 30) {
            return createdAt.fromNow();
          }

          return createdAt.format("D MMM, YYYY");
        },
      }),
      columnHelper.accessor("adults", {
        header: () => <Text>Guest details</Text>,
        cell: (info) => (
          <Box>
            <div>
              {info.row.original.guest.firstName}{" "}
              {info.row.original.guest.lastName}
            </div>
            <div>
              <span>{info.row.original.adults} adults</span>
              {info.row.original.children ? (
                <span>
                  {" + "}
                  {info.row.original.children}{" "}
                  {info.row.original.children > 1 ? "children" : "child"}
                </span>
              ) : null}
            </div>
          </Box>
        ),
        enableSorting: false,
      }),
    ],
    [columnHelper]
  );

  return <Table columns={columns} data={data} />;
};

export default function App() {
  const [sortState, setSortState] = React.useState<SortingState>();

  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const response = await axios.get("/bookings");

      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // return <FilterBar />;

  console.log(data);

  return <BookingDetailsTable data={data.results} />;
}
