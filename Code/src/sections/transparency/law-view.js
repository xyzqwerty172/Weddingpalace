"use client";

import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Typography, Container } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import Link from "next/link";
import { grey } from "src/theme/palette";

export default function LawView(params) {
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
          Хууль эрх зүй
        </Typography>

        <Typography variant="h5">
          <Link
            href={"/assets/documents/pdf/tsalin-huls-juram.pdf"}
            style={{ color: grey[1000] }}
          >
            Хууль дүрэм журам
          </Link>
        </Typography>

        <Typography variant="h5">
          <Link
            href={"/assets/documents/pdf/Үр дүн-журам.pdf"}
            style={{ color: grey[1000] }}
          >
            Үр дүн журам
          </Link>
        </Typography>

        <Typography variant="h5">
          <Link
            href={"/assets/documents/pdf/Дотоод журам.pdf"}
            style={{ color: grey[1000] }}
          >
            Дотоод журам
          </Link>
        </Typography>

        <Typography variant="h5">
          <Link
            href={"/assets/documents/pdf/dotood-hynalt-shalgaltiin-juram.pdf"}
            style={{ color: grey[1000] }}
          >
            Дотоод хяналт шалгалтын журам
          </Link>
        </Typography>
        <Typography variant="h5">
          <Link
            href={"/assets/documents/pdf/arhiv-juram.pdf"}
            style={{ color: grey[1000] }}
          >
            Архивын цахим баримтын хадгалалт хамгаалалт ашиглалтын журам
          </Link>
        </Typography>
        <Typography variant="h5">
          <Link
            href={"/assets/documents/pdf/hudulmuriin-dotood-juram.pdf"}
            style={{ color: grey[1000] }}
          >
            Хөдөлмөрийн дотоод журам
          </Link>
        </Typography>
      </Container>
    </MainLayout>
  );
}
