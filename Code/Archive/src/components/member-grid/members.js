"use client";

import { Grid } from "@mui/material";
import GridItem from "src/components/grid-item/grid-item";

export default function Members({ data }) {
  return (
    <Grid
      container
      spacing={2}
      margin={"auto"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {data.map((item) => (
        <GridItem
          key={item.id}
          imgURL={item.imgURL}
          description={item.description}
        />
      ))}
    </Grid>
  );
}
