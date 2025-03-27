import React, { useEffect, useState } from 'react';
import { nocodb } from '../../../api/nocodb';
import { Modal, Stack, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import LibraryCard from './LibraryCard';
import NotePreview from './NotePreview';

import { getUserExercises, saveUserExercise } from '../ExerciseModal/exerciseStorage';

const Library = ({open, handleClose}) => {
  const theme = useTheme();

  const [userExercises, setUserExercises] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [preview, setPreview] = useState(false);
  const [previewLink, setPreviewLink] = useState(null);

  useEffect(() => {
    nocodb.dbViewRow.list(
        "noco",
        "pxs7yguqn4kdrh2",
        "mlkdr9qliie4r01",
        "vw1f4mrgudje32rn", 
        {
            "offset": 0,
            "limit": 25,
            "where": ""
        }
    ).then(function (data) {
        setExercises(data.list.map(r => {
            return {
                name: r.Name,
                description: r.Description,
                link: r.GSLink,
                timeSignature: { top: r.Top, bottom: r.Bottom }
            }
        }));
    });
  }, [open]);

  useEffect(() => {
    const stored = getUserExercises();
    setUserExercises(stored);
  }, [open]);  

  return (
    <Modal open={open} sx={{backgroundColor: theme.palette.background.default}}>
        <>
            <IconButton
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: (theme) => theme.palette.grey[100],
                    backgroundColor: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <Stack margin={5} spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap sx={{ flexWrap: 'wrap' }}>
                {exercises && exercises.map(
                    (e, i) => <LibraryCard
                        key={i}
                        added={userExercises.some(u => u.link === e.link)}
                        onModalOpen={(link) => {setPreviewLink(link); setPreview(true);}}
                        handleAddExercise={() => {
                            saveUserExercise({
                            name: e.name,
                            link: e.link,
                            timeSignature: e.timeSignature
                            });
                            setUserExercises(getUserExercises()); // чтобы перерендерить
                        }}
                        name={e.name} description={e.description} link={e.link} timeSignature={e.timeSignature}
                        />)}
            </Stack>
            <NotePreview open={preview} link={previewLink} onClose={() => setPreview(false)} />
        </>
    </Modal>
  );
};

export default Library;
