"use client";

import { useEffect, useState } from "react";
import MainLayout from "src/layouts/main";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import HorizontalNewsCard from "src/components/news-card/horizontal-news-card";
import HeroImage from "src/components/image/hero-image";
import Image from "src/components/image/image";
import Pagination from "@mui/material/Pagination";
import { useResponsive } from "src/hooks/use-responsive";
import { strapiGet, normalizeNewsEntry } from "src/lib/strapi";
import Button from "@mui/material/Button";
import { RouterLink } from "src/routes/components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

// Section for main image
// Main section 2/3 of page is a column of main news, on right banner, types,
// import axios, { endpoints } from "src/utils/axios";
import axiosInstance from "src/utils/axios";

export default function NewsView(params) {
  const mdUp = useResponsive("up", "md");
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [pagination, setPagination] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        // Fetch all news by latest uploaded
        const response = await strapiGet('/api/news', {
          populate: ['Image', 'PDFs'],
          sort: ['Date:desc'],
          pagination: { page: pagination, pageSize: pageSize },
          publicationState: 'live',
        });

        let items = (response?.data || []).map((entry) => {
          const n = normalizeNewsEntry(entry);
          return {
            id: n?.id,
            slug: n?.slug,
            title: n?.title,
            subtitle: n?.summary || '',
            excerpt: n?.excerpt || '',
            created_at: n?.date,
            thumbnail_url: n?.imageUrl,
          };
        });
        setNewsData(items);
        const totalPages = response?.meta?.pagination?.pageCount || 1;
        setPageCount(totalPages);
      } catch (error) {
        console.log("Error fetching data:", error);
        setNewsData([]);
        setPageCount(1);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedType, pagination]);

  const handeTypeClick = (type) => {
    setSelectedType(type);
    setPagination(1);
  };

  const handlePaginationClick = (event, value) => {
    setPagination(value);
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

      <Container sx={{ mt: 2 }}>


        <Grid container>
          <Grid item key={"0"} xs={12} md={12}>
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 6,
                }}
              >
                <CircularProgress />
              </Box>
            ) : newsData.length > 0 ? (
              <Stack spacing={4}>
                {/* Featured News (Hero Block) */}
                {newsData[0] && (
                  <Grid container spacing={3} alignItems="stretch">
                    <Grid item xs={12} md={7}>
                      <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3, height: '100%' }}>
                        <Image src={newsData[0].thumbnail_url} ratio={"16/9"} />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Box sx={{ height: '100%', p: { xs: 2, md: 4 }, borderRadius: 2, boxShadow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ order: 2, mt: 1 }}>
                          {newsData[0].created_at ? String(newsData[0].created_at).split("T")[0] : ""}
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 900, lineHeight: 1.2, order: 1 }}>
                          <Button component={RouterLink} href={newsData[0].slug ? `/news/${newsData[0].slug}` : `/news/${newsData[0].id}`}
                            variant="text" sx={{ p: 0, textTransform: 'none', color: 'inherit' }}>
                            {newsData[0].title}
                          </Button>
                        </Typography>
                        {newsData[0].excerpt && (
                          <Typography variant="body1" color="text.secondary" sx={{ order: 3, mt: 1.5 }}>
                            {newsData[0].excerpt}
                          </Typography>
                        )}
                        <Button component={RouterLink} href={newsData[0].slug ? `/news/${newsData[0].slug}` : `/news/${newsData[0].id}`}
                          variant="contained" sx={{ mt: 2, alignSelf: 'flex-start', order: 4 }}>
                          Дэлгэрэнгүй
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                )}

                {/* Latest 3 News (Grid Row) */}
                {newsData.length > 1 && (
                  <Grid container spacing={2}>
                    {newsData.slice(1, 4).map((item) => (
                      <Grid item key={item.id} xs={12} sm={6} md={4}>
                        <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 2, height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s ease', '&:hover': { transform: 'translateY(-2px)' } }}>
                          <Image src={item.thumbnail_url} ratio={"4/3"} />
                          <Box sx={{ p: 2.5, flexGrow: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              {item.created_at ? String(item.created_at).split("T")[0] : ""}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                              <Button component={RouterLink} href={item.slug ? `/news/${item.slug}` : `/news/${item.id}`}
                                variant="text" sx={{ p: 0, textTransform: 'none', color: 'inherit' }}>
                                {item.title}
                              </Button>
                            </Typography>
                            {item.excerpt && (
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {item.excerpt}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {/* Pagination */}
                {newsData.length > 0 && (
                  <Box my={2} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <Pagination
                      shape="circular"
                      variant="text"
                      count={pageCount}
                      page={pagination}
                      onChange={handlePaginationClick}
                    />
                  </Box>
                )}
              </Stack>
            ) : null}

            {/* Contact Information Section - Always visible */}
            <Box sx={{ mt: 8, mb: 6 }}>
              {/* Elegant Header */}
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 300,
                    letterSpacing: '0.05em',
                    color: 'text.primary',
                    mb: 2,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 60,
                      height: 2,
                      backgroundColor: 'primary.main',
                      borderRadius: 1
                    }
                  }}
                >
                  ХОЛБОО БАРИХ
                </Typography>

              </Box>

              {/* Contact Cards */}
              <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ 
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                      transform: 'translateY(-2px)'
                    }
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 3,
                          textAlign: 'center'
                        }}
                      >
                        Холбоо барих мэдээлэл
                      </Typography>
                      
                      <Stack spacing={3}>
                        <Box>
                          <Typography 
                            variant="subtitle1" 
                            sx={{ 
                              fontWeight: 700,
                              color: 'text.primary',
                              mb: 1,
                              fontSize: '1rem'
                            }}
                          >
                            Хаяг
                          </Typography>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: 'text.secondary',
                              lineHeight: 1.6,
                              pl: 2,
                              borderLeft: '3px solid',
                              borderColor: 'grey.200'
                            }}
                          >
                            УБ хот, Сүхбаатар дүүрэг, 1-р хороо,<br />
                            П.Гэндэнгийн гудамж
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 1.5 }} />

                        <Box>
                          <Typography 
                            variant="subtitle1" 
                            sx={{ 
                              fontWeight: 700,
                              color: 'text.primary',
                              mb: 1,
                              fontSize: '1rem'
                            }}
                          >
                            Холбогдох
                          </Typography>
                          <Stack spacing={1.5} sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'grey.200' }}>
                            <Box>
                              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                                Утас
                              </Typography>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  color: 'text.primary',
                                  fontWeight: 500,
                                  letterSpacing: '0.05em'
                                }}
                              >
                                11 320515
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                                И-мэйл
                              </Typography>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  color: 'text.primary',
                                  fontWeight: 400,
                                  wordBreak: 'break-word'
                                }}
                              >
                                weddingpalacemongolia@gmail.com
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ 
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                      transform: 'translateY(-2px)'
                    }
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 3,
                          textAlign: 'center'
                        }}
                      >
                        Ажлын цаг
                      </Typography>
                      
                      <Stack spacing={3}>
                        <Box>
                          <Typography 
                            variant="subtitle1" 
                            sx={{ 
                              fontWeight: 700,
                              color: 'text.primary',
                              mb: 2,
                              fontSize: '1rem'
                            }}
                          >
                            Ажлын өдрүүд
                          </Typography>
                          
                          <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'grey.200' }}>
                            <Stack spacing={2}>
                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                p: 2,
                                backgroundColor: 'grey.50',
                                borderRadius: 2
                              }}>
                                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                                  Даваа - Баасан
                                </Typography>
                                <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
                                  08:00 - 17:00
                                </Typography>
                              </Box>
                              
                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                p: 2,
                                backgroundColor: 'grey.50',
                                borderRadius: 2
                              }}>
                                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                                  Бямба - Ням
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                  Амарна
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Important Notice */}
              <Box sx={{ mb: 4 }}>
                <Card sx={{ 
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  backgroundColor: 'white'
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.primary',
                        lineHeight: 1.7,
                        fontWeight: 400
                      }}
                    >
                      Дээрх цагийн хуваарь нь хуримын захиалга авах, бусад ажил зэрэгт хамаарна. 
                      Хэрэв та хуримын захиалгаа өгсөн бол энэ хуваарьт хамаарахгүй.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              {/* Location Section */}
              <Card sx={{ 
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid',
                borderColor: 'grey.200',
                overflow: 'hidden'
              }}>
                <Box sx={{ p: 4, textAlign: 'center', backgroundColor: 'grey.50' }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 300,
                      letterSpacing: '0.05em',
                      color: 'text.primary',
                      mb: 1
                    }}
                  >
                    Байршил
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary',
                      maxWidth: 500,
                      mx: 'auto'
                    }}
                  >
                    Зам заавар авах болон дэлгэрэнгүй мэдээлэл авахын тулд газрын зураг дээр дарна уу
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  position: 'relative',
                  width: '100%',
                  height: { xs: 350, sm: 450, md: 500 }
                }}>
                  <Box
                    component="iframe"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5348.289665216501!2d106.920035!3d47.914235!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9692487a26cd75%3A0x8041791777c218d4!2sWedding%20Palace!5e0!3m2!1sko!2shk!4v1759087045730!5m2!1sko!2shk"
                    sx={{
                      width: '100%',
                      height: '100%',
                      border: 0,
                      transition: 'filter 0.3s ease',
                      '&:hover': {
                        filter: 'contrast(1.1)'
                      }
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Wedding Palace байршил"
                  />
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
}
