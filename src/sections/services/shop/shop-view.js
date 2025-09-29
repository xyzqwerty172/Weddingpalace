"use client";

import MainLayout from "src/layouts/main";
import { Container, Box, Typography, Stack } from "@mui/material";
import HeroImage from "src/components/image/hero-image";
import { caligraphicFont } from "src/theme/typography";
import ResponsiveServiceImage from "src/components/image/responsive-service-image";

export default function ShopView(params) {
  const imgUrl = "/assets/images/services/hudaldaa-uilchilgee.jpg";

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
            Худалдаа үйлчилгээ
          </Typography>

          {/* Display the service image with responsive design */}
          <ResponsiveServiceImage
            src={imgUrl}
            alt="Худалдаа үйлчилгээ"
            mobileRatio="4/3"
          />
        </Stack>
      </Container>
    </MainLayout>
  );
}
