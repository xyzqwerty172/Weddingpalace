import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { Link, Stack } from "@mui/material";
import Image from "../image/image";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useResponsive } from "src/hooks/use-responsive";
import { RouterLink } from "src/routes/components";
// import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function HorizontalNewsCard({
  id,
  href,
  imgURL,
  title,
  content,
  timestamp,
  excerpt,
  imageRatio = "16/9",
}) {
  // const theme = useTheme();
  const mdUp = useResponsive("up", "md");

  return (
    <>
      {mdUp ? (
        <Card sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 2, transition: 'all 0.2s ease', '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' } }}>
          {mdUp && <Image src={imgURL} ratio={imageRatio} />}
          <CardContent sx={{ flex: "1 0 auto", p: 3 }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {timestamp}
            </Typography>
            <Typography component="div" variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
              <Link
                component={RouterLink}
                href={href || `/news/${id}`}
                underline="hover"
                color="inherit"
                sx={{ cursor: 'pointer' }}
              >
                {title}
              </Link>
            </Typography>

            {mdUp && (
              <Typography variant="body2" color="text.secondary" component="div" sx={{ mt: 1 }}>
                {excerpt || content}
              </Typography>
            )}

            {!mdUp && (
              <Typography variant="p" component="div">
                {content.slice(0, 20) + "..."}
              </Typography>
            )}

            <Button
              component={RouterLink}
              variant="outlined"
              href={href || `/news/${id}`}
              sx={{ mt: 1.5 }}
            >
              ↪
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ width: "90vw", borderRadius: 2, overflow: 'hidden', boxShadow: 1, transition: 'all 0.2s ease', '&:hover': { boxShadow: 3 } }}>
          {<Image src={imgURL} ratio={imageRatio} />}
          <CardContent sx={{ flex: "1 0 auto", width: "100%", p: 2.5 }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {timestamp}
            </Typography>
            <Typography component="div" variant="h6" sx={{ fontWeight: 700 }}>
              <Link component={RouterLink} href={href || `/news/${id}`} underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                {title}
              </Link>
            </Typography>

            <Typography variant="body2" color="text.secondary" component="div" sx={{ mt: 0.5 }}>
              {excerpt || content}
            </Typography>

            <Button
              component={RouterLink}
              variant="outlined"
              href={href || `/news/${id}`}
              sx={{ mt: 1 }}
            >
              ↪
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
