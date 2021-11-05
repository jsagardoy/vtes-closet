import { discType } from '../types/crypt_type';

const discBaseURL = 'https://static.krcg.org/png_wb/disc/';
const clanBaseURL = 'https://static.krcg.org/png_wb/clan/';
const clanBaseURLDeprecated = 'https://static.krcg.org/png_wb/clan/deprecated/';

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
          baseURL = clanBaseURLDeprecated;
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
        default:
          baseURL = clanBaseURL;
          break;
      }

      return resp.push(`${baseURL}${value}.png`);
    });
  }
  return resp;
};

export const getDiscList = (discList: discType): string[] => {
  let resp: string[] = [];
  discList.value.map((value, index) => {
    switch (value) {
      case 1:
        resp.push(discList.name[index].toLowerCase());
        break;
      case 2:
        resp.push(discList.name[index].toUpperCase());
        break;
    }
  });
  return resp;
};
export const getClans = () => [
  'Assamite',
  'Brujah',
  'Follower of Set',
  'Gangrel',
  'Lasombra',
  'Malkavian',
  'Nosferatu',
  'Ravnos',
  'Toreador',
  'Tremere',
  'Ventrue',
  'Abominations',
  'Ahrimanes',
  'Akunanse',
  'Avenger',
  'Baali',
  'Banuhaqim',
  'Blood Brother',
  'Brujah Antitribu',
  'Caitiff',
  'Daugters of Cacaphony',
  'Defender',
  'Gangrel Antitribu',
  'Gargoyles',
  'Giovanni',
  'Guruji',
  'Harbingers Of Skulls',
  'Innocent',
  'Ishtarri',
  'Judge',
  'Kyasid',
  'Malkavian Antiotribu',
  'Martyr',
  'Ministry',
  'Nagaraja',
  'Nosferatu Antitribu',
  'Osebo',
  'Pander',
  'Redeemer',
  'Salubri',
  'Salubri Antitribu',
  'Samedi',
  'Toreador Antitribu',
  'Tremere Antitribu',
  'True Brujah',
  'Tzimisce',
  'Ventrue Antitribu',
  'Visionary'
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
  'Regent'

]
