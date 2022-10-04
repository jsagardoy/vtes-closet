import {
  Alert,
  AlertColor,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  ParticipantType,
  TournamentType,
} from '../../../../types/tournament_type';

import { ProfileType } from '../../../../types/profile_type';
import React from 'react';
import { addParticipant } from '../../../../service/addParticipant';
import { compareDates } from '../../../../util';
import { useHistory } from 'react-router-dom';

interface Props {
  data: TournamentType[];
  userData: ProfileType;
}

const TournamentTable = (props: Props) => {
  const [showSB, setShowSB] = React.useState<{
    open: boolean;
    message: string;
    severity: AlertColor | undefined;
  }>({ open: false, message: '', severity: undefined });

  const history = useHistory();
  const handleEdit = (id: string): void => {
    history.push(`/tournament/${id}`);
  };

  const handleGoDetails = (id: string) => {
    history.push(`/tournament/info/${id}`);
  };

  const handleSubs = async (tournamentId: string) => {
    if (userData.vken) {
      const newParticipan: ParticipantType = {
        name: userData.name,
        vken: userData.vken,
      };
      const response = await addParticipant(tournamentId, newParticipan);

      setShowSB({
        open: response,
        message: 'Suscribed',
        severity: 'success',
      });
    } else {
      if (userData.uid) {
        setShowSB({
          open: true,
          message:
            'Vken required, please go to your profile add it before subscribing to any tournament',
          severity: 'warning',
        });
      } else {
        setShowSB({
          open: true,
          message: 'You need to be logged to suscribe to any of the tournament',
          severity: 'error',
        });
      }
    }
  };

  const handleClose = () => {
    setShowSB((prev) => ({ ...prev, open: false }));
  };
  const { data, userData } = props;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            ({
              id,
              owner,
              eventDate,
              name,
              city,
              location,
              maxNumberOfPlayers,
              participants,
              active,
            }: TournamentType) => (
              <TableRow key={id}>
                <TableCell onClick={() => handleGoDetails(id)}>
                  {compareDates(new Date(), eventDate) === false && active
                    ? 'Active'
                    : 'Finished'}
                </TableCell>
                <TableCell onClick={() => handleGoDetails(id)}>
                  {eventDate.getDate()}/
                  {('0' + (eventDate.getMonth() + 1)).slice(-2)}/
                  {eventDate.getFullYear()}
                </TableCell>
                <TableCell onClick={() => handleGoDetails(id)}>
                  {name}
                </TableCell>
                <TableCell onClick={() => handleGoDetails(id)}>
                  {city}
                </TableCell>
                <TableCell onClick={() => handleGoDetails(id)}>
                  {location}
                </TableCell>
                <TableCell onClick={() => handleGoDetails(id)}>
                  {participants ? participants.length : 0}/{maxNumberOfPlayers}
                </TableCell>

                <TableCell>
                  {userData.rol === 'prince' &&
                  userData.uid === owner &&
                  active &&
                  compareDates(new Date(), eventDate) === false ? (
                    <Button color='secondary' onClick={() => handleEdit(id)}>
                      Edit
                    </Button>
                  ) : null}
                  {active && compareDates(new Date(), eventDate) === false ? (
                    participants?.find(
                      (elem) => elem.vken === userData.vken
                    ) === undefined ? (
                      <Button
                        onClick={() => handleSubs(id)}
                        color='secondary'
                        disabled={
                          (participants ? participants.length : 0) >=
                          maxNumberOfPlayers
                        }
                      >
                        Suscribe
                      </Button>
                    ) : (
                      <Typography color='error' variant='body2'>
                        Suscribed
                      </Typography>
                    )
                  ) : null}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <Snackbar
        open={showSB.open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity={showSB.severity}>{showSB.message}</Alert>
      </Snackbar>
    </TableContainer>
  );
};

export default TournamentTable;
