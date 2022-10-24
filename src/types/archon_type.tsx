import { ParticipantType } from './tournament_type';

export interface PlayerResultsType extends ParticipantType {
  round: number;
  VP: number;
  GW: number;
  minipoints: number;
  coinFlip: number;
  roundRank?: number;
}

export interface TournamentTable {
  round: number;
  id: string;
  players: PlayerResultsType[];
}
