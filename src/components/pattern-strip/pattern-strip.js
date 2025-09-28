import PropTypes from "prop-types";
import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

export default function PatternStrip({ 
  src = "/logo/pattern.png", 
  height = 60, 
  opacity = 1,
  sx = {},
  ...other 
}) {
  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        height,
        backgroundImage: `url(${src})`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "top center",
        backgroundSize: "auto 100%",
        opacity,
        position: "relative",
        zIndex: 1,
        ...sx,
      }}
      {...other}
    />
  );
}

PatternStrip.propTypes = {
  src: PropTypes.string,
  height: PropTypes.number,
  opacity: PropTypes.number,
  sx: PropTypes.object,
};
