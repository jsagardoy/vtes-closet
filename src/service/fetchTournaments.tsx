import { TournamentType } from '../types/tournament_type';
import { uuidv4 } from '@firebase/util';

const fetchTournaments = () => {
  const elem: TournamentType[] = [
    {
      id: uuidv4(),
      name: 'Torneo de prueba',
      eventDate: new Date('2022j-09-19'),
      startingTime: '10:00',
      owner: 'CuKzfj9ZQ8SHiHVkHO535ZZu4Gj1',
      organizer: 'Jehú Sagardoy',
      city: 'Madrid',
      format: 'constructed',
      level: 'normal',
      numberOfPlayers: 20,
      maxNumberOfPlayers: 25,
      numberOfRounds: 4,
      multiJudge: true,
      headJudge: 'Jehú Sagardoy',
      assistantJudges: ['Dario', 'Woody', 'Alex'],
      cost: '5.1',
      location: 'mi casa',
      details: 'premios reshulones',
    },
    {
      id: uuidv4(),
      name: 'Torneo de prueba2',
      owner: 'CuKzfj9ZQ8SHiHVkHO535ZZu4Gj1',
      startingTime: '9:30',
      eventDate: new Date('2027-12-05'),
      organizer: 'Dario',
      city: 'Chiclana',
      format: 'constructed',
      level: 'normal',
      numberOfPlayers: 22,
      maxNumberOfPlayers: 50,
      numberOfRounds: 4,
      multiJudge: true,
      headJudge: 'Dario',
      assistantJudges: ['Jehú Sagardoy', 'Woody', 'Alex'],
      cost: '5.1',
      location: 'Casa de Dario',
      details: 'premios mágicos',
    },
  ];
  return elem;
};

export default fetchTournaments;
