import { uuidv4 } from '@firebase/util';
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

import { CardType, ExtendedDeckType } from '../../../../types/deck_type';
import { LibraryType } from '../../../../types/library_type';
import {
  getBurnOption,
  getCardCost,
  getCardTypesIcon,
  getClanIcon,
  getCleanedName,
  getDiscIcon,
  getLibraryCardTypesSorted,
  HEADER_COLOR,
} from '../../../../util';

import QuantityButtonComponent from './QuantityButtonComponent';

interface Props {
  data: ExtendedDeckType[] | null;
  updateQuantity: (newQunatity: number, id: number, cardType: CardType) => void;
  handleRemoveCard: (id: number, cardType: CardType) => void;
}

const DeckLibraryComponent = (props: Props) => {
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

  const getClan = (library: LibraryType) => {
    if (library && library.clans) {
      return getClanIcon(library.clans).map((clan) => (
        <Avatar
          className='clan__avatar__icon'
          key={clan}
          src={clan}
          alt={clan}
        />
      ));
    }
  };

  const getBurn = (card: LibraryType) => {
    if (card.burn_option) {
      return card.burn_option ? (
        <Avatar src={getBurnOption()} alt='Burn option' />
      ) : null;
    }
  };

  const getLibraryCost = (library: LibraryType) =>
    library.blood_cost ? (
      <Avatar src={getCardCost(library.blood_cost, 'blood')} alt='Blood cost' />
    ) : library.pool_cost ? (
      <Avatar src={getCardCost(library.pool_cost, 'pool')} alt='Pool cost' />
    ) : null;

  const cardTypesList = (): string[] => {
    const arrayOfTypes = data?.map((elem) => elem.data.types);
    const flattedArrayOfTypes = arrayOfTypes?.map((elem) =>
      elem.length === 1 ? elem.at(0) : elem.toString()
    );
    const listed = Array.from(new Set(flattedArrayOfTypes));
    const total: string[] = getLibraryCardTypesSorted().filter((elem) =>
      listed.find((data) => data === elem)
    );
    return total;
  };

  const tableHeadContent = (showLabel: boolean) => (
    <TableHead key={uuidv4()} sx={{ backgroundColor: 'white' }}>
      {showLabel ? (
        <TableRow>
          <TableCell sx={{ color: 'darkcyan' }}>Quantity</TableCell>
          <TableCell sx={{ color: 'darkcyan' }}>Card name</TableCell>
          <TableCell sx={{ color: 'darkcyan' }}>Burn Option</TableCell>
          <TableCell sx={{ color: 'darkcyan' }}>Disciplines</TableCell>
          <TableCell sx={{ color: 'darkcyan' }}>Clan</TableCell>
          <TableCell sx={{ color: 'darkcyan' }}>Cost</TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell sx={{ color: 'darkcyan' }} />
          <TableCell sx={{ color: 'darkcyan' }} />
          <TableCell sx={{ color: 'darkcyan' }} />
          <TableCell sx={{ color: 'darkcyan' }} />
          <TableCell sx={{ color: 'darkcyan' }} />
          <TableCell sx={{ color: 'darkcyan' }} />
        </TableRow>
      )}
    </TableHead>
  );

  const tableBodyContent = (list: ExtendedDeckType[] | undefined) =>
    list ? (
      <TableBody key={uuidv4()}>
        {list?.map((elem: ExtendedDeckType, index: number) => (
          <TableRow key={elem.data.id} sx={{ alignItems: 'start' }}>
            {/* quantity */}
            <TableCell
              sx={{
                color: 'darkcyan',
                backgroundColor: 'white',
                minWidth: '16%',
                maxWidth: '16%',
              }}
            >
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
            {/* Card Name */}
            <TableCell
              sx={{
                color: 'darkcyan',
                backgroundColor: 'white',
                minWidth: '32%',
                maxWidth: '32%',
              }}
              onClick={() => handleOpenModal(elem, index)}
            >
              {getCleanedName(elem.data.name)}
            </TableCell>
            {/* Burn option */}
            <TableCell
              sx={{
                color: 'darkcyan',
                backgroundColor: 'white',
                minWidth: '16%',
                maxWidth: '16%',
              }}
            >
              {getBurn(elem.data as LibraryType)}
            </TableCell>
            {/* disciplines */}
            <TableCell
              sx={{
                color: 'darkcyan',
                backgroundColor: 'white',
                minWidth: '16%',
                maxWidth: '16%',
              }}
              onClick={() => handleOpenModal(elem, index)}
            >
              <div className='list__left'>
                {elem.data.disciplines
                  ? getDisciplines(elem.data.disciplines)
                  : null}
              </div>
            </TableCell>
            {/* Clan */}
            <TableCell
              sx={{
                color: 'darkcyan',
                backgroundColor: 'white',
                minWidth: '16%',
              }}
              onClick={() => handleOpenModal(elem, index)}
            >
              {getClan(elem.data as LibraryType)}
            </TableCell>
            {/* Cost */}
            <TableCell
              sx={{
                color: 'darkcyan',
                backgroundColor: 'white',
                minWidth: '16%',
                maxWidth: '16%',
              }}
              onClick={() => handleOpenModal(elem, index)}
            >
              {getLibraryCost(elem.data as LibraryType)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    ) : null;

  const getTypeIconAvatar = (type: string) => {
    if (!type.includes(',')) {
      const url = getCardTypesIcon([type]);
      return (
        <Avatar sx={{ backgroundColor: 'white' }} src={url.at(0)} alt={type} />
      );
    }
    if (type.includes(',')) {
      const newTypes = type.split(',');
      return getCardTypesIcon(newTypes).map((type: string, index: number) => (
        <ListItemAvatar
          sx={{ backgroundColor: 'white' }}
          className='list__avatar__icons'
          key={uuidv4()}
        >
          <Avatar
            sx={{ backgroundColor: 'white' }}
            key={uuidv4()}
            src={type}
            alt={type}
          />
        </ListItemAvatar>
      ));
    }
  };
  const getTotalPoolCost = () => {
    const acum = data?.map((elem) => {
      const lib = elem.data as LibraryType;
      if (lib && lib.pool_cost !== undefined) {
        return {
          quantity: elem.quantity,
          id: elem.data.id,
          cost: Number(lib.pool_cost),
        };
      } else {
        return {
          quantity: elem.quantity,
          id: elem.data.id,
          cost: 0,
        };
      }
    });

    const resArray = acum?.map((elem) => elem.cost * elem.quantity);
    if (resArray && resArray?.length > 0) {
      return resArray?.reduce((acum, a) => acum + a);
    } else {
      return 0;
    }
  };
  const getTotalBloodCost = () => {
    const acum = data?.map((elem) => {
      const lib = elem.data as LibraryType;
      if (lib && lib.blood_cost !== undefined) {
        return {
          quantity: elem.quantity,
          id: elem.data.id,
          cost: Number(lib.blood_cost),
        };
      } else {
        return {
          quantity: elem.quantity,
          id: elem.data.id,
          cost: 0,
        };
      }
    });

    const resArray = acum?.map((elem) => elem.cost * elem.quantity);
    if (resArray && resArray?.length > 0) {
      return resArray?.reduce((acum, a) => acum + a);
    } else {
      return 0;
    }
  };

  return (
    <>
      {openModal ? (
        <Modal
          key={uuidv4()}
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <Box sx={styleModal}>
            <img src={selectedCard.url} alt={selectedCard.name} />
          </Box>
        </Modal>
      ) : null}
      <Box
        key={uuidv4()}
        sx={{
          backgroundColor: HEADER_COLOR,
          p: '1rem',
          display: 'flex',
          borderBottom: '1px solid darkcyan',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <Typography>Pool cost: {getTotalPoolCost()}</Typography>
        <Typography>Blood cost:{getTotalBloodCost()} </Typography>
      </Box>

      {cardTypesList().map((cardType, index) => {
        return (
          <Box key={uuidv4()}>
            <Box
              sx={{
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {getTypeIconAvatar(cardType)}
              <Typography>{cardType}</Typography>
            </Box>
            <Table key={uuidv4()}>
              {tableHeadContent(true)}
              {tableBodyContent(
                data?.filter(
                  (elem) => elem.data.types.toString() === cardType?.toString()
                )
              )}
            </Table>
          </Box>
        );
      })}
    </>
  );
};
export default DeckLibraryComponent;