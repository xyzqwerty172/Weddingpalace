import Image from "../image/image";
import { Typography, Grid } from "@mui/material";
export default function GridItem({ imgURL, description }) {
  return (
    <Grid item maxWidth={180} sm={4} md={3}>
      <Image src={imgURL} ratio={"1/1"} sx={{ borderRadius: 1 }} />
      <Typography>{description}</Typography>
    </Grid>
  );
}
