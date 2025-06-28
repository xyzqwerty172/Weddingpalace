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
  imgURL,
  title,
  content,
  timestamp,
}) {
  // const theme = useTheme();
  const mdUp = useResponsive("up", "md");

  return (
    <>
      {mdUp ? (
        <Card>
          {mdUp && <Image src={imgURL} ratio={"16/9"} />}
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {timestamp}
            </Typography>
            <Typography component="div" variant="h5">
              {title}
            </Typography>

            {mdUp && (
              <Typography variant="p" component="div">
                {content}
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
              href={`/news/${id}`}
            >
              ↪
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ width: "90vw" }}>
          {<Image src={imgURL} ratio={"16/9"} />}
          <CardContent sx={{ flex: "1 0 auto", width: "100%" }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {timestamp}
            </Typography>
            <Typography component="div" variant="h5">
              {title}
            </Typography>

            <Typography variant="p" component="div">
              {content}
            </Typography>

            <Button
              component={RouterLink}
              variant="outlined"
              href={`/news/${id}`}
            >
              ↪
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
