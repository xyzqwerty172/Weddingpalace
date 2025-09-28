"use client";

import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Typography, Container, Box } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import { useDocuments } from "src/hooks/use-documents";

export default function CompanyReportView() {
  const { documents, loading, error } = useDocuments('/transparency/company/report');

  // Static PDF files for this page
  const staticDocuments = [
    {
      title: "Олон нийтийн арга хэмжээ",
      file_url: "https://bcmtvifodfragxpphkyl.supabase.co/storage/v1/object/public/documents/Olon-niitiin-arga-hemjee.pdf"
    }
  ];

  // Combine static documents with database documents
  const allDocuments = [...staticDocuments, ...(documents || [])];

  return (
    <MainLayout>
      <HeroImageService
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={
          "Байгууллагын ил тод байдлын тайлан, үйл ажиллагааны тайлан болон бусад тайлангууд"
        }
        title={"Тайлан"}
      />
      
      <Container sx={{ marginTop: "5px", marginBottom: "4rem" }}>
        <Typography
          variant="h2"
          textAlign={"center"}
          fontFamily={caligraphicFont.style.fontFamily}
          sx={{ mt: 4, mb: 6 }}
        >
          Тайлан
        </Typography>

        {/* Documents Section */}
        {allDocuments && allDocuments.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
              {allDocuments.map((doc, index) => (
                <li key={doc.id || index} style={{ marginBottom: 8 }}>
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
          </Box>
        )}

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

        {!loading && (!allDocuments || allDocuments.length === 0) && (
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Одоогоор мэдээлэл байхгүй байна.
          </Typography>
        )}
      </Container>
    </MainLayout>
  );
}
