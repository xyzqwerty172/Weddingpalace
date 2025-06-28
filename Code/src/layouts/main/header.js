import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Badge, { badgeClasses } from "@mui/material/Badge";

import { paths } from "src/routes/paths";

import { useOffSetTop } from "src/hooks/use-off-set-top";
import { useResponsive } from "src/hooks/use-responsive";

import { bgBlur } from "src/theme/css";

import Logo from "src/components/logo";
import Label from "src/components/label";

import NavMobile from "./nav/mobile";
import NavDesktop from "./nav/desktop";
import { HEADER } from "../config-layout";
import { navConfig } from "./config-navigation";
// import LoginButton from "../common/login-button";
import HeaderShadow from "../common/header-shadow";
// import SettingsButton from "../common/settings-button";
// import NavigationBarView from "src/sections/navbar-view.js/navigation-bar-view";
import { NavBasicMobile, NavBasicDesktop } from "src/components/nav-basic";
import NavCustomMobile from "src/components/nav-basic/mobile/nav-custom-mobile";
import Typography from "@mui/material/Typography";

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const mdUp = useResponsive("up", "md");

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  //----------------------------------------------------
  const BASIC_NAV_ITEMS = [
    {
      title: "БИДНИЙ ТУХАЙ",
      path: "#",
      caption: "",
      children: [
        {
          title: "Мэндчилгээ",
          path: "/about/greeting",
          caption: "Захиралын мэндчилгээ",
        },
        {
          title: "Баг хамт олон",
          caption: "Баг хамт олоны танилцуулга",
          path: "/about/members",
        },
        {
          title: "Зорилго зорилт",
          caption:
            "Алсын хараа, Эрхэм зорилго, Үнэт зүйл, Үйл ажиллагааны чиглэл",
          path: "/about/goal",
        },
        {
          title: "Танилцуулга",
          caption: "Гэрлэх ёслолын ордны танилцуулга",
          path: "/about",
        },
        {
          title: "Бүтэц зохион байгуулалт",
          caption:
            "Гэрлэх ёслолын ордны алба хэлтсийн бүтэц зохион байгуулалтын бүдүүвч зургаар",
          path: "/about/structure",
        },
        {
          title: "Үйл ажиллагааны чиглэл",
          path: "/about/activity",
        },
      ],
    },
    {
      title: "ҮЙЛЧИЛГЭЭ",
      path: "#",
      caption: "",
      children: [
        {
          title: "Зохион байгуулах",
          path: "/service/arrangement",
          caption: "",
        },
        {
          title: "Худалдаа",
          path: "/service/shop",
          caption: "",
        },
        {
          title: "Түрээсийн үйлчилгээ",
          path: "/service/rent",
          caption: "",
        },
        {
          title: "Фото, видео",
          path: "/service/photovideo",
          caption: "",
        },
      ],
    },
    {
      title: "МЭДЭЭЛЭЛ",
      path: "/news",
      caption: "",
    },
    {
      title: "ИЛ ТОД БАЙДАЛ",
      path: "#",
      caption: "",
      children: [
        {
          title: "Байгууллагын ил тод байдал",
          path: "#",
          caption: "",
          children: [
            { title: "Дүрэм журам", path: "/transparency/company/1" },
            { title: "Гадаад томилолт", path: "/transparency/company/2" },
            {
              title: "Гүйцэтгэлийн төлөвлөгөө",
              path: "/transparency/company/3",
            },
            {
              title: "Ирсэн бичгийн шийдвэрлэлт",
              path: "/transparency/company/4",
            },
            {
              title: "Өргөдөл, гомдлын шийдвэрлэсэн ажлын тайлан",
              path: "/assets/documents/pdf/urgudul-gomdol-tailan.pdf",
            },
            {
              title: "Судалгаа",
              path: "/assets/documents/pdf/sudalgaa.pdf",
            },
          ],
        },
        {
          title: "Санхүүгийн ил тод байдал",
          path: "#",
          caption: "",
          children: [
            {
              title: "Эдийн засгийн үр ашгийг нэмэгдүүлэх зорилтын биелэлт",
              path: "/transparency/law/goal",
            },
            {
              title: "Шилэн данс",
              path: "https://shilendans.gov.mn/organization/58553?ry=2024",
            },
          ],
        },
        {
          title: "Хүний нөөцийн ил тод байдал",
          path: "/transparency/hr",
          caption: "",
        },
        {
          title: "Хууль, эрх зүй, дүрэм журам",
          path: "/transparency/law",
          caption: "",
        },
      ],
    },
    // {
    //   title: "ХОЛБОО БАРИХ",
    //   path: "/contact",
    //   caption: "",
    // },
  ];

  return (
    <AppBar>
      {/* <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(["height"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: "flex", alignItems: "center" }}>
          <Badge
            sx={{
              [`& .${badgeClasses.badge}`]: {
                top: 8,
                right: -16,
              },
            }}
            badgeContent={
              <Link
                href={paths.changelog}
                target="_blank"
                rel="noopener"
                underline="none"
                sx={{ ml: 1 }}
              >
                <Label
                  color="info"
                  sx={{ textTransform: "unset", height: 22, px: 0.5 }}
                >
                  v5.7.0
                </Label>
              </Link>
            }
          >
            <Logo />
          </Badge>

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop data={navConfig} />}

          <Stack
            alignItems="center"
            direction={{ xs: "row", md: "row-reverse" }}
          >
            <Button
              variant="contained"
              target="_blank"
              rel="noopener"
              href={paths.minimalUI}
            >
              Purchase Now
            </Button>

            {mdUp && <LoginButton />}

            <SettingsButton
              sx={{
                ml: { xs: 1, md: 0 },
                mr: { md: 2 },
              }}
            />

            {!mdUp && <NavMobile data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />} */}

      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(["height"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container
          sx={{
            height: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Stack direction={"row"}>
            {mdUp && <Box sx={{ width: 100 }}></Box>}
            <Badge
              sx={{
                [`& .${badgeClasses.badge}`]: {
                  top: 8,
                  right: -16,
                },
              }}
              badgeContent={
                <Link
                  href={paths.changelog}
                  target="_blank"
                  rel="noopener"
                  underline="none"
                  sx={{ ml: 1 }}
                ></Link>
              }
            >
              <Logo />
            </Badge>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavBasicDesktop data={BASIC_NAV_ITEMS} />}

          <Stack
            alignItems="center"
            direction={{ xs: "row", md: "row-reverse" }}
          >
            {mdUp && (
              <Button
                variant="contained"
                target="_blank"
                rel="noopener"
                href={paths.order}
                sx={{ ml: 5, px: 1 }}
              >
                ЗАХИАЛГА ӨГӨХ
              </Button>
            )}

            {!mdUp && (
              <Button
                variant="contained"
                target="_blank"
                rel="noopener"
                href={paths.order}
                sx={{ ml: 5 }}
              >
                <Typography variant="p" fontSize={10}>
                  ЗАХИАЛГА ӨГӨХ
                </Typography>
              </Button>
            )}

            {/* {mdUp && <LoginButton />} */}

            {/* <SettingsButton
              sx={{
                ml: { xs: 1, md: 0 },
                mr: { md: 2 },
              }}
            /> */}
            {!mdUp && <NavCustomMobile data={BASIC_NAV_ITEMS} />}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
