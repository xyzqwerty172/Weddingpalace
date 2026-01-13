import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

// SETUP COLORS - WEDDING SITE COLOR SYSTEM

// Updated grey scale based on PANTONE Cool Gray specifications
export const grey = {
  0: "#FFFFFF",
  100: "#F2F2F2", // PANTONE Cool Gray 1 C
  200: "#E6E6E6", // Cool Gray 2 C
  300: "#D9D9D9", // Cool Gray 3 C
  400: "#D9D9D9", // Cool Gray 4 C
  500: "#BFBFBF", // Cool Gray 5 C
  600: "#A7A7A7", // Cool Gray 6 C
  700: "#8C8C8C", // Cool Gray 7 C
  800: "#595959", // Better contrast for inactive nav links
  900: "#4A4A4A", // Warm Gray 11 C - Body text
  1000: "#4A4A4A", // Body copy color
};

// Primary brand color: PANTONE 3275 C (#00af9b)
export const primary = {
  lighter: "#E6F7F5", // Lightened version of main
  light: "#1ABBA3", // Hover state: lighten #00B398 8%
  main: "#00AF9A", // Brand-forward active nav link color
  dark: "#009B8A", // Darker version
  darker: "#008A7A", // Even darker version
  contrastText: "#FFFFFF", // Text on teal BG - clear and simple
};

// Accent color: PANTONE 231 C (#E54B87) - soft blush pink
export const secondary = {
  lighter: "#FCE8F1", // Lightened version
  light: "#F0A3C4", // Lighter version
  main: "#E54B87", // PANTONE 231 C - soft blush pink
  dark: "#D13A76", // Darker version
  darker: "#B82A65", // Even darker version
  contrastText: "#FFFFFF", // Text on blush pink BG - romantic + readable
};

export const info = {
  lighter: "#CAFDF5",
  light: "#61F3F3",
  main: "#00B8D9",
  dark: "#006C9C",
  darker: "#003768",
  contrastText: "#FFFFFF",
};

export const success = {
  lighter: "#D3FCD2",
  light: "#77ED8B",
  main: "#009639", // PANTONE 347 U
  dark: "#007A2E",
  darker: "#005E23",
  contrastText: "#FFFFFF",
};

export const warning = {
  lighter: "#FFF5CC",
  light: "#FFD666",
  main: "#FFAB00",
  dark: "#B76E00",
  darker: "#7A4100",
  contrastText: grey[800],
};

export const error = {
  lighter: "#FFE9D5",
  light: "#FFAC82",
  main: "#E60012", // PANTONE 1788 U
  dark: "#CC0010",
  darker: "#B3000E",
  contrastText: "#FFFFFF",
};

export const common = {
  black: "#000000",
  white: "#FFFFFF",
};

export const action = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(grey[500], 0.16),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[400], 0.24), // Cool Gray 4 C (#D9D9D9) fill for disabled
  focus: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha(grey[500], 0.2),
  action,
};

// ----------------------------------------------------------------------

export function palette(mode) {
  const light = {
    ...base,
    mode: "light",
    text: {
      primary: grey[1000], // Warm Gray 11 C (#4A4A4A) - Body copy - Elegant and legible
      secondary: grey[800], // Better contrast for supporting text - Improve accessibility
      disabled: grey[600], // Cool Gray 6 C (#A7A7A7) for disabled text
    },
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF",
      neutral: grey[100], // PANTONE Cool Gray 1 C (#F2F2F2) for subtle backgrounds
    },
    action: {
      ...base.action,
      active: primary.main, // Active link text: PANTONE 3275 C (#00af9b)
    },
  };

  const dark = {
    ...base,
    mode: "dark",
    text: {
      primary: "#FFFFFF",
      secondary: grey[500],
      disabled: grey[600],
    },
    background: {
      paper: grey[800],
      default: grey[900],
      neutral: alpha(grey[500], 0.12),
    },
    action: {
      ...base.action,
      active: grey[500],
    },
  };

  return mode === "light" ? light : dark;
}
