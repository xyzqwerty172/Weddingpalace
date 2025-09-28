import { alpha } from '@mui/material/styles';
import { buttonClasses } from '@mui/material/Button';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

// ----------------------------------------------------------------------

export function button(theme) {
  const lightMode = theme.palette.mode === 'light';

  const rootStyles = (ownerState) => {
    const inheritColor = ownerState.color === 'inherit';

    const containedVariant = ownerState.variant === 'contained';

    const outlinedVariant = ownerState.variant === 'outlined';

    const textVariant = ownerState.variant === 'text';

    const softVariant = ownerState.variant === 'soft';

    const smallSize = ownerState.size === 'small';

    const mediumSize = ownerState.size === 'medium';

    const largeSize = ownerState.size === 'large';

    const defaultStyle = {
      ...(inheritColor && {
        // CONTAINED
        ...(containedVariant && {
          color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
          backgroundColor: lightMode ? theme.palette.grey[800] : theme.palette.common.white,
          '&:hover': {
            backgroundColor: lightMode ? theme.palette.grey[700] : theme.palette.grey[400],
          },
        }),
        // OUTLINED
        ...(outlinedVariant && {
          borderColor: alpha(theme.palette.grey[500], 0.32),
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }),
        // TEXT
        ...(textVariant && {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }),
        // SOFT
        ...(softVariant && {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.grey[500], 0.08),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.24),
          },
        }),
      }),
      ...(outlinedVariant && {
        '&:hover': {
          borderColor: 'currentColor',
          boxShadow: '0 0 0 0.5px currentColor',
        },
      }),
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        // CONTAINED
        ...(containedVariant && {
          borderRadius: 4, // 4px radius for wedding theme
          '&:hover': {
            boxShadow: theme.customShadows[color],
          },
        }),
        // OUTLINED
        ...(outlinedVariant && {
          borderRadius: 4, // 4px radius for wedding theme
          borderWidth: 1,
          '&:hover': {
            borderColor: 'currentColor',
            boxShadow: '0 0 0 0.5px currentColor',
          },
        }),
        // SOFT
        ...(softVariant && {
          borderRadius: 4, // 4px radius for wedding theme
          color: theme.palette[color][lightMode ? 'dark' : 'light'],
          backgroundColor: alpha(theme.palette[color].main, 0.16),
          '&:hover': {
            backgroundColor: alpha(theme.palette[color].main, 0.32),
          },
        }),
      }),
    }));

    const disabledState = {
      [`&.${buttonClasses.disabled}`]: {
        // SOFT
        ...(softVariant && {
          backgroundColor: theme.palette.action.disabledBackground,
        }),
      },
    };

    const size = {
      ...(smallSize && {
        height: 30,
        fontSize: 13,
        paddingLeft: 8,
        paddingRight: 8,
        ...(textVariant && {
          paddingLeft: 4,
          paddingRight: 4,
        }),
      }),
      ...(mediumSize && {
        paddingLeft: 12,
        paddingRight: 12,
        ...(textVariant && {
          paddingLeft: 8,
          paddingRight: 8,
        }),
      }),
      ...(largeSize && {
        height: 48,
        fontSize: 15,
        paddingLeft: 16,
        paddingRight: 16,
        ...(textVariant && {
          paddingLeft: 10,
          paddingRight: 10,
        }),
      }),
    };

    // Wedding theme specific button styles
    const weddingThemeStyles = {
      // Primary CTA: Brand-forward teal fill, white text, 4px radius
      ...(ownerState.color === 'primary' && containedVariant && {
        backgroundColor: theme.palette.primary.main, // #00AF9A
        color: theme.palette.common.white, // Text on teal BG - clear and simple
        borderRadius: 4,
        '&:hover': {
          backgroundColor: theme.palette.primary.light, // Hover state: lighten 8%
        },
      }),
      // Secondary CTA: white fill, 1px stroke #00B398, #00B398 text
      ...(ownerState.color === 'secondary' && outlinedVariant && {
        backgroundColor: theme.palette.common.white,
        borderColor: theme.palette.primary.main, // #00AF9A
        color: theme.palette.primary.main, // #00AF9A
        borderRadius: 4,
        borderWidth: 1,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
          borderColor: theme.palette.primary.light,
          color: theme.palette.primary.light,
        },
      }),
      // Ghost/subtle: transparent fill, 1px stroke Cool Gray 3 C, better contrast text
      ...(ownerState.color === 'inherit' && outlinedVariant && {
        backgroundColor: 'transparent',
        borderColor: theme.palette.grey[300], // Cool Gray 3 C
        color: theme.palette.grey[800], // Better contrast #595959
        borderRadius: 4,
        borderWidth: 1,
        '&:hover': {
          backgroundColor: alpha(theme.palette.grey[300], 0.04),
          borderColor: theme.palette.grey[400],
          color: theme.palette.grey[900],
        },
      }),
    };

    return [defaultStyle, ...colorStyle, disabledState, size, weddingThemeStyles];
  };

  return {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => rootStyles(ownerState),
      },
    },
  };
}
