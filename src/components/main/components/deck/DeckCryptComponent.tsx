import {
  Avatar,
  Box,
  ListItemAvatar,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { CryptType } from '../../../../types/crypt_type';

import { CardType, ExtendedDeckType } from '../../../../types/deck_type';
import { getClanIcon, getCleanedName, getDiscIcon, HEADER_COLOR } from '../../../../util';

import QuantityButtonComponent from './QuantityButtonComponent';

interface Props {
  data: ExtendedDeckType[] | null;
  updateQuantity: (newQunatity: number, id: number, cardType: CardType) => void;
  handleRemoveCard: (id: number, cardType: CardType) => void;
}

const DeckCryptComponent = (props: Props) => {
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
    padding: 0,
  };

  const getDisciplines = (discList: string[]) => (
    <div className='list__left'>
      {getDiscIcon(discList).map((disc) => (
        <ListItemAvatar className='list__avatar__icons' key={disc}>
          <Avatar src={disc} alt={disc} />
        </ListItemAvatar>
      ))}
    </div>
  );
  const getClan = (crypt: CryptType) =>
    getClanIcon(crypt.clans).map((clan) => (
      <Avatar className='clan__avatar__icon' key={clan} src={clan} alt={clan} />
    ));

  const getCapacity = (crypt: CryptType) => crypt.capacity;
  const getGroup = (crypt: CryptType) => crypt.group;

  const getMaxCapacity = () => {
    if (data && data.length > 0) {
      const capacities: number[] | undefined = data?.map((elem) => {
        const value = elem.data as CryptType;
        return value.capacity;
      });
      return capacities ? Math.max(...capacities) : 0;
    }
    return 0;
  }

  const getMinCapacity = () => {
    if (data && data.length>0) {
      const capacities: number[] | undefined = data?.map((elem) => {
        const value = elem.data as CryptType;
        return value.capacity;
      });

      return capacities ? Math.min(...capacities) : 0;
    };
    return 0;
  }
  const getAvgCapacity = () => {
    if (data && data.length > 0) {
      const capacities: number[] | undefined = data?.map((elem) => {
        const value = elem.data as CryptType;
        return value.capacity;
      });

      return capacities
        ? (capacities.reduce((a, b) => a + b) / capacities.length).toFixed(2)
        : 0;
    }
    return 0;
   };
  
  const getGroups = (): string[] => {
    if (data && data.length > 0) {
      const groups: string[] | undefined = data?.map((elem) => {
        const value = elem.data as CryptType;
        return value.group;
      });
      const setGroup =  new Set(groups)
      return groups ? Array.from(setGroup).sort() : [];
    }
    return [];
  }
  
  return (
    <>
      {openModal ? (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box sx={styleModal}>
            <img src={selectedCard.url} alt={selectedCard.name} />
          </Box>
        </Modal>
      ) : null}
      <Box
        sx={{
          backgroundColor: HEADER_COLOR,
          p: '1rem',
          display: 'flex',
          borderBottom: '1px solid darkcyan',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <Typography>Min Capacity:{getMinCapacity()} </Typography>
        <Typography>Max Capacity:{getMaxCapacity()} </Typography>
        <Typography>Average Capacity: {getAvgCapacity()} </Typography>
        <Typography>
          Groups: [
          {getGroups().map((group: string, index: number) => {
            if (index + 1 < getGroups().length) {
              return `${group}, `;
            }
            return group;
          })}
          ]{' '}
        </Typography>
      </Box>
      <Table>
        <TableHead sx={{ backgroundColor: 'white' }}>
          <TableRow>
            <TableCell sx={{ color: 'darkcyan' }}>Quantity</TableCell>
            <TableCell sx={{ color: 'darkcyan' }}>Clan</TableCell>
            <TableCell sx={{ color: 'darkcyan' }}>Card name</TableCell>
            <TableCell sx={{ color: 'darkcyan' }}>Group</TableCell>
            <TableCell sx={{ color: 'darkcyan' }}>Disciplines</TableCell>
            <TableCell sx={{ color: 'darkcyan' }}>Capacity</TableCell>
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
                {elem.data.clans ? getClan(elem.data as CryptType) : null}
              </TableCell>
              <TableCell
                sx={{ color: 'darkcyan', backgroundColor: 'white' }}
                onClick={() => handleOpenModal(elem, index)}
              >
                {getCleanedName(elem.data.name)}
              </TableCell>
              <TableCell
                className='list__item__icons'
                sx={{ color: 'darkcyan', backgroundColor: 'white' }}
                onClick={() => handleOpenModal(elem, index)}
              >
                {getGroup(elem.data as CryptType)}
              </TableCell>
              <TableCell
                sx={{ color: 'darkcyan', backgroundColor: 'white' }}
                onClick={() => handleOpenModal(elem, index)}
              >
                <div className='list__left'>
                  {elem.data.disciplines
                    ? getDisciplines(elem.data.disciplines)
                    : null}
                </div>
              </TableCell>
              <TableCell
                className='list__item__icons'
                sx={{ color: 'darkcyan', backgroundColor: 'white' }}
                onClick={() => handleOpenModal(elem, index)}
              >
                <Box
                  sx={{
                    backgroundColor: 'darkred',
                    color: 'white',
                    borderRadius: '50%',
                    width: '1rem',
                    textAlign: 'center',
                  }}
                >
                  {getCapacity(elem.data as CryptType)}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default DeckCryptComponent;
