import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { CardType, ExtendedDeckType } from '../../../../types/deck_type';
import QuantityButtonComponent from './QuantityButtonComponent';

interface Props {
  data: ExtendedDeckType[] | null;
  updateQuantity: (
    newQunatity: number,
    id: number,
    cardType: 'library' | 'crypt'
  ) => void;
  handleRemoveCard: (id: number, cardType: CardType) => void;
}



const DeckComponent = (props: Props) => {
  const { data, updateQuantity,handleRemoveCard } = props;

  React.useEffect(() => {
  }, [data]);
  
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
                handleRemoveCard={(id:number,cardType:CardType)=>handleRemoveCard(id,cardType)}
                initialQuantity={elem.quantity}
                id={elem.data.id}
                updateQuantity={(
                  newQuantity: number,
                  id: number,
                  cardType: 'library' | 'crypt'
                ) => updateQuantity(newQuantity, id, cardType)}
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
