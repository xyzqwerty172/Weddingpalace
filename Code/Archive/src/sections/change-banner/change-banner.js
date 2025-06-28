"use client";

import { useState } from "react";
import { AuthGuard } from "src/auth/guard";
import { useRouter } from "src/routes/hooks";
import MainLayout from "src/layouts/main";
import { Button, Container, InputLabel, Grid, Input } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Image from "src/components/image/image";
import axiosInstance from "src/utils/axios";
import { NextResponse } from "next/server";

export default function ChangeBannerView(params) {
  const router = useRouter();

  const [bannerUrl, setBannerUrl] = useState(
    "https://filetandvine.com/wp-content/uploads/2015/10/pix-vertical-placeholder.jpg"
  );

  const submitData = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/api/banner", { bannerUrl });

      if (response.status === 200) {
        router.replace("/news");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthGuard>
      <MainLayout>
        <Container>
          <form onSubmit={submitData}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="banner-url">
                Баннерт ашиглах зурагны URL
              </InputLabel>
              <Input
                id="banner-url"
                type="text"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
              />
            </FormControl>
            <Grid container mt={3}>
              <Grid item md={4}>
                <Image src={bannerUrl} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ paddingX: "50px", marginY: "30px", display: "block" }}
            >
              Submit
            </Button>
          </form>
        </Container>
      </MainLayout>
    </AuthGuard>
  );
}
