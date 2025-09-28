import Image from "./image";
import Typography from "@mui/material/Typography";
import { useResponsive } from "src/hooks/use-responsive";
import { Box, Container } from "@mui/material";
import { bgGradient } from "src/theme/css";
import { alpha, useTheme } from "@mui/material/styles";

export default function HeroImageService({ imgURL, title, description }) {
  const mdUp = useResponsive("up", "md");
  const theme = useTheme();

  return (
    <>
      {mdUp && (
        <Box>
          <Image src={imgURL} ratio={"9/2"} />
          <Box
            sx={{
              zIndex: 1,
              width: 1,

              padding: (-1, 0),
              position: "relative",
            }}
          >
            {/* <Container
              padding={2}
              sx={{
                position: "absolute",
                bottom: 0,
                padding: 2,

                ...bgGradient({
                  direction: "to right",
                  startColor: `${theme.palette.grey[800]} 00%`,
                  endColor: `${alpha(theme.palette.grey[800], 0.1)} 70%`,
                }),
              }}
            >
              <Typography
                color={theme.palette.common.white}
                fontSize={"2rem"}
                fontWeight={"bold"}
              >
                {title}
              </Typography>
              <Typography color={"white"} sx={{ maxWidth: 540 }}>
                {description}
              </Typography>
            </Container> */}
          </Box>
        </Box>
      )}
      {!mdUp && (
        <Box>
          <Image src={imgURL} ratio={"4/3"} />
          <Box
            sx={{
              zIndex: 1,
              width: 1,

              padding: (-1, 0),
              position: "relative",
            }}
          >
            {/* <Container
              padding={2}
              sx={{
                position: "absolute",
                bottom: 0,
                padding: 2,

                ...bgGradient({
                  direction: "to right",
                  startColor: `${theme.palette.grey[800]} 00%`,
                  endColor: `${alpha(theme.palette.grey[800], 0.1)} 70%`,
                }),
              }}
            >
              <Typography
                color={theme.palette.common.white}
                fontSize={"1.5rem"}
                fontWeight={"bold"}
              >
                {title}
              </Typography>
              <Typography color={"white"} sx={{ maxWidth: 540 }}>
                {description.slice(0, 75) + "..."}
              </Typography>
            </Container> */}
          </Box>
        </Box>
      )}
    </>
  );
}
