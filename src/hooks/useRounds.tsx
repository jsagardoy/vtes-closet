import { ReactElement, useState } from 'react';

const useRounds = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const next = () => {
    setCurrentStepIndex((index) =>
      index >= steps.length - 1 ? index : index + 1
    );
  };
  const back = () => {
    setCurrentStepIndex((index) => (index <= 0 ? index : index - 1));
  };
  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  const isFirstStep = () => currentStepIndex === 0;
  const isLastStep = () => currentStepIndex === steps.length - 1;

  return {
    currentStepIndex,
    currentStep: steps[currentStepIndex],
    next,
    back,
    goTo,
    isFirstStep,
    isLastStep,
    steps,
  };
};

export default useRounds;
