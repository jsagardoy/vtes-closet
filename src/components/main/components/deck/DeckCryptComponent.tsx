import {
  Box,
  Modal,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CardType, ExtendedDeckType } from '../../../../types/deck_type';

import { CryptType } from '../../../../types/crypt_type';
import DeckTable from './DeckTable';
import DeckTableSmall from './DeckTableSmall';
import React from 'react';

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

  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenModal = (card: ExtendedDeckType, index: number) => {
    setSelectedCard(card.data);
    setOpenModal((prev) => !prev);
  };
  React.useEffect(() => {
    setList(data);
  }, [data]);

  const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 0,
    padding: 0,
  };

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

  const createSortHandler = (key: string): void => {
    if (key === sortBy) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
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
        } else {
          return prev;
        }
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
              });
        } else {
          return prev;
        }
      });
    }
  };

  return (
    <>
      {openModal ? (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box sx={styleModal}>
            <img src={selectedCard.url} alt={selectedCard.name} />
          </Box>
        </Modal>
      ) : null}
      {isMobile ? null :
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
        </Box>}
      {isMobile ? (
        <DeckTableSmall
          list={list}
          sortBy={sortBy}
          sortOrder={sortOrder}
          createSortHandler={(key: string) => createSortHandler(key)}
          handleRemoveCard={(id: number, cardType: CardType) =>
            handleRemoveCard(id, cardType)
          }
          updateQuantity={(
            newQuantity: number,
            id: number,
            cardType: CardType
          ) => updateQuantity(newQuantity, id, cardType)}
          handleOpenModal={(elem: ExtendedDeckType, index: number) =>
            handleOpenModal(elem, index)
          }
        />
      ) : (
        <DeckTable
          list={list}
          sortBy={sortBy}
          sortOrder={sortOrder}
          createSortHandler={(key: string) => createSortHandler(key)}
          handleRemoveCard={(id: number, cardType: CardType) =>
            handleRemoveCard(id, cardType)
          }
          updateQuantity={(
            newQuantity: number,
            id: number,
            cardType: CardType
          ) => updateQuantity(newQuantity, id, cardType)}
          handleOpenModal={(elem: ExtendedDeckType, index: number) =>
            handleOpenModal(elem, index)
          }
        />
      )}
    </>
  );
};
export default DeckCryptComponent;
