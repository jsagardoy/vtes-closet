import AddNewPlayer from './AddNewPlayer';
import { ParticipantType } from '../../../../types/tournament_type';
import PlayersList from './PlayersList';
import React from 'react';
interface Props {
  players: ParticipantType[];
  handleAddNewPlayer: (newPlayer: ParticipantType) => void;
  handleUpdateList: (newList: ParticipantType[]) => void;
}
const PlayesPerRound = (props: Props) => {
  const { players, handleAddNewPlayer, handleUpdateList } = props;
  return (  <>
      <AddNewPlayer
        addNewPlayer={(newPlayer: ParticipantType) =>
          handleAddNewPlayer(newPlayer)
        }
      />
    <PlayersList
        players={players}
        updatePlayersList={(newList: ParticipantType[]) =>
          handleUpdateList(newList)
        }
      />
    </> 
  );
};

export default PlayesPerRound;
