import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { CryptType } from '../../../../../types/crypt_type';
import { CardType } from '../../../../../types/deck_type';
import { LibraryType } from '../../../../../types/library_type';
import { HEADER_COLOR } from '../../../../../util/helpFunction';
import CryptContainer from '../../../containers/CryptContainer';
import LibraryContainer from '../../../containers/LibraryContainer';
import TabPanel from './TabPanel';


interface Props {
  handleAddCardToDeck: (card: CryptType | LibraryType, cardType: CardType) => void;
}

const SearchDeckContainer = (props: Props) => {
  const { handleAddCardToDeck } = props;
  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flexStart',
          alignItems: 'center',
          backgroundColor: HEADER_COLOR,
          color: 'darkcyan',
          height: '4rem',
        }}
      >
        <Tabs
          sx={{
            '& button:hover': {
              backgroundColor: 'darkcyan',
              color: `${HEADER_COLOR}`,
            },
          }}
          TabIndicatorProps={{ sx: { backgroundColor: 'darkcyan' } }}
          textColor='inherit'
          value={selectedTab}
          onChange={handleChange}
        >
          <Tab
            value={0}
            tabIndex={0}
            sx={{
              textTransform: 'capitalize',
              fontFamily: 'Roboto, Helvetica, Arial, san-serif',
              fontSize: '22.25px',
              fontWeight: '500',
            }}
            label='Crypt'
          />
          <Tab
            value={1}
            tabIndex={1}
            sx={{
              textTransform: 'capitalize',
              fontFamily: 'Roboto, Helvetica, Arial, san-serif',
              fontSize: '22.25px',
              fontWeight: '500',
            }}
            label='Library'
          />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <CryptContainer
          deckMode={true}
          toogle={false}
          handleAddCardToDeck={(
            card: CryptType | LibraryType,
            cardType: CardType
          ) => handleAddCardToDeck(card, cardType)}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <LibraryContainer
          deckMode={true}
          handleAddCardToDeck={(
            card: CryptType | LibraryType,
            cardType: CardType
          ) => handleAddCardToDeck(card, cardType)}
        />
      </TabPanel>
    </>
  );
};

export default SearchDeckContainer;
