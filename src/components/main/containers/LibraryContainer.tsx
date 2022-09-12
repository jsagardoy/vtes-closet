import { Box, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { fetchLibrary } from '../../../service/fetchLibrary';
import { CryptType } from '../../../types/crypt_type';
import { CardType } from '../../../types/deck_type';

import { LibraryPropType, LibraryType } from '../../../types/library_type';
import {
  compareArrays,
  filterProps,
  findInText,
} from '../../../util/helpFunction';
import { Spinner } from '../components/global/Spinner';
import LibraryList from '../components/library/LibraryList';
import LibraryNavbarList from '../components/library/LibraryNavbarList';
import './LibraryContainer.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface Props {
  deckMode: boolean;
  handleAddCardToDeck: (
    card: CryptType | LibraryType,
    cardType: CardType
  ) => void;
  handleCloseModal: (cardType: CardType) => void;
}

const LibraryContainer = (props: Props) => {
  const { deckMode, handleAddCardToDeck, handleCloseModal } = props;
  const [list, setList] = React.useState<LibraryType[]>([]);
  const [sort, setSort] = React.useState<boolean>(false); //true = asc / false= desc
  const [loader, setLoader] = React.useState<boolean>(false);
  const [sessionStorage, setSessionStorage] = useSessionStorage<LibraryType[]>(
    'libraryList',
    []
  );

  const handleSearch = (
    name: string,
    discList: string[],
    libraryCardType: string,
    clan: string,
    sect: string,
    props: LibraryPropType
  ) => {
    const resp = sessionStorage
      .filter((item: LibraryType) => findInText(item, name))
      .filter((item: LibraryType) => compareArrays(item.disciplines, discList))
      .filter((item: LibraryType) =>
        libraryCardType === 'Any' ? item : item.types.includes(libraryCardType)
      )
      .filter((item: LibraryType) =>
        clan.length === 0
          ? item
          : item.clans && item.clans.find((elem) => elem === clan)
      )
      .filter((item) => findInText(item, sect))
      .filter((item) => filterProps(item, props));
    setList(resp);
  };

  const handleSort = (): void => {
    console.log(list.sort((a, b) => b.name.localeCompare(a.name)));
    sort
      ? setList((prev) => prev.sort((a, b) => a.name.localeCompare(b.name)))
      : setList((prev) => prev.sort((a, b) => b.name.localeCompare(a.name)));
    setSort((prev) => !prev);
  };
  React.useEffect(() => {
    setSessionStorage(list);
  }, [list, setSessionStorage]);

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
          const data: LibraryType[] = await fetchLibrary();
          if (data) {
            setList(data);
            setSessionStorage(data);
          }
          setLoader(false);
        } catch (error) {
          setLoader(false);
          console.log(error);
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
          <IconButton onClick={() => handleCloseModal('library')}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
      ) : null}
      <Box className='library__container'>
        <LibraryNavbarList
          searchList={(
            name: string,
            discList: string[],
            libraryCardType: string,
            clan: string,
            sect: string,
            props: LibraryPropType
          ) => handleSearch(name, discList, libraryCardType, clan, sect, props)}
          handleSort={() => handleSort()}
          deckMode={deckMode}
        />
        {loader && <Spinner />}
        <LibraryList
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

export default LibraryContainer;
