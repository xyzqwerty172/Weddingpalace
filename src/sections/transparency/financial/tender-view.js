"use client";

import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Typography, Container, Box } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import { useDocuments } from "src/hooks/useDocuments";
import PageDocumentsViewer from "src/components/page-documents-viewer";

export default function TenderView() {
  const { documents, loading, error } = useDocuments('/transparency/financial/tender');

  return (
    <MainLayout>
      <HeroImageService
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={
          "Гэрлэх ёслолын ордны тендерийн мэдээлэл, тендерийн баримт бичиг болон холбогдох материалууд"
        }
        title={"ТЕНДЕР"}
      />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ ...caligraphicFont, mb: 3 }}>
            ТЕНДЕР
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Гэрлэх ёслолын ордны тендерийн мэдээлэл, тендерийн баримт бичиг, шалгуур үзүүлэлт болон холбогдох бусад материалууд.
          </Typography>
        </Box>

        <PageDocumentsViewer 
          documents={documents} 
          loading={loading} 
          error={error}
          emptyMessage="Одоогоор тендерийн мэдээлэл байхгүй байна."
        />
      </Container>
    </MainLayout>
  );
}
