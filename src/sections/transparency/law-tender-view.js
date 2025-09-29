"use client";

import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Typography, Container, Box, Stack } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";

export default function TransparencyLawTenderView() {
  const tenderDocuments = [
    {
      id: 1,
      title: "ГЭРЛЭХ ЁСЛОЛЫН ОРДОН ОНӨААТҮГ-ЫН 2025 ОНЫ ХУДАЛДАН АВАХ АЖИЛЛАГААНЫ ШАЛГАРСАН БОЛОН ШАЛГАРААГҮЙ ТАЛААРХ МЭДЭЭЛЭЛ",
      file_url: "https://bcmtvifodfragxpphkyl.supabase.co/storage/v1/object/public/documents/Gerleh-ysloliin-ordon-tender.pdf"
    }
  ];

  return (
    <MainLayout>
      <HeroImageService
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={
          "The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style."
        }
        title={"Lorem Ipsum"}
      />
      <Container sx={{ marginTop: "5px" }}>
        <Stack spacing={4}>
          <Typography
            variant="h2"
            textAlign={"center"}
            fontFamily={caligraphicFont.style.fontFamily}
            sx={{ mt: 4 }}
          >
            ТЕНДЕР
          </Typography>

          <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
            {tenderDocuments.map((doc) => (
              <li key={doc.id} style={{ marginBottom: 12 }}>
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#00AF9A',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    fontSize: '1.15rem',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  {doc.title}
                </a>
              </li>
            ))}
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  );
}