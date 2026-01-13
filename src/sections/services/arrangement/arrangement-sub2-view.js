"use client";
import MainLayout from "src/layouts/main";
import HeroImageService from "src/components/image/hero-image-service";
import { Container, Typography, Stack, Button, Box } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import { useResponsive } from "src/hooks/use-responsive";
import Image from "src/components/image";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import Iconify from "src/components/iconify";

export default function ArrangementView2(params) {
  const path = "/assets/images/services/arrangement/2";
  const mdUp = useResponsive("up", "md");

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
            Есөн эрдэнийн хурим
          </Typography>
          {/* 4 links will be here */}
          <Typography>
            Бид үйл ажиллагаагаа өргөжүүлэн 2024 оноос эхлэн “Есөн эрдэнийн
            хурим” буюу хуримын тэмдэглэлт ойн өдрийн гэрлэх ёслолын үйл
            ажиллагаааг зохион байгуулан ажиллаж байна. Үүнд:
          </Typography>
          <Typography>
            Очир-Эрдэнийн буюу Алмаазан хурим: Хамтын амьдралаа эхлүүлэн, гэр
            бүл болоод 60 ба түүнээс дээш жил ханилж, насны буян хураасан, нэн
            ховор хувь заяаг хотлоороо хүндэтгэн дээдэлж энэхүү хуримын ёслолыг
            ёслон тэмдэглэдэг.{" "}
          </Typography>
          <Image 
            src={`${path}/ochir-erdene.avif`} 
            sx={{ 
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 3,
              mx: "auto"
            }}
          />
          <Typography>
            Алтан хурим - Хамтын амьдралаа эхлүүлэн гэр бүл болоод 50 ба түүнээс
            дээш жил ханилан гэр бүлийн ариун журмыг чин үнэнчээр сахисан настан
            буурлуудыг үр хүүхэд, ах дүүс, айл хотолоороо хүндэтгэн хийдэг өргөн
            дэлгэр хурим юм. Энэ хуримыг өрх гэрийн хамгийн дээд баяр болгон
            тэмдэглэдэг.
          </Typography>
          <Image 
            src={`${path}/altan-hurim.avif`} 
            sx={{ 
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 3,
              mx: "auto"
            }}
          />
          <Typography>
            Оюу эрдэнийн хурим: Хамтын амьдралаа эхлүүлэн гэр бүл болоод 45 ба
            түүнээс дээш жил ханилан гэр бүлийн ариун журмыг чин үнэнчээр
            сахисан настан буурлуудыг үр хүүхэд, ах дүүсээрээ хийдэг хурим юм.
          </Typography>
          <Image 
            src={`${path}/oyu-hurim.avif`} 
            sx={{ 
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 3,
              mx: "auto"
            }}
          />
          <Typography>
            Зэс эрдэнийн хурим: Хамтын амьдралаа эхлүүлэн гэр бүл болоод 40 ба
            түүнээс дээш жил ханилж, гэр бүлийн ариун журмыг сахисан нас тогтсон
            хосуудын хийх хуримын ёслол.
          </Typography>
          <Image 
            src={`${path}/zes-hurim.avif`} 
            sx={{ 
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 3,
              mx: "auto"
            }}
          />
          <Typography>
            Шүр эрдэнийн хурим: Хамтын амьдралаа эхлүүлэн гэр бүл болоод 35 ба
            түүнээс дээш жил ханилж, гэр бүлийн ариун журмыг сахисан төвшин
            сайхан хосуудын хийх хуримын ёслол.
          </Typography>
          <Image 
            src={`${path}/shur-hurim.avif`} 
            sx={{ 
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 3,
              mx: "auto"
            }}
          />
          <Typography>
            Сувд-Эрдэнийн хурим: Хамтын амьдралаа эхлүүлэн гэр бүл болоод 30 ба
            түүнээс дээш жил ханилж, гэр бүлийн ариун журмыг сахисан аз жаргалаа
            бялхааж байгаа хосуудын хийх хуримын ёслол.
          </Typography>
          <Image 
            src={`${path}/suvdan-hurim.avif`} 
            sx={{ 
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 3,
              mx: "auto"
            }}
          />
          <Typography>
            Мөнгөн хурим: Хамтын амьдралаа эхлүүлэн гэр бүл болоод 25 ба түүнээс
            дээш жил ханилж, гэр бүлийн ариун журмыг сахисан идэр насны хосуудын
            хийх хуримын ёслол.
          </Typography>
          <Image 
            src={`${path}/mungun-hurim.avif`} 
            sx={{ 
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 3,
              mx: "auto"
            }}
          />
          <Typography>
            Номин-Эрдэнийн хурим: Хамтын амьдралаа эхлүүлэн гэр бүл болоод 20 ба
            түүнээс дээш жил ханилж, гэр бүлийн ариун журмыг сахин хайр
            сэтгэлдээ умбан байгаа ид насны хосуудын хийх хуримын ёслол.
          </Typography>
          <Image 
            src={`${path}/nomin-erdene.avif`} 
            sx={{ 
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 3,
              mx: "auto"
            }}
          />
          <Typography>
            Тана-Эрдэнийн хурим: Хамтын амьдралаа эхлүүлэн гэр бүл болоод 15 ба
            түүнээс дээш жил ханилж, гэр бүлийн ариун журмыг сахин хайр
            сэтгэлдээ умбан байгаа хосуудын хийх хуримын ёслол
          </Typography>
          <Image 
            src={`${path}/tanan-erdene.avif`} 
            sx={{ 
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 3,
              mx: "auto"
            }}
          />
          <Typography>
            Ган-Эрдэнийн хурим: Хамтын амьдралаа эхлүүлэн гэр бүл болоод 10 ба
            түүнээс дээш жил ханилж, гэр бүлийн ариун журмыг сахин хайр
            сэтгэлдээ умбан байгаа хосуудын хийх хуримын ёслол.
          </Typography>
          <Image 
            src={`${path}/ganerdene.avif`} 
            sx={{ 
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 3,
              mx: "auto"
            }}
          />
          {/* <CarouselCenterMode data={arrangementData.slice(0, 4)} /> */}
          {/* <ControlledForm /> */}
        </Stack>
      </Container>
    </MainLayout>
  );
}
