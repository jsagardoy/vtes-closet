import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { PlayerResultsType } from '../../../../types/archon_type';

interface Props {
  data: PlayerResultsType[];
}
const FinalTableTable = (props: Props) => {
  const { data } = props;
  /* const [players, setPlayers] = useState<PlayerResultsType[]>(data); */
  const [showFinal, setShowFinal] = useState<boolean>(false);
  const [final, setFinal] = useState<PlayerResultsType[]>(data);

  const [order, setOrder] = useState<
    { player: PlayerResultsType; value: number }[]
  >([]);

  const onChange = (event: SelectChangeEvent) => {
    if (data.length > 0) {
      event.preventDefault();
      const vken = event.target.name;
      const value = Number(event.target.value) ?? 0;
      const newOrder = order.map((elem) =>
        elem.player.vken === vken ? { ...elem, value: value } : elem
      );

      setOrder(newOrder);
    }
  };
  
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const sortedOrder = order.sort((a, b) => a.value - b.value);
    const cleanFinalList: PlayerResultsType[] = sortedOrder.map(
      (elem) => elem.player
    );
    setFinal(cleanFinalList);
    setShowFinal(true);
    window.localStorage.setItem('final', JSON.stringify(cleanFinalList));
  };
  
  useEffect(() => {
    const initialOrder: { player: PlayerResultsType; value: number }[] =
      data.map((elem) => ({ player: { ...elem }, value: 0 }));
    setOrder(initialOrder);
  }, [data]);

  const getSelectValue = (vken:string) => {
    const newOrder = order.find(elem => elem.player.vken === vken);
    if (newOrder !== undefined) {
      return newOrder.value.toString();
    }
    return '0';
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((player: PlayerResultsType, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel id='VP_Label'>Sitting Order</InputLabel>
                    <Select
                      name={player.vken}
                      labelId='order_Label'
                      label='Order'
                      onChange={onChange}
                      value={getSelectValue(player.vken)}
                    >
                      <MenuItem value={0}>1</MenuItem>
                      <MenuItem value={1}>2</MenuItem>
                      <MenuItem value={2}>3</MenuItem>
                      <MenuItem value={3}>4</MenuItem>
                      <MenuItem value={4}>5</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          onSubmit(e)
        }
      >
        Submit Order
      </Button>

      {showFinal && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {final.map((player: PlayerResultsType, index: number) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{player.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default FinalTableTable;
