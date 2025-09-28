"use client";

import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Typography, Container, Box } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import { useDocuments } from "src/hooks/use-documents";

export default function TransparencyCompany3(params) {
  const { documents, loading, error } = useDocuments('/transparency/company/3');

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
        {/* Display all PDFs as simple links, like other company pages */}
        {!loading && !error && documents.length > 0 && (
          <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
            {documents.map((doc) => (
              <li key={doc.id} style={{ marginBottom: 4 }}>
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
        )}
      </Container>
    </MainLayout>
  );
}
