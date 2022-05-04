import React from 'react';

export const useInventory = (initialValue: number) => {
  const [counter, setCounter] = React.useState<number>(initialValue);

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter <= 0 ? counter: counter - 1);
  const set = (newCounter: number) =>
    setCounter(newCounter >= 0 ? newCounter : 0);

  return { counter, increment, decrement, set };
};
