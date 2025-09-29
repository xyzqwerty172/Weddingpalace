'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

import { bgBlur } from 'src/theme/css';

import { LeftIcon, RightIcon } from './arrow-icons';

// ----------------------------------------------------------------------

const StyledRoot = styled(Box)(({ theme }) => ({
  ...bgBlur({
    opacity: 0.48,
    color: theme.palette.grey[900],
  }),
  zIndex: 9,
  display: 'inline-flex',
  alignItems: 'center',
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  padding: theme.spacing(0.25),
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
}));

const StyledIconButton = styled(IconButton)({
  width: 28,
  height: 28,
  padding: 0,
  opacity: 0.48,
  '&:hover': { opacity: 1 },
});

// Client-only CarouselArrowIndex to prevent hydration mismatches
export default function CarouselArrowIndexClientOnly({ index, total, onNext, onPrev, icon, sx, ...other }) {
  const [isClient, setIsClient] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Always use LTR direction for consistency during SSR
  const isRTL = isClient ? theme.direction === 'rtl' : false;

  if (!isClient) {
    // Return a server-safe version without dynamic theme-dependent styles
    return (
      <Box
        sx={{
          zIndex: 9,
          display: 'inline-flex',
          alignItems: 'center',
          position: 'absolute',
          bottom: 2,
          right: 2,
          padding: 0.25,
          color: 'common.white',
          borderRadius: 1,
          backgroundColor: 'rgba(33, 43, 54, 0.48)',
          backdropFilter: 'blur(6px)',
          ...sx,
        }}
        {...other}
      >
        <IconButton
          color="inherit"
          onClick={onPrev}
          sx={{
            width: 28,
            height: 28,
            padding: 0,
            opacity: 0.48,
            '&:hover': { opacity: 1 },
          }}
        >
          <LeftIcon icon={icon} isRTL={false} />
        </IconButton>

        <Typography 
          variant="subtitle2" 
          component="span" 
          sx={{ 
            mx: 0.25,
            fontWeight: 600,
            lineHeight: 1.57,
            fontSize: '0.875rem',
          }}
          suppressHydrationWarning
        >
          {index + 1}/{total}
        </Typography>

        <IconButton
          color="inherit"
          onClick={onNext}
          sx={{
            width: 28,
            height: 28,
            padding: 0,
            opacity: 0.48,
            '&:hover': { opacity: 1 },
          }}
        >
          <RightIcon icon={icon} isRTL={false} />
        </IconButton>
      </Box>
    );
  }

  return (
    <StyledRoot sx={sx} {...other}>
      <StyledIconButton color="inherit" onClick={onPrev}>
        <LeftIcon icon={icon} isRTL={isRTL} />
      </StyledIconButton>

      <Typography 
        variant="subtitle2" 
        component="span" 
        sx={{ 
          mx: 0.25,
          fontWeight: 600,
          lineHeight: 1.57,
          fontSize: '0.875rem',
        }}
      >
        {index + 1}/{total}
      </Typography>

      <StyledIconButton color="inherit" onClick={onNext}>
        <RightIcon icon={icon} isRTL={isRTL} />
      </StyledIconButton>
    </StyledRoot>
  );
}

CarouselArrowIndexClientOnly.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  index: PropTypes.number,
  total: PropTypes.number,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  sx: PropTypes.object,
};