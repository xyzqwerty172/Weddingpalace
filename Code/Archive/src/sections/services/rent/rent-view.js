"use client";
import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Container, Typography, Stack, Box, Grid, List } from "@mui/material";
import CarouselCenterMode from "../../../components/carousel-view/carousel-center-mode";
import { coffeeShopData, hallData, photoStudioData } from "./rent-data";

export default function RentView(params) {
  return (
    <MainLayout>
      <HeroImageService
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={"Гэрлэх ёслолын ордны зааланд фото, дүрс бичлэг авахуулах"}
        title={"ТҮРЭЭСИЙН ҮЙЛЧИЛГЭЭ"}
      />
      <Container>
        <Stack spacing={2} my={2}>
          <Typography variant="h2" fontWeight={"bold"} textAlign={"center"}>
            Заалны түрээс
          </Typography>
          <Typography variant="h5" textAlign={"center"} mb={3}>
            Зочид угтах үйлчилгээ / тусгай танхимд /
          </Typography>
          <Typography textAlign={"justify"}>
            Бид тусгай танхимд зочид угтах үйлчилгээг танд санал болгож байна.{" "}
            <br />
            Нийт 40 – 60 хүн, хамгийн хямд үнэ. Катеринг үйлчилгээ ороогүй
            хүсвэл хуримлагч хосууд нэмэлтээр идээ ундаа оруулж болно. /нэмэлт
            төлбөргүй/
            <br />
            <br />
            Хуримлагч хосууд хуримын ёслол эхлэхээс дорж хаяж 72 цагийн өмнө
            сонголтоо хийн төлбөрөө баталгаажуулсан байх шаардлагатай бөгөөд
            төлбөр хугацаандаа баталгаажаагүйгээс үүссэн асуудлыг байгууллага
            хариуцахгүй болно.
            <br />
            Багц 2-т заасан оргилуун дарсыг нэмэлтээр 2-с илүү үйлчлэхгүй
            болохыг анхаарна уу.
            <br />
            Багц 1 эсвэл 2-ыг сонгосон хосууд 40 минутаас 1 цагийн хугацаанд
            хамаатан садан, найз нөхдийн хамтаар лоунжаар үйлчлүүлэх, хуримын
            өмнөх болон дараах нийт 1 хүртлэх цагийн хугацаанд үйлчлүүлнэ.
            <br />
            <br />
            Зөвхөн лоунж түрээсийн үйлчилгээний 1 цагийн төлбөр 300.000₮ байна.
            Жич лоунжийг 2 цагаас илүү хугацаагаар түрээслэхгүй болно.
            <br />
          </Typography>
          <List>
            <List item>
              • Багц 1 /халуун хүйтэн уух зүйлс, жимс жигнэмэг, оргилуун дарс/
            </List>
            <List item>
              • Багц 2 /халуун хүйтэн уух зүйлс, жимс жигнэмэг, халуун хүйтэн
              зууш, оргилуун дарс /
            </List>
          </List>
          <CarouselCenterMode data={coffeeShopData.slice(0, 4)} />
          <Typography variant="h5" textAlign={"center"} mb={3} mt={5}>
            Гэрлэх ёслолын ордны заалны түрээс
          </Typography>
          <List>
            <List item>
              • Гэрлэх ёслолын ордон дотор зураг авалт хийх 1 цаг 250,000₮
            </List>
            <List item>
              • Ёслол хүндэтгэлийн Их өргөө гэрт зураг авалт хийх 1 цаг 250,000₮
            </List>
          </List>
          <CarouselCenterMode data={hallData.slice(0, 5)} />
          <Typography variant="h5" textAlign={"center"} mb={3} mt={5}>
            Фото студи түрээс
          </Typography>
          <Typography textAlign={"justify"}>
            Видео болон фото зураг авахад зориулагдсан мэргэжлийн студио бөгөөд
            цагаар болон өдрөөр түрээслэх боломжтой юм. Ингээд сонирхсон хүмүүст
            студийн талаарх мэдээллийг хүргэж байна.
          </Typography>
          <List>
            <List item>
              • 1 цагийн түрээсийн үнэ- 50,000₮ ( 2 цагаас дээшээ захиалга
              авна.)
            </List>
            <List item>
              • Таазны өндөр 4,5 метр, Цагаан тайзны өндөр 3 метр, Ногоон тайзны
              өндөр 3 метр
            </List>
            <List item>• Нийт студийн талбайн хэмжээ 85м квадрат</List>
            <List item>• Хувцас солих болон нүүр будалтын өрөөтэй</List>
            <List item>• Кофе цай уух жижиг булантай</List>
            <List item>• Дээд тал нь 20 хүн ороход тохиромжтой</List>
            <List item>• Ариун цэврийн өрөөтэй</List>
          </List>
          {/* <CarouselCenterMode data={photoStudioData.slice(0, 2)} /> */}
          {/* <ControlledForm /> */}
        </Stack>
      </Container>
    </MainLayout>
  );
}
