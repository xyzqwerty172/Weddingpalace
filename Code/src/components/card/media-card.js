import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { RouterLink } from "src/routes/components";

export default function MediaCard({ id, title, timestamp, body, imgURL }) {
  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <CardMedia sx={{ height: 240 }} image={imgURL} title={title} />
      <CardContent>
        <Typography gutterBottom component="div">
          {timestamp}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="medium"
          variant="outlined"
          component={RouterLink}
          href={`/news/${id}`}
        >
          Дэлгэрэнгүй
        </Button>
      </CardActions>
    </Card>
  );
}
