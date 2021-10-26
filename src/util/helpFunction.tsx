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
                case 'assamite': baseURL = clanBaseURLDeprecated; break;
                case 'brujah': baseURL = clanBaseURLDeprecated; break;
                case 'followerofset': value = 'followersofset'; baseURL = clanBaseURLDeprecated; break;
                case 'gangrel': baseURL = clanBaseURLDeprecated; break;
                case 'lasombra': baseURL = clanBaseURLDeprecated; break;
                case 'malkavian': baseURL = clanBaseURLDeprecated; break;
                case 'nosferatu': baseURL = clanBaseURLDeprecated; break;
                case 'ravnos': baseURL = clanBaseURLDeprecated; break;
                case 'toreador': baseURL = clanBaseURLDeprecated; break;
                case 'tremere': baseURL = clanBaseURLDeprecated; break;
                case 'ventrue': baseURL = clanBaseURLDeprecated; break;
                default: baseURL = clanBaseURL; break;
            }
        
            return resp.push(`${baseURL}${value}.png`);
        });
    }
    return resp;
}
   