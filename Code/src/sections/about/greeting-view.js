"use client";

import MainLayout from "src/layouts/main";
import HeroImage from "src/components/image/hero-image";
import GreetingItem from "../home/greeting-item";

export default function GreetingView(params) {
  return (
    <MainLayout>
      <HeroImage
        imgURL={"/assets/images/home/hero/TUY_0011.avif"}
        description={""}
        title={""}
      />
      <GreetingItem />
    </MainLayout>
  );
}
