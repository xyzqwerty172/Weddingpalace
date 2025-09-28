"use client";
import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import Image from "src/components/image/image";
import { Container, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import { Grid } from "@mui/material";
import { useDocuments } from "src/hooks/use-documents";
import PDFViewer from "src/components/pdf-viewer";

export default function TranparencyCompanyView(params) {
  const { documents, loading, error } = useDocuments('/transparency/company');

  return (
    <MainLayout>
      <HeroImageService
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={
          "The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style."
        }
        title={"Байгууллагын ил тод байдал"}
      />

      <Typography
        variant="h2"
        align="center"
        my={5}
        fontFamily={caligraphicFont.style.fontFamily}
      >
        Байгууллагын ил тод байдал
      </Typography>

      <Container>
        <Grid container>
          <Grid item md={6}>
            <Image
              src={"/assets/images/company/baiguullagin-il-tod-baidal-2.jfif"}
            />
          </Grid>
          <Grid item md={6}>
            <Image
              src={"/assets/images/company/baiguullagin-il-tod-baidal-1.jfif"}
            />
          </Grid>
        </Grid>

        {/* PDF Documents Section */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h3"
            align="center"
            mb={4}
            fontFamily={caligraphicFont.style.fontFamily}
          >
            Холбоотой баримтууд
          </Typography>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Баримт ачаалахад алдаа гарлаа: {error}
            </Alert>
          )}

          {!loading && !error && (
            <PDFViewer 
              documents={documents} 
              pagePath="/transparency/company" 
            />
          )}
        </Box>
      </Container>
    </MainLayout>
  );
}
