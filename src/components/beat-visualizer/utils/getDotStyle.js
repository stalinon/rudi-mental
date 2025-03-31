export const getDotStyle = (i, currentBeat, theme) => {
    const isCurrent = i === currentBeat;
    const isFirst = i === 0;
    const isFirstActive = isCurrent && isFirst;
  
    if (!isCurrent) {
      return {
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: `2px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.background.default,
      };
    }
  
    const gradient = isFirstActive
      ? `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`
      : `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`;
  
    const boxShadow = isFirstActive
      ? `0 0 12px ${theme.palette.primary.main}AA`
      : `0 0 6px ${theme.palette.primary.main}55`;
  
    return {
      width: 20,
      height: 20,
      borderRadius: '50%',
      backgroundColor: theme.palette.background.default,
      border: '2px solid transparent',
      backgroundImage: `${gradient}, ${theme.palette.background.default}`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'border-box, padding-box',
      boxShadow,
      transition: 'all 0.2s ease',
    };
  };
  