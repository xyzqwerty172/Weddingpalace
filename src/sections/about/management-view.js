"use client";

import MainLayout from "src/layouts/main";
import HeroImage from "src/components/image/hero-image";
import { Container, Typography, Stack, Box } from "@mui/material";
import { caligraphicFont } from "src/theme/typography";
import { useDocuments } from "src/hooks/use-documents";

export default function ManagementView(params) {
  const { documents, loading, error } = useDocuments('/about/management');

  return (
    <MainLayout>
      <HeroImage
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={""}
        title={""}
      />

      <Container sx={{ marginTop: "5px", marginBottom: "2rem" }}>
        <Stack spacing={4}>
          <Typography
            variant="h2"
            textAlign={"center"}
            fontFamily={caligraphicFont.style.fontFamily}
          >
            Тэргүүлэх чиглэл
          </Typography>

          {/* Introduction */}
          <Typography variant="body1" textAlign={"justify"} sx={{ mb: 4, lineHeight: 1.8, fontSize: "1.1rem" }}>
            "Гэрлэх ёслолын ордон" ОНӨААТҮГ-ын үйл ажиллагааны тэргүүлэх чиглэл нь байгууллагын дүрэмд зааснаар дараах байдлаар тодорхойлогдоно.
          </Typography>

          {/* Management Directions List */}
          <Stack spacing={3}>
            {/* Direction 1 */}
            <Box sx={{ 
              p: 3, 
              border: "1px solid", 
              borderColor: "grey.300", 
              borderRadius: 2,
              backgroundColor: "grey.50"
            }}>
              <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                <strong>•</strong> Гэр бүлийн тухай хууль тогтоомж, гэр бүлийн талаар төрөөс баримталж буй бодлого, Засгийн газар болон Нийслэлийн Засаг даргын үйл ажиллагаанымөрийн хөтөлбөр, тогтоол, захирамж, шийдвэрийг хэрэгжүүлэн ажиллах.
              </Typography>
            </Box>

            {/* Direction 2 */}
            <Box sx={{ 
              p: 3, 
              border: "1px solid", 
              borderColor: "grey.300", 
              borderRadius: 2,
              backgroundColor: "grey.50"
            }}>
              <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                <strong>•</strong> Монголын уламжлалт зан үйл, Гэр бүлийн тухай хууль тогтоомжийг иргэд, олон нийтэд сурталчлах, нийгэмд гэр бүлийн гүйцэтгэх үүрэг, хариуцлагыг өндөржүүлэх, гэр бүлийн хөгжлийг дэмжих олон талт ажлыг зохион байгуулах, мэргэжил арга зүйн зөвлөмжөөр хангах.
              </Typography>
            </Box>

            {/* Direction 3 */}
            <Box sx={{ 
              p: 3, 
              border: "1px solid", 
              borderColor: "grey.300", 
              borderRadius: 2,
              backgroundColor: "grey.50"
            }}>
              <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                <strong>•</strong> Гэр бүл болж гал голомтоо бадрааж буй залуу хосын хурим, Мөнгө, Алт, Очир-Эрдэнийн хурим болон Есөн эрдэнийн өргөмжлөлт гэр бүл, нийгэмд нөлөө бүхий Тэнгэрлэг гэр бүл шалгаруулах уламжлалт үйл ажиллагаа, Дурсамж өдөрлөгийг ёслол төгөлдөр удирдан зохион байгуулах.
              </Typography>
            </Box>

            {/* Direction 4 */}
            <Box sx={{ 
              p: 3, 
              border: "1px solid", 
              borderColor: "grey.300", 
              borderRadius: 2,
              backgroundColor: "grey.50"
            }}>
              <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                <strong>•</strong> Гэр бүлийн анхан шатны боловсрол олгох, гэр бүлийн асуудлаар ганцаарчилсан зөвлөгөө өгөх, гэр бүлийн хүмүүжил, боловсролыг үе шаттайгаар дээшлүүлэх сургалт зохион байгуулах.
              </Typography>
            </Box>

            {/* Direction 5 */}
            <Box sx={{ 
              p: 3, 
              border: "1px solid", 
              borderColor: "grey.300", 
              borderRadius: 2,
              backgroundColor: "grey.50"
            }}>
              <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                <strong>•</strong> Гэр бүлийн талаар Нийслэлийн нутгийн захиргааны байгууллага, төрийн болон төрийн бус бусад байгууллагатай хамтран ажиллах.
              </Typography>
            </Box>

            {/* Direction 6 */}
            <Box sx={{ 
              p: 3, 
              border: "1px solid", 
              borderColor: "grey.300", 
              borderRadius: 2,
              backgroundColor: "grey.50"
            }}>
              <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                <strong>•</strong> Гэр бүлийн хөгжлийг дэмжих чиглэлээр гадаад улсын болон олон улсын ижил төрлийн байгууллагатай харилцах, хамтран ажиллах.
              </Typography>
            </Box>

            {/* Direction 7 */}
            <Box sx={{ 
              p: 3, 
              border: "1px solid", 
              borderColor: "grey.300", 
              borderRadius: 2,
              backgroundColor: "grey.50"
            }}>
              <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                <strong>•</strong> Гэрлэх ёслолын ордны үйл ажиллагаа, ажил, үйлчилгээний цар хүрээ, нэр төрлийг нэмэгдүүлэх, иргэд үйлчлүүлэгчдэд харилцааны соёлын өндөр түвшинд үйлчлэх цэвэр цэмцгэр таатай орчинг бүрдүүлэх зохион байгуулалтын арга хэмжээ авах.
              </Typography>
            </Box>

            {/* Direction 8 */}
            <Box sx={{ 
              p: 3, 
              border: "1px solid", 
              borderColor: "grey.300", 
              borderRadius: 2,
              backgroundColor: "grey.50"
            }}>
              <Typography variant="body1" textAlign={"justify"} sx={{ lineHeight: 1.8 }}>
                <strong>•</strong> Хуулиар хориглоогүй бизнесийн бусад үйл ажиллагаа эрхлэх.
              </Typography>
            </Box>
          </Stack>

          {/* Documents Section */}
          {!loading && !error && documents.length > 0 && (
            <Box sx={{ mt: 6 }}>
              <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                {[...documents]
                  .sort((a, b) => a.title.localeCompare(b.title, 'mn'))
                  .map((doc) => (
                    <li key={doc.id} style={{ marginBottom: 8 }}>
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#00AF9A',
                          fontWeight: 700,
                          textDecoration: 'underline',
                          fontSize: '1.15rem',
                          fontFamily: 'inherit',
                          cursor: 'pointer',
                        }}
                      >
                        {doc.title}
                      </a>
                    </li>
                  ))}
              </Box>
            </Box>
          )}
        </Stack>
      </Container>
    </MainLayout>
  );
}