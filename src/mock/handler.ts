import { rest } from "msw";
import { faker } from "@faker-js/faker";
import moment from "moment";

export type Listing = {
  id: number;
  referenceNumber: string;
};

export type Booking = {
  id: string;
  listingId: number;
  from: string;
  to: string;
  createdAt: string;
  status: string;
  adults: number;
  children: number;
  guest: {
    firstName: string;
    lastName: string;
  };
};

export function makeListing(): Listing {
  return {
    id: faker.datatype.number({ min: 0, max: 100000 }),
    referenceNumber: faker.company.name(),
  };
}

export function makeListings(num: number): Listing[] {
  return new Array(num).fill(true).map(() => makeListing());
}

export const listings = makeListings(10);

export function makeBooking(): Booking {
  const from = faker.date.between("2020-01-01", "2030-01-01");
  const to = faker.date.soon(180, from);
  const createdAt = faker.date.recent(180, new Date());

  return {
    id: faker.random.alphaNumeric(6, { casing: "upper", bannedChars: ["0"] }),
    listingId: listings[faker.datatype.number({ min: 0, max: 9 })].id,
    from: moment(from).format("YYYY-MM-DD"),
    to: moment(to).format("YYYY-MM-DD"),
    createdAt: moment(createdAt).format(),
    status: "completed",
    adults: faker.datatype.number({ min: 1, max: 10 }),
    children: faker.datatype.number({ min: 0, max: 5 }),
    guest: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
  };
}

export function makeBookings(num: number): Booking[] {
  return new Array(num).fill(true).map(() => makeBooking());
}

export const bookings = makeBookings(100);

export const handlers = [
  rest.get("/bookings", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        pagination: {
          nextCursor: "123",
        },
        results: bookings,
      })
    );
  }),
];
