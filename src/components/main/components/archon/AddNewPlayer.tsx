import { IconButton, TextField, Typography } from '@mui/material';
import React, { FormEvent, useRef } from 'react';

import { Box } from '@mui/system';
import { ParticipantType } from '../../../../types/tournament_type';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface Props {
  addNewPlayer: (newPlayer: ParticipantType) => void;
}
const AddNewPlayer = (props: Props) => {
  const { addNewPlayer } = props;
  const name = useRef<HTMLInputElement | null>(null);
  const vken = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.current && vken.current) {
      const newPlayer = {
        name: name.current.value,
        vken: vken.current.value,
        drop: false,
      };
      addNewPlayer(newPlayer);
      name.current.value = '';
      vken.current.value = '';
    }
  };
  return (
    <Box component='form' onSubmit={(e: FormEvent) => handleSubmit(e)}>
      <Typography variant='body1'>Add new Player</Typography>
      <TextField inputRef={name} label='Name' fullWidth required />
      <TextField inputRef={vken} label='Vken' fullWidth required />
      <IconButton type='submit'>
        <PersonAddIcon />
      </IconButton>
    </Box>
  );
};

export default AddNewPlayer;
