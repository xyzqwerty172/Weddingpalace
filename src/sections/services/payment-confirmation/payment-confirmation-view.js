"use client";

import MainLayout from "src/layouts/main";
import { Container, Box, Typography, Stack, Button } from "@mui/material";
import HeroImage from "src/components/image/hero-image";
import { caligraphicFont } from "src/theme/typography";
import { useRouter } from "next/navigation";

export default function PaymentConfirmationView() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <MainLayout>
      <HeroImage
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={""}
        title={""}
      />
      <Container sx={{ marginTop: "5px", marginBottom: "4rem" }}>
        <Stack spacing={4}>
          <Typography
            variant="h2"
            textAlign={"center"}
            fontFamily={caligraphicFont.style.fontFamily}
            sx={{ mt: 4, color: "#00AF9A" }}
          >
            Төлбөрийн баталгаажуулалт
          </Typography>

          {/* Payment Confirmation Content */}
          <Box sx={{
            mt: 6,
            p: 3,
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 2,
            backgroundColor: "grey.50"
          }}>
            <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600, mb: 4, textAlign: "center" }}>
              Хэрэв та төлбөрөө төлсөн бол:
            </Typography>

            <Stack spacing={3} sx={{ mt: 4 }}>
              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  <strong>•</strong> Хосууд өөрсдийн эрххэлдэг ажил
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  <strong>•</strong> Мөнгө төлсөн баримт
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  <strong>•</strong> Албан ёсны гэрийн хаяг
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  <strong>•</strong> Гэрлэлтийн гэрчилгээний лавлагаа /"E Mongolia"-аас аваад файл хэлбэрээр нь" явуулаарай.
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    fontWeight: 500,
                    textAlign: "justify"
                  }}
                >
                  Боломжгүй бол зурган хэлбэрээр тод аваад явуулна уу.
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Back Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleGoBack}
              sx={{
                py: 2,
                px: 4,
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderRadius: 3,
                backgroundColor: "#00AF9A",
                color: "white",
                "&:hover": {
                  backgroundColor: "#009B8A",
                  transform: "translateY(-2px)",
                  boxShadow: 4
                },
                transition: "all 0.3s ease"
              }}
            >
              Буцах
            </Button>
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  );
}