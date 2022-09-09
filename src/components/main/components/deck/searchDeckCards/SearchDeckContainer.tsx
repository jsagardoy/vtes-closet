import { Container } from '@mui/system';
import React from 'react';
import { CryptType } from '../../../../../types/crypt_type';
import { CardType } from '../../../../../types/deck_type';
import { LibraryType } from '../../../../../types/library_type';
import CryptContainer from '../../../containers/CryptContainer';
import LibraryContainer from '../../../containers/LibraryContainer';


interface Props {
  handleAddCardToDeck: (
    card: CryptType | LibraryType,
    cardType: CardType
  ) => void;
  cardType: CardType;
  handleCloseModal: (cardType: CardType) => void;
}

const SearchDeckContainer = (props: Props) => {
  const { handleAddCardToDeck, cardType, handleCloseModal } = props;

  return (
    <Container>
      {cardType === 'crypt' ? (
        <CryptContainer
          deckMode={true}
          toogle={false}
          handleAddCardToDeck={(
            card: CryptType | LibraryType,
            cardType: CardType
          ) => handleAddCardToDeck(card, cardType)}
          handleCloseModal={(cardType:CardType)=>handleCloseModal(cardType)}
        />
      ) : (
        <LibraryContainer
          deckMode={true}
          handleAddCardToDeck={(
            card: CryptType | LibraryType,
            cardType: CardType
          ) => handleAddCardToDeck(card, cardType)}
            handleCloseModal={(cardType:CardType)=>handleCloseModal(cardType)}
        />
      )}
    </Container>
  );
};

export default SearchDeckContainer;
