"use client";

import MainLayout from "src/layouts/main";
import HeroImage from "src/components/image/hero-image";
import { Container, Typography, Stack, Box, Divider } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";

export default function ActivityView(params) {
  return (
    <MainLayout>
      <HeroImage
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={""}
        title={""}
      />

      <Container sx={{ marginTop: "5px", marginBottom: "2rem" }}>
        <Stack spacing={2.5}>
        <Typography
          variant="h2"
            textAlign={"center"}
          fontFamily={caligraphicFont.style.fontFamily}
        >
            Чиг үүрэг
          </Typography>

          {/* Introduction */}
          <Typography variant="body1" textAlign={"justify"} sx={{ mb: 2, lineHeight: 1.8, fontSize: "1.1rem" }}>
            Гэрлэх ёслолын ордон нь Монгол түмний гал голомтыг бадраан хуримын ёслолын үйл ажиллагааг эрхлэх үндсэн зорилго чиглэлтэйгээр 1976 оны 06 сарын 14-нд байгуулагдаж одоог хүртэл үндсэн үйл ажиллагаагаараа амжилттай ажиллаж байна.
          </Typography>

          <Typography variant="body1" textAlign={"justify"} sx={{ mb: 2, lineHeight: 1.8 }}>
            Бид гэр бүлийн амьдралд тохиолдох дахин давтагдашгүй алтан агшинг цаг хугацаанд нь хөнгөн шуурхай, соёлтой үйлчилгээгээр ханган ажилладаг мэргэшсэн хамт олон төдийгүй залуучуудыг гэр бүлийн амьдралд бэлтгэх зорилгоор гэр бүлийн боловсрол дээшлүүлэх сургалтыг зохион байгуулан ажилладаг.
          </Typography>

          <Typography variant="body1" textAlign={"justify"} sx={{ mb: 2, lineHeight: 1.8 }}>
            Залуу хосын хуримын үйл ажиллагааг зохион байгуулахдаа төрийн ёслолыг Их танхимд, гал голомт бадраах ёслолыг Бага танхимд болон Их өргөө гэрт тус тус зохион байгуулдаг. Тус ордон байгуулагдсан цагаасаа эхлүүлэн 43 мянга гаруй хосын Гэрлэх ёслолын үйл ажиллагааг удирдан зохион байгуулж тэдгээрийн төрөл садан, зочин төлөөлөгч болох 2,2 сая иргэдэд үйлчилсэн байна.
          </Typography>

          <Typography variant="body1" textAlign={"justify"} sx={{ mb: 3, lineHeight: 1.8 }}>
            Манай ордон зөвхөн залуу хосын Гэрлэх ёслолын үйл ажиллагаа зохион байгуулахаас гадна Есөн эрдэнийн хурим, Очир-Эрдэнийн зохион байгуулан, Олон улсын гэр бүлийн өдөр болон Нийслэл хот байгуулагдсаны ойг тохиолдуулан нийслэлийн гэр бүлүүдтэйгээ хамт тэмдэглэн гэрлэх ёслолыг зохион байгуулдаг уламжлалтай.
        </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Nine Gem Ceremonies Section */}
          <Box>
            <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600, mb: 2, textAlign: "center" }}>
              Есөн эрдэнийн хурим
            </Typography>

            <Typography variant="body1" textAlign={"justify"} sx={{ mb: 4, lineHeight: 1.8 }}>
              Бид үйл ажиллагаагаа өргөжүүлэн 2024 оноос эхлэн "Есөн эрдэнийн хурим" буюу хуримын тэмдэглэлт ойн өдрийн гэрлэх ёслолын үйл ажиллагааг зохион байгуулан ажиллаж байна.
            </Typography>

            <Stack spacing={3}>
              {/* Diamond Ceremony */}
              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}>
                  Очир-Эрдэнийн буюу Алмаазан хурим
                </Typography>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  Хамтын амьдралаа эхлүүлэн, гэр бүл болоод 60 ба түүнээс дээш жил ханилж, насны буян хураасан, нэн ховор хувь заяаг хотлоороо хүндэтгэн дээдэлж энэхүү хуримын ёслолыг ёслон тэмдэглэдэг.
                </Typography>
              </Box>

              {/* Gold Ceremony */}
              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}>
                  Алтан хурим
                </Typography>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  Хамтын амьдралаа эхлүүлэн гэр бүл болоод 50 ба түүнээс дээш жил ханилан гэр бүлийн ариун журмыг чин үнэнчээр сахисан настан буурлуудыг үр хүүхэд, ах дүүс, айл хотолоороо хүндэтгэн хийдэг өргөн дэлгэр хурим юм. Энэ хуримыг өрх гэрийн хамгийн дээд баяр болгон тэмдэглэдэг.
                </Typography>
              </Box>

              {/* Other ceremonies */}
              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}>
                  Оюу эрдэнийн хурим
                </Typography>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  45 ба түүнээс дээш жил ханилан гэр бүлийн ариун журмыг чин үнэнчээр сахисан настан буурлуудыг үр хүүхэд, ах дүүсээрээ хийдэг хурим юм.
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}>
                  Зэс эрдэнийн хурим
                </Typography>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  40 ба түүнээс дээш жил ханилж, гэр бүлийн ариун журмыг сахисан нас тогтсон хосуудын хийх хуримын ёслол.
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}>
                  Шүр эрдэнийн хурим
                </Typography>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  35 ба түүнээс дээш жил ханилж, гэр бүлийн ариун журмыг сахисан төвшин сайхан хосуудын хийх хуримын ёслол.
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}>
                  Сувд-Эрдэнийн хурим
                </Typography>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  30 ба түүнээс дээш жил ханилж, гэр бүлийн ариун журмыг сахисан аз жаргалаа бялхааж байгаа хосуудын хийх хуримын ёслол.
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}>
                  Мөнгөн хурим
                </Typography>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  25 ба түүнээс дээш жил ханилж, гэр бүлийн ариун журмыг сахисан нас тогтсон хосуудын хийх хуримын ёслол.
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}>
                  Номин-Эрдэнийн хурим
                </Typography>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  20 ба түүнээс дээш жил ханилж, гэр бүлийн ариун журмыг сахин хайр сэтгэлдээ умбан байгаа хосуудын хийх хуримын ёслол.
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}>
                  Танан-Эрдэнийн хурим
                </Typography>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  15 ба түүнээс дээш жил ханилж, гэр бүлийн ариун журмыг сахин хайр сэтгэлдээ умбан байгаа хосуудын хийх хуримын ёслол.
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}>
                  Ган-Эрдэнийн хурим
                </Typography>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  10 ба түүнээс дээш жил ханилж, гэр бүлийн ариун журмыг сахин хайр сэтгэлдээ умбан байгаа хосуудын хийх хуримын ёслол.
                </Typography>
              </Box>

              <Box sx={{ 
                p: 3, 
                border: "1px solid", 
                borderColor: "grey.300", 
                borderRadius: 2,
                backgroundColor: "grey.50"
              }}>
                <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}>
                  Залуу хосын хурим
                </Typography>
                <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                  Амьдралынхаа урт замыг эгнэгт хамт туулахаар шийдэн, Эцгийн голомтоос галаа таслан бадрааж, өрх үүсгэсэн халуун хайрын эзэн залуу хосын хурим.
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  );
}