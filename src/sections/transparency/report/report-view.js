"use client";

import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Typography, Container, Box } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import { useDocuments } from "src/hooks/use-documents";

export default function ReportView(params) {
  const { documents, loading, error } = useDocuments('/transparency/report');

  return (
    <MainLayout>
      <HeroImageService
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={
          "Гэрлэх ёслолын ордны ил тод байдлын тайлан, үйл ажиллагааны тайлан болон бусад тайлангууд"
        }
        title={"Тайлан"}
      />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ ...caligraphicFont, mb: 3 }}>
            Тайлан
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Гэрлэх ёслолын ордны ил тод байдлын тайлан, үйл ажиллагааны тайлан, санхүүгийн тайлан болон бусад тайлангууд.
          </Typography>
        </Box>

        {loading && (
          <Typography variant="body1" textAlign="center">
            Ачааллаж байна...
          </Typography>
        )}

        {error && (
          <Typography variant="body1" color="error" textAlign="center">
            Алдаа гарлаа: {error}
          </Typography>
        )}

        {documents && documents.length > 0 && (
          <Box sx={{ mt: 4 }}>
            {documents.map((doc, index) => (
              <Box key={index} sx={{ mb: 3, p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {doc.title}
                </Typography>
                {doc.description && (
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {doc.description}
                  </Typography>
                )}
                {doc.file_url && (
                  <Typography variant="body2">
                    Файл: <a href={doc.file_url} target="_blank" rel="noopener noreferrer">Үзэх</a>
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        )}

        {!loading && (!documents || documents.length === 0) && (
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Одоогоор мэдээлэл байхгүй байна.
          </Typography>
        )}
      </Container>
    </MainLayout>
  );
}
