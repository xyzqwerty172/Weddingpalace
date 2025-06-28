"use client";

import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Typography, Container } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import Link from "next/link";
import { grey } from "src/theme/palette";

export default function TransparencyCompany3(params) {
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
          Гүйцэтгэлийн төлөвлөгөө
        </Typography>

        <Typography variant="h5">
          <Link
            href={"/assets/documents/pdf/guitselgeliin-tuluvluguu-2024-on.pdf"}
            style={{ color: grey[1000] }}
          >
            Гүйцэтгэлийн төлөвлөгөө 2024 он
          </Link>
        </Typography>

        <Typography variant="h5">
          <Link
            href={
              "/assets/documents/pdf/guitselgelin-tuluvluguu-bielelt-2023-on.pdf"
            }
            style={{ color: grey[1000] }}
          >
            Гүйцэтгэлийн төлөвлөгөө биелэлт 2023 он
          </Link>
        </Typography>
        <Typography variant="h5">
          <Link
            href={
              "/assets/documents/pdf/guitselgelin-tuluvluguu-bielelt-2022-on.pdf"
            }
            style={{ color: grey[1000] }}
          >
            Гүйцэтгэлийн төлөвлөгөө биелэлт 2022 он
          </Link>
        </Typography>
      </Container>
    </MainLayout>
  );
}
