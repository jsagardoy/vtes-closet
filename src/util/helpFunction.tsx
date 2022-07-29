import {
  ComposedTextType,
  CryptType,
  disciplines_inf,
  discType,
} from '../types/crypt_type';
import { LibraryType } from '../types/library_type';

const discBaseURL = 'https://static.krcg.org/png_wb/disc';
const clanBaseURL = 'https://static.krcg.org/png_wb/clan/';
const clanBaseURLDeprecated = 'https://static.krcg.org/png_wb/clan/deprecated/';
const URLBase = 'https://static.krcg.org/png/icon/';
const defaultAvatarURL =
  'https://api-private.atlassian.com/users/1c084c56463bf985dcc9910ef9573fd1/avatar';
export const ADDED_BLEED = ['+1 bleed', '+2 bleed', '+3 bleed', '+x bleed'];
const ADDED_STEALTH = ['+1 stealth', '+2 stealth', '+3 stealth', '+x strealth'];
const ADDED_INTERCEPT = [
  '+1 intercept',
  '+2 intercept',
  '+3 intercept',
  '+x intercept',
];
const ADDED_STRENGTH = [
  '+1 strength',
  '+2 strength',
  '+3 strength',
  '+x strength',
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
  type === 'blood'
    ? `${URLBase}blood${cost.toLowerCase()}.png`
    : `${URLBase}pool${cost.toLowerCase()}.png`;

export const getBurnOption = (): string => `${URLBase}burn.png`;

export const getDiscInf = (): string[] => disciplines_inf;
export const getDiscSup = (): string[] =>
  disciplines_inf.map((dis) => dis.toUpperCase());
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

export const getSects = ():string[] => [
  '',
  'Anarch',
  'Camarilla',
  'Sabbat',
  'Laibon',
  'Independent',
];

export const getTitle = (): string[] => [
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
  'Any',
  'Action',
  'Action Modifier',
  'Ally',
  'Combat',
  'Conviction',
  'Equipment',
  'Event',
  'Master',
  'Political Action',
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
  // if (text !== 'pool cost'|| 'blood cost') {
  let aux = null;
  let textFixed = text;

  if (card.card_text.includes('pool cost')) return null;
  if (card.card_text.includes('blood cost')) return null;

  if (text !== '') {
    if (
      getSects().map(elem=>elem.toLowerCase()).includes(text.toLowerCase()) &&
      card.card_text.toLowerCase().includes(text.toLowerCase())
    ) {
      aux = card;
    }
    if (
      ADDED_BLEED.includes(text.toLowerCase()) &&
      card.card_text.toLowerCase().includes(text.toLowerCase())
    ) {
      aux = card;
    }
    if (
      ADDED_INTERCEPT.includes(text.toLowerCase()) &&
      card.card_text.toLowerCase().includes(text.toLowerCase())
    ) {
      aux = card;
    }
    if (
      ADDED_STEALTH.includes(text.toLowerCase()) &&
      card.card_text.toLowerCase().includes(text.toLowerCase())
    ) {
      aux = card;
    }
    if (
      ADDED_STRENGTH.includes(text.toLowerCase()) &&
      card.card_text.toLowerCase().includes(text.toLowerCase())
    ) {
      aux = card;
    }
    if (
      text.toLowerCase() === 'infernal' &&
      card.card_text.toLowerCase().includes(text.toLowerCase())
    ) {
      aux = card;
    }
    if (
      text.toLowerCase() === 'slave' &&
      card.card_text.toLowerCase().includes(text.toLowerCase())
    ) {
      aux = card;
    }
    if (
      text.toLowerCase() === 'black hand' &&
      card.card_text.toLowerCase().includes(text.toLowerCase())
    ) {
      aux = card;
    }
    if (
      text.toLowerCase() === 'aggravated' &&
      card.card_text.toLowerCase().includes(text.toLowerCase())
    ) {
      aux = card;
    }
    if (
      text.toLowerCase() === 'enter combat' &&
      card.card_text.toLowerCase().includes(text.toLowerCase())
    ) {
      aux = card;
    }
    if (
      text.toLowerCase() === 'flight' &&
      card.card_text.toLowerCase().includes(text.toLowerCase())
    ) {
      aux = card;
    }
    if (
      text.toLowerCase() === 'red list' &&
      card.card_text.toLowerCase().includes(text.toLowerCase())
    ) {
      aux = card;
    }
    if (text === 'red_list' || 'enter_combat' || 'black_hand') {
      textFixed = text.replace('_', ' ');
    }
    //Titled
    if (text === 'titled') {
      aux =
        (card.card_text.toLowerCase().includes(textFixed.toLowerCase()) &&
          !card.card_text.toLowerCase().includes('non-titled')) ||
        getTitle().some((title) =>
          card.card_text.toLowerCase().includes(title.toLowerCase())
        )
          ? card
          : null;
    }
    //Not Titled
    if (
      text === 'nonTitled' &&
      !getTitle().some((title) =>
        card.card_text.toLowerCase().includes(title.toLowerCase())
      )
    ) {
      aux = !card.card_text.toLowerCase().includes('titled') ? card : null;
    }
    //textSearch
    if (
      text !== 'titled' &&
      text === 'nonTitled' &&
      (card.card_text.toLowerCase().includes(textFixed.toLowerCase()) ||
        card.name.toLowerCase().includes(textFixed.toLowerCase()))
    ) {
      aux = card;
    }
  } else {
    aux = card;
  }
  return aux;
  //  }
};

export const filterProps = (card: CryptType | LibraryType, props: any) => {
  const elements: string[] = Object.keys(props).filter(
    (elem: string) => props[elem] === true
  );

  const result = elements.map(
    (elem) =>
      (elem === 'pool_cost' &&
        'pool_cost' in card &&
        !card.card_text.includes('pool cost')) ||
      (elem === 'blood_cost' &&
        'blood_cost' in card &&
        !card.card_text.includes('blood cost')) ||
      (elem === 'clanless' && card.clans === undefined) ||
      (elem === 'disciplineless' && card.disciplines === undefined) ||
      (elem === 'bleed' &&
        ADDED_BLEED.some((bleed) => findInText(card, bleed) !== null)) ||
      (elem === 'intercept' &&
        ADDED_INTERCEPT.some(
          (intercept) => findInText(card, intercept) !== null
        )) ||
      (elem === 'stealth' &&
        ADDED_STEALTH.some((stealth) => findInText(card, stealth) !== null)) ||
      (elem === 'strenth' &&
        ADDED_STRENGTH.some(
          (strength) => findInText(card, strength) !== null
        )) ||
      (elem === 'banned' && 'banned' in card && card.banned !== null) ||
      (elem === 'nonTitled' && findInText(card, 'nonTitled') !== null) ||
      (elem === 'combo' && isCombo(card.types)) ||
      (elem === 'burnable' && 'burn_option' in card && card.burn_option) ||
      (elem === 'black_hand' && findInText(card, 'black hand') !== null) ||
      (elem === 'aggravated' && findInText(card, 'aggravated') !== null) ||
      (elem === 'enter_combat' && findInText(card, 'enter combat') !== null) ||
      (elem === 'flight' && findInText(card, 'flight') !== null) ||
      (elem === 'red_list' && findInText(card, 'red list') !== null) ||
      (elem === 'infernal' && findInText(card, 'infernal') !== null) ||
      (elem === 'slave' && findInText(card, 'slave') !== null) ||
      findInText(card, elem) !== null
  );

  return result.every((elem) => elem === true);
};

export const filterTitle = (card: CryptType, titles: any) => {
  const elements = Object.keys(titles).filter(
    (elem: string) => titles[elem] === true
  );

  if (elements.length === 0) {
    return true;
  }

  const result = elements.map(
    (title) =>
      (title === 'Vote1' && findInText(card, '1 vote (titled)') !== null) ||
      (title === 'Votes2' && findInText(card, '2 votes (titled)') !== null) ||
      (title === 'InnerCircle' && findInText(card, 'inner circle') !== null) ||
      (title === 'NoTitle' &&
        getTitle()
          .map(
            (elem: string) =>
              !card.card_text.toLowerCase().includes(elem.toLowerCase())
          )
          .every((elem) => elem === true)) ||
      (title === 'Titled' &&
        getTitle().some(
          (elem: string) =>
            findInText(card, elem) !== null && elem !== ('No Title' || 'Title')
        )) ||
      findInText(card, title) !== null
  );
  return result.some((elem) => elem === true);
};

export const getSessionStorageAuth = () => {
  const aux = localStorage.getItem('auth');
  if (aux) {
    return JSON.parse(aux);
  }
};

const isCombo = (types: string[]) => types.length > 1;

const imgReplace = (replacements: ComposedTextType[], str: string) => {
  let result = str;
  replacements.forEach((elem) => {
    result = result.replace(
      elem.regex,
      `<img src="${elem.URL}" alt="${elem.alt}" style="vertical-align:middle" className="img__in__text" />`
    );
  });

  return result;
};

const boldReplace = (
  replacements: string[],
  str: string,
  regex: RegExp
): string => {
  let result = str;
  replacements.forEach((elem) => {
    result = result.replace(
      regex,
      `<strong>${elem.substring(1, elem.length - 1)}</strong>`
    );
  });
  return result;
};

export const composeText = (text: string): string => {
  const regex = /(\[\w{3}\])/gi;
  let result = text;

  const boldRegexp = new RegExp('/([^/]*/)', 'g');
  const vampBold = result.match(boldRegexp);
  if (vampBold) {
    result = boldReplace(vampBold, result, boldRegexp);
  }

  const values = result.match(regex);

  if (values) {
    const tupla: ComposedTextType[] = values.map((value) => {
      const newRegExp = `(\\[${value.substring(1, 4)}\\])`;
      return {
        regex: new RegExp(newRegExp, 'g'),
        URL: getDiscIcon([value.substring(1, 4)])[0],
        alt: value.substring(1, 4),
      };
    });
    result = imgReplace(tupla, result);
  }
  const merged: ComposedTextType[] = [
    {
      regex: new RegExp(/(\[MERGED\])/gi),
      URL: 'https://static.krcg.org/png_wb/icon/merged.png',
      alt: 'MERGED',
    },
  ];
  const mergedRegex = new RegExp(/(\[MERGED\])/gi);
  const mergedValue = result.match(mergedRegex);
  if (mergedValue) {
    result = imgReplace(merged, result);
  }

  return result;
};
export const getUserId = () => {
  const user = window.localStorage.getItem('auth');
  if (user) {
    const userData = JSON.parse(user);
    return userData.uid;
  }
  console.log('Error in login')
  return null;
};
