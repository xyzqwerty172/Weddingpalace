import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Image from "src/components/image/image";
import { caligraphicFont } from "src/theme/typography";

export default function GreetingItem(params) {
  return (
    <Container sx={{ mb: 10 }}>
      <Typography
        variant="h1"
        align="center"
        mb={10}
        fontFamily={caligraphicFont.style.fontFamily}
      >
        Тэндчилгээ
      </Typography>

      <Grid container spacing={3}>
        {/* <Grid item key={"picture"} xs={12} md={3}>
          <Typography fontWeight={"bold"} marginBottom={3}>
            ЗАХИРЛЫН МЭНДЧИЛГЭЭ
          </Typography>
          <Image
            dir="ltr"
            alt={"Greetings"}
            src={"/assets/images/home/services/ceo.jpg"}
            ratio="1/1"
            sx={{
              border: 0,
              borderRadius: 1,
            }}
          />
        </Grid> */}

        <Grid item key={"paragraph"} xs={12} md={12}>
          <Typography fontWeight={"bold"} marginBottom={3}>
            Гэрлэх ёслолын ордны албан ёсны цахим хуудсаар зочилж буй таньд
            баярлалаа.
          </Typography>
          <Typography textAlign={"justify"} fontSize={14}>
            Их Эзэн хааны түүхийн шастир Монголын нууц товчоонд “Монголын
            жаргалан хуримлах буй за” хэмээн тэмдэглэсэн түүхтэй. Монголчууд
            бидний эрхэмлэн дээдлэж жарган оршихын үндэс нь гэр бүл болохыг
            тодорхой өгүүлжээ. Төр оршихийн үндэс өрх бүтэн байхаас үүдэлтэй.
            Тэрхүү үндэс суурийг 48 жилийн туршид бэхлэн буй Гэрлэх ёслолын
            ордон олон мянган айлын голомтыг бадрааж, амьдралыг холбож, ёст гэр
            бүлийн мартагдашгүй дурсамж, салшгүй сэтгэлийн гагнаас болсоор
            ирснийг сэтгэл бахдам тэмдэглэе.
          </Typography>
          <br />
          <Typography textAlign={"justify"} fontSize={15}>
            Монголчуудын хуримлах ёсон яндашгүй баялаг, гүн утга, чин
            хүндэтгэлтэй олон зан үйлтэй. Бид үйл ажиллагаагаа утга төгөлдөр,
            уламжлал, шинэчлэлээ хослуулсан, өнгөрсөн, одоо, ирээдүйн гурван
            цагийн хэлхээсэнд холбож олон шинэ зүйлээр баяжуулан хөгжүүлэхийг
            зорин ажиллаж байгаа билээ. Цаг хугацаа, орон зайгаас хамаарч
            цахимаар ёслол үйлдэх, Очир эрдэнэ, Есөн эрдэнийн хурим, Хайрын
            амлалт, Аз жаргалтай гэр бүл, Хос багана зэрэг олон арга хэмжээг
            санаачилан цар хүрээгээ тэлж, утга агуулгаа баяжуулж, ёс хүндэтгэлээ
            өвлүүлэхийг хичээж байна.
          </Typography>
          <br />
          <Typography textAlign={"justify"} fontSize={15}>
            Монгол хүн бүрийн нандин дурсамж, хайрын илэрхийлэл, ханийн жаргал,
            хамтдаа амьдарч буйн бахархал нь байж өрх гэрээ хүндэлж, үр хүүхдээ
            өсгөж, өргөн олноо дээдэлж, төр ёсоо эрхэмлэж явах хүндэтгэлийн
            цагаан өргөө байхын тулд бид бүхэн хичээн ажиллаж байна.
          </Typography>
          <br />
          <Typography textAlign={"justify"} fontSize={15}>
            Эрхэм хүндэт та бүхэндээ эрийн ёс, гэрийн ёс, төрийн ёс бат бэх байж
            Монгол айл өрх бүрийн голомт ариун, хайр дүүрэн, хүндлэл агуу байхын
            өлзийтэй ерөөл өргөе.
          </Typography>
          <br />

          <Typography textAlign={"right"} fontSize={15} marginTop={2}>
            Хүндэтгэсэн: <br />
            ЗАХИРАЛ М.УЯНГА
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
