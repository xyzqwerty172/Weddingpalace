"use client";

import MainLayout from "src/layouts/main";
import HeroImage from "src/components/image/hero-image";
import { Container, Typography, Stack } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import { useResponsive } from "src/hooks/use-responsive";
import Image from "src/components/image/image";

export default function GoalView() {
  const mdUp = useResponsive("up", "md");
  const imgUrl = "/assets/images/goal/zorilgo-alsiin-haraa.png";

  return (
    <MainLayout>
      <HeroImage
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={""}
        title={""}
      />
      <Container sx={{ marginTop: "5px", marginBottom: "2rem" }}>
        <Stack spacing={3}>
          <Typography
            variant="h2"
            textAlign={"center"}
            fontFamily={caligraphicFont.style.fontFamily}
          >
            Эрхэм зорилго
          </Typography>

          <Typography 
            variant="body1" 
            textAlign={"center"}
            sx={{ mb: 3, lineHeight: 1.8, fontSize: "1.1rem" }}
          >
            Монгол төрийн нэрийн өмнөөс гэр бүлийн бат бэх холбоог бататгах сургалт зохион байгуулж, гал голомт бадраах хуримын ёслолын үйл ажиллагааг ёслол төгөлдөр зохион байгуулна.
          </Typography>

          {mdUp ? (
            <Image src={imgUrl} ratio={"16/9"} />
          ) : (
            <Image src={imgUrl} ratio={"3/4"} />
          )}
        </Stack>
      </Container>
    </MainLayout>
  );
}