import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import { discType, PropType } from '../../../../types/crypt_type';
import {
  getDiscIcon,
  getClans,
  getClanIcon,
  getSects,
  getTitle,
  groupType,
  capacityType,
} from '../../../../util';
import { SlidersComponent } from './SlidersComponent';

interface Props {
  showMore: boolean;
  selected_discList: discType;
  disc_sup: string[];
  selectedClan: string;
  selectedSect: string;
  selectedGroup: groupType;
  selectedMaxCap: capacityType;
  selectedMinCap: capacityType;
  groups: groupType[];
  checked: PropType;
  handleMore: () => void;
  handleSelectDisc: (index: number) => void;
  handleClan: (event: SelectChangeEvent) => void;
  handleSect: (event: SelectChangeEvent) => void;
  checkboxTitle: (title: string) => boolean;
  handleTitle: (
    title: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSliders: (
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
    group: number | number[],
    activeThumb: number
  ) => void;
  handleSliderMinCap: (
    event: Event,
    group: number | number[],
    activeThumb: number
  ) => void;
  handleCheck: (
    prop: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleResetButton: () => void;
}

const MoreFilterModal = (props: Props) => {
  const {
    showMore,
    handleMore,
    selected_discList,
    handleSelectDisc,
    disc_sup,
    selectedClan,
    handleClan,
    selectedSect,
    handleSect,
    checkboxTitle,
    handleTitle,
    handleSliders,
    selectedGroup,
    selectedMaxCap,
    selectedMinCap,
    groups,
    handleSliderGroup,
    handleSliderMaxCap,
    handleSliderMinCap,
    handleCheck,
    checked,
    handleResetButton,
  } = props;
  return (
    <Dialog
      open={showMore}
      onClose={() => handleMore()}
      className='navbar__bottom'
    >
      <Paper className='filter__container'>
        <Box className='disc__container'>
          {getDiscIcon(selected_discList.name).map((dis, index) => {
            return (
              <IconButton
                key={dis}
                size='small'
                onClick={() => handleSelectDisc(index)}
              >
                {selected_discList.value[index] === 0 ? (
                  <Avatar className='opacity__disc' src={dis} alt={dis} />
                ) : selected_discList.value[index] === 1 ? (
                  <Avatar src={dis} alt={dis} />
                ) : (
                  <Avatar
                    src={getDiscIcon(disc_sup)[index]}
                    alt={getDiscIcon(disc_sup)[index]}
                  />
                )}
              </IconButton>
            );
          })}
        </Box>
        <Divider />
        <Box className='filter__clan'>
          <InputLabel>Clan</InputLabel>
          <FormControl variant='standard'>
            <Select
              id='clan__select__id'
              labelId='select__clan__standard__label'
              className='select__clan'
              value={selectedClan}
              onChange={handleClan}
              label='Clan'
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {getClans().map((clan) => (
                <MenuItem key={clan} value={clan}>
                  <Avatar
                    className='select__clan__avatar__icon'
                    src={getClanIcon([clan]).find((c) => c)}
                    alt={clan}
                  />
                  {clan}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Divider />

        <Box className='filter__sect'>
          <InputLabel>Sect</InputLabel>
          <FormControl variant='standard'>
            <Select
              id='select__sect__id'
              labelId='select__sect__standard__label'
              className='select__sect'
              value={selectedSect}
              onChange={handleSect}
              label='Sect'
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {getSects().map((sect) => (
                <MenuItem key={sect} value={sect}>
                  {sect}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Divider />
        <Box className='title__container'>
          {getTitle().map((title: string) => (
            <Box key={title} className='title__pair'>
              <Checkbox
                size='small'
                checked={checkboxTitle(title)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleTitle(title, e)
                }
              />
              <InputLabel>{title}</InputLabel>
            </Box>
          ))}
        </Box>
        <Divider />
        <Box className='filter__slider__group'>
          <SlidersComponent
            filterSliders={handleSliders}
            group={selectedGroup}
            maxCapacity={selectedMaxCap}
            minCapacity={selectedMinCap}
            groups={groups}
            handleSliderGroup={handleSliderGroup}
            handleSliderMaxCap={handleSliderMaxCap}
            handleSliderMinCap={handleSliderMinCap}
          />
        </Box>
        <Divider />
        <Box className='filter__props'>
          <Box className='prop__column'>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.bleed}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('bleed', e)
                }
              />
              <InputLabel>+ Bleed</InputLabel>
            </Box>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.strength}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('strength', e)
                }
              />
              <InputLabel>+ Strength</InputLabel>
            </Box>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.stealth}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('stealth', e)
                }
              />
              <InputLabel>+ Stealth</InputLabel>
            </Box>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.intercept}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('intercept', e)
                }
              />
              <InputLabel>+ Intercept</InputLabel>
            </Box>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.aggravated}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('aggravated', e)
                }
              />
              <InputLabel>Aggravated</InputLabel>
            </Box>

            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.enter_combat}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('enter_combat', e)
                }
              />
              <InputLabel>Enter combat</InputLabel>
            </Box>
          </Box>
          <Box className='prop__column'>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.flight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('flight', e)
                }
              />
              <InputLabel>Flight</InputLabel>
            </Box>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.black_hand}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('black_hand', e)
                }
              />
              <InputLabel>Black Hand</InputLabel>
            </Box>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.red_list}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('red_list', e)
                }
              />
              <InputLabel>Red List</InputLabel>
            </Box>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.infernal}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('infernal', e)
                }
              />
              <InputLabel>Infernal</InputLabel>
            </Box>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.slave}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('slave', e)
                }
              />
              <InputLabel>Slave</InputLabel>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box className='clear__button'>
          <Button
            sx={{
              textTransform: 'capitalize',
              border: '1px solid black',
              borderRadius: '2px',
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
            size='small'
            onClick={() => handleResetButton()}
          >
            Reset Filters
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
};

export default MoreFilterModal;
