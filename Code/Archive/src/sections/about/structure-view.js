"use client";

import MainLayout from "src/layouts/main";
import { Container, Box, Typography } from "@mui/material";
import HeroImage from "src/components/image/hero-image";
import { caligraphicFont } from "src/theme/typography";
import Link from "next/link";
import { grey } from "src/theme/palette";

export default function StructureView(params) {
  return (
    <MainLayout>
      <HeroImage
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={""}
        title={""}
      />
      <Container>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            variant="h2"
            fontWeight={"bold"}
            my={4}
            fontFamily={caligraphicFont.style.fontFamily}
          >
            Байгууллагын бүтэц
          </Typography>
          
          <Typography variant="h5">
            <Link
              href={"/assets/documents/pdf/Бүтэц.pdf"}
              style={{ color: grey[1000] }}
            >
              Бүтэц
            </Link>
          </Typography>
        </Box>
      </Container>
    </MainLayout>
  );
}
