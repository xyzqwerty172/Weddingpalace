"use client";

import MainLayout from "src/layouts/main";
import { Container, Box, Typography, Stack } from "@mui/material";
import HeroImage from "src/components/image/hero-image";
import { caligraphicFont } from "src/theme/typography";
import { useResponsive } from "src/hooks/use-responsive";
import Image from "src/components/image/image";

export default function ShopView(params) {
  const mdUp = useResponsive("up", "md");
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

          {/* Display the service image */}
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <Image 
              src={imgUrl} 
              sx={{ 
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: 2,
                boxShadow: 3
              }} 
            />
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  );
}
