import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Paper,
  FormGroup,
  FormControlLabel,
  Dialog,
} from '@mui/material';
import { Container } from '@mui/system';
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
    <Dialog
      open={open}
      onClose={() => handleMore()}
      sx={{
        '& .MuiDialog-container': {
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        },
      }}
    >
      <Paper
        sx={{
          maxWidth: '35rem',
          display: 'flex',
          flexDirection: 'column',
          /* position: 'fixed',
          top:80,right:10,m:0 */
        }}
      >
        <Box sx={{ m: '1rem' }}>
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
        <Container>
          <InputLabel id='library_card_type_id'>Type</InputLabel>
          <FormControl fullWidth>
            <Select
              fullWidth
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

          <InputLabel>Clan</InputLabel>
          <FormControl fullWidth>
            <Select
              fullWidth
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
          <InputLabel>Sect</InputLabel>
          <FormControl fullWidth>
            <Select
              fullWidth
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
        </Container>
        <Container
          sx={{
            marginTop: '1rem',
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <Box sx={{}}>
            <FormGroup>
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
            </FormGroup>
            <FormGroup>
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
            </FormGroup>

            <FormGroup>
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
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.intercept}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('intercept', e)
                    }
                  />
                }
                label='+ Intercept'
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.aggravated}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('aggravated', e)
                    }
                  />
                }
                label='Aggravated'
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.enter_combat}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('enter_combat', e)
                    }
                  />
                }
                label='Enter combat'
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.titled}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('titled', e)
                    }
                  />
                }
                label='Titled'
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.nonTitled}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('nonTitled', e)
                    }
                  />
                }
                label='Non-Titled'
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.banned}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('banned', e)
                    }
                  />
                }
                label='Banned'
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.disciplineless}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('disciplineless', e)
                    }
                  />
                }
                label='Discipliness'
              />
            </FormGroup>
          </Box>
          <Box sx={{}}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.clanless}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('clanless', e)
                    }
                  />
                }
                label='Clanless'
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.flight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('flight', e)
                    }
                  />
                }
                label='Flight'
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.burnable}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('burnable', e)
                    }
                  />
                }
                label='Burn option'
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.black_hand}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('black_hand', e)
                    }
                  />
                }
                label='Black Hand'
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.red_list}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('red_list', e)
                    }
                  />
                }
                label='Red List'
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.infernal}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('infernal', e)
                    }
                  />
                }
                label='Infernal'
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
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

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.combo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('combo', e)
                    }
                  />
                }
                label='Combo'
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.blood_cost}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('blood_cost', e)
                    }
                  />
                }
                label='Blood Cost'
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={checked.pool_cost}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCheck('pool_cost', e)
                    }
                  />
                }
                label='Pool Cost'
              />
            </FormGroup>
          </Box>
        </Container>
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
            color='secondary'
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

export default LibraryNavbarModal;
