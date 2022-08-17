import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { ExtendedDeckType } from '../../../../types/deck_type';
import QuantityButtonComponent from './QuantityButtonComponent';

interface Props {
  data: ExtendedDeckType[] | null;
  updateQuantity: (
    newQunatity: number,
    id: number,
    cardType: 'library' | 'crypt'
  ) => void;
}

const DeckComponent = (props: Props) => {
  const { data, updateQuantity } = props;

  return (
    <Table>
      <TableHead sx={{ backgroundColor: 'white' }}>
        <TableRow>
          <TableCell sx={{ color: 'darkcyan' }}>Quantity</TableCell>
          <TableCell sx={{ color: 'darkcyan' }}>Card name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((elem: ExtendedDeckType) => (
          <TableRow key={elem.data.id}>
            <TableCell sx={{ color: 'darkcyan', backgroundColor: 'white' }}>
              <QuantityButtonComponent
                initialQuantity={elem.quantity}
                id={elem.data.id}
                updateQuantity={updateQuantity}
                cardType={elem.cardType}
              />
            </TableCell>
            <TableCell sx={{ color: 'darkcyan', backgroundColor: 'white' }}>
              {elem.data.name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default DeckComponent;
