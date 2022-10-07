import {
  Alert,
  AlertColor,
  Box,
  Button,
  Container,
  Snackbar,
  Typography
} from '@mui/material';
import React, { FormEvent, useState } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ConfirmationDialog from '../components/archon/ConfirmationDialog';
import DoneIcon from '@mui/icons-material/Done';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ParticipantType } from '../../../types/tournament_type';
import PlayesPerRound from '../components/archon/PlayesPerRound';
import TablesPerRound from '../components/archon/TablesPerRound';
import TablesPerRoundResult from '../components/archon/TablesPerRoundResult';
import { useParams } from 'react-router-dom';
import useRounds from '../../../hooks/useRounds';

const RoundsContainer = () => {
  const [players, setPlayers] = useState<ParticipantType[]>([]);
  const { round } = useParams<{ round: string }>();
  const [open, setOpen] = useState<boolean>(false);
  const [openSB, setOpenSB] = React.useState<{
    value: boolean;
    message: string;
    severity: AlertColor | undefined;
  }>({ value: false, message: '', severity: undefined });

  const handleUpdateList = (list: ParticipantType[]) => {
    setPlayers(list);
    //
  };

  const handleAddNewPlayer = (newPlayer: ParticipantType) => {
    setPlayers((prev) => [...prev, newPlayer]);
    //incluir en BBDD
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
    <TablesPerRound />,
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
  return (
    <Container>
      <Box>
   
        <Typography variant='h4'>Round {round}</Typography>
       <Box>
          {currentStepIndex + 1}/{steps.length}
        </Box>
        <>
        {currentStep}
        </>
        <Box>
          
          <Button type='button' disabled={isFirstStep()} onClick={()=>back()}>
                <ChevronLeftIcon />
                Back
            </Button>
     
          {isLastStep && (
            <Button onClick={()=>onNext()}>
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
