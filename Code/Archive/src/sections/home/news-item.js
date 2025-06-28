import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import MediaCard from "src/components/card/media-card";
import { caligraphicFont } from "src/theme/typography";
import { RouterLink } from "src/routes/components";

import axiosInstance from "src/utils/axios";

export default function NewsItem() {
  const [newsData, setNewsData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/news?type=null&page=0");
        setNewsData(response.data.body.blogs.reverse());
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container sx={{ mb: 10 }}>
      <Typography
        variant="h1"
        align="center"
        mb={10}
        fontFamily={caligraphicFont.style.fontFamily}
      >
        Тэдээ Тэдээлэл
      </Typography>

      <Grid container spacing={3}>
        {newsData &&
          newsData.slice(0, 3).map((data) => (
            <Grid item key={data.id} xs={12} md={4}>
              <MediaCard
                id={data.id}
                title={data.title}
                timestamp={data.createdDate.split("T")[0]}
                imgURL={data.thumbnail_url}
                body={data.subtitle}
              />
            </Grid>
          ))}
      </Grid>
      <Box mt={3} align="center">
        <Button variant="outlined" component={RouterLink} href={"/news"}>
          Бусад мэдээлэл
        </Button>
      </Box>
    </Container>
  );
}
