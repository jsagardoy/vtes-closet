import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import React from 'react';
import { ProfileType } from '../../../../types/profile_type';
import { TournamentType } from '../../../../types/tournament_type';
import { compareDates } from '../../../../util';

interface Props {
  data: TournamentType[];
  userData: ProfileType;
}

const TournamentTable = (props: Props) => {
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
              numberOfPlayers,
            }: TournamentType) => (
              <TableRow key={id}>
                <TableCell>
                  {compareDates(new Date(), eventDate) === false
                    ? 'Active'
                    : 'Finished'}
                </TableCell>
                <TableCell>
                  {eventDate.getDate()}/{eventDate.getMonth()}/
                  {eventDate.getFullYear()}
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{city}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>
                  {numberOfPlayers}/{maxNumberOfPlayers}
                </TableCell>
                <TableCell>
                  {compareDates(new Date(), eventDate) === false ? (
                    <Button
                      color='secondary'
                      disabled={numberOfPlayers >= maxNumberOfPlayers}
                    >
                      Suscribe
                    </Button>
                  ) : null}
                  {userData.rol === 'prince' &&
                  userData.uid === owner &&
                  compareDates(new Date(), eventDate) === false ? (
                    <Button color='secondary'>Edit</Button>
                  ) : null}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TournamentTable;
