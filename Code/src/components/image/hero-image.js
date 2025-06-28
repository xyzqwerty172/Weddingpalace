import Image from "./image";
import Typography from "@mui/material/Typography";
import { useResponsive } from "src/hooks/use-responsive";
import CardContent from "@mui/material/CardContent";
// import { Box } from "@mui/material";
// import { bgGradient } from "src/theme/css";
// import { alpha, useTheme } from "@mui/material/styles";
export default function HeroImage({ imgURL, title, description }) {
  const mdUp = useResponsive("up", "md");

  return (
    <>
      <Image src={imgURL} ratio={mdUp ? "9/2" : "4/3"} effect="fade-in" />
      {/* {mdUp && (
        <CardContent
          sx={{
            left: "18%",
            top: "10vw",
            maxWidth: 540,
            textAlign: "left",
            position: "absolute",
            color: "common.black",
          }}
        >
          <Typography
            color={"common.white"}
            fontSize={"3rem"}
            fontWeight={"bold"}
          >
            {title}
          </Typography>
          <Typography color={"common.white"}>{description}</Typography>
        </CardContent>
      )} */}

      {/* {!mdUp && (
        <CardContent
          sx={{
            left: "18%",
            top: "30vw",
            maxWidth: 540,
            textAlign: "left",
            position: "absolute",
            color: "common.black",
          }}
        >
          <Typography variant="h2" color={"common.white"}>
            {title}
          </Typography>
          <Typography color={"common.white"}>
            {description.slice(0, 75) + "..."}
          </Typography>
        </CardContent>
      )} */}
    </>
  );
}
