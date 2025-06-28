"use client";

import MainLayout from "src/layouts/main";
import HeroImage from "src/components/image/hero-image";
import { Container, Typography, Stack } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import { useResponsive } from "src/hooks/use-responsive";
import Image from "src/components/image/image";
import Box from "@mui/material/Box";

export default function GoalView(params) {
  const mdUp = useResponsive("up", "md");
  const imgUrl = "/assets/images/goal/zorilgo-zorilt.png";

  return (
    <MainLayout>
      <HeroImage
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={""}
        title={""}
      />
      <Container sx={{ marginTop: "5px" }}>
        <Stack spacing={3}>
          <Typography
            variant="h2"
            textAlign={"center"}
            fontFamily={caligraphicFont.style.fontFamily}
          >
            Зорилго Зорилт
          </Typography>

          {mdUp ? (
            <Image src={imgUrl} ratio={"16/9"} />
          ) : (
            <Image src={imgUrl} ratio={"3/4"} />
          )}

          {/* <Typography textAlign={"center"}>
            Бид таны сэтгэлд хүрсэн гэрлэх ёслолын үйлчилгээг үзүүлж, залуу
            хосын цаашдын амьдралыг мөнхлөн бадраана.
          </Typography>

          <Box>
            <Image
              dir="ltr"
              alt={"Greetings"}
              src={"/assets/images/about/outside.jpg"}
              ratio="21/9"
              maxWidth={"70%"}
              sx={{
                border: 0,
                borderRadius: 1,
                marginLeft: "15%",
              }}
            />
          </Box>
          <Typography
            variant="h2"
            textAlign={"center"}
            fontFamily={caligraphicFont.style.fontFamily}
          >
            Алсын Хараа
          </Typography>
          <Typography textAlign={"justify"}>
            Монгол улсын ард иргэдийн гэрэлт ирээдүйн төлөө бид, залуу хосын
            хамгийн аз жаргалтай мөчийг мартагдашгүйгээр мөнхлөх мөн дэлхийн
            түвшинд үндэсний гэрлэх ёслолын уламжлалт ёс заншил, өв соёлыг
            таниулах нь бидний туйлын хүсэл эрмэлзлэл билээ.
          </Typography> */}
        </Stack>
      </Container>
      s
    </MainLayout>
  );
}
