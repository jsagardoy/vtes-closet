import { Alert, AlertColor, Button, Snackbar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import {
  ParticipantType,
  TablesRoundType,
  TournamentType,
} from '../../../types/tournament_type';
import { PlayerResultsType, TournamentTable } from '../../../types/archon_type';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ConfirmationDialog from '../components/archon/ConfirmationDialog';
import DoneIcon from '@mui/icons-material/Done';
import FinalRanking from '../components/archon/FinalRanking';
import FinalTable from '../components/archon/FinalTable';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PlayersPerRound from '../components/archon/PlayersPerRound';
import TablesPerRoundResult from '../components/archon/TablesPerRoundResult';
import { addRoundToTournament } from '../../../service/addRoundToTournament';
import { fetchSelectedTournament } from '../../../service/fetchSelectedTournament';
import { getUserId } from '../../../util';
import useRounds from '../../../hooks/useRounds';

const FinalContainer = () => {
  const [playersRanking, setplayersRanking] = useState<PlayerResultsType[]>([]);
  const [rounds, setRounds] = useState<TablesRoundType[]>([]);
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const [tournamentData, setTournamentData] = useState<TournamentType>();
  const userId: string | null = getUserId();
  const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();
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
        VP: 0,
        GW: 0,
        minipoints: 0,
        coinFlip: 0,
      })
    );
    setplayersRanking(newPlayers);
  };
  const handleAddNewPlayer = (newPlayer: ParticipantType) => {
    const player = {
      ...newPlayer,
      round: 0,
      VP: 0,
      GW: 0,
      minipoints: 0,
      coinFlip: 0,
    };
    setplayersRanking((prev) => [...prev, player]);
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
    <FinalRanking players={playersRanking} />,
    <PlayersPerRound
      players={playersRanking}
      handleUpdateList={handleUpdateList}
      handleAddNewPlayer={handleAddNewPlayer}
      isFinal={true}
    />,
    <FinalTable />,
  ]);

  /* ,
    <TablesPerRound
      round={Number(round)}
      participants={players.filter((elem: ParticipantType) => !elem.drop)}
    /> /* only players that haven´t droped ,
    <TablesPerRoundResult />, */

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
  const handleGoNextRound = async () => {
    try {
      const data: string | null = window.localStorage.getItem('round');
      const parsed = data && (JSON.parse(data) as TournamentTable[]);
      if (parsed) {
        const result = await addRoundToTournament(
          tournamentId,
          parsed,
          tournamentData?.numberOfRounds.toString() ?? '0'
        );
        if (result) {
          //se ha añadido a BBDD
          window.localStorage.removeItem('round');
          history.push(`/archon/${tournamentId}`);
        }
      }
      //handleCloseDialog();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const sortRanking = (list: PlayerResultsType[]) => {
      const coinflip = list.map((elem, index) => ({
        ...elem,
        round: tournamentData?.numberOfRounds ?? 0,
        coinFlip: Math.floor(Math.random() * 10000),
      }));
      const ranking = coinflip
        .sort((a, b) => b.coinFlip - a.coinFlip)
        .sort((a, b) => b.minipoints - a.minipoints)
        .sort((a, b) => b.VP - a.VP)
        .sort((a, b) => b.GW - a.GW)
        .map((elem, index) => ({ ...elem, roundRank: index + 1 }));
      return ranking;
    };
    const calculateFinalRanking = () => {
      if (playersRanking.length > 0 && rounds.length > 0) {
        const tables = rounds
          .map((round) => round.tables.map((table) => table))
          .flat();
        const players: PlayerResultsType[] = tables
          .map((table) => table.players)
          .flat();
        const res: any = players.reduce(
          (acc: any, player) => ({
            ...acc,
            [player.vken]: [...(acc[player.vken] || []), player],
          }),
          {}
        );

        const values = Object.values(res);
        const playersData: PlayerResultsType[] = values.map((player: any) =>
          player.reduce((acum: any, data: any) => ({
            ...acum,
            GW: acum.GW + data.GW,
            VP: acum.VP + data.VP,
            minipoints: acum.minipoints + data.minipoints,
          }))
        );

        const result = sortRanking(playersData);
        window.localStorage.setItem('final', JSON.stringify(result));
      }
    };
    const getData = async () => {
      try {
        if (userId) {
          const tournament: TournamentType | null =
            await fetchSelectedTournament(tournamentId, userId);
          if (tournament && tournament.participants && tournament.round) {
            setTournamentData(tournament);
            const players: PlayerResultsType[] = tournament.participants.map(
              (elem) => ({
                ...elem,
                round: 0,
                VP: 0,
                GW: 0,
                minipoints: 0,
                coinFlip: 0,
              })
            );
            setplayersRanking(players);
            setRounds(tournament.round);
          }
        }
      } catch (error) {
        throw error;
      }
    };
    const ranking = window.localStorage.getItem('final');
    if (ranking) {
      const data: PlayerResultsType[] = JSON.parse(ranking);
      setplayersRanking(data);
    } else {
      getData();
      calculateFinalRanking();
    }
  }, [playersRanking.length, rounds, tournamentData?.numberOfRounds, tournamentId, userId]);

  return (
    <Container>
      <Box>
        <Typography variant='h4'>Final</Typography>
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

export default FinalContainer;
