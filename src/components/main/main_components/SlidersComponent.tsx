import InputLabel from '@material-ui/core/InputLabel';
import { Slider } from '@mui/material';
import React from 'react';
import { getGroups, groupType } from '../../../util';
import './SlidersComponent.css';

interface SliderProps {
  group: groupType;
  filterSliders: (group: groupType) => void;
}

export const SlidersComponent = (sliderProps: SliderProps) => {
  const { filterSliders, group } = sliderProps;
  const groups: groupType[] = getGroups();
  const [selectedGroup, setSelectedGroup] = React.useState<groupType>(group);

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
          defaultValue={group.value}
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
