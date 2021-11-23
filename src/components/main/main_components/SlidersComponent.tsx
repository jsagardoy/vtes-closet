import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { Slider } from '@mui/material';
import React from 'react';
import { getGroups, groupType } from '../../../util';
import './SlidersComponent.css';

interface SliderProps {
  filterSliders: (group: groupType) => void;
}

export const SlidersComponent = (sliderProps: SliderProps) => {
  const { filterSliders } = sliderProps;
  const groups: groupType[] = getGroups();
  const [selectedGroup, setSelectedGroup] = React.useState<groupType>();

  const getGroupLabels = (group: number): string => {
    const selectedGroup = groups.find((g: groupType) => g.value === group);
    if (selectedGroup !== undefined) {
      return selectedGroup.label;
    } else {
      return 'Any';
    }
  };

  const handleSlider = (
    event: Event,
    group: number | number[],
    activeThumb: number
  ): void => {
    const elem = groups.find((g: groupType) => g.value === group);
    if (elem) {
      setSelectedGroup(elem);
    }
  };

  const handleCommittedSlider = () =>
    selectedGroup ? filterSliders(selectedGroup) : undefined;

  return (
    <>
      <div className='slide__label'>
        <InputLabel>
          Group: {selectedGroup ? selectedGroup.label : 'Any'}
        </InputLabel>
      </div>
      <div className='slider'>
        <Slider
          getAriaValueText={getGroupLabels}
          defaultValue={0}
          //valueLabelDisplay='auto'
          step={0.5}
          size='small'
          min={0.5}
          max={groups.length / 2}
          onChange={handleSlider}
          onChangeCommitted={handleCommittedSlider}
        />
      </div>
    </>
  );
};
