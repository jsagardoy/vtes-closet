import React from 'react';
import './CryptContainer.css';
import NavbarCryptList from '../components/crypt/NavbarCryptList';

import { CryptType, PropType, TitleType } from '../../../types/crypt_type';
import {
  capacityType,
  compareArrays,
  filterProps,
  filterTitle,
  findInText,
  groupType as GroupType,
} from '../../../util';

import CryptList from '../components/crypt/CryptList';
import { Spinner } from '../components/global/Spinner';
import { fetchCrypt } from '../../../service/fetchCrypt';

import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { LibraryType } from '../../../types/library_type';
import { CardType } from '../../../types/deck_type';
import { Box, Container, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
interface Props {
  toogle: boolean;
  deckMode: boolean;
  handleAddCardToDeck: (
    card: CryptType | LibraryType,
    cardType: CardType
  ) => void;
  handleCloseModal: (cardType: CardType) => void;
}

const CryptContainer = (props: Props) => {
  const { toogle, deckMode, handleAddCardToDeck, handleCloseModal } = props;
  const [loader, setLoader] = React.useState<boolean>(false);
  const [list, setList] = React.useState<CryptType[]>([]);
  const [sessionStorage, setSessionStorage] = useSessionStorage<CryptType[]>(
    'cryptList',
    []
  );
  const fullList = React.useRef<CryptType[]>(sessionStorage);

  const handleSearch = React.useMemo(
    () =>
      (
        name: string,
        discList: string[],
        clan: string,
        sect: string,
        title: TitleType,
        props: PropType,
        group: GroupType,
        maxCap: capacityType,
        minCap: capacityType
      ) => {
        const resp = fullList.current
          .filter(
            (item) =>
              item.name.toLowerCase().includes(name.toLowerCase()) ||
              item.card_text.toLowerCase().includes(name.toLowerCase())
          )
          .filter((item) => compareArrays(item.disciplines, discList))
          .filter((item) =>
            clan !== ''
              ? item.clans.filter((clanItem) => clanItem === clan).length > 0
              : item.clans.map((clanItem) => clanItem)
          )
          .filter((item) => findInText(item, sect))
          .filter((item) => filterTitle(item, title))
          .filter((item) => filterProps(item, props))
          .filter((item) => filterGroup(item, group))
          .filter((item) => filterMaxCapacity(item, maxCap))
          .filter((item) => filterMinCapacity(item, minCap));
        setList(resp);
      },
    []
  );

  const filterMaxCapacity = (item: CryptType, maxCap: capacityType) =>
    maxCap.value === 0 ? item : item.capacity <= maxCap.value;

  const filterMinCapacity = (item: CryptType, minCap: capacityType) =>
    minCap.value === 0 ? item : item.capacity >= minCap.value;

  const filterGroup = (item: CryptType, group: GroupType) => {
    if (group.value % 1 === 0) {
      return item.group === group.value.toString();
    } else {
      return group?.label === 'Any'
        ? item
        : item.group === Math.floor(group.value).toString() ||
            item.group === Math.ceil(group.value).toString();
    }
  };

  const handleReset = async () => setList(fullList.current);

  React.useEffect(() => {
    if (
      sessionStorage &&
      sessionStorage.toString() !== [].toString() &&
      sessionStorage.length > 0
    ) {
      setList(sessionStorage);
    } else {
      setLoader(true);
      const fetch = async () => {
        try {
          const data: CryptType[] = await fetchCrypt();
          if (data) {
            setList(data);
            setSessionStorage(data);
            fullList.current = data;
          }
          setLoader(false);
        } catch (error) {
          setLoader(false);
          console.error(error);
        }
      };

      fetch();
    }
    return () => {
      setLoader(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {deckMode ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => handleCloseModal('crypt')}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
      ) : null}
      <Box className={toogle ? 'menu__crypt__container' : 'crypt__container'}>
        <NavbarCryptList
          searchList={(
            name: string,
            discList: string[],
            clan: string,
            sect: string,
            title: TitleType,
            props: PropType,
            group: GroupType,
            maxCap: capacityType,
            minCap: capacityType
          ) =>
            handleSearch(
              name,
              discList,
              clan,
              sect,
              title,
              props,
              group,
              maxCap,
              minCap
            )
          }
          handleReset={() => handleReset()}
          deckMode={deckMode}
        />
        {loader && <Spinner />}
        <CryptList
          list={list}
          deckMode={deckMode}
          handleAddCardToDeck={(
            card: CryptType | LibraryType,
            cardType: CardType
          ) => handleAddCardToDeck(card, cardType)}
        />
      </Box>
    </Container>
  );
};

export default CryptContainer;
