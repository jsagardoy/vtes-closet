import { Slider, InputLabel, Box } from '@mui/material';
import React from 'react';
import {
  capacityType,
  groupType,
} from '../../../../util';
import './SlidersComponent.css';

interface SliderProps {
  group: groupType;
  maxCapacity: capacityType;
  minCapacity: capacityType;
  groups: groupType[];
  filterSliders: (
    group: groupType,
    maxCap: capacityType,
    minCap: capacityType
  ) => void;
  handleSliderGroup: (
    event: Event,
    group: number | number[],
    activeThumb: number
  ) => void;
  handleSliderMaxCap: (
    event: Event,
    capacity: number | number[],
    activeThumb: number
  ) => void;
  handleSliderMinCap: (
    event: Event,
    capacity: number | number[],
    activeThumb: number
  ) => void;
}

export const SlidersComponent = (sliderProps: SliderProps) => {
  const { filterSliders, group, maxCapacity, minCapacity, groups, handleSliderGroup, handleSliderMaxCap, handleSliderMinCap } =
    sliderProps;
  
  
  const handleCommittedSlider = () => filterSliders(group, maxCapacity, minCapacity);

  
  
  React.useEffect(() => {}, []);
  return (
    <>
      <Box className='slider__container'>
        <Box className='slider__group'>
          <Box className='slider__label'>
            <InputLabel>Group: {group?.label}</InputLabel>
          </Box>
          <Box className='slider'>
            <Slider
              defaultValue={group.value}
              value={group.value}
              step={0.5}
              size='small'
              min={0.5}
              max={groups.length / 2}
              onChange={handleSliderGroup}
              onChangeCommitted={handleCommittedSlider}
            />
          </Box>
        </Box>
        <Box className='slider__group'>
          <Box className='slider__label'>
            <InputLabel>Max capacity: {maxCapacity?.label}</InputLabel>
          </Box>
          <Box className='slider'>
            <Slider
              defaultValue={maxCapacity?.value}
              value={maxCapacity.value}
              step={1}
              size='small'
              min={0}
              max={11}
              onChange={handleSliderMaxCap}
              onChangeCommitted={handleCommittedSlider}
            />
          </Box>
        </Box>
        <Box className='slider__group'>
          <Box className='slider__label'>
            <InputLabel>Min capacity: {minCapacity?.label}</InputLabel>
          </Box>
          <Box className='slider'>
            <Slider
              defaultValue={minCapacity.value}
              value={minCapacity.value}
              step={1}
              size='small'
              min={0}
              max={11}
              onChange={handleSliderMinCap}
              onChangeCommitted={handleCommittedSlider}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
