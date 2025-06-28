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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import HeroImage from "src/components/image/hero-image";
import Pagination from "@mui/material/Pagination";
import { useResponsive } from "src/hooks/use-responsive";
import Banner from "src/components/banner/banner";

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

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/news?type=${selectedType}&page=${pagination - 1}`
        );
        setNewsData(response.data.body.blogs);
        setPageCount(response.data.body.pageCount);
      } catch (error) {
        console.log("Error fetching data:", error);
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
        {!mdUp && (
          <Box sx={{ my: 4 }}>
            <Typography variant="h5">Мэдээний төрөл</Typography>
            <List dense>
              <ListItem>
                <Button onClick={() => handeTypeClick(0)}>• Мэдээлэл</Button>
              </ListItem>
              <ListItem>
                <Button onClick={() => handeTypeClick(1)}>• Мэдээ</Button>
              </ListItem>
              <ListItem>
                <Button onClick={() => handeTypeClick(null)}>• Бүгд</Button>
              </ListItem>
            </List>
          </Box>
        )}
        <Grid container>
          <Grid item key={"0"} md={8}>
            <Stack spacing={2}>
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                newsData.map((item) => (
                  <HorizontalNewsCard
                    id={item.id}
                    key={item.id}
                    imgURL={item.thumbnail_url}
                    title={item.title}
                    content={item.subtitle}
                    timestamp={item.createdDate.split("T")[0]}
                  />
                ))
              )}
              <Box
                my={5}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Pagination
                  shape="circular"
                  variant="text"
                  count={pageCount}
                  page={pagination}
                  onChange={handlePaginationClick}
                />
              </Box>
            </Stack>
          </Grid>
          {mdUp && (
            <Grid item key={"1"} md={4}>
              <Stack sx={{ ml: "10%" }}>
                <Box>
                  <List dense>
                    <ListItem>
                      <Typography variant="h5">Мэдээний төрөл</Typography>
                    </ListItem>
                    <ListItem>
                      <Button onClick={() => handeTypeClick(0)}>
                        • Мэдээлэл
                      </Button>
                    </ListItem>
                    <ListItem>
                      <Button onClick={() => handeTypeClick(1)}>• Мэдээ</Button>
                    </ListItem>
                    <ListItem>
                      <Button onClick={() => handeTypeClick(null)}>
                        • Бүгд
                      </Button>
                    </ListItem>
                  </List>
                </Box>

                <Stack>
                  <Box>
                    <List dense>
                      <ListItem>
                        <Typography variant="h5">Холбоо барих</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography>
                          УБ хот, Сүхбаатар дүүрэг, 1-р хороо, П.Гэндэнгийн
                          гудамж
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography>Утас: "(+976)11320515"</Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Stack>
                <Banner />
              </Stack>
            </Grid>
          )}
        </Grid>
      </Container>
    </MainLayout>
  );
}
