"use client";

import MainLayout from "src/layouts/main";
import { Container, Box, Typography, Stack, Button } from "@mui/material";
import HeroImage from "src/components/image/hero-image";
import { caligraphicFont } from "src/theme/typography";
import { useResponsive } from "src/hooks/use-responsive";
import Image from "src/components/image/image";
import { useRouter } from "next/navigation";

export default function RentView() {
  const mdUp = useResponsive("up", "md");
  const router = useRouter();
  const imgUrl = "/assets/images/services/uilchilgeenii-tulbur.jpg";

  const handlePaymentConfirmation = () => {
    router.push('/service/payment-confirmation');
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
            sx={{ mt: 4 }}
          >
            Үйлчилгээний төлбөр
          </Typography>

          {/* Display the payment image */}
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            {mdUp ? (
              <Image src={imgUrl} ratio={"16/9"} />
            ) : (
              <Image src={imgUrl} ratio={"3/4"} />
            )}
          </Box>

          {/* Payment Information Section */}
          <Box sx={{
            mt: 6,
            p: 3,
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 2,
            backgroundColor: "grey.50"
          }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign={"center"}
              sx={{ mb: 4, color: "#00AF9A" }}
            >
              ТӨЛБӨР ХУРААМЖ
            </Typography>

            <Stack spacing={3}>
              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mb: 2, color: "#00AF9A" }}
                >
                  ТӨЛБӨР ТӨЛӨХ ДАНС:
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                  <strong>Худалдаа хөгжлийн банк</strong><br />
                  <strong>IBAN:</strong> 46000400 2600075886
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
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mb: 1, color: "#00AF9A" }}
                >
                  Хүлээн авагч байгууллага:
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                  Гэрлэх ёслолын ордон
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
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mb: 1, color: "#00AF9A" }}
                >
                  Гүйлгээний утга:
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                  Гэрлэх ёслол үйлдэх хосын овог нэр, ёслол хийх сар, өдрөө бичнэ үү!
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
                  Төлбөр тушаасан баримтаа гэрлэлтийн гэрчилгээний хуулбарын хамтаар
                  ёслол хийх өдрөөс сүүлийн хугацаа <strong>90 хоногийн өмнө</strong> захиалга баталгаажна.
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Payment Confirmation Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handlePaymentConfirmation}
              sx={{
                py: 2,
                px: 4,
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: 3,
                backgroundColor: "#00AF9A",
                "&:hover": {
                  backgroundColor: "#00AF9A",
                  transform: "translateY(-2px)",
                  boxShadow: 4
                },
                transition: "all 0.3s ease"
              }}
            >
              ХЭРЭВ ТА ТӨЛБӨРӨӨ ТӨЛСӨН БОЛ ЭНД ДАРНА УУ
            </Button>
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  );
}
