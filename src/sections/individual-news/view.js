"use client";
import { useEffect, useState } from "react";
import MainLayout from "src/layouts/main";
import HeroImage from "src/components/image/hero-image";
import { Container, Grid, Stack, Box, Typography, Button } from "@mui/material";
import Image from "src/components/image/image";
 
import axios from "src/utils/axios";
import { useRouter } from "src/routes/hooks";
import { useAuthContext } from "src/auth/hooks";
import { strapiGet, normalizeNewsEntry } from "src/lib/strapi";
import { RouterLink } from "src/routes/components";

export default function IndividualNewsView({ id }) {
  const router = useRouter();
  const [newsData, setNewsData] = useState();
  const authenticated = useAuthContext();

  const handleRedirect = () => {
    router.replace("/news");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try slug first (preferred), fallback to numeric id if needed
        let entry = null;
        try {
          const bySlug = await strapiGet(`/api/news`, {
            filters: { Slug: { $eq: id } },
            populate: ['Image', 'PDFs'],
            publicationState: 'live',
          });
          entry = Array.isArray(bySlug?.data) && bySlug.data.length ? bySlug.data[0] : null;
        } catch (_) {}

        if (!entry && /^\d+$/.test(String(id))) {
          const byIdList = await strapiGet(`/api/news`, {
            filters: { id: { $eq: Number(id) } },
            populate: ['Image', 'PDFs'],
            publicationState: 'live',
          });
          entry = Array.isArray(byIdList?.data) && byIdList.data.length ? byIdList.data[0] : null;
        }

        const n = normalizeNewsEntry(entry);
        setNewsData({
          id: n?.id,
          title: n?.title,
          body: n?.content,
          createdDate: n?.date,
          thumbnail_url: n?.imageUrl,
          pdfs: { data: (n?.pdfs || []).map((p) => ({ id: p.id, attributes: { url: p.url, name: p.name } })) },
        });
      } catch (error) {
        console.log("Error fetching data:", error);
        setNewsData(null);
      }
    };
    fetchData();
  }, []);

  const deleteData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/api/news/?id=${id}`);

      if (response.status === 200) {
        router.replace("/news");
      } else {
        console.log("Error deleting data:", response);
      }
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    router.replace(`/news/update?id=${id}`);
  };

  return (
    <MainLayout>
      <HeroImage
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={
          "The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style."
        }
        title={"Мэдээ Мэдээлэл"}
      />

      <Container sx={{ my: 2 }}>
        <Grid container>
          <Grid item key={"0"} xs={12} md={12}>
            <Stack spacing={2}>
              {newsData && (
                <>
                  <Image src={newsData.thumbnail_url} ratio={"16/9"} />
                  <Typography>{newsData.createdDate ? String(newsData.createdDate).split("T")[0] : ''}</Typography>
                  <Typography variant="h6">{newsData.title}</Typography>
                  <Typography
                    textAlign={"justify"}
                    dangerouslySetInnerHTML={{ __html: newsData.body }}
                  />
                  {Array.isArray(newsData.pdfs?.data) && newsData.pdfs.data.length > 0 && (
                    <Box mt={2}>
                      <Typography variant="subtitle1" gutterBottom>
                        Хавсралт
                      </Typography>
                      <Box>
                        {newsData.pdfs.data.map((file) => {
                          const fileAttrs = file.attributes || {};
                          const fileName = fileAttrs.name || 'Attachment';
                          const fileUrl = fileAttrs.url;
                          return (
                            <Box key={file.id} sx={{ py: 0.5 }}>
                              <Button component={RouterLink} href={fileUrl} target="_blank" rel="noopener" variant="text">
                                {fileName}
                              </Button>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  )}
                </>
              )}
            </Stack>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Button
                sx={{ marginTop: 2 }}
                variant="contained"
                onClick={handleRedirect}
              >
                Буцах
              </Button>
              <Box>
                {authenticated.authenticated && (
                  <Button
                    sx={{
                      marginTop: 2,
                      color: "white",
                      bgcolor: "orange",
                      alignSelf: "flex-end",
                    }}
                    variant="contained"
                    onClick={updateData}
                  >
                    Шинэчлэх
                  </Button>
                )}
                {authenticated.authenticated && (
                  <Button
                    sx={{
                      marginTop: 2,
                      color: "white",
                      bgcolor: "red",
                      alignSelf: "flex-end",
                      marginLeft: 1,
                    }}
                    variant="contained"
                    onClick={deleteData}
                  >
                    Устгах
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
          
        </Grid>
      </Container>
    </MainLayout>
  );
}
