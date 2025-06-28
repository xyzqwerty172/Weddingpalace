"use client";
import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Container, Typography, Stack, Box, Grid, List } from "@mui/material";
import ControlledForm from "src/components/form";
import { dataPlaceholder } from "../../../components/carousel-view/data-placeholder";
import CarouselCenterMode from "../../../components/carousel-view/carousel-center-mode";
import photoVideoData from "./photo-video-data";
import { useResponsive } from "src/hooks/use-responsive";
import Image from "src/components/image";

export default function PhotoVideoView(params) {
  const mdUp = useResponsive("up", "md");

  return (
    <MainLayout>
      <HeroImageService
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={"Гэр бүлийн зураг авалт, Хуримын зураг авалт"}
        title={"ФОТО ВИДЕО ҮЙЛЧИЛГЭЭ"}
      />
      <Container>
        <Stack spacing={2} my={2}>
          <Box>
            <Typography variant="h2" fontWeight={"bold"} textAlign={"center"}>
              Фото, Видео үйлчилгээ
            </Typography>
            <Typography variant={"h5"} textAlign={"center"} mb={3} mt={5}>
              Фото, видео студи
            </Typography>
            <Typography my={3}>
              Гэрлэх ёслолын үйлчилгээ хийж буй хосуудад зориулсан үйлчилгээ. /
              Төлбөрт багтсан /
            </Typography>
            {mdUp ? (
              <Image
                src={"/assets/images/services/photo-video/1.png"}
                ratio={"16/9"}
              />
            ) : (
              <Image
                src={"/assets/images/services/photo-video/1.png"}
                ratio={"3/4"}
              />
            )}
            <Typography my={3}>
              Гэрлэх ёслолын ордонд хуримлагч хосуудын ёслолын үеийн бүтэн
              бичлэг болон зураг авалт .
            </Typography>
            {mdUp ? (
              <Image
                src={"/assets/images/services/photo-video/2.png"}
                ratio={"16/9"}
              />
            ) : (
              <Image
                src={"/assets/images/services/photo-video/2.png"}
                ratio={"3/4"}
              />
            )}
            <Typography my={3}>
              Дагалдах зүйлс - 30/40 жаазтай зураг 1 ширхэг , 20 ширхэг зураг
              бүхий албом , видео бичлэгтэй плаш 1 ширхэг
            </Typography>
            {mdUp ? (
              <Image
                src={"/assets/images/services/photo-video/3.png"}
                ratio={"16/9"}
              />
            ) : (
              <Image
                src={"/assets/images/services/photo-video/3.png"}
                ratio={"3/4"}
              />
            )}
            <Typography fontWeight={"bold"} mb={2} mt={5}>
              Нэмэлт үйлчилгээ / Төлбөртэй /
            </Typography>
            <List>
              <List item>
                • Гэрлэх ёслолоо хийж буй хосууд фото стүдэд болон гэрлэх
                ёслолын ордонд зураг авалт хийлгэх
              </List>
              <List item>• Натурын болон хотын зураг авалт хийлгэх</List>
              <List item>• Дэлгэцээр гарах видео ажилууд хийлгэх</List>
              <List item>
                • Гэрлэх ёслолын өдрийн бүтэн бичлэг , фото зураг авалт
              </List>
              <List item>• Гэрлэх ёслолын зурагнуудыг файлаар хуулж авах</List>
            </List>
          </Box>
        </Stack>
        {/* <CarouselCenterMode data={photoVideoData.slice(4, 9)} /> */}
        {mdUp ? (
          <Image
            src={"/assets/images/services/photo-video/9.png"}
            ratio={"16/9"}
          />
        ) : (
          <Image
            src={"/assets/images/services/photo-video/9.png"}
            ratio={"3/4"}
          />
        )}
        {mdUp ? (
          <Image
            src={"/assets/images/services/photo-video/7.png"}
            ratio={"16/9"}
          />
        ) : (
          <Image
            src={"/assets/images/services/photo-video/7.png"}
            ratio={"3/4"}
          />
        )}
        {mdUp ? (
          <Image
            src={"/assets/images/services/photo-video/5.png"}
            ratio={"16/9"}
          />
        ) : (
          <Image
            src={"/assets/images/services/photo-video/5.png"}
            ratio={"3/4"}
          />
        )}
        {mdUp ? (
          <Image
            src={"/assets/images/services/photo-video/6.png"}
            ratio={"16/9"}
          />
        ) : (
          <Image
            src={"/assets/images/services/photo-video/6.png"}
            ratio={"3/4"}
          />
        )}

        {mdUp ? (
          <Image
            src={"/assets/images/services/photo-video/4.png"}
            ratio={"16/9"}
          />
        ) : (
          <Image
            src={"/assets/images/services/photo-video/4.png"}
            ratio={"3/4"}
          />
        )}
      </Container>
    </MainLayout>
  );
}
