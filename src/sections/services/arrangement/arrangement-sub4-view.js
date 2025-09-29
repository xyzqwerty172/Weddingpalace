"use client";
import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Container, Typography, Stack, Button, Box } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import ResponsiveServiceImage from "src/components/image/responsive-service-image";
import Link from "@mui/material/Link";
import { RouterLink } from "src/routes/components";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import Iconify from "src/components/iconify";

export default function ArrangementView4(params) {
  const length = 5;

  return (
    <MainLayout>
      <HeroImageService
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={
          "Гэрлэх ёслолын ордон таны хуримын өдрийг Ёслол төгөлдөр зохион байгуулна"
        }
        title={"Зохион Байгуулах Үйлчилгээ"}
      />
      <Container>
        <Stack spacing={2} my={2}>
          <Typography
            variant="h2"
            fontWeight={"bold"}
            textAlign={"center"}
            fontFamily={caligraphicFont.style.fontFamily}
          >
            Зохион Байгуулах Үйлчилгээ
          </Typography>
          <Box>
            <CustomBreadcrumbs
              sx={{ width: 1 }}
              links={[
                {
                  name: "Залуу хосын хурим",
                  href: "/service/arrangement/1",
                  icon: <Iconify icon="eva:heart-outline" />,
                },
                {
                  name: "Есөн эрдэнийн хурим",
                  href: "/service/arrangement/2",
                  icon: <Iconify icon="eva:camera-outline" />,
                },
                {
                  name: "Явуулын хурим",
                  href: "/service/arrangement/3",
                  icon: <Iconify icon="eva:car-outline" />,
                },
                {
                  name: "Онлайн хурим",
                  href: "/service/arrangement/4",
                  icon: <Iconify icon="eva:globe-outline" />,
                },
              ]}
            />
          </Box>
          <Typography variant={"h5"} textAlign={"center"} my={3}>
            Онлайн ёслолын үйлчилгээ
          </Typography>
          {/* 4 links will be here */}
          <Typography>
            Гадаадад болон хөдөө орон нутагт гэрлэх ёслолоо хийж буй хосууд
            тухайн цагтаа ёслол үйлчилгээний ажилтантай холбогдон / ёслол
            удридагч , ерөөлч / гэрлэх ёслолоо хийх боломжтой үйлчилгээ юм.
          </Typography>

          <ResponsiveServiceImage
            src={`/assets/images/services/arrangement/4/1.jpg`}
            alt="Онлайн ёслолын үйлчилгээ"
            mobileRatio="4/3"
          />
          {/* <CarouselCenterMode data={arrangementData.slice(0, 4)} /> */}
          {/* <ControlledForm /> */}
        </Stack>
      </Container>
    </MainLayout>
  );
}
