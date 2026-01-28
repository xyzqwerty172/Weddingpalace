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
            Гэрлэх ёслолын ордны цахим хуудсаар зочилж буй эрхэм Танд энэ өдрийн мэндийг өргөн дэвшүүлье.
          </Typography>
          <Typography textAlign={"justify"} fontSize={14}>
            Төрийн тулгуур, улсын үндэс бол бат бэх гэр бүл билээ. Олон зууны түүхт монгол үндэстний өнө мөнх оршихуйн чанад нууц эвийн загас мэт нэгнээ нөхсөн элэг бүтэн гэр бүлд оршино. Бидний өвөг дээдэс ураглах ёсыг эрхэмлэн "төрт ёс" буюу "төр хурим" хэмээн хүндэтгэж ирсэн нь өнөө ч утга учир, үнэ цэнээ хадгалж байна. Үүний нэгэн яруу тодорхой жишээ бол үүсгэн байгуулагдаад өдгөө хагас зуун жилийн ойтойгоо золгож буй Гэрлэх ёслолын ордон юм.
          </Typography>
          <br />
          <Typography textAlign={"justify"} fontSize={15}>
            Төрт ёсны эрхэм зан үйл гэрлэх ёслолыг өнгөрсөн, одоо, ирээдүй гурван цагийн орчилд уламжлал, шинэчлэлийг зохис төгөлдөр хослуулан тогтсон дэгийн дагуу зохион байгуулж, олон мянган айлын гал голомтыг бадрааж, сэтгэлт хосын нандин дурсамж, өнөр бүлийн хосгүй баярыг нэр төртэй хуваалцаж ирсэндээ манай хамт олон сэтгэл хангалуун байдгийг энэ ташрамд онцлон тэмдэглэе.
          </Typography>
          <br />
          <Typography textAlign={"justify"} fontSize={15}>
            Монголчууд бидний хуримлах ёс бүхэлдээ бэлгэдлийн цогцолбор, соёлын үнэт өв юм. Тийм ч учраас өмсгөл зүүлт, идээ будаа, үг хэл, үйл хөдлөл бүрдээ гүн утга, далд бэлгэдэл шингээсэн гэрлэх ёслолд оролцсон хүн бүрийн өндөр хүлээлтэд хүрч ажиллахын төлөө бид хичээж байна.
          </Typography>
          <br />
          <Typography textAlign={"justify"} fontSize={15}>
            Мөн нийгмийн эрэлт хэрэгцээ, техник технологийн хөгжил дэвшилд тулгуурлан цахим болон явуулаар ёслол үйлдэх, "Есөн эрдэнийн хурим"-ыг санаачлан хэрэгжүүлж буйг дуулгахад таатай байна.
          </Typography>
          <br />
          <Typography textAlign={"justify"} fontSize={15}>
            Ийнхүү цаг хугацаа, багтаамж, хүчин чадлаас хамаарч, тодорхой хүрээнд хязгаарлагддаг үндсэн үйлчилгээнүүдээ өргөжүүлээд зогсохгүй нийслэл хотын хамгийн үнэ цэнтэй, архитектурын дурсгалт, соёлын өв болсон "Гэрлэх ёслолын ордон"-ыхоо үүд хаалгыг зөвхөн гэрлэх ёслолд оролцогчдоор хязгаарлахгүйгээр, орж үзэхийг хүссэн хэн бүхний өмнө нээлттэй болгохоор зорьж байна.
          </Typography>
          <br />
          <Typography textAlign={"justify"} fontSize={15}>
            Монгол түмнийхээ гал голомт бадраах хуримын ёслолын үйл ажиллагааг ёслол төгөлдөр зохион байгуулах эрхэм зорилгоо биелүүлж, дэлхийн олон үндэстэн угсаатанд хүлээн зөвшөөрөгдсөн, монгол өв соёлыг түгээгч болох алсын караагаа ойртуулж, их хотын төв цэгт байрлах "Гэрлэх ёслолын ордон"-д ирсэн хүн бүрийн сэтгэл зүрхэнд мөнхлөн үлдээхийн төлөө бид хичээн ажиллах болно.
          </Typography>
          <br />
          <Typography textAlign={"justify"} fontSize={15}>
            Эрхэм Танд болон Таны гэр бүлд аз жаргал, амжилт бүтээл, амьдралын хамгийн сайн сайхныг хүсэн ерөөе.
          </Typography>
          <br />
          <Typography textAlign={"justify"} fontSize={15}>
            Төрийн тулгуур, улсын үндэс болсон айл өрх бүр эрүүл саруул, элэг бүтэн байж, инээд хөөр, баяр баяслаар эгнэгт бялхах болтугай.
          </Typography>
          <br />

          <Typography textAlign={"right"} fontSize={15} marginTop={2}>
            ГҮНЭЭ ХҮНДЭТГЭСЭН: <br />
            "ГЭРЛЭХ ЁСЛОЛЫН ОРДОН" ОНӨААТҮГ-ЫН ЗАХИРАЛ <br />
            ҮНЭНБАТЫН ОЮУНЗУЛ
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
