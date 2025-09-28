"use client";

import { useEffect } from "react";

import { useRouter } from "src/routes/hooks";

import { PATH_AFTER_LOGIN } from "src/config-global";
import { HomeView } from "src/sections/home/view";

// ----------------------------------------------------------------------

export default function HomePage() {
  return <HomeView />;

  // const router = useRouter();

  // useEffect(() => {
  //   router.push(PATH_AFTER_LOGIN);
  // }, [router]);

  // return null;
}
