import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { caligraphicFont } from "src/theme/typography";

import Image from "src/components/image/image";

export default function TextWithImage({ title, imgURL, content }) {
  return (
    <Container sx={{ mb: 10 }}>
      <Typography
        variant="h2"
        align="center"
        my={5}
        fontFamily={caligraphicFont.style.fontFamily}
      >
        {title}
      </Typography>

      <Grid container spacing={3}>
        <Grid item key={"picture"} xs={12} md={6}>
          <Image
            dir="ltr"
            alt={"Greetings"}
            src={imgURL}
            ratio="1/1"
            sx={{
              border: 0,
              borderRadius: 1,
            }}
          />
        </Grid>

        <Grid item key={"paragraph"} xs={12} md={6}>
          <Typography textAlign={"justify"} fontSize={"1.25rem"}>
            {content}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
