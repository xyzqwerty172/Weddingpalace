"use client";

import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Typography, Container } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import Link from "next/link";
import { grey } from "src/theme/palette";

export default function ActivityView(params) {
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
          Үйл ажиллагааны чиглэл, баримтлах зарчмууд
        </Typography>

        <Typography variant="h5">
          <Link
            href={
              "/assets/documents/pdf/uil-ajillagaanii-terguuleh-chiglel.pdf"
            }
            style={{ color: grey[1000] }}
          >
            Үйл ажиллагааны тэргүүлэх чиглэл
          </Link>
        </Typography>

        <Typography variant="h5">
          <Link
            href={
              "/assets/documents/pdf/gerleh-yosloliin-ordnii-uil-ajillagaanii-chiglel.pdf"
            }
            style={{ color: grey[1000] }}
          >
            Гэрлэх ёслолын ордний үйл ажиллагааны чиглэл
          </Link>
        </Typography>
      </Container>
    </MainLayout>
  );
}
