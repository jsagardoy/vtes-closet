import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/config';
import { CryptType, disciplines_inf, discType } from '../types/crypt_type';
import { LibraryType } from '../types/library_type';

const discBaseURL = 'https://static.krcg.org/png_wb/disc/';
const clanBaseURL = 'https://static.krcg.org/png_wb/clan/';
const clanBaseURLDeprecated = 'https://static.krcg.org/png_wb/clan/deprecated/';
const URLBase = 'https://static.krcg.org/png/icon/';
const defaultAvatarURL =
  'https://api-private.atlassian.com/users/1c084c56463bf985dcc9910ef9573fd1/avatar';

const ADDED_BLEED = ['+1 bleed', '+2 bleed', '+3 bleed', '+X bleed'];
const ADDED_STEALTH = ['+1 stealth', '+2 stealth', '+3 stealth', '+X strealth'];
const ADDED_STRENGTH = [
  '+1 strength',
  '+2 strength',
  '+3 strenth',
  '+X strength',
];

export const COLOR_AMARILLO = '#ECDBBA';

export const getLogo = () => defaultAvatarURL;
export const getDiscIcon = (discs: string[]): string[] => {
  let resp: string[] = [];
  if (discs) {
    discs.map((disc) => {
      let value = disc.substr(0, 3);

      switch (value) {
        case 'viz':
          value = 'vin';
          break;
        case 'jud':
          value = 'jus';
          break;
        case 'fli':
          value = 'flight';
          break;
      }

      if (value.toUpperCase() === value)
        return resp.push(`${discBaseURL}/sup/${value.toLowerCase()}.png`);
      else return resp.push(`${discBaseURL}/inf/${value}.png`);
    });
  }
  return resp;
};

export const getClanIcon = (clans: string[]): string[] => {
  let resp: string[] = [];
  let baseURL: string = '';
  if (clans) {
    clans.map((clan) => {
      let value = clan.toLowerCase().replaceAll(' ', '');

      switch (value) {
        case 'assamite':
          value = 'banuhaqim';
          baseURL = clanBaseURL;
          break;
        case 'brujah':
          baseURL = clanBaseURLDeprecated;
          break;
        case 'followerofset':
          value = 'followersofset';
          baseURL = clanBaseURLDeprecated;
          break;
        case 'gangrel':
          baseURL = clanBaseURLDeprecated;
          break;
        case 'lasombra':
          baseURL = clanBaseURLDeprecated;
          break;
        case 'malkavian':
          baseURL = clanBaseURLDeprecated;
          break;
        case 'nosferatu':
          baseURL = clanBaseURLDeprecated;
          break;
        case 'ravnos':
          baseURL = clanBaseURLDeprecated;
          break;
        case 'toreador':
          baseURL = clanBaseURLDeprecated;
          break;
        case 'tremere':
          baseURL = clanBaseURLDeprecated;
          break;
        case 'ventrue':
          baseURL = clanBaseURLDeprecated;
          break;
        case 'daughterofcacophony':
          value = 'daughtersofcacophony';
          baseURL = clanBaseURL;
          break;
        case 'harbingerofskulls':
          value = 'harbingersofskulls';
          baseURL = clanBaseURL;
          break;
        case 'abomination':
          value = 'abominations';
          baseURL = clanBaseURL;
          break;
        case 'ahrimane':
          value = 'ahrimanes';
          baseURL = clanBaseURL;
          break;
        case 'gargoyle':
          value = 'gargoyles';
          baseURL = clanBaseURL;
          break;
        default:
          baseURL = clanBaseURL;
          break;
      }

      return resp.push(`${baseURL}${value}.png`);
    });
  }
  return resp;
};

export const getDiscList = (discList: discType): string[] =>
  discList.value.map(
    (value, index) => {
      switch (value) {
        case 1:
          return discList.name[index].toLowerCase();

        case 2:
          return discList.name[index].toUpperCase();
        default:
          return '';
      }
    }
    //return resp;
  );
export const getCardTypesIcon = (types: string[]): string[] =>
  types.map((type) => {
    if (type === 'Political Action') {
      return `${URLBase}political.png`;
    }
    if (type === 'Action Modifier') {
      return `${URLBase}modifier.png`;
    }
    return `${URLBase}${type.toLowerCase()}.png`;
  });

export const getCardCost = (cost: string, type: 'blood' | 'pool'): string =>
  type === 'blood' ? `${URLBase}blood${cost}.png` : `${URLBase}pool${cost}.png`;

export const getBurnOption = (): string => `${URLBase}burn.png`;

export const getDiscInf = (): string[] => disciplines_inf;

export const getClans = () =>
  [
    'Brujah',
    'Gangrel',
    'Lasombra',
    'Malkavian',
    'Nosferatu',
    'Ravnos',
    'Toreador',
    'Tremere',
    'Ventrue',
    'Abomination',
    'Ahrimane',
    'Akunanse',
    'Avenger',
    'Baali',
    'Banu Haqim',
    'Blood Brother',
    'Brujah antitribu',
    'Caitiff',
    'Daughter of Cacophony',
    'Defender',
    'Gangrel antitribu',
    'Gargoyle',
    'Giovanni',
    'Guruhi',
    'Harbinger of Skulls',
    'Innocent',
    'Ishtarri',
    'Judge',
    'Kiasyd',
    'Malkavian antitribu',
    'Martyr',
    'Ministry',
    'Nagaraja',
    'Nosferatu antitribu',
    'Osebo',
    'Pander',
    'Redeemer',
    'Salubri',
    'Salubri antitribu',
    'Samedi',
    'Toreador antitribu',
    'Tremere antitribu',
    'True Brujah',
    'Tzimisce',
    'Ventrue antitribu',
    'Visionary',
  ].sort();

export const getSects = () => [
  '',
  'Anarch',
  'Camarilla',
  'Sabbat',
  'Laibon',
  'Independent',
];

export const getTitle = () => [
  'No Title',
  '1 vote',
  '2 votes',
  'Archbishop',
  'Baron',
  'Bishop',
  'Cardinal',
  'Inner Circle',
  'Justicar',
  'Magaji',
  'Primogen',
  'Prince',
  'Priscus',
  'Regent',
  'Titled',
];

export interface groupType {
  value: number;
  label: string;
}

export interface capacityType {
  value: number;
  label: string;
}

const groups: groupType[] = [
  { value: 0.5, label: 'Any' },
  { value: 1, label: '1' },
  { value: 1.5, label: '1-2' },
  { value: 2, label: '2' },
  { value: 2.5, label: '2-3' },
  { value: 3, label: '3' },
  { value: 3.5, label: '3-4' },
  { value: 4, label: '4' },
  { value: 4.5, label: '4-5' },
  { value: 5, label: '5' },
  { value: 5.5, label: '5-6' },
  { value: 6, label: '6' },
  { value: 6.5, label: '6-7' },
  { value: 7, label: '7' },
];
export const getGroups = (): groupType[] => groups;

const capacities: capacityType[] = [
  { value: 0, label: 'All' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
  { value: 11, label: '11' },
];

export const getCapacities = (): capacityType[] => capacities;

export const getLibraryCardTypes = () => [
  '',
  'Any',
  'Action',
  'Action modifier',
  'Ally',
  'Combat',
  'Conviction',
  'Event',
  'Master',
  'Political action',
  'Reaction',
  'Power',
  'Token',
];

export const compareArrays = (
  vampDisc: string[] | undefined,
  selectedDisc: string[]
) => {
  const cleanedSelected: string[] = selectedDisc.filter((elem) => elem !== '');
  if (vampDisc) {
    return cleanedSelected.every((elem) =>
      elem === elem.toLowerCase()
        ? vampDisc.includes(elem.toLocaleUpperCase()) ||
          vampDisc.includes(elem.toLocaleLowerCase())
        : vampDisc.includes(elem.toUpperCase())
    );
  } else return cleanedSelected.length > 0 ? false : true;
};

export const findInText = (card: CryptType | LibraryType, text: string) => {
  let aux = null;
  let textFixed = text;
  if (text !== '') {
    if (text === 'red_list' || 'enter_combat' || 'black_hand') {
      textFixed = text.replace('_', ' ');
    }
    if (text === 'No Title') {
      //in case filter is no title
      const temp = getTitle().map((title) => card.card_text.indexOf(title));
      aux = temp.every((elem) => elem === -1) ? card : null;
    }
    if (text === 'Titled') {
      //in case filter is titled
      const temp = getTitle().map((title) => card.card_text.indexOf(title));
      aux = temp.some((elem) => elem !== -1) ? card : null;
    }

    if (card.card_text.toLowerCase().includes(textFixed.toLowerCase())) {
      aux = card;
    }
  } else {
    aux = card;
  }
  return aux;
};

export const filterProps = (card: CryptType | LibraryType, props: any) => {
  const elements: string[] = Object.keys(props).filter(
    (elem: string) => props[elem] === true
  );

  // hay q usar un every con el elem
  const result = elements.map(
    (elem) =>
      (elem === 'pool_cost' && 'pool_cost' in card) ||
      (elem === 'blood_cost' && 'blood_cost' in card) ||
      (elem === 'clanless' && card.clans === undefined) ||
      (elem === 'disciplineless' && card.disciplines === undefined) ||
      (elem === 'bleed' &&
        ADDED_BLEED.some((bleed) => findInText(card, bleed) !== null)) ||
      (elem === 'stealth' &&
        ADDED_STEALTH.some((stealth) => findInText(card, stealth) !== null)) ||
      (elem === 'strenth' &&
        ADDED_STRENGTH.some(
          (strength) => findInText(card, strength) !== null
        )) ||
      findInText(card, elem) !== null
  );

  return result.every((elem) => elem === true);
};

export const getCrypt = async () => {
  const data = await getDocs(collection(db, 'crypt'));

  const result: CryptType[] = data.docs.map((doc) => doc.data() as CryptType);
  return result;
};

export const getLibrary = async () => {
  const data = await getDocs(collection(db, 'library'));

  const result: LibraryType[] = data.docs.map(
    (doc) => doc.data() as LibraryType
  );
  return result;
};

export const getLocalStorageCrypt = (): CryptType[] => {
  const aux = localStorage.getItem('cryptList');
  if (aux) {
    const cryptList = JSON.parse(aux);
    return cryptList;
  } else return [];
};

export const getLocalStorageLibrary = (): LibraryType[] => {
  const aux = localStorage.getItem('libraryList');
  if (aux) {
    const libraryList = JSON.parse(aux);
    return libraryList;
  } else return [];
};
