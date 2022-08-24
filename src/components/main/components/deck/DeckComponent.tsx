import {
  Box,
  Modal,
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
  const { data, updateQuantity, handleRemoveCard } = props;

  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedCard, setSelectedCard] = React.useState<any>({});

  const handleOpenModal = (card: ExtendedDeckType, index: number) => {
    setSelectedCard(card.data);
    setOpenModal((prev) => !prev);
  };
  React.useEffect(() => {}, [data]);

  const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 0,
    padding:0,
  };

  return (
    <>
      {openModal ? (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <Box sx={styleModal}>
            <img src={selectedCard.url} alt={selectedCard.name} />
          </Box>
        </Modal>
      ) : null}
      <Table>
        <TableHead sx={{ backgroundColor: 'white' }}>
          <TableRow>
            <TableCell sx={{ color: 'darkcyan' }}>Quantity</TableCell>
            <TableCell sx={{ color: 'darkcyan' }}>Card name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((elem: ExtendedDeckType, index: number) => (
            <TableRow key={elem.data.id}>
              <TableCell sx={{ color: 'darkcyan', backgroundColor: 'white' }}>
                <QuantityButtonComponent
                  handleRemoveCard={(id: number, cardType: CardType) =>
                    handleRemoveCard(id, cardType)
                  }
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
              <TableCell
                sx={{ color: 'darkcyan', backgroundColor: 'white' }}
                onClick={() => handleOpenModal(elem, index)}
              >
                {elem.data.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default DeckComponent;
