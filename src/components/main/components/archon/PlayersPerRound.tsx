import AddNewPlayer from './AddNewPlayer';
import { ParticipantType } from '../../../../types/tournament_type';
import PlayersList from './PlayersList';
import React from 'react';
interface Props {
  players: ParticipantType[];
  handleAddNewPlayer: (newPlayer: ParticipantType) => void;
  handleUpdateList: (newList: ParticipantType[]) => void;
  isFinal: boolean;
}
const PlayersPerRound = (props: Props) => {
  const { players, handleAddNewPlayer, handleUpdateList, isFinal } = props;
  return (
    <>
      {!isFinal && (
        <AddNewPlayer
          addNewPlayer={(newPlayer: ParticipantType) =>
            handleAddNewPlayer(newPlayer)
          }
        />
      )}
      <PlayersList
        isFinal={isFinal}
        players={players}
        updatePlayersList={(newList: ParticipantType[]) =>
          handleUpdateList(newList)
        }
      />
    </>
  );
};

export default PlayersPerRound;
