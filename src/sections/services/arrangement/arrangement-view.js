"use client";

import MainLayout from "src/layouts/main";
import { Container, Box, Typography, Stack } from "@mui/material";
import HeroImage from "src/components/image/hero-image";
import { caligraphicFont } from "src/theme/typography";
import { useResponsive } from "src/hooks/use-responsive";
import Image from "src/components/image/image";

export default function ArrangementView(params) {
  const mdUp = useResponsive("up", "md");
  const imgUrl = "/assets/images/services/uilchilgeenii-turul.jpg";

  return (
    <MainLayout>
      <HeroImage
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={""}
        title={""}
      />
      <Container sx={{ marginTop: "5px" }}>
        <Stack spacing={4}>
          <Typography
            variant="h2"
            textAlign={"center"}
            fontFamily={caligraphicFont.style.fontFamily}
            sx={{ mt: 4 }}
          >
            Үйлчилгээний төрөл
          </Typography>

          {/* Display the service image */}
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            {mdUp ? (
              <Image src={imgUrl} ratio={"16/9"} />
            ) : (
              <Image src={imgUrl} ratio={"3/4"} />
            )}
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  );
}
