export interface LibraryType {
  id: number;
  name: string;
  url: string;
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
  scans: {
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

export const getLibrary = (): LibraryType[] => {
    return require('../mock/libraryCards.json');
}

