// ----------------------------------------------------------------------

export function typography(theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        root: {
          // Ensure consistent baseline styles
          '&.MuiTypography-subtitle2': {
            fontWeight: 600,
            lineHeight: 1.57,
            fontSize: '0.875rem',
          },
        },
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
        subtitle2: {
          // Stable styles for subtitle2 variant
          fontWeight: 600,
          lineHeight: 1.57,
          fontSize: '0.875rem',
        },
      },
    },
  };
}
