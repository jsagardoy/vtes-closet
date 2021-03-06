import { PropType } from './crypt_type';

export interface LibraryType {
  id: number;
  name: string;
  url: string;
  banned?: string;
  types: string[];
  card_text: string;
  clans?: string[];
  disciplines?: string[];
  capacity_change?: string;
  sets: {
    name: string;
    data: {
      release_date: string;
      rarity: string;
    }[];
  };
  scans?: {
    name: string;
    URL: string;
  };
  artists: string[];
  pool_cost?: string;
  blood_cost?: string;
  burn_option?: boolean;
  rulings?: {
    text: string[];
    links: Object;
  };
}

export interface LibraryPropType extends PropType {
  banned: boolean;
  clanless: boolean;
  disciplineless: boolean;
  nonTitled: boolean;
  titled: boolean;
  anarch: boolean;
  combo: boolean;
  burnable: boolean;
  blood_cost: boolean;
  pool_cost: boolean;
}