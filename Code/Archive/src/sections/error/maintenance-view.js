"use client";
import MainLayout from "src/layouts/main";
import { Container, Typography } from "@mui/material";
export default function MaintenanceView(params) {
  return (
    <MainLayout>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Typography fontWeight={"bold"} variant="h3">
          Уучлаарай, хөгжүүлэлт хийгдэж байна...
        </Typography>
      </Container>
    </MainLayout>
  );
}
