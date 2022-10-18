import { ParticipantType } from './tournament_type';

export interface PlayerResultsType extends ParticipantType {
    round: number;
    WP: number;
    GW: number;
    minipoints: number;
    coinFlip: number;
}

export interface TournamentTable {
  id: string;
  players: PlayerResultsType[];
}