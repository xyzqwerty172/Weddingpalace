"use client";

import MainLayout from "src/layouts/main";
import { Container, Box, Typography, Stack } from "@mui/material";
import HeroImage from "src/components/image/hero-image";
import { caligraphicFont } from "src/theme/typography";
import ResponsiveServiceImage from "src/components/image/responsive-service-image";

export default function WeddingView(params) {
  const imgUrl = "/assets/images/services/gerleh-ysloliin-uichilgee.jpg";

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
            Гэрлэх ёслолын үйлчилгээ
          </Typography>

          {/* Display the service image with responsive design */}
          <ResponsiveServiceImage
            src={imgUrl}
            alt="Гэрлэх ёслолын үйлчилгээ"
            mobileRatio="4/3"
          />
        </Stack>
      </Container>
    </MainLayout>
  );
}
