"use client";

import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Container, Typography } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import { Grid } from "@mui/material";
import Image from "src/components/image";

export default function TransparencyLawGoalView(params) {
  return (
    <MainLayout>
      <HeroImageService
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={
          "The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style."
        }
        title={"Lorem Ipsum"}
      />
      <Container>
        <Typography
          variant="h2"
          align="center"
          my={5}
          fontFamily={caligraphicFont.style.fontFamily}
        >
          Эдийн засгийн үр ашгийг нэмэгдүүлэх зорилтын биелэлт
        </Typography>
        <Grid container spacing={2}>
          <Grid item key={"Image1"} xs={12} lg={6}>
            <Image
              src="/assets/images/transparency/finance/1.jpg"
              ratio="3/4"
            />
          </Grid>
          <Grid item key={"Image2"} xs={12} lg={6}>
            <Image
              src="/assets/images/transparency/finance/2.jpg"
              ratio="3/4"
            />
          </Grid>
          <Grid item key={"Image3"} xs={12} lg={6}>
            <Image
              src="/assets/images/transparency/finance/3.jpg"
              ratio="3/4"
            />
          </Grid>
          <Grid item key={"Image4"} xs={12} lg={6}>
            <Image
              src="/assets/images/transparency/finance/4.jpg"
              ratio="3/4"
            />
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
}
