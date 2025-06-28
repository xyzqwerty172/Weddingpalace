"use client";

import MainLayout from "src/layouts/main";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HeroItem from "../hero-item";
import ServiceItem from "../service-item";
import GreetingItem from "../greeting-item";
import NewsItem from "../news-item";
import FAQItem from "../faq-item";

//-------------------------------------------------------

export default function HomeView() {
  return (
    <MainLayout>
      <HeroItem />
      <ServiceItem />
      <GreetingItem />
      <NewsItem />
      <FAQItem />
    </MainLayout>
  );
}
