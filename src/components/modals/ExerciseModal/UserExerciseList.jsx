import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  Collapse,
  Divider,
  Tooltip
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { addExercise } from "../../../api/nocodb";
import { saveUserExercise } from './exerciseStorage';

const UserExerciseList = ({ userFiles, onSelect, onClose, onRemove, removeIndexes }) => {
  if (userFiles.length === 0)
    return <Typography gutterBottom>Нет упражнений локально</Typography>;

  const handlePublish = async (file) => {
    try {
      await addExercise(file); // Отправляем в базу
      saveUserExercise(file, false); // Сохраняем обратно, как опубликованное
    } catch (error) {
      console.error('Ошибка при публикации:', error);
    }
  };

  return (
    <>
      <Divider sx={{ my: 2 }} />
      <List dense>
        {userFiles.map((file, index) => (
          <Collapse key={`user-${index}`} in={!removeIndexes[index]} timeout={300}>
            <ListItem
              disablePadding
              secondaryAction={
                <>
                  {/* Кнопка публикации */}
                  {file.local && (
                    <Tooltip title="Опубликовать в базу">
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => handlePublish(file)}
                        sx={{ mr: 1 }}
                      >
                        <CloudUploadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {/* Кнопка удаления */}
                  <IconButton edge="end" size="small" onClick={() => onRemove(index)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              }
            >
              <ListItemButton
                onClick={() => {
                  onSelect(file.link, file.timeSignature);
                  onClose();
                }}
              >
                <Typography noWrap>{file.name}</Typography>
              </ListItemButton>
            </ListItem>
          </Collapse>
        ))}
      </List>
    </>
  );
};

export default UserExerciseList;
