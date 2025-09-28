import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import MediaCard from "src/components/card/media-card";
import { caligraphicFont } from "src/theme/typography";
import { RouterLink } from "src/routes/components";
import { strapiGet, normalizeNewsEntry } from "src/lib/strapi";

export default function NewsItem() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await strapiGet('/api/news', {
          populate: ['Image', 'PDFs'],
          sort: ['Date:desc'],
          pagination: { page: 1, pageSize: 3 },
          publicationState: 'live',
        });
        const items = (response?.data || []).map((entry) => {
          const n = normalizeNewsEntry(entry);
          return {
            id: n?.id,
            slug: n?.slug,
            title: n?.title,
            created_at: n?.date,
            thumbnail_url: n?.imageUrl,
            subtitle: '',
          };
        });
        setNewsData(items);
      } catch (error) {
        console.log("Error fetching data:", error);
        setNewsData([]);
      }
    };
    fetchData();
  }, []);

  // Supabase auth profile check removed after migration to Strapi

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
          newsData.map((data) => (
            <Grid item key={data.id} xs={12} md={4}>
              <MediaCard
                id={data.id}
                href={data.slug ? `/news/${data.slug}` : `/news/${data.id}`}
                title={data.title}
                timestamp={data.created_at ? String(data.created_at).split("T")[0] : ""}
                imgURL={data.thumbnail_url}
                body={data.subtitle || ""}
              />
            </Grid>
          ))}
      </Grid>
      <Box mt={3} align="center">
        <Button 
          variant="contained" 
          component={RouterLink} 
          href={"/news"}
          sx={{
            backgroundColor: "#00AF9A",
            borderRadius: "50px",
            px: 6,
            py: 1,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 500,
            minHeight: "40px",
            "&:hover": {
              backgroundColor: "#009B8A",
            }
          }}
        >
          Бусад мэдээлэл
        </Button>
      </Box>
    </Container>
  );
}
