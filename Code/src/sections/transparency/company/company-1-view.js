"use client";

import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Typography, Container } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import Link from "next/link";
import { grey } from "src/theme/palette";

export default function TransparencyCompany1(params) {
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
          Дүрэм журам
        </Typography>

        <Typography variant="h5">
          <Link
            href={"/assets/documents/pdf/alban-tomiloltiin-talaar-medeelel.pdf"}
            style={{ color: grey[1000] }}
          >
            Албан томилолтын талаар мэдээлэл
          </Link>
        </Typography>

        <Typography variant="h5">
          <Link
            href={"/assets/documents/pdf/arhiviin-durem.pdf"}
            style={{ color: grey[1000] }}
          >
            Архивын дүрэм
          </Link>
        </Typography>
        <Typography variant="h5">
          <Link
            href={"/assets/documents/pdf/gerleh-yosloliin-ordnii-durem.pdf"}
            style={{ color: grey[1000] }}
          >
            Гэрлэх ёслолын ордний дүрэм
          </Link>
        </Typography>
        <Typography variant="h5">
          <Link
            href={"/assets/documents/pdf/halamjiin-il-tod-baidal.pdf"}
            style={{ color: grey[1000] }}
          >
            Халамжийн ил тод байдал
          </Link>
        </Typography>
      </Container>
    </MainLayout>
  );
}
