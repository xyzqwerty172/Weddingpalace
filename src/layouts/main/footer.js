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
        bgcolor: "#00AF9A",
        color: "white",
      }}
    >
      {/* Decorative side patterns (split halves) using clipped images to preserve aspect ratio */}
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Left side: show RIGHT half by aligning image center to left edge */}
        <Box sx={{ position: 'absolute', left: 0, top: { xs: 8, md: 12 }, bottom: { xs: 8, md: 12 }, width: '50vw', overflow: 'hidden' }}>
          <Box
            component="img"
            src="/logo/pattern-footer.png"
            alt="footer pattern left"
            sx={{
              position: 'absolute',
              height: '100%',
              width: 'auto',
              left: 0,
              transform: 'translateX(-50%)',
              objectFit: 'contain',
            }}
          />
        </Box>
        {/* Right side: show LEFT half by aligning image center to right edge */}
        <Box sx={{ position: 'absolute', right: 0, top: { xs: 8, md: 12 }, bottom: { xs: 8, md: 12 }, width: '50vw', overflow: 'hidden' }}>
          <Box
            component="img"
            src="/logo/pattern-footer.png"
            alt="footer pattern right"
            sx={{
              position: 'absolute',
              height: '100%',
              width: 'auto',
              right: 0,
              transform: 'translateX(50%)',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Box>

      <Container>
        <Link component={RouterLink} href="/" sx={{ display: "block", mx: "auto" }}>
          <Box
            component="img"
            src="/logo/logo-footer.png"
            sx={{ 
              width: 240, 
              height: 62.8, 
              mb: 1,
              cursor: "pointer",
              objectFit: "contain",
              display: "block"
            }}
          />
        </Link>

        <Typography variant="caption" component="div" sx={{ color: "white" }}>
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
        bgcolor: "#00AF9A",
        color: "white",
      }}
    >
      <Divider />

      {/* Decorative side patterns (split halves) using clipped images to preserve aspect ratio */}
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {/* Left side: image center aligned to left edge */}
        <Box sx={{ position: 'absolute', left: 0, top: { xs: 10, md: 14 }, bottom: { xs: 10, md: 14 }, width: '50vw', overflow: 'hidden' }}>
          <Box
            component="img"
            src="/logo/pattern-footer.png"
            alt="footer pattern left"
            sx={{
              position: 'absolute',
              height: '100%',
              width: 'auto',
              left: 0,
              transform: 'translateX(-50%)',
              objectFit: 'contain',
            }}
          />
        </Box>
        {/* Right side: image center aligned to right edge */}
        <Box sx={{ position: 'absolute', right: 0, top: { xs: 10, md: 14 }, bottom: { xs: 10, md: 14 }, width: '50vw', overflow: 'hidden' }}>
          <Box
            component="img"
            src="/logo/pattern-footer.png"
            alt="footer pattern right"
            sx={{
              position: 'absolute',
              height: '100%',
              width: 'auto',
              right: 0,
              transform: 'translateX(50%)',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Box>

      <Container
        sx={{
          pt: 10,
          pb: 5,
          textAlign: { xs: "center", md: "unset" },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "center", md: "flex-start" }, gap: { xs: 3, md: 4 } }}>
          {/* Logo Section */}
          <Box sx={{ flexShrink: 0 }}>
            <Link component={RouterLink} href="/" sx={{ display: "block" }}>
              <Box
                component="img"
                src="/logo/logo-footer.png"
                sx={{ 
                  width: 240, 
                  height: 62.8, 
                  cursor: "pointer",
                  objectFit: "contain",
                  display: "block"
                }}
              />
            </Link>
            
            <Typography
              variant="body2"
              sx={{
                maxWidth: 270,
                mt: 2,
                color: "white",
              }}
            >
              Бид хүн төрөлхтний соёлд Монгол өв соёлыг дэлгэрүүлнэ
            </Typography>
          </Box>

          {/* Contact Information Section */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
            <Stack spacing={5} direction={{ xs: "column", md: "row" }}>
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: "center", md: "flex-start" }}
                  sx={{ width: 1 }}
                >
                  <Stack direction={"row"}>
                    {list.children.some(child => child.href && child.href.startsWith("http")) ? (
                      <Link
                        href={list.children.find(child => child.href && child.href.startsWith("http"))?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          display: "flex", 
                          alignItems: "center",
                          textDecoration: "none",
                          "&:hover": { opacity: 0.8 }
                        }}
                      >
                        <Image src={list.icon} sx={{ width: 25, marginRight: 1 }} />
                      </Link>
                    ) : (
                      <Image src={list.icon} sx={{ width: 25, marginRight: 1 }} />
                    )}
                    <Typography
                      component="div"
                      variant="overline"
                      margin={"auto"}
                      sx={{ color: "white" }}
                    >
                      {list.headline}
                    </Typography>
                  </Stack>
                  {list.children.map((link) =>
                    link.href !== "#" ? (
                      link.href.startsWith("http") ? (
                        <Link
                          key={link.name}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="inherit"
                          variant="body2"
                          sx={{ 
                            color: "white", 
                            textDecoration: "none",
                            "&:hover": { 
                              color: "#f5f5f5",
                              textDecoration: "none"
                            }
                          }}
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <Link
                          key={link.name}
                          component={RouterLink}
                          href={link.href}
                          color="inherit"
                          variant="body2"
                          sx={{ color: "white", "&:hover": { color: "grey.100" } }}
                        >
                          {link.name}
                        </Link>
                      )
                    ) : (
                      <Typography key={link.name} variant="body2" sx={{ color: "white" }}>
                        {link.name}
                      </Typography>
                    )
                  )}
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ mt: 10, color: "white" }}>
          © {currentYear} Хуримын ордон ХХК, Бүх эрх хуулиар хамгаалагдсан
        </Typography>
      </Container>
    </Box>
  );

  // return homePage ? simpleFooter : mainFooter;
  return mainFooter;
}
