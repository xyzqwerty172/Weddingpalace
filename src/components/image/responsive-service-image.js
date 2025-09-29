import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Image from "./image";

// ----------------------------------------------------------------------

export default function ResponsiveServiceImage({ 
  src, 
  alt, 
  sx, 
  mobileRatio = "4/3", 
  desktopRatio = null, // Allow natural aspect ratio on desktop
  fullWidth = false,
  maxHeight = null, // New prop to control maximum height
  ...other 
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // For desktop, we'll use a flexible approach that doesn't force aspect ratios
  const shouldUseRatio = isMobile || desktopRatio;
  
  // Determine the best ratio based on screen size
  const getRatio = () => {
    if (!shouldUseRatio) return null; // No forced ratio on desktop
    if (isSmallMobile) return "1/1"; // Square for very small screens
    if (isMobile) return mobileRatio;
    return desktopRatio;
  };

  // Much larger desktop sizing - make images take up more horizontal space
  const getMaxWidth = () => {
    if (fullWidth) return "100%";
    
    return {
      xs: "100%", // Full width on mobile
      sm: "95%",  // Almost full on small tablets
      md: "100%", // Full width on desktop for maximum impact
      lg: "100%", // Full width on large screens
      xl: "95%",  // Slightly constrained only on extra large screens
    };
  };

  // Desktop-specific styling for natural image display
  const getImageStyles = () => {
    if (isMobile) {
      return {
        width: "100%",
        height: "auto",
      };
    }
    
    // Desktop: allow natural dimensions with generous constraints for larger display
    return {
      width: "100%",
      height: "auto",
      maxHeight: maxHeight || { md: "800px", lg: "900px", xl: "1000px" }, // Much larger max heights
      objectFit: "contain", // Ensure full image is visible
      "& .component-image-wrapper": {
        "& img": {
          objectFit: "contain !important", // Override the default cover behavior
        },
      },
    };
  };

  const ratio = getRatio();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: getMaxWidth(),
        mx: "auto", // Center the image
        my: { xs: 2, md: 3 }, // Balanced margins to allow more space for larger images
        borderRadius: { xs: 1, md: 2 },
        overflow: "hidden",
        boxShadow: {
          xs: theme.shadows[2],
          md: theme.shadows[4], // Consistent shadow without hover effects
        },
        // Removed all hover animations and transitions for cleaner experience
        ...sx,
      }}
      {...other}
    >
      <Image
        src={src}
        alt={alt}
        ratio={ratio}
        sx={getImageStyles()}
      />
    </Box>
  );
}

ResponsiveServiceImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  sx: PropTypes.object,
  mobileRatio: PropTypes.string,
  desktopRatio: PropTypes.string,
  fullWidth: PropTypes.bool,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};