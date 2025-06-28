"use client";

import MainLayout from "src/layouts/main";
import HeroImage from "src/components/image/hero-image";
import { Typography, Container } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import { useResponsive } from "src/hooks/use-responsive";
import Image from "src/components/image";

export default function MembersView(params) {
  const mdUp = useResponsive("up", "md");
  const imgUrl = "/assets/images/members/bag-hamt-olon-zurag.avif";
  const imgUrl2 = "/assets/images/about/yoslol.avif";

  return (
    <MainLayout>
      <HeroImage
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={""}
        title={""}
      />
      <Container>
        <Typography
          variant="h2"
          fontWeight={"bold"}
          textAlign={"center"}
          marginY={3}
          fontFamily={caligraphicFont.style.fontFamily}
        >
          Танай Хамт Олон
        </Typography>

        {mdUp ? (
          <Image src={imgUrl} ratio={"16/9"} />
        ) : (
          <Image src={imgUrl} ratio={"3/4"} />
        )}

        <Typography fontSize={15} marginY={3}>
          Манай хамт олон мэргэжлийн түвшинд таны зол жаргалтай мөчийг мөнхлөн,
          хэзээч мартагдахгүй нандин дурсамжийг бий болгохын төлөө хариуцлагатай
          бөгөөд хүндтэй албыг цаг алдалгүй чанарын өндөр түвшинд гүйцэтгэдэг
          мэргэшсэн баг хамт олон юм.
          <br />
          Тус байгууллага нь Ёслол үйлчилгээ, Захиргаа, аж ахуй хариуцсан 2
          нэгжтэй ба нийт 32 ажилтан, албан хаагчидтайгаар үйл ажиллагаагаа
          явуулж байна.
        </Typography>
        <Typography fontWeight={"bold"} textAlign={"center"} marginBottom={5}>
          Бид таны амьдралд тохиолдох нандин мөчийг мөнхлөн үлдээнэ.
        </Typography>

        {mdUp ? (
          <Image src={imgUrl2} ratio={"16/9"} />
        ) : (
          <Image src={imgUrl2} ratio={"3/4"} />
        )}
      </Container>
    </MainLayout>
  );
}
