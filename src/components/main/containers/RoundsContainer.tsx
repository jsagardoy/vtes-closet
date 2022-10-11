import {
  Alert,
  AlertColor,
  Box,
  Button,
  Container,
  Snackbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ConfirmationDialog from '../components/archon/ConfirmationDialog';
import DoneIcon from '@mui/icons-material/Done';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ParticipantType } from '../../../types/tournament_type';
import { PlayerResultsType } from '../../../types/archon_type';
import PlayesPerRound from '../components/archon/PlayesPerRound';
import TablesPerRound from '../components/archon/TablesPerRound';
import TablesPerRoundResult from '../components/archon/TablesPerRoundResult';
import { fetchSelectedTournament } from '../../../service/fetchSelectedTournament';
import { getUserId } from '../../../util';
import { useParams } from 'react-router-dom';
import useRounds from '../../../hooks/useRounds';

const RoundsContainer = () => {
  const [players, setPlayers] = useState<PlayerResultsType[]>([]);
  const { round, tournamentId } = useParams<{
    round: string;
    tournamentId: string;
  }>();
  const uid: string | null = getUserId();
  const [open, setOpen] = useState<boolean>(false);
  const [openSB, setOpenSB] = React.useState<{
    value: boolean;
    message: string;
    severity: AlertColor | undefined;
  }>({ value: false, message: '', severity: undefined });
  const handleUpdateList = (list: ParticipantType[]) => {
      const newPlayers: PlayerResultsType[] = [...list].map(
        (elem: ParticipantType) => ({
          ...elem,
          round: 0,
          WP: 0,
          GW: 0,
          minipoints: 0,
          coinFlip: 0,
        })
      );
    setPlayers(newPlayers);
  };

  const handleAddNewPlayer = (newPlayer: ParticipantType) => {
    const player = {
      ...newPlayer,
      round: 0,
      WP: 0,
      GW: 0,
      minipoints: 0,
      coinFlip: 0,
    };
    setPlayers((prev) => [...prev, player]);
  };
  const handleCloseConfirmationDialog = () => {
    setOpen(false);
  };
  const {
    currentStepIndex,
    currentStep,
    next,
    back,
    /* goTo, */
    isFirstStep,
    isLastStep,
    steps,
  } = useRounds([
    <PlayesPerRound
      players={players}
      handleUpdateList={handleUpdateList}
      handleAddNewPlayer={handleAddNewPlayer}
    />,
    <TablesPerRound
      participants={players.filter((elem: ParticipantType) => !elem.drop)}
    /> /* only players that havn´t droped */,
    <TablesPerRoundResult />,
  ]);

  const handleCloseSB = () => {
    setOpenSB((prev) => ({ ...prev, value: false }));
  };

  const onNext = () => {
    if (!isLastStep()) {
      return next();
    }
    if (isLastStep()) {
      setOpen(true);
    }
  };
  const handleGoNextRound = () => {
    //TODO:insert to firebase
    //handleCloseDialog();
  };

  useEffect(() => {
    try {
      const getData = async () => {
        const result =
          uid && (await fetchSelectedTournament(tournamentId, uid));
        if (round === '1' && result && result.participants) {
          const newPlayers: PlayerResultsType[] = [...result.participants].map((elem: ParticipantType) => (
            {
              ...elem,
              round: 0,
              WP: 0,
              GW: 0,
              minipoints: 0,
              coinFlip: 0,
            }
          )
          );
          setPlayers(newPlayers);
        }
      };

      getData();
    } catch (error) {
      throw error;
    }
  }, [round, tournamentId, uid]);

  return (
    <Container>
      <Box>
        <Typography variant='h4'>Round {round}</Typography>
        <Box>
          <Typography variant='body1'>
            {currentStepIndex + 1}/{steps.length}
          </Typography>
        </Box>
        <>{currentStep}</>
        <Box>
          <Button type='button' disabled={isFirstStep()} onClick={() => back()}>
            <ChevronLeftIcon />
            Back
          </Button>

          {isLastStep && (
            <Button onClick={() => onNext()}>
              {isLastStep() ? (
                <>
                  <DoneIcon />
                  Done
                </>
              ) : (
                <>
                  <NavigateNextIcon />
                  Next
                </>
              )}
            </Button>
          )}
        </Box>
        <Snackbar
          open={openSB.value}
          autoHideDuration={5000}
          onClose={handleCloseSB}
        >
          <Alert severity={openSB.severity} onClose={handleCloseSB}>
            {openSB.message}
          </Alert>
        </Snackbar>
        <ConfirmationDialog
          open={open}
          handleClose={() => handleCloseConfirmationDialog()}
          handleGoNext={() => handleGoNextRound()}
        />
      </Box>
    </Container>
  );
};

export default RoundsContainer;
