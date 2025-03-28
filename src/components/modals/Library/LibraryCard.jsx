import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  useTheme
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const LibraryCard = ({ added, exercise, onModalOpen, handleAddExercise }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        minWidth: 300,
        height: '100%',
        borderRadius: 3,
        boxShadow: theme.shadows[3],
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[6],
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 1,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <CardContent sx={{ overflow: 'hidden' }}>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{ fontWeight: 600, color: theme.palette.text.primary }}
        >
          {exercise.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
          }}
        >
          {exercise.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 1 }}>
        <Button
          size="small"
          variant="outlined"
          onClick={onModalOpen}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          Превью
        </Button>

        {added ? (
          <Button
            size="small"
            startIcon={<CheckIcon />}
            disabled
            sx={{
              color: theme.palette.success.main,
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Добавлено
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={handleAddExercise}
            sx={{
              backgroundColor: theme.palette.primary.main,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Добавить
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default LibraryCard;
