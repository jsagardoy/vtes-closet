import React, { useEffect, useState } from 'react';

import FinalTableTable from './FinalTableTable';
import { PlayerResultsType } from '../../../../types/archon_type';
import { Typography } from '@mui/material';

const FinalTable = () => {
  const [players, setPlayers] = useState<PlayerResultsType[]>([]);

  useEffect(() => {
    const item = window.localStorage.getItem('final');
    const data: PlayerResultsType[] = item && JSON.parse(item);
    setPlayers(data);
  }, []);

  const calculateFinal = () => {
    const final = [...players].filter((elem) => !elem.drop).slice(0, 5);
    return final;
  };
  
  return (
    <>
      <Typography variant='h5'>Final Table</Typography>
      <FinalTableTable
        data={calculateFinal()}
      />
    </>
  );
};

export default FinalTable;
