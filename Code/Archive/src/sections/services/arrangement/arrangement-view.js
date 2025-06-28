"use client";

import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Container, Typography, Stack, Box, Grid } from "@mui/material";
import ControlledForm from "src/components/form";
import CarouselCenterMode from "src/components/carousel-view/carousel-center-mode";
import { caligraphicFont } from "src/theme/typography";
import arrangementData from "./arrangement-data";
import Iconify from "src/components/iconify";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

export default function ArrangementView(params) {
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
          <Box mb={2}>
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
          <Typography textAlign={"justify"} mb={4}>
            Бид гэр бүлийн амьдралд тохиолдох дахин давтагдашгүй алтан агшинг
            цаг хугацаанд нь хөнгөн шуурхай, соёлтой үйлчилгээгээр ханган
            ажилладаг мэргэшсэн хамт олон төдийгүй залуучуудыг гэр бүлийн
            амьдралд бэлтгэх зорилгоор гэр бүл сургалтын төвийг ажиллуулдаг.
            <br />
            <br />
            Залуу хосын хуримын үйл ажиллагааг зохион байгуулахдаа төрийн
            ёслолыг Их танхимд, гал голомт бадраах ёслолыг Бага танхимд болон Их
            өргөө гэрт тус тус зохион байгуулдаг.
            <br />
            <br />
            Тус ордон байгуулагдсан цагаасаа эхлүүлэн 42 мянга гаруй хосын
            Гэрлэх ёслолын үйл ажиллагааг удирдан зохион байгуулж тэдгээрийн
            төрөл садан, зочин төлөөлөгч болох давхардсан тоогоор 3 сая иргэдэд
            үйлчилсэн байна.
            <br />
            <br />
            Манай ордон зөвхөн Гэрлэх ёслолын үйл ажиллагаа зохион байгуулахаас
            гадна хуримын тэмдэглэлт ой Есөн эрдэнийн хурим Очир-Эрдэнийн хурим,
            Алтан хурим ,Оюу хурим, Сувдан хурим, Мөнгөн хурим, Тана хурим, мөн
            Олон улсын гэр бүлийн өдөр, Нийслэл хот байгуулагдсаны ойг
            тохиолдуулан гэр бүлүүдтэйгээ хамт тэмдэглэн өнгөрүүлж гэрлэх
            ёслолыг зохион байгуулдаг уламжлалтай.
          </Typography>

          <CarouselCenterMode data={arrangementData.slice(0, 4)} />
          <ControlledForm />
        </Stack>
      </Container>
    </MainLayout>
  );
}
