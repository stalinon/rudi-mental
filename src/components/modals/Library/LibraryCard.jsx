import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const LibraryCard = ({added, name, description, link, onModalOpen, handleAddExercise}) => {

  return (
    <Card sx={{ minWidth: 300, height: 150 }}>
      <CardContent>
        <Typography variant="h5" component="div" noWrap>
          {name}
        </Typography>
        <Typography variant="body2" marginY={1} noWrap>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onModalOpen(link)}>Превью</Button>
        {added ? (
            <Button
            size="small"
            startIcon={<CheckIcon />}
            disabled
            sx={{ color: 'success.main' }}
            >
            Добавлено
            </Button>
        ) : (
            <Button size="small" onClick={handleAddExercise}>
            Добавить к себе
            </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default LibraryCard;
