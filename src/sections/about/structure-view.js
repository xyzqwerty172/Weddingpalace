"use client";

import MainLayout from "src/layouts/main";
import { Container, Box, Typography, Stack } from "@mui/material";
import HeroImage from "src/components/image/hero-image";
import { caligraphicFont } from "src/theme/typography";
import { useResponsive } from "src/hooks/use-responsive";
import Image from "src/components/image/image";

export default function StructureView(params) {
  const mdUp = useResponsive("up", "md");
  const imgUrl = "/assets/images/about/butets.jpg";

  // Static PDF files data
  const pdfFiles = [
    {
      title: "Бүтэц, зохион байгуулалт",
      url: "https://bcmtvifodfragxpphkyl.supabase.co/storage/v1/object/public/documents/Butets.pdf"
    },
    {
      title: "ТУЗ",
      url: "https://bcmtvifodfragxpphkyl.supabase.co/storage/v1/object/public/documents/Tuz.pdf"
    }
  ];

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
            Бүтэц
          </Typography>

          {/* Display the structure image */}
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            {mdUp ? (
              <Image src={imgUrl} ratio={"16/9"} />
            ) : (
              <Image src={imgUrl} ratio={"3/4"} />
            )}
          </Box>

          {/* Display PDF files */}
          <Box sx={{ mt: 6 }}>
            <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
              {pdfFiles.map((pdf, index) => (
                <li key={index} style={{ marginBottom: 8 }}>
                  <a
                    href={pdf.url}
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
                    {pdf.title}
                  </a>
                </li>
              ))}
            </Box>
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  );
}