import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { usePathname } from "src/routes/hooks";

import Logo from "src/components/logo";
import SvgColor from "src/components/svg-color";
import Scrollbar from "src/components/scrollbar";

import NavList from "./nav-list";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const PEEK_WIDTH = 20; // How much of the drawer peeks when closed

const DrawerContainer = styled(Box)(({ theme, ismobile }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  zIndex: theme.zIndex.drawer,
  pointerEvents: "none", // Allow clicks through when closed
  display: ismobile ? "block" : "none", // Only show on mobile
}));

const DrawerPaper = styled(Paper)(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  height: "100%",
  background: theme.palette.background.paper,
  borderRight: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
  boxShadow: open ? theme.shadows[16] : theme.shadows[8],
  transform: open ? "translateX(0)" : `translateX(-${DRAWER_WIDTH - PEEK_WIDTH}px)`,
  transition: theme.transitions.create(["transform", "box-shadow"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  position: "relative",
  pointerEvents: "auto", // Re-enable pointer events for the drawer itself
  display: "flex",
  flexDirection: "column",
}));

const PeekIndicator = styled(Box)(({ theme, open }) => ({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  width: PEEK_WIDTH,
  height: 80,
  background: `linear-gradient(135deg, #009688, #00695C)`, // Teal gradient
  borderRadius: "0 12px 12px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  opacity: open ? 0 : 1,
  visibility: open ? "hidden" : "visible",
  transition: theme.transitions.create(["background", "transform", "opacity", "visibility"], {
    duration: theme.transitions.duration.shorter,
  }),
  // Touch-friendly tap target
  minWidth: 44,
  minHeight: 44,
  "&:hover, &:active": {
    background: `linear-gradient(135deg, #00695C, #009688)`, // Teal gradient hover
    transform: "translateY(-50%) translateX(2px)",
  },
  // Pulse animation to draw attention
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    background: "inherit",
    animation: `${theme.transitions.duration.complex}ms ease-in-out infinite alternate peekPulse`,
  },
  "@keyframes peekPulse": {
    "0%": {
      opacity: 0.7,
      transform: "translate(-50%, -50%) scale(1)",
    },
    "100%": {
      opacity: 0.9,
      transform: "translate(-50%, -50%) scale(1.05)",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: 6,
    top: "50%",
    transform: "translateY(-50%)",
    width: 0,
    height: 0,
    borderTop: "4px solid transparent",
    borderBottom: "4px solid transparent",
    borderLeft: `6px solid ${theme.palette.common.white}`,
    zIndex: 1,
  },
}));

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer - 1,
  background: alpha(theme.palette.common.black, 0.4),
  backdropFilter: "blur(6px)",
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2.5),
  borderBottom: `1px solid ${alpha(theme.palette.grey[500], 0.08)}`,
  flexShrink: 0,
}));

const NavigationContainer = styled(Box)(() => ({
  flex: 1,
  overflow: "hidden",
}));

export default function NavCustomMobilePeek({ data, slotProps }) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openMenu, setOpenMenu] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    setOpenMenu(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const handlePeekClick = useCallback(() => {
    setOpenMenu(true);
  }, []);

  // Touch handlers for swipe gestures
  const onTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isRightSwipe && !openMenu) {
      // Swipe right to open
      handleOpenMenu();
    } else if (isLeftSwipe && openMenu) {
      // Swipe left to close
      handleCloseMenu();
    }
  }, [touchStart, touchEnd, openMenu, handleOpenMenu, handleCloseMenu, minSwipeDistance]);

  return (
    <>
      {/* Hamburger Menu Button */}
      <IconButton 
        onClick={handleOpenMenu} 
        sx={{ 
          ml: 1,
          position: "relative",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
      </IconButton>

      {/* Backdrop - Only show when menu is open */}
      <StyledBackdrop
        open={openMenu}
        onClick={handleCloseMenu}
      />

      {/* Always-mounted Drawer with Peek Effect - Only on Mobile */}
      <DrawerContainer ismobile={isMobile ? 1 : 0}>
        <DrawerPaper 
          elevation={0} 
          open={openMenu}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          role="navigation"
          aria-label="Main navigation"
          aria-hidden={!openMenu}
        >
          <DrawerContent>
            <LogoContainer>
              <Logo />
            </LogoContainer>

            <NavigationContainer>
              <Scrollbar>
                <Box sx={{ pb: 3 }}>
                  {data.map((list) => (
                    <NavList
                      key={list.title}
                      depth={1}
                      data={list}
                      slotProps={slotProps}
                    />
                  ))}
                </Box>
              </Scrollbar>
            </NavigationContainer>
          </DrawerContent>

          {/* Peek Indicator - Always visible, but fades when open */}
          <PeekIndicator 
            open={openMenu} 
            onClick={handlePeekClick}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            role="button"
            tabIndex={openMenu ? -1 : 0}
            aria-label="Open navigation menu"
            aria-expanded={openMenu}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePeekClick();
              }
            }}
          />
        </DrawerPaper>
      </DrawerContainer>
    </>
  );
}

NavCustomMobilePeek.propTypes = {
  data: PropTypes.array,
  slotProps: PropTypes.object,
};