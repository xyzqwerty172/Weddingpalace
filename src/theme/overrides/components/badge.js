import { badgeClasses } from '@mui/material/Badge';

// ----------------------------------------------------------------------

export function badge(theme) {
  return {
    MuiBadge: {
      styleOverrides: {
        dot: {
          borderRadius: '50%',
        },
        badge: {
          // Base stable styles for all badges
          [`&.${badgeClasses.invisible}`]: {
            transform: 'unset',
          },
        },
        root: ({ ownerState }) => {
          const alway = ownerState.variant === 'alway';
          const online = ownerState.variant === 'online';
          const busy = ownerState.variant === 'busy';
          const offline = ownerState.variant === 'offline';
          const invisible = ownerState.variant === 'invisible';

          const baseStyles = {
            width: 10,
            zIndex: 9,
            padding: 0,
            height: 10,
            minWidth: 'auto',
            '&:before, &:after': {
              content: "''",
              borderRadius: 1,
              backgroundColor: theme.palette.common.white,
            },
          };

          // Use more stable conditional logic
          if (invisible) {
            return {
              [`& .${badgeClasses.badge}`]: {
                display: 'none',
              },
            };
          }

          if (online) {
            return {
              [`& .${badgeClasses.badge}`]: {
                ...baseStyles,
                backgroundColor: theme.palette.success.main,
              },
            };
          }

          if (busy) {
            return {
              [`& .${badgeClasses.badge}`]: {
                ...baseStyles,
                backgroundColor: theme.palette.error.main,
                '&:before': { width: 6, height: 2 },
              },
            };
          }

          if (offline) {
            return {
              [`& .${badgeClasses.badge}`]: {
                ...baseStyles,
                backgroundColor: theme.palette.text.disabled,
                '&:before': {
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                },
              },
            };
          }

          if (alway) {
            return {
              [`& .${badgeClasses.badge}`]: {
                ...baseStyles,
                backgroundColor: theme.palette.warning.main,
                '&:before': {
                  width: 2,
                  height: 4,
                  transform: 'translateX(1px) translateY(-1px)',
                },
                '&:after': {
                  width: 2,
                  height: 4,
                  transform: 'translateY(1px) rotate(125deg)',
                },
              },
            };
          }

          return {};
        },
      },
    },
  };
}
