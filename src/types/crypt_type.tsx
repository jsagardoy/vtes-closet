//type groupType = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type capacityType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
type sectType = [
    "",
    "Anarch",
    "Camarilla",
    "Sabbat",
    "Laibon",
    "Independent"
];
type advType = ['', 'Advanced'];
type typeType = ["Vampire", "Imbued"];
type bannedType = ['', 'Banned'];

/* export type disciplineType = 
    [
        "abo",
        "ABO",
        "ani",
        "ANI",
        "aus",
        "AUS",
        "cel",
        "CEL",
        "chi",
        "CHI",
        "dai",
        "DAI",
        "dem",
        "DEM",
        "dom",
        "DOM",
        "for",
        "FOR",
        "mel",
        "MEL",
        "myt",
        "MYT",
        "nec",
        "NEC",
        "obe",
        "OBE",
        "obf",
        "OBF",
        "obt",
        "OBT",
        "pot",
        "POT",
        "pre",
        "PRE",
        "pro",
        "PRO",
        "qui",
        "QUI",
        "san",
        "SAN",
        "ser",
        "SER",
        "spi",
        "SPI",
        "tem",
        "TEM",
        "thn",
        "THN",
        "tha",
        "THA",
        "val",
        "VAL",
        "vic",
        "VIC",
        "vis",
        "VIS"
    ];
 */
export interface CryptType {
    id: number,
    aka?: string,
    name: string,
    url: string,
    types: typeType,
    clans: string[],
    group: string,
    capacity: capacityType,
    sect: sectType,
    disciplines: string[],
    adv?: advType,
    card_text: string,
    artists: string[],
    sets: {},
    banned?:bannedType
}
export type discType = {
  name: string[];
  value: number[];
};

export const disciplines_inf:string[]=[
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

