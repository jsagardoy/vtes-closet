import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { PlayerResultsType } from '../../../../types/archon_type';
import { useParams } from 'react-router-dom';

interface Props {
  data: PlayerResultsType[];
  tableId: string;
  updateTable: (tableId: string, players: PlayerResultsType[]) => void;
}
const TablesResultTable = (props: Props) => {
  const { data, updateTable, tableId } = props;
  const { round } = useParams<{
    round: string;
  }>();

  const [playerList, setPlayerList] = useState<PlayerResultsType[]>(data);

  const hasRepeatedVP = (list: PlayerResultsType[]) => {
    const vp = list.map((elem) => elem.VP);
    return !(new Set(vp).size === vp.length);
  };

  const getTotalMinipoints = (list: PlayerResultsType[], VP: number) => {
    return list
      .filter((elem) => elem.VP === VP)
      .map((elem) => elem.minipoints)
      .reduce((acum, a) => acum + a);
  };

  const minipoints4 = [
    {
      rank: 1,
      value: 60,
    },
    {
      rank: 2,
      value: 48,
    },
    {
      rank: 3,
      value: 24,
    },
    {
      rank: 4,
      value: 12,
    },
  ];

  const getMinipoints4 = (list: PlayerResultsType[]): PlayerResultsType[] =>
    list.map((player: PlayerResultsType) => {
      const minipoints = minipoints4.find(
        (elem) => elem.rank === player.roundRank
      );
      return {
        ...player,
        minipoints: minipoints?.value ?? 0,
      };
    });

  const minipoints5 = [
    {
      rank: 1,
      value: 60,
    },
    {
      rank: 2,
      value: 48,
    },
    {
      rank: 3,
      value: 36,
    },
    {
      rank: 4,
      value: 24,
    },
    {
      rank: 5,
      value: 12,
    },
  ];
  const getMinipoints5 = (list: PlayerResultsType[]): PlayerResultsType[] =>
    list.map((player: PlayerResultsType) => {
      const minipoints = minipoints5.find(
        (elem) => elem.rank === player.roundRank
      );
      return {
        ...player,
        minipoints: minipoints?.value ?? 0,
      };
    });

  const calculateMinipoints = (list: PlayerResultsType[]) => {
    //no repeated VP
    if (!hasRepeatedVP(list)) {
      if (list.length === 4) {
        setPlayerList(getMinipoints4(list));
        updateTable(tableId, getMinipoints4(list));
      }

      if (list.length === 5) {
        setPlayerList(getMinipoints5(list));
        updateTable(tableId, getMinipoints5(list));
      }
    }

    //repeated VP
    else {
      const data =
        list.length === 5 ? getMinipoints5(list) : getMinipoints4(list);

      const VPData = data.map((data) => data.VP ?? 0);

      const count = VPData.reduce((accumulator: any, value: number) => {
        return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
      }, {});

      const result = data.map((elem) => {
        return {
          ...elem,
          minipoints: getTotalMinipoints(data, elem.VP) / count[elem.VP],
        };
      });


      setPlayerList(result);
      updateTable(tableId, result);
    }
  };

  const onChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    const vken = event.target.name;
    const value = Number(event.target.value) ?? 0;

    const newData: PlayerResultsType[] = playerList.map(
      (player: PlayerResultsType) => {
        if (player.vken === vken) {
          const newElem = { ...player, VP: value };
          return newElem;
        }
        return { ...player };
      }
    );
    setPlayerList(newData);
  };

  const calculateRank = (list: PlayerResultsType[]): PlayerResultsType[] =>
    list
      .sort((a, b) => b.VP - a.VP)
      .map((r, index) => ({ ...r, roundRank: index + 1 }));

  const calculateGW = () => {
    const sortedList = calculateRank([...playerList]);
    const newList = playerList.map(
      (p) => sortedList.find((elem) => elem.vken === p.vken) ?? p
    );

    setPlayerList(newList);

    const result: PlayerResultsType[] = newList.map(
      (elem: PlayerResultsType) => {
        if (elem.VP >= 3) {
          return { ...elem, GW: 1 };
        } else {
          if (elem.VP >= 2 && elem.VP < 3) {
            const filterData = [
              ...playerList.filter(
                (filter: PlayerResultsType) => filter.VP >= 2 && filter.VP < 3
              ),
            ];
            if (filterData.length === 1) {
              return { ...elem, GW: 1 };
            }
            if (filterData.length > 1) {
              return { ...elem, GW: 0 };
            }
          }
          return { ...elem, GW: 0 };
        }
      }
    );
    setPlayerList(result);

    calculateMinipoints(result);
  };

  const validateTable = (): boolean => {
    const totalVP: number = playerList
      .map((elem) => elem.VP ?? 0)
      .reduce((acum, a) => acum + a);
    return totalVP <= playerList.length;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (validateTable()) {
      calculateGW();
    } else {
      alert('Too many VP. Please review the inserted data');
    }
  };

  useEffect(() => {
    setPlayerList((prev) =>
      prev.map((elem) => ({ ...elem, round: Number(round) }))
    );
  }, [round]);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>name</TableCell>
              <TableCell>VP</TableCell>
              <TableCell>GW</TableCell>
              <TableCell>Minipoints</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playerList.map((player: PlayerResultsType, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel id='VP_Label'>Victory Points</InputLabel>
                    <Select
                      name={player.vken}
                      labelId='VP_Label'
                      label='VP'
                      onChange={onChange}
                      value={player.VP.toString()}
                    >
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={0.5}>0.5</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={1.5}>1.5</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={2.5}>2.5</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={3.5}>3.5</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={4.5}>4.5</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>{player.GW}</TableCell>
                <TableCell>{player.minipoints}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={(e) => handleSubmit(e)}>Submit table results</Button>
    </>
  );
};
export default TablesResultTable;
