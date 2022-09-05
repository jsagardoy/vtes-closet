import { CryptType } from './crypt_type';
import { LibraryType } from './library_type';


export interface SavedInventoryType {
  id: number;
  have: number;
  want: number;
  trade: number;
  used: number;
}

export interface cryptInventoryType extends CryptType {
  have: number;
  want: number;
  trade: number;
  used: number;
}
export interface libraryInventoryType extends LibraryType {
  have: number;
  want: number;
  trade: number;
  used: number;
}
