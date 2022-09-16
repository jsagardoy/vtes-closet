import { collection, getDocs } from 'firebase/firestore';

import { CryptType } from '../types/crypt_type';
import { db } from '../database/config';

export const fetchCrypt = async ():Promise<CryptType[]|any> => {
  try {
    const data = await getDocs(collection(db, 'crypt'));
    const result: CryptType[] = data.docs.map((doc) => doc.data() as CryptType);
    return result;
  } catch (error: any) {
    throw (error);
  }
    /* //TODO:TEMPORRAL: en caso de que haya sobrepasadp las peticiones BBDD carga el mock de datos.
    const data: CryptType[] = [
      {
        capacity: 4,
        group: '2',
        id: 200001,
        name: 'Aabbt Kindred (G2)',
        sets: {
          'Final Nights': [
            {
              rarity: 'Uncommon',
              release_date: '2001-06-11',
              frequency: 2,
            },
          ],
          'Print on Demand': [
            {
              copies: 1,
              precon: 'DriveThruCards',
            },
          ],
        },
        artists: ['Lawrence Snelly'],

        clans: ['Ministry'],
        url: 'https://static.krcg.org/card/aabbtkindredg2.jpg',

        disciplines: ['for', 'pre', 'ser'],
        card_text:
          'Independent: Aabbt Kindred cannot perform directed actions unless /Nefertiti/ is ready. Aabbt Kindred can prevent 1 damage each combat. Non-unique.',
        types: ['Vampire']
      },
      {
        types: ['Vampire'],
        clans: ['Nosferatu antitribu'],
        url: 'https://static.krcg.org/card/aaronbathurstg4.jpg',
        name: 'Aaron Bathurst (G4)',
        group: '4',
        id: 200002,
        artists: ['Rik Martin'],

        disciplines: ['for', 'obf', 'pot'],

        sets: {
          'Third Edition': [
            {
              rarity: 'Vampire',
              release_date: '2006-09-04',
            },
          ],
        },
        capacity: 4,

        card_text: 'Sabbat.'
      },
    ];
    return data;
  } */
};
