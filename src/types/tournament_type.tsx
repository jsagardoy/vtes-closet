export type ParticipantType = {
  name: string;
  vken: string;
}

export interface TournamentType {
  id: string;
  owner: string;
  name: string;
  eventDate: Date;
  startingTime:string,
  organizer: string;
  city: string;
  format: string;
  level: string;
  maxNumberOfPlayers: number;
  numberOfRounds: number;
  multiJudge: boolean;
  headJudge: string;
  assistantJudges: string[];
  location: string;
  cost: string;
  details: string;
  active: boolean;
  participants:ParticipantType[]|null
}
