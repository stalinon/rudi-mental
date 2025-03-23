import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const CircleIconButton = ({ onClick, icon, labelTop, labelBottom, caption }) => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={onClick }>
      {caption && (
        <Typography
          variant="caption"
          sx={{ display: 'block', marginBottom: '4px', color: theme.palette.text.secondary }}
        >
          {caption}
        </Typography>
      )}

      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: `2px solid ${theme.palette.grey[600]}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.background.paper,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 8px ${theme.palette.primary.main}55`,
          },
        }}
      >
        {icon &&
          React.cloneElement(icon, {
            sx: { fontSize: 28, color: theme.palette.text.primary },
          })}
        {!icon && labelTop && (
          <>
            <Typography variant="subtitle2" fontWeight={500}>
              {labelTop}
            </Typography>
            {labelBottom && (
              <Typography variant="subtitle2" fontWeight={500}>
                {labelBottom}
              </Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default CircleIconButton;
