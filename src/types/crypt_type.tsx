
type capacityType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
type advType = ['', 'Advanced'];
type typeType = 'Vampire' | 'Imbued';
type bannedType = ['', 'Banned'];

export interface CryptType {
  id: number;
  aka?: string;
  name: string;
  url: string;
  types: typeType[];
  clans: string[];
  group: string;
  capacity: capacityType;
  disciplines: string[];
  adv?: advType;
  card_text: string;
  artists: string[];
  sets: {};
  banned?: bannedType;
}
export type discType = {
  name: string[];
  value: number[];
};

export const disciplines_inf: string[] = [
  'abo',
  'ani',
  'aus',
  'cel',
  'chi',
  'dai',
  'dem',
  'dom',
  'for',
  'mel',
  'myt',
  'nec',
  'obe',
  'obf',
  'obt',
  'pot',
  'pre',
  'pro',
  'qui',
  'san',
  'ser',
  'spi',
  'tem',
  'thn',
  'tha',
  'val',
  'vic',
  'vis',
];

export interface PropType {
  bleed: boolean;
  strength: boolean;
  stealth: boolean;
  intercept: boolean;
  aggravated: boolean;
  enter_combat: boolean;
  flight: boolean;
  black_hand: boolean;
  red_list: boolean;
  infernal: boolean;
  slave: boolean;
}
export interface TitleType{
  NoTitle: boolean;
  Vote1: boolean;
  Votes2: boolean;
  Archbishop: boolean;
  Baron: boolean;
  Bishop: boolean;
  Cardinal: boolean;
  InnerCircle: boolean;
  Justicar: boolean;
  Magaji: boolean;
  Primogen: boolean;
  Prince: boolean;
  Priscus: boolean;
  Regent: boolean;
  Titled: boolean;
}

export interface ComposedTextType {
  regex: RegExp;
  URL: string;
  alt:string
}
