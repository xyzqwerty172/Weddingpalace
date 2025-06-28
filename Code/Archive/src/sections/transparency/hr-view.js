"use client";

import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Typography, Container } from "@mui/material";
import Link from "next/link";
import { grey } from "src/theme/palette";
import { caligraphicFont } from "src/theme/typography";
import Image from "src/components/image/image";

export default function TransparsencyHRView(params) {
  return (
    <MainLayout>
      <HeroImageService
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={
          "The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style."
        }
        title={"Хүний нөөцийн ил тод байдал"}
      />
      <Container>
        <Typography
          variant="h2"
          align="center"
          my={5}
          fontFamily={caligraphicFont.style.fontFamily}
        >
          Хүний нөөцийн ил тод байдал
        </Typography>

        <Container>
          {/* <Image src={"/assets/images/hr/hunii-nuutsiin-il-tod-baidal.avif"} /> */}
        </Container>
        <Typography variant="h5">
          <Link
            href={"/assets/documents/pdf/Албан тушаалын тодорхойлолт.pdf"}
            style={{ color: grey[1000] }}
          >
            Албан тушаалын тодорхойлолт
          </Link>
        </Typography>
        <Typography variant="h5">
          <Link
            href={"/assets/documents/pdf/hugjliin-tuluvluguu.pdf"}
            style={{ color: grey[1000] }}
          >
            Хөгжлийн төлөвлөгөө
          </Link>
        </Typography>
        <Typography variant="h5">
          <Link
            href={"/assets/documents/pdf/ajilchdiin-utas.pdf"}
            style={{ color: grey[1000] }}
          >
            Ажилчдын утас
          </Link>
        </Typography>
      </Container>
    </MainLayout>
  );
}
