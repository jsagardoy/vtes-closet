import { CryptType } from './crypt_type';
import { LibraryType } from './library_type';

export type Archetype =
  | 'toolbox'
  | 'undefined'
  | 'allies'
  | 'bleed'
  | 'block'
  | 'combat'
  | 'political'
  | 'evil';

export const getArchetype = (): Archetype[] => [
  'toolbox',
  'undefined',
  'allies',
  'bleed',
  'block',
  'combat',
  'political',
  'evil',
];

export type ListType = {
  id: string;
  quantity: number;
};

export type CardType = 'library'|'crypt'
export interface ExtendedDeckType {
  quantity: number;
  data: (LibraryType | CryptType);
  cardType: CardType;
}

export interface DeckType {
  id: string;
  name: string;
  description: string;
  deckType: Archetype;
  crypt: ListType[];
  library: ListType[];
}
