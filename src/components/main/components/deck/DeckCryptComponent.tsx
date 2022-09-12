import {
  Avatar,
  Box,
  ListItemAvatar,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import React from 'react';
import { CryptType } from '../../../../types/crypt_type';

import { CardType, ExtendedDeckType } from '../../../../types/deck_type';
import { getClanIcon, getCleanedName, getDiscIcon } from '../../../../util';
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
  const [list, setList] = React.useState<ExtendedDeckType[] | null>(data);
  const [sortBy, setSortBy] = React.useState<string>('');
  const [sortOrder, setSortOrder] = React.useState<'desc' | 'asc'>('desc');
  
  const handleOpenModal = (card: ExtendedDeckType, index: number) => {
    setSelectedCard(card.data);
    setOpenModal((prev) => !prev);
  };
  React.useEffect(() => {setList(data)}, [data]);

  const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 0,
    padding: 0,
  };

  const getDisciplines = (discList: string[]) => (
    <Box className='list__left'>
      {getDiscIcon(discList).map((disc) => (
        <ListItemAvatar className='list__avatar__icons' key={disc}>
          <Avatar
            sx={{ backgroundColor: 'white' }}
            variant='rounded'
            src={disc}
            alt={disc}
          />
        </ListItemAvatar>
      ))}
    </Box>
  );
  const getClan = (crypt: CryptType) =>
    getClanIcon(crypt.clans).map((clan) => (
      <Avatar
        sx={{ backgroundColor: 'white' }}
        variant='rounded'
        className='clan__avatar__icon'
        key={clan}
        src={clan}
        alt={clan}
      />
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
  };
  const getMinCapacity = () => {
    if (data && data.length > 0) {
      const capacities: number[] | undefined = data?.map((elem) => {
        const value = elem.data as CryptType;
        return value.capacity;
      });

      return capacities ? Math.min(...capacities) : 0;
    }
    return 0;
  };
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
      const setGroup = new Set(groups);
      return groups ? Array.from(setGroup).sort() : [];
    }
    return [];
  };

  const createSortHandler = (key:string):void=> { 
      if (key === sortBy) {
        setSortOrder(prev=>prev === 'asc' ? 'desc' : 'asc');
      }
      else {
        setSortBy(key);
        setSortOrder('asc');
      }
      //ahora ordenar
    if (key === 'quantity') {  
      setList((prev) => {
        if (prev) {
         return sortOrder === 'desc'
           ? prev.sort((a, b) => a.quantity - b.quantity)
           : prev.sort((a, b) => b.quantity - a.quantity);
        }
        else{ return prev}
      });
    }
    
       if (key === 'name') {
         setList((prev) => {
           if (prev) {
             return sortOrder === 'desc'
               ? prev.sort((a, b) => a.data.name.localeCompare(b.data.name))
               : prev.sort((a, b) => b.data.name.localeCompare(a.data.name));
           } else {
             return prev;
           }
         });
       }
    

    if (key === 'capacity') {
      setList((prev) => {
        if (prev) {
          return sortOrder === 'desc'
            ? prev.sort((a, b) => {
              const crypt = a.data as CryptType;
              const crypt2 = b.data as CryptType;
              return Number(crypt.capacity) - Number(crypt2.capacity);
            })
            : prev.sort((a, b) => {
              const crypt = a.data as CryptType;
              const crypt2 = b.data as CryptType;
              return Number(crypt2.capacity) - Number(crypt.capacity);
            })
        } else {
          return prev;
        }
      });
    }
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
          p: '1rem',
          display: 'flex',
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
          ]
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key={'quantity'} sx={{ textAlign: 'center' }}>
                <TableSortLabel
                  active={sortBy === 'quantity'}
                  direction={sortOrder}
                  onClick={() => createSortHandler('quantity')}
                >
                  Quantity
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Clan</TableCell>
              <TableCell key={'name'} sx={{ textAlign: 'center' }}>
                <TableSortLabel
                  active={sortBy === 'name'}
                  direction={sortOrder}
                  onClick={() => createSortHandler('name')}
                >
                  Card name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Group</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Disciplines</TableCell>
              <TableCell key={'capacity'} sx={{ textAlign: 'center' }}>
                <TableSortLabel
                  active={sortBy === 'capacity'}
                  direction={sortOrder}
                  onClick={() => createSortHandler('capacity')}
                >
                  Capacity
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((elem: ExtendedDeckType, index: number) => (
              <TableRow key={elem.data.id}>
                <TableCell sx={{ justifyContent: 'center' }}>
                  <QuantityButtonComponent
                    handleRemoveCard={(id: number, cardType: CardType) =>
                      handleRemoveCard(id, cardType)
                    }
                    initialQuantity={elem.quantity}
                    id={elem.data.id}
                    updateQuantity={(
                      newQuantity: number,
                      id: number,
                      cardType: CardType
                    ) => updateQuantity(newQuantity, id, cardType)}
                    cardType={elem.cardType}
                  />
                </TableCell>
                <TableCell
                  sx={{ textAlign: 'center' }}
                  onClick={() => handleOpenModal(elem, index)}
                >
                  {elem.data.clans ? getClan(elem.data as CryptType) : null}
                </TableCell>
                <TableCell
                  sx={{ minWidth: '10rem', textAlign: 'center' }}
                  onClick={() => handleOpenModal(elem, index)}
                >
                  {getCleanedName(elem.data.name)}
                </TableCell>
                <TableCell
                  sx={{ textAlign: 'center' }}
                  className='list__item__icons'
                  onClick={() => handleOpenModal(elem, index)}
                >
                  {getGroup(elem.data as CryptType)}
                </TableCell>
                <TableCell onClick={() => handleOpenModal(elem, index)}>
                  <Box sx={{ justifyContent: 'center' }} className='list__left'>
                    {elem.data.disciplines
                      ? getDisciplines(elem.data.disciplines)
                      : null}
                  </Box>
                </TableCell>
                <TableCell
                  className='list__item__icons'
                  onClick={() => handleOpenModal(elem, index)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      backgroundColor: 'darkred',
                      color: 'white',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {getCapacity(elem.data as CryptType)}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default DeckCryptComponent;
