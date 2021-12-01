import InputLabel from '@material-ui/core/InputLabel';
import { Slider } from '@mui/material';
import React from 'react';
import {
  capacityType,
  getCapacities,
  getGroups,
  groupType,
} from '../../../util';
import './SlidersComponent.css';

interface SliderProps {
  group: groupType;
  maxCapacity: capacityType;
  minCapacity: capacityType;
  filterSliders: (
    group: groupType,
    maxCap: capacityType,
    minCap: capacityType
  ) => void;
}

export const SlidersComponent = (sliderProps: SliderProps) => {
  const { filterSliders, group, maxCapacity, minCapacity } = sliderProps;
  const groups: groupType[] = getGroups();
  const cap: capacityType[] = getCapacities();
  const [selectedGroup, setSelectedGroup] = React.useState<groupType>(group);
  const [selectedMaxCap, setSelectedMaxCap] =
    React.useState<capacityType>(maxCapacity);
  const [selectedMinCap, setSelectedMinCap] =
    React.useState<capacityType>(minCapacity);

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
    selectedGroup
      ? filterSliders(selectedGroup, selectedMaxCap, selectedMinCap)
      : undefined;

  const handleSliderMaxCap = (
    event: Event,
    capacity: number|number[],
    activeThumb: number
  ): void => {
    const elem = cap.find((c: capacityType) => c.value === capacity);
    if (elem) {
      setSelectedMaxCap(elem);
    }
  };
  const handleSliderMinCap = (
    event: Event,
    capacity: number|number[],
    activeThumb: number
  ): void => {
    const elem = cap.find((c: capacityType) => c.value === capacity);
    if (elem) {
      setSelectedMinCap(elem);
    }
  };

  const handleCommittedSliderCap = () =>
    selectedMaxCap
      ? filterSliders(selectedGroup, selectedMaxCap, selectedMinCap)
      : undefined;

  return (
    <>
    <div className='slider__container'>
      <div className='slider__group'>
        <div className='slider__label'>
          <InputLabel>Group: {selectedGroup?.label}</InputLabel>
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
      </div>
      <div className='slider__group'>
        <div className='slider__label'>
          <InputLabel>Max capacity: {selectedMaxCap?.label}</InputLabel>
        </div>
        <div className='slider'>
          <Slider
            defaultValue={maxCapacity?.value}
            step={1}
            size='small'
            min={0}
            max={11}
            onChange={handleSliderMaxCap}
            onChangeCommitted={handleCommittedSliderCap}
          />
        </div>
      </div>
      <div className='slider__group'>
        <div className='slider__label'>
          <InputLabel>Min capacity: {selectedMinCap?.label}</InputLabel>
        </div>
        <div className='slider'>
          <Slider
            defaultValue={minCapacity.value}
            step={1}
            size='small'
            min={0}
            max={11}
            onChange={handleSliderMinCap}
            onChangeCommitted={handleCommittedSliderCap}
          />
        </div>
      </div>
      </div>
      </>
  );
};
