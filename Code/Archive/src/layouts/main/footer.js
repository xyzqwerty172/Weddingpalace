import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { paths } from "src/routes/paths";
import { usePathname } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";

import { _socials } from "src/_mock";

import Logo from "src/components/logo";
import Iconify from "src/components/iconify";
import Image from "src/components/image";

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: "Хаяг",
    icon: "/assets/icons/footer/location.png",
    children: [
      {
        name: "УБ хот, Сүхбаатар дүүрэг, 1-р хороо, П.Гэндэнгийн гудамж",
        href: "#",
      },
      // { name: "Contact us", href: paths.contact },
      // { name: "FAQs", href: paths.faqs },
    ],
  },
  {
    headline: "Цахим хаяг",
    icon: "/assets/icons/footer/fb.png",
    children: [
      // { name: "Terms and Condition", href: "#" },
      {
        name: "Гэрлэх Ёслолын Ордон",
        href: "https://www.facebook.com/Mongolian.wedding.palace",
      },
    ],
  },
  {
    headline: "Утас",
    icon: "/assets/icons/footer/phone.png",
    children: [{ name: "(+976)11320515", href: "#" }],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const homePage = pathname === "/";

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: "center",
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: "auto" }} />

        <Typography variant="caption" component="div">
          © 2024 Хуримын ордон ХХК, Бүх эрх хуулиар хамгаалагдсан
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      <Divider />

      <Container
        sx={{
          pt: 10,
          pb: 5,
          textAlign: { xs: "center", md: "unset" },
        }}
      >
        <Logo sx={{ mb: 3 }} />

        <Grid
          container
          justifyContent={{
            xs: "center",
            md: "space-between",
          }}
        >
          <Grid xs={8} md={3}>
            <Typography
              variant="body2"
              sx={{
                maxWidth: 270,
                mx: { xs: "auto", md: "unset" },
              }}
            >
              Бид хүн төрөлхтний соёлд Монгол өв соёлыг дэлгэрүүлнэ
            </Typography>

            {/* <Stack
              direction="row"
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{
                mt: 3,
                mb: { xs: 5, md: 0 },
              }}
            >
              {_socials.map((social) => (
                <IconButton
                  key={social.name}
                  sx={{
                    "&:hover": {
                      bgcolor: alpha(social.color, 0.08),
                    },
                  }}
                >
                  <Iconify color={social.color} icon={social.icon} />
                </IconButton>
              ))}
            </Stack> */}
          </Grid>

          <Grid xs={12} md={6}>
            <Stack spacing={5} direction={{ xs: "column", md: "row" }}>
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: "center", md: "flex-start" }}
                  sx={{ width: 1 }}
                >
                  <Stack direction={"row"}>
                    <Image src={list.icon} sx={{ width: 25, marginRight: 1 }} />
                    <Typography
                      component="div"
                      variant="overline"
                      margin={"auto"}
                    >
                      {list.headline}
                    </Typography>
                  </Stack>
                  {list.children.map((link) =>
                    link.href !== "#" ? (
                      <Link
                        key={link.name}
                        component={RouterLink}
                        href={link.href}
                        color="inherit"
                        variant="body2"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      link.name
                    )
                  )}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 10 }}>
          © {currentYear} Хуримын ордон ХХК, Бүх эрх хуулиар хамгаалагдсан
        </Typography>
      </Container>
    </Box>
  );

  // return homePage ? simpleFooter : mainFooter;
  return mainFooter;
}
