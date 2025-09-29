import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { badgeClasses } from "@mui/material/Badge";
import BadgeClientOnly from "src/components/badge-client-only";

import { paths } from "src/routes/paths";

import { useResponsive } from "src/hooks/use-responsive";

import { bgBlur } from "src/theme/css";

import Logo from "src/components/logo";
import Label from "src/components/label";

import NavMobile from "./nav/mobile";
import NavDesktop from "./nav/desktop";
import { HEADER } from "../config-layout";
import { navConfig } from "./config-navigation";
// import LoginButton from "../common/login-button";
// import SettingsButton from "../common/settings-button";
// import NavigationBarView from "src/sections/navbar-view.js/navigation-bar-view";
import { NavBasicMobile, NavBasicDesktop } from "src/components/nav-basic";
import NavCustomMobilePeek from "src/components/nav-basic/mobile/nav-custom-mobile-peek";

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const mdUp = useResponsive("up", "md");

  // Keep header static: remove scroll offset behavior
  const offsetTop = false;

  //----------------------------------------------------
  const BASIC_NAV_ITEMS = [
    {
      title: "БИДНИЙ ТУХАЙ",
      path: "#",
      caption: "",
      children: [
        {
          title: "Захиралын мэндчилгээ",
          path: "/about/greeting",
        },
        {
          title: "Баг хамт олон",
          path: "/about/members",
        },
        {
          title: "Эрхэм зорилго",
          path: "/about/goal",
        },
        {
          title: "Стратегийн зорилго, зорилт",
          path: "/about/strategy",
        },
        {
          title: "Байгууллагын танилцуулга",
          path: "/about",
        },
        {
          title: "Чиг үүрэг",
          path: "/about/activity",
        },
        {
          title: "Бүтэц",
          path: "/about/structure",
        },
        {
          title: "Тэргүүлэх чиглэл",
          path: "/about/management",
        },
      ],
    },
    {
      title: "ҮЙЛЧИЛГЭЭ",
      path: "#",
      caption: "",
      children: [
        {
          title: "Үйлчилгээний төрөл",
          path: "/service/arrangement",
        },
        {
          title: "Гэрлэх ёслолын үйлчилгээ",
          path: "/service/wedding",
        },
        {
          title: "Гэрлэх ёслолын захиалга өгөхдөө",
          path: "/service/booking",
        },
        {
          title: "Худалдаа үйлчилгээ",
          path: "/service/shop",
        },
        {
          title: "Сургалт танилцуулга",
          path: "/service/photovideo",
        },
        {
          title: "Үйлчилгээний төлбөр",
          path: "/service/rent",
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
            { title: "Хууль, дүрэм, журам", path: "/transparency/company/1" },
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
              path: "/transparency/company/complaint",
            },
            {
              title: "Судалгаа",
              path: "/transparency/company/research",
            },
            {
              title: "Тайлан",
              path: "/transparency/company/report",
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
            {
              title: "ТЕНДЕР",
              path: "/transparency/law/tender",
            },
          ],
        },
        {
          title: "Хүний нөөцийн ил тод байдал",
          path: "/transparency/hr",
          caption: "",
        },
        {
          title: "Хууль, эрх зүй",
          path: "/transparency/law",
          caption: "",
        },
        {
          title: "Тайлан",
          path: "/transparency/report",
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
    <AppBar
      sx={{
        backgroundColor: 'rgba(0, 175, 154, 0.95)', // 95% opacity PANTONE 3275 C
        backdropFilter: 'blur(8px)',
        boxShadow: theme.customShadows.navigation, // 4px bottom shadow with primary color
        overflow: 'visible' // allow logo to extend below the nav
      }}
    >
      {/* Absolute Centered Logo anchored to top of page (AppBar) */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
          zIndex: 11,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 0
        }}
      >
        <BadgeClientOnly
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
          <Logo
            sx={{
              height: { xs: 88, sm: 106, md: 126, lg: 140 },
              width: 'auto',
              objectPosition: 'top center',
              mt: 0
            }}
          />
        </BadgeClientOnly>
      </Box>
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
          // No scroll-based fade/blur/shrink
          position: "relative" // Create positioning context for absolute layers (logo, button)
        }}
      >
        {/* Layer 1: Perfect Menu and Logo Layout */}
        <Container
          sx={{
            height: 1,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr auto 1fr",
              md: "minmax(0, 1fr) auto minmax(0, 1fr)" // Symmetric layout for perfect centering
            },
            alignItems: "center",
            gap: 2
          }}
        >
          {/* Mobile Layout */}
          {!mdUp && (
            <>
              <Stack
                alignItems="center"
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  width: "100%",
                  gap: { xs: 1, sm: 2 }
                }}
              >
                <NavCustomMobilePeek data={BASIC_NAV_ITEMS} />
              </Stack>
            </>
          )}

          {/* Desktop Layout */}
          {mdUp && (
            <>
              {/* Left Navigation - Perfectly even spacing */}
              <Box sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: 2
              }}>
                <Box sx={{ flex: 1 }}></Box> {/* Left edge space */}
                <NavBasicDesktop data={BASIC_NAV_ITEMS.slice(0, 1)} />
                <Box sx={{ flex: 1 }}></Box> {/* Middle space */}
                <NavBasicDesktop data={BASIC_NAV_ITEMS.slice(1, 2)} />
                <Box sx={{ flex: 1 }}></Box> {/* Right edge space */}
              </Box>

              {/* Center cell intentionally left empty; logo is positioned absolutely below */}
              <Box />

              {/* Right Navigation - Original spacing preserved */}
              <Box sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: 2
              }}>
                <Box sx={{ flex: 1 }}></Box> {/* Left space */}
                <NavBasicDesktop data={BASIC_NAV_ITEMS.slice(2, 3)} />
                <Box sx={{ flex: 1 }}></Box> {/* Middle space */}
                <NavBasicDesktop data={BASIC_NAV_ITEMS.slice(3, 4)} />
                <Box sx={{ flex: 1 }}></Box> {/* Right space */}
              </Box>
            </>
          )}
        </Container>

        

        {/* CTA removed for desktop as well */}
      </Toolbar>

      {/* Static header: no shadow on scroll */}
    </AppBar>
  );
}
