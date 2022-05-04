import { CryptType } from './crypt_type';
import { LibraryType } from './library_type';

export interface typeCryptInventory extends CryptType {
  uid: number;
  have: number;
  want: number;
  trade: number;
  used: number;
};
export interface typeLibraryInventory extends LibraryType {
  uid: number;
  have: number;
  want: number;
  trade: number;
  used: number;
};
