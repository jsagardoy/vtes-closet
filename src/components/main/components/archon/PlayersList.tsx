import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';

import BackspaceIcon from '@mui/icons-material/Backspace';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import { ParticipantType } from '../../../../types/tournament_type';
import React from 'react';

interface Props {
  players: ParticipantType[];
  updatePlayersList: (playerList: ParticipantType[]) => void;
  isFinal: boolean;
}
const PlayersList = (props: Props) => {
  const { players, updatePlayersList, isFinal } = props;

  const handleDrop = (vken: string) => {
    const newPlayersList: ParticipantType[] = players.map((elem) =>
      elem.vken === vken ? { ...elem, drop: !elem.drop } : elem
    );
    updatePlayersList(newPlayersList);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Droped</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player: ParticipantType, index: number) => (
            <TableRow key={index}>
              <TableCell>
                {player.drop ? <BlockIcon /> : <CheckIcon />}
              </TableCell>
              <TableCell>
                <Typography
                  variant='body1'
                  color={isFinal && index < 5 ? 'secondary' : 'primary'}
                >
                  {player.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Tooltip arrow title='Drop this player'>
                  <IconButton onClick={() => handleDrop(player.vken)}>
                    <BackspaceIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayersList;
