import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import Image from "src/components/image/image";
import { serviceData } from "./data-placeholder";
import { caligraphicFont } from "src/theme/typography";
import { Butcherman } from "next/font/google";
import { column } from "stylis";

export default function ServiceItem(params) {
  return (
    <Box
      sx={{
        backgroundImage: "url('/assets/images/home/services/pattern.svg')",
        // backgroundRepeat: "repeat",
        backgroundSize: "125%",
        backgroundPosition: "center",
        border: 1,
        borderColor: "#ffffff",
      }}
    >
      <Container
        sx={{
          my: 10,
        }}
      >
        {/* <Typography variant="h3" align="center" sx={{ mb: 10, mt: 15 }}>
          Бидний үйлчилгээ
        </Typography> */}
        <Grid container spacing={3}>
          {[0, 1, 2, 3].map((value) => (
            <Grid item key={value} xs={6} md={3}>
              <Button
                sx={{
                  width: "100%",
                }}
                href={`/service/${serviceData[value].nextPath}`}
              >
                <Paper
                  sx={{
                    textAlign: "center",
                    minWidth: "100%",
                    // border: 1,
                    // borderRadius: 0,
                  }}
                >
                  <Image
                    dir="ltr"
                    alt={serviceData[value].description}
                    src={serviceData[value].imgURL}
                    ratio="4/6"
                    sx={{
                      border: 0,
                      // borderRadius: 1,
                      px: 3,
                      mb: 1,
                    }}
                  />

                  <Box sx={{ px: 3, pb: 1, textAlign: "center" }}>
                    <Typography
                      variant="h3"
                      align="center"
                      py={1}
                      fontFamily={caligraphicFont.style.fontFamily}
                      sx={{ 
                        fontSize: (() => {
                          const textLength = serviceData[value].description.length;
                          if (textLength > 15) return "0.75em";
                          if (textLength > 12) return "0.8em";
                          if (textLength > 8) return "0.9em";
                          return "0.95em";
                        })(),
                        lineHeight: 1.2,
                        whiteSpace: "nowrap"
                      }}
                    >
                      {serviceData[value].description}
                    </Typography>
                  </Box>
                </Paper>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
