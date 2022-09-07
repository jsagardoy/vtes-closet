import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Box,
  Paper,
} from '@mui/material';
import React from 'react';
import { discType } from '../../../../types/crypt_type';
import { LibraryPropType } from '../../../../types/library_type';

import {
  getClanIcon,
  getClans,
  getDiscIcon,
  getLibraryCardTypes,
  getSects,
} from '../../../../util/helpFunction';
interface Props {
  open: boolean;
  selected_discList: discType;
  selectedLibraryCardType: string;
  selectedSect: string;
  selectedClan: string;
  checked: LibraryPropType;
  handleMore: () => void;
  handleSelectDisc: (index: number) => void;
  handleChangeLibraryCardType: (event: SelectChangeEvent) => void;
  handleSect: (event: SelectChangeEvent) => void;
  handleClan: (event: SelectChangeEvent) => void;
  handleCheck: (
    prop: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleResetButton: () => void;
}
const LibraryNavbarModal = (props: Props) => {
  const {
    open,
    selectedSect,
    selectedClan,
    selectedLibraryCardType,
    selected_discList,
    checked,
    handleClan,
    handleMore,
    handleSect,
    handleSelectDisc,
    handleChangeLibraryCardType,
    handleCheck,
    handleResetButton,
  } = props;

  return (
    <Modal open={open} onClose={() => handleMore()} className='navbar__bottom'>
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
                ) : (
                  <Avatar src={dis} alt={dis} />
                )}
              </IconButton>
            );
          })}
        </Box>
        <Divider />
        <Box className='filter__clan'>
          <InputLabel id='library_card_type_id'>Type</InputLabel>
          <FormControl variant='standard'>
            <Select
              labelId='library_card_type_id'
              id='library_card_type_id'
              value={selectedLibraryCardType}
              label='Card Type'
              className='select__clan'
              onChange={(event: SelectChangeEvent) =>
                handleChangeLibraryCardType(event)
              }
            >
              {getLibraryCardTypes().map((t, index) => (
                <MenuItem key={t && index} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className='filter__clan'>
          <InputLabel>Clan</InputLabel>
          <FormControl variant='standard'>
            <Select
              id='clan__select__id'
              labelId='select__clan__standard__label'
              className='select__clan'
              value={selectedClan}
              onChange={(event: SelectChangeEvent) => handleClan(event)}
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
        <Box className='filter__sect'>
          <InputLabel>Sect</InputLabel>
          <FormControl variant='standard'>
            <Select
              id='select__sect__id'
              labelId='select__sect__standard__label'
              className='select__sect'
              value={selectedSect}
              onChange={(event: SelectChangeEvent) => handleSect(event)}
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
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.titled}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('titled', e)
                }
              />
              <InputLabel>Titled</InputLabel>
            </Box>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.nonTitled}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('nonTitled', e)
                }
              />
              <InputLabel>Non-titled</InputLabel>
            </Box>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.banned}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('banned', e)
                }
              />
              <InputLabel>Banned</InputLabel>
            </Box>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.disciplineless}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('disciplineless', e)
                }
              />
              <InputLabel>Discipliness</InputLabel>
            </Box>
          </Box>
          <Box className='prop__column'>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.clanless}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('clanless', e)
                }
              />
              <InputLabel>Clanless</InputLabel>
            </Box>
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
                checked={checked.burnable}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('burnable', e)
                }
              />
              <InputLabel>Burn option</InputLabel>
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
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.combo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('combo', e)
                }
              />
              <InputLabel>Combo</InputLabel>
            </Box>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.blood_cost}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('blood_cost', e)
                }
              />
              <InputLabel>Blood Cost</InputLabel>
            </Box>
            <Box className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.pool_cost}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('pool_cost', e)
                }
              />
              <InputLabel>Pool Cost</InputLabel>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box className='clear__button'>
          <Button
            style={{
              textTransform: 'capitalize',

              border: '1px solid',
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
    </Modal>
  );
};

export default LibraryNavbarModal;
