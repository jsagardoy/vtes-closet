import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { PropType, discType } from '../../../../types/crypt_type';
import {
  capacityType,
  getClanIcon,
  getClans,
  getDiscIcon,
  getSects,
  getTitle,
  groupType,
} from '../../../../util';

import React from 'react';
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

const MoreFilterModalSmall = (props: Props) => {
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
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
      fullScreen
      open={showMore}
      onClose={() => handleMore()}
      PaperProps={{
        sx: {
          width: '100%',
        },
      }}
    >
      <DialogContent sx={{ widht: '100%' }}>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box id='disciplines' sx={{ m: '1rem', maxWidth: '100%' }}>
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
          <Box
            id='selectors'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'space-between',
              width: '100%',
              m: '1rem',
            }}
          >
            <Box
              id='selectClan'
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                maxHeight: '5vh',
                height: '5vh',
              }}
            >
              <FormControl fullWidth variant='standard'>
                <InputLabel id='select__clan__standard__label'>Clan</InputLabel>
                <Select
                  sx={{ minWidth: '10rem', m: '2rem' }}
                  id='clan__select__id'
                  labelId='select__clan__standard__label'
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
                        src={getClanIcon([clan]).find((c) => c)}
                        alt={clan}
                      />
                      {clan}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              id='selectSect'
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                maxHeight: '5vh',
                height: '5vh',
              }}
            >
              <FormControl
                fullWidth
                sx={{
                  maxHeight: '5vh',
                  height: '5vh',
                }}
                variant='standard'
              >
                {' '}
                <InputLabel id='select__sect__standard__label'>Sect</InputLabel>
                <Select
                  sx={{ minWidth: '10rem', m: '2rem' }}
                  id='select__sect__id'
                  labelId='select__sect__standard__label'
                  value={selectedSect}
                  onChange={handleSect}
                  label='Sect'
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {getSects().map((sect) => (
                    <MenuItem key={sect} value={sect}>
                      <Typography variant='body1'>{sect}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              m: '1rem',
            }}
          >
            <FormGroup
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: '.1rem',
                maxHeight: '28vh',
              }}
            >
              {getTitle().map((title: string) => (
                <FormControlLabel
                  key={title}
                  control={
                    <Checkbox
                      sx={{ p: '0.5rem' }}
                      size='small'
                      checked={checkboxTitle(title)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleTitle(title, e)
                      }
                    />
                  }
                  label={title}
                />
              ))}
            </FormGroup>
          </Box>
          <Divider />
          <Box id='sliders' sx={{ marginRight: '1rem', marginLeft: '1rem' }}>
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
          <Box sx={{ display: 'flex', m: '1rem'}}>
            <FormGroup
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                maxHeight: '28vh',
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.bleed}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('bleed', e)
                    }
                  />
                }
                label='+ Bleed'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.strength}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('strength', e)
                    }
                  />
                }
                label='+ Strength'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.stealth}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('stealth', e)
                    }
                  />
                }
                label='+ Stealth'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ p: '0.5rem' }}
                    size='small'
                    checked={checked.intercept}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('intercept', e)
                    }
                  />
                }
                label='+ Intercept'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ p: '0.5rem' }}
                    size='small'
                    checked={checked.aggravated}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('aggravated', e)
                    }
                  />
                }
                label='Aggravated'
              />

              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ p: '0.5rem' }}
                    size='small'
                    checked={checked.enter_combat}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('enter_combat', e)
                    }
                  />
                }
                label='Enter combat'
              />

              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ p: '0.5rem' }}
                    size='small'
                    checked={checked.flight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('flight', e)
                    }
                  />
                }
                label='Flight'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ p: '0.5rem' }}
                    size='small'
                    checked={checked.black_hand}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('black_hand', e)
                    }
                  />
                }
                label='Black Hand'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ p: '0.5rem' }}
                    size='small'
                    checked={checked.red_list}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('red_list', e)
                    }
                  />
                }
                label='Red List'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ p: '0.5rem' }}
                    size='small'
                    checked={checked.infernal}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('infernal', e)
                    }
                  />
                }
                label='Infernal'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ p: '0.5rem' }}
                    size='small'
                    checked={checked.slave}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('slave', e)
                    }
                  />
                }
                label='Slave'
              />
            </FormGroup>
          </Box>
          <Divider />
          <Box
            sx={{ display: 'flex', justifyContent: 'space-around', m: '1rem' }}
          >
            <Button
              sx={{ border: '1px solid' }}
              color='secondary'
              onClick={() => handleResetButton()}
            >
              Reset Filters
            </Button>
            <Button
              sx={{ border: '1px solid' }}
              color='secondary'
              onClick={() => handleMore()}
            >
              Done
            </Button>
          </Box>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default MoreFilterModalSmall;
