"use client";
import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Container, Typography, Stack, Box, Grid } from "@mui/material";
import ControlledForm from "src/components/form";
import CarouselCenterMode from "../../../components/carousel-view/carousel-center-mode";
import shopData from "./shop-data";

export default function ShopView(params) {
  return (
    <MainLayout>
      <HeroImageService
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={
          "Машины чимэглэл, Гэрчийн даашинз, Хуримын даашинз түрээс худалдаа"
        }
        title={"Худалдаа үйлчилгээ"}
      />
      <Container>
        <Typography
          variant="h2"
          fontWeight={"bold"}
          textAlign={"center"}
          marginY={5}
        >
          Худалдаа үйлчилгээ
        </Typography>

        <Box>
          <Typography variant="h4" textAlign={"center"} marginY={3}>
            Cүйт бүсгүйн даашинз
          </Typography>
          <CarouselCenterMode data={shopData.brideDress.slice(0, 12)} />
        </Box>
        <Box>
          <Typography variant="h4" textAlign={"center"} marginY={3}>
            Гэрчийн даашинз
          </Typography>
          <CarouselCenterMode data={shopData.witnessDress.slice(0, 24)} />
        </Box>
        <Box>
          <Typography variant="h4" textAlign={"center"} marginY={3}>
            Сүйт бүсгүйн толгойн гоёл
          </Typography>
          <CarouselCenterMode
            data={shopData.bridesmaidsOrnaments.slice(0, 14)}
          />
        </Box>
        <Box>
          <Typography variant="h4" textAlign={"center"} marginY={3}>
            Цэцэг
          </Typography>
          <CarouselCenterMode data={shopData.flowers.slice(0, 9)} />
        </Box>
        <Box>
          <Typography variant="h4" textAlign={"center"} marginY={3}>
            Зангиа
          </Typography>
          <CarouselCenterMode data={shopData.ties.slice(0, 10)} />
        </Box>
        <Box>
          <Typography variant="h4" textAlign={"center"} marginY={3}>
            Гоёл чимэглэл
          </Typography>
          <CarouselCenterMode data={shopData.ornaments.slice(0, 4)} />
        </Box>
        <ControlledForm />
      </Container>
    </MainLayout>
  );
}
