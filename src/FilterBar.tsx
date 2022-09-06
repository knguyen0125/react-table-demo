import { Box, Button, Popover, Text } from "@mantine/core";
import { listings } from "./makeData";

export const ListingFilter = () => {
  return (
    <Popover width={300} position="bottom" offset={2}>
      <Popover.Target>
        <Button>Listings</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Box
          sx={{ maxHeight: "200px", overflowX: "hidden", overflowY: "scroll" }}
        >
          {listings.map((listing) => (
            <Text key={listing.id}>
              {listing.referenceNumber} ({listing.id})
            </Text>
          ))}
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
};

export const FilterBar = () => {
  return <ListingFilter />;
};
