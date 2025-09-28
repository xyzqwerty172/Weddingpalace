"use client";

import MainLayout from "src/layouts/main";
import HeroImage from "src/components/image/hero-image";
import { Container, Typography, Stack, Box } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";

export default function StrategyView(params) {
  return (
    <MainLayout>
      <HeroImage
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={""}
        title={""}
      />

      <Container sx={{ marginTop: "5px", marginBottom: "2rem" }}>
        <Stack spacing={3}>
          <Typography
            variant="h2"
            textAlign={"center"}
            fontFamily={caligraphicFont.style.fontFamily}
          >
            Үйл ажиллагааны стратегийн зорилго, зорилт
          </Typography>

          {/* Strategic Goal 1 */}
          <Box sx={{ 
            p: 3, 
            border: "1px solid", 
            borderColor: "grey.300", 
            borderRadius: 2,
            backgroundColor: "grey.50"
          }}>
            <Typography
              variant="h6"
              sx={{ 
                color: "text.primary", 
                fontWeight: 600, 
                mb: 2
              }}
            >
              Стратегийн зорилт - 1
            </Typography>
            <Typography variant="body1" textAlign={"justify"} sx={{ mb: 3, lineHeight: 1.8 }}>
              "Гэрлэх ёслолын ордон" ОНӨААТҮГ нь 2025-2028 онд хуримын ёслолын үйлчилгээг боловсронгуй болгох, үйлчилгээний чанар, нэр төрөл, хүртээмжийг нэмэгдүүлэх үйлчилгээний нэр төрлийг өргөжүүлж, иргэд үйлчлүүлэгчдэд нээлттэй нээлттэй байгууллага болох, үйлчлүүлэгчдийн тоог нэмэгдүүлэх замаар үр ашигтай ажиллах, ажлын үр дүнг Нийслэлийн Засаг дарга бөгөөд Улаанбаатар хотын захирагчийн өмнө хариуцаж, гэрээгээр хүлээсэн жил бүрийн нийгэм эдийн засгийн зорилтот түвшний биелэлтийг хангана.
            </Typography>
            
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
              ХҮРЭХ ҮР ДҮН
            </Typography>
            <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
              "Гэрлэх ёслолын ордон" ОНӨААТҮГ-ын үйлдвэрлэл, үйлчилгээ, борлуулалт, эдийн засгийн үр ашиг дээшилнэ.
            </Typography>
          </Box>



          {/* Strategic Goal 2 */}
          <Box sx={{ 
            p: 3, 
            border: "1px solid", 
            borderColor: "grey.300", 
            borderRadius: 2,
            backgroundColor: "grey.50"
          }}>
            <Typography
              variant="h6"
              sx={{ 
                color: "text.primary", 
                fontWeight: 600, 
                mb: 2
              }}
            >
              Стратегийн зорилт - 2
            </Typography>
            <Typography variant="body1" textAlign={"justify"} sx={{ mb: 3, lineHeight: 1.8 }}>
              Үндсэн үйлчилгээнээс бусад орлогын эх үүсвэрийг нэвтрүүлэх, хөгжүүлэх
            </Typography>
            
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
              ХҮРЭХ ҮР ДҮН
            </Typography>
            <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
              "Гэрлэх ёслолын ордон" ОНӨААТҮГ-ын эдийн засгийн үр ашиг дээшилнэ.
            </Typography>
          </Box>



          {/* Strategic Goal 3 */}
          <Box sx={{ 
            p: 3, 
            border: "1px solid", 
            borderColor: "grey.300", 
            borderRadius: 2,
            backgroundColor: "grey.50"
          }}>
            <Typography
              variant="h6"
              sx={{ 
                color: "text.primary", 
                fontWeight: 600, 
                mb: 2
              }}
            >
              Стратегийн зорилт - 3
            </Typography>
            <Typography variant="body1" textAlign={"justify"} sx={{ mb: 3, lineHeight: 1.8 }}>
              Гэр бүлийн боловсрол олгох, сургалт сурталчилгаа, нөлөөллийн ажил, гэр бүл, хүүхэд, залуучуудын хөгжлийг дэмжих олон талт үйл ажиллагаа зохион байгуулах.
            </Typography>
            
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
              ХҮРЭХ ҮР ДҮН
            </Typography>
            <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
              Гэр бүлийн хөгжлийг дэмжих олон талт үйл ажиллагаа зохион байгуулагдаж, гэр бүлийн боловсрол олгох, зөвлөгөө өгөх үйлчилгээнд зорилтот бүлэг, гэрлэх ёслолоо хийх хосууд хамрагдсан байна. Үр дүнд нь гэр бүлийн үнэ цэнэ нэмэгдэж, тогтвортой гэр бүлийн тоо нэмэгдэж, гэр бүл салалтын тоо буурсан байна.
            </Typography>
          </Box>



          {/* Strategic Goal 4 */}
          <Box sx={{ 
            p: 3, 
            border: "1px solid", 
            borderColor: "grey.300", 
            borderRadius: 2,
            backgroundColor: "grey.50"
          }}>
            <Typography
              variant="h6"
              sx={{ 
                color: "text.primary", 
                fontWeight: 600, 
                mb: 2
              }}
            >
              Стратегийн зорилт - 4
            </Typography>
            <Typography variant="body1" textAlign={"justify"} sx={{ mb: 3, lineHeight: 1.8 }}>
              Хүний нөөцийн бодлогыг сайжруулах
            </Typography>
            
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
              ХҮРЭХ ҮР ДҮН
            </Typography>
            <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
              Байгууллагын өмнө тавигдсан зорилго, зорилтууд хамт олны хүчээр биелэгдсэн байна.
            </Typography>
          </Box>



          {/* Strategic Goal 5 */}
          <Box sx={{ 
            p: 3, 
            border: "1px solid", 
            borderColor: "grey.300", 
            borderRadius: 2,
            backgroundColor: "grey.50"
          }}>
            <Typography
              variant="h6"
              sx={{ 
                color: "text.primary", 
                fontWeight: 600, 
                mb: 2
              }}
            >
              Стратегийн зорилт - 5
            </Typography>
            <Typography variant="body1" textAlign={"justify"} sx={{ mb: 3, lineHeight: 1.8 }}>
              "Гэрлэх ёслолын ордон" ОНӨААТҮГ-ын гадаад болон дотоод орчны их засвар, тохижилтыг шинээр хийж, ажилтнуудын албан тасалгаа, үйлчилгээний танхим, өрөө, тасалгаанд их болон урсгал засварыг үе шаттайгаар хийж гүйцэтгэн соёлтой, ая тухтай, таатай, цэвэр, үзэмжтэй, саруул орчныг бий болгон зах зээлд өрсөлдөх чадвараа нэмэгдүүлнэ.
            </Typography>
            
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
              ХҮРЭХ ҮР ДҮН
            </Typography>
            <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
              "Гэрлэх ёслолын ордон"-нд үйлчлүүлсэн иргэд, үйлчлүүлэгчдийн сэтгэл ханамжийн баталгаа хангагдаж үйлчилгээний чанар сайжирна.
            </Typography>
          </Box>



          {/* Strategic Goal 6 */}
          <Box sx={{ 
            p: 3, 
            border: "1px solid", 
            borderColor: "grey.300", 
            borderRadius: 2,
            backgroundColor: "grey.50"
          }}>
            <Typography
              variant="h6"
              sx={{ 
                color: "text.primary", 
                fontWeight: 600, 
                mb: 2
              }}
            >
              Стратегийн зорилт - 6
            </Typography>
            <Typography variant="body1" textAlign={"justify"} sx={{ mb: 3, lineHeight: 1.8 }}>
              Соёлын өвийг хамгаалах
            </Typography>
            
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
              ХҮРЭХ ҮР ДҮН
            </Typography>
            <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
              "Гэрлэх ёслолын ордон"-нд байгаа хойч үед өвлөгдөн үлдэх, үндэсний бахархал болсон биет болон биет бус өвийн хадгалалт хамгаалалт сайжирч, ордны барилга, урлагийн бүтээлүүд соёлын өвд бүртгэгдсэн байна.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </MainLayout>
  );
}
