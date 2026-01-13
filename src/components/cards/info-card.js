"use client";

import { Box } from "@mui/material";

export default function InfoCard({
  children,
  variant = "default",
  sx = {},
  ...other
}) {
  const getCardStyles = () => {
    const baseStyles = {
      p: 3,
      borderRadius: 2,
      transition: "all 0.2s ease",
    };

    switch (variant) {
      case "dark":
        return {
          ...baseStyles,
          backgroundColor: "grey.900",
          border: "1px solid",
          borderColor: "grey.700",
          color: "grey.100",
          "&:hover": {
            backgroundColor: "grey.800",
            borderColor: "grey.600",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }
        };
      case "subtle":
        return {
          ...baseStyles,
          backgroundColor: "grey.50",
          border: "1px solid",
          borderColor: "grey.300",
          "&:hover": {
            backgroundColor: "grey.100",
            borderColor: "grey.400",
            transform: "translateY(-1px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }
        };
      case "warning":
        return {
          ...baseStyles,
          backgroundColor: "warning.light",
          border: "1px solid",
          borderColor: "warning.main",
          "&:hover": {
            backgroundColor: "warning.main",
            color: "warning.contrastText"
          }
        };
      case "paper":
        return {
          ...baseStyles,
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "grey.200",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          "&:hover": {
            borderColor: "primary.light",
            transform: "translateY(-1px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
          }
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: "grey.50",
          border: "1px solid",
          borderColor: "grey.300",
        };
    }
  };

  return (
    <Box
      sx={{
        ...getCardStyles(),
        ...sx
      }}
      {...other}
    >
      {children}
    </Box>
  );
}