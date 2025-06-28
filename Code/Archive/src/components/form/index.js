import ReactHookForm from "./react-hook-form";
import { Grid, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { useResponsive } from "src/hooks/use-responsive";

export default function ControlledForm(params) {
  const theme = useTheme();
  const mdUp = useResponsive("up", "md");

  return (
    <></>
    // <Grid
    //   container
    //   sx={{
    //     bgcolor: theme.palette.grey[800],
    //     borderRadius: 1,
    //     my: 3,
    //   }}
    // >
    //   <Grid item key={"place-holder"} md={6}>
    //     <Box
    //       display={"flex"}
    //       flexDirection={"column"}
    //       justifyContent={"center"}
    //       alignItems={"center"}
    //       height={"100%"}
    //       padding={"30px"}
    //     >
    //       <Typography
    //         color={theme.palette.common.white}
    //         fontWeight={"bold"}
    //         fontSize={"1.5rem"}
    //       >
    //         ЗАХИАЛГЫН ХҮСЭЛТ ИЛГЭЭХ
    //       </Typography>

    //       <Typography color={theme.palette.common.white} fontWeight={"bold"}>
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //         eiusmod tempor incididunt ut labore et dolore magna aliqua.
    //       </Typography>
    //     </Box>
    //   </Grid>
    //   <Grid item key={"form"} xs={12} md={6}>
    //     <ReactHookForm debug={false} />
    //   </Grid>
    // </Grid>
  );
}
