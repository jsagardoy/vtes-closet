import { uuidv4 } from '@firebase/util';
import {
  Avatar,
  Box,
  IconButton,
  ListItemAvatar,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
} from '../../../../util';

import QuantityButtonComponent from './QuantityButtonComponent';

interface Props {
  data: ExtendedDeckType[] | null;
  updateQuantity: (newQunatity: number, id: number, cardType: CardType) => void;
  handleRemoveCard: (id: number, cardType: CardType) => void;
}

type cardTypeValues =
  | 'master'
  | 'conviction'
  | 'power'
  | 'action'
  | 'ally'
  | 'equipment'
  | 'political action'
  | 'action modifier'
  | 'combat'
  | 'reaction'
  | 'action modifier,reaction'
  | 'action modifier,combat'
  | 'action,reaction'
  | 'action,combat'
  | 'combat,reaction'
  | 'event'
  | 'any'
  | 'token';
interface ShowCardType {
  master: boolean;
  conviction: boolean;
  power: boolean;
  action: boolean;
  ally: boolean;
  equipment: boolean;
  'political action': boolean;
  'action modifier': boolean;
  combat: boolean;
  reaction: boolean;
  'action modifier,reaction': boolean;
  'action modifier,combat': boolean;
  'action,reaction': boolean;
  'action,combat': boolean;
  'combat,reaction': boolean;
  event: boolean;
  any: boolean;
  token: boolean;
}

const DeckLibraryComponent = (props: Props) => {
  const { data, updateQuantity, handleRemoveCard } = props;
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedCard, setSelectedCard] = React.useState<any>({});
  const [showCardType, setShowCardType] = React.useState<ShowCardType>({
    master: true,
    conviction: true,
    power: true,
    action: true,
    ally: true,
    equipment: true,
    'political action': true,
    'action modifier': true,
    combat: true,
    reaction: true,
    'action modifier,reaction': true,
    'action modifier,combat': true,
    'action,reaction': true,
    'action,combat': true,
    'combat,reaction': true,
    event: true,
    any: true,
    token: true,
  });

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

  const getClan = (library: LibraryType) => {
    if (library && library.clans) {
      return getClanIcon(library.clans).map((clan) => (
        <Avatar
          variant='rounded'
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
        <Avatar
          sx={{ backgroundColor: 'white' }}
          variant='rounded'
          src={getBurnOption()}
          alt='Burn option'
        />
      ) : null;
    }
  };

  const getLibraryCost = (library: LibraryType) =>
    library.blood_cost ? (
      <Avatar
        sx={{ backgroundColor: 'white' }}
        variant='rounded'
        src={getCardCost(library.blood_cost, 'blood')}
        alt='Blood cost'
      />
    ) : library.pool_cost ? (
      <Avatar
        sx={{ backgroundColor: 'white' }}
        variant='rounded'
        src={getCardCost(library.pool_cost, 'pool')}
        alt='Pool cost'
      />
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
    <TableHead key={uuidv4()}>
      {showLabel ? (
        <TableRow>
          <TableCell sx={{ textAlign: 'center' }}>Quantity</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>Card name</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>Burn Option</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>Disciplines</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>Clan</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>Cost</TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
        </TableRow>
      )}
    </TableHead>
  );

  const handleShowCardtype = (key: cardTypeValues): void => {
    const newValue: boolean = !showCardType[key];
    setShowCardType((prev) => ({ ...prev, [key]: newValue }));
  };
  const tableBodyContent = (list: ExtendedDeckType[] | undefined) =>
    list ? (
      <TableBody key={uuidv4()}>
        {list?.map((elem: ExtendedDeckType, index: number) => (
          <TableRow key={elem.data.id} sx={{ justifyContent: 'center' }}>
            {/* quantity */}
            <TableCell >
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
                textAlign: 'center',
              }}
              onClick={() => handleOpenModal(elem, index)}
            >
              {getCleanedName(elem.data.name)}
            </TableCell>
            {/* Burn option */}
            <TableCell
              sx={{
                justifyContent: 'center',
              }}
            >
              {getBurn(elem.data as LibraryType)}
            </TableCell>
            {/* disciplines */}
            <TableCell
              sx={{
                justifyContent: 'center',
              }}
              onClick={() => handleOpenModal(elem, index)}
            >
              <Box className='list__left'>
                {elem.data.disciplines
                  ? getDisciplines(elem.data.disciplines)
                  : null}
              </Box>
            </TableCell>
            {/* Clan */}
            <TableCell
              sx={{
                justifyContent: 'center',
              }}
              onClick={() => handleOpenModal(elem, index)}
            >
              {getClan(elem.data as LibraryType)}
            </TableCell>
            {/* Cost */}
            <TableCell
              align='right'
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
        <Avatar
          sx={{ backgroundColor: 'white' }}
          variant='rounded'
          src={url.at(0)}
          alt={type}
        />
      );
    }
    if (type.includes(',')) {
      const newTypes = type.split(',');
      return getCardTypesIcon(newTypes).map((type: string, index: number) => (
        <ListItemAvatar className='list__avatar__icons' key={uuidv4()}>
          <Avatar
            sx={{ backgroundColor: 'white' }}
            key={uuidv4()}
            variant='rounded'
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

  const getTypeCardNumber = (cardType: string): number => {
    const quantity: number[] | undefined = data?.map((elem) =>
      elem.data.types.toString().toLowerCase() === cardType.toLowerCase()
        ? elem.quantity
        : 0
    );
    const result: number =
      quantity?.reduce((a: number, b: number) => a + b) ?? 0;
    return result;
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
          p: '1rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <Typography>Total Pool cost: {getTotalPoolCost()}</Typography>
        <Typography>Total Blood cost: {getTotalBloodCost()} </Typography>
      </Box>

      {cardTypesList().map((cardType, index) => {
        return (
          <Box key={uuidv4()}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {getTypeIconAvatar(cardType)}
              <Typography sx={{ marginLeft: '1rem' }}>
                {cardType.replaceAll(',', ' / ')} ({getTypeCardNumber(cardType)}
                )
              </Typography>
              <IconButton
                onClick={() =>
                  handleShowCardtype(cardType.toLowerCase() as cardTypeValues)
                }
              >
                {showCardType[cardType.toLowerCase() as cardTypeValues] ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </Box>

            {showCardType[cardType.toLowerCase() as cardTypeValues] ? (
            <TableContainer>
                
            
              <Table key={uuidv4()}>
                {tableHeadContent(true)}
                {tableBodyContent(
                  data
                    ?.filter(
                      (elem) =>
                        elem.data.types.toString() === cardType?.toString()
                    )
                    .sort((a: ExtendedDeckType, b: ExtendedDeckType) =>
                      a.data.name.localeCompare(b.data.name)
                    )
                )}
                </Table>
              </TableContainer>
            ) : null}
          </Box>
        );
      })}
    </>
  );
};
export default DeckLibraryComponent;
