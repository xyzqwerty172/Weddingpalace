import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { usePathname } from "src/routes/hooks";

import Footer from "./footer";
import Header from "./header";

// ----------------------------------------------------------------------

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const homePage = pathname === "/";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // ...(!homePage && {
          //   pt: { xs: 8, md: 10 },
          // }),
          ...{
            pt: { xs: 8, md: 10 },
            pl: isMobile ? 2.5 : 0, // Add left padding on mobile for peeking drawer
          },
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};
