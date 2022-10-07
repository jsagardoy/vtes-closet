import {
  Alert,
  AlertColor,
  Box,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import {
  ParticipantType,
  TournamentType,
} from '../../../../types/tournament_type';

import { ProfileType } from '../../../../types/profile_type';
import React from 'react';
import { addParticipant } from '../../../../service/addParticipant';
import { compareDates } from '../../../../util';
import { removeParticipant } from '../../../../service/removeParticipant';
import { useHistory } from 'react-router-dom';

interface Props {
  data: TournamentType[];
  userData: ProfileType;
}

const TournamentTable = (props: Props) => {
  const theme: Theme = useTheme();
  const { data, userData } = props;
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

  const handleUnsubs = async (tournamentId: string) => {
    try {
      if (userData.vken) {
        const newParticipant: ParticipantType = {
          name: userData.name,
          vken: userData.vken,
          drop: false,
        };
        const response = await removeParticipant(tournamentId, newParticipant);
        if (response) {
          setShowSB({
            open: true,
            message: 'Unsubscribed',
            severity: 'success',
          });
        } else {
          setShowSB({
            open: true,
            message: 'Error while trying to unsubscribe. Please try again.',
            severity: 'error',
          });
        }
      } else {
        setShowSB({
          open: true,
          message: 'Error while trying to unsuscribe. No Vken provided.',
          severity: 'error',
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSubs = async (tournamentId: string) => {
    try {
      if (userData.vken) {
        const newParticipant: ParticipantType = {
          name: userData.name,
          vken: userData.vken,
          drop: false,
        };
        const response = await addParticipant(tournamentId, newParticipant);
        if (response) {
          setShowSB({
            open: true,
            message: 'Subscribed',
            severity: 'success',
          });
        } else {
          setShowSB({
            open: true,
            message: 'Error in subscription.',
            severity: 'error',
          });
        }
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
            message:
              'You need to be logged to suscribe to any of the tournament',
            severity: 'error',
          });
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const handleClose = () => {
    setShowSB((prev) => ({ ...prev, open: false }));
  };

  return (
    <TableContainer>
      <Table>
        <TableHead
          sx={{
            '& .MuiTableCell-head': { color: theme.palette.secondary.main },
          }}
        >
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
          {data.length === 0 ? (
            <TableRow sx={{ display: 'flex',}}>
              <TableCell sx={{ display: 'flex', border: '0' }}>
                No results
              </TableCell>
            </TableRow>
          ) : (
            data.map(
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
                    {('0' + ((eventDate.getDate() ?? 0) + 1)).slice(-2)}/
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
                    {participants ? participants.length : 0}/
                    {maxNumberOfPlayers}
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
                          Subscribe
                        </Button>
                      ) : (
                        <Box sx={{ display: 'flex', alighItems: 'center' }}>
                          <Typography color='error' variant='body2'>
                            Subscribed
                          </Typography>
                          <Button
                            onClick={() => handleUnsubs(id)}
                            color='secondary'
                          >
                            Unsubscribe
                          </Button>
                        </Box>
                      )
                    ) : null}
                  </TableCell>
                </TableRow>
              )
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
