import { CryptType } from './crypt_type';
import { LibraryType } from './library_type';

type Archetype = [
  'toolbox',
  'undefined',
  'allies',
  'bleed',
  'block',
  'combat',
  'political',
  'evil'
];
export interface DeckType {
  name: string;
  description: string;
  deckType: Archetype;
  crypt: CryptType[];
  library: LibraryType[];
}
