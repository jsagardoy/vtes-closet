import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { ProfileType } from '../../../../types/profile_type';
import React from 'react';
import { TournamentType } from '../../../../types/tournament_type';
import { compareDates } from '../../../../util';
import { useHistory } from 'react-router-dom';

interface Props {
  data: TournamentType[];
  userData: ProfileType;
}

const TournamentTable = (props: Props) => {
  const history = useHistory();
  const handleEdit = (id: string):void => {
    history.push(`/tournament/${id}`);
  }
  
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
              active,
            }: TournamentType) => (
              <TableRow key={id}>
                <TableCell>
                  {compareDates(new Date(), eventDate) === false && active
                    ? 'Active'
                    : 'Finished'}
                </TableCell>
                <TableCell>
                  {eventDate.getDate()}/
                  {('0' + (eventDate.getMonth() + 1)).slice(-2)}/
                  {eventDate.getFullYear()}
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{city}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>
                  {numberOfPlayers}/{maxNumberOfPlayers}
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
                    <Button
                      color='secondary'
                      disabled={numberOfPlayers >= maxNumberOfPlayers}
                    >
                      Suscribe
                    </Button>
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
