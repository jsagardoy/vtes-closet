import {
  Avatar,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import { discType, LibraryPropType } from '../../../../types/crypt_type';

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
  } = props;

  return (
    <Modal open={open} onClose={() => handleMore()} className='navbar__bottom'>
      <div className='filter__container'>
        <div className='disc__container'>
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
        </div>
        <Divider />
        <div className='filter__clan'>
          <InputLabel id='library_card_type_id'>Card Type</InputLabel>
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
        </div>
        <Divider />
        <div className='filter__clan'>
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
        </div>
        <Divider />
        <div className='filter__sect'>
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
        </div>
        <Divider />
        <div className='filter__props'>
          <div className='prop__column'>
            <div className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.bleed}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('bleed', e)
                }
              />
              <InputLabel>+ Bleed</InputLabel>
            </div>
            <div className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.strength}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('strength', e)
                }
              />
              <InputLabel>+ Strength</InputLabel>
            </div>
            <div className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.stealth}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('stealth', e)
                }
              />
              <InputLabel>+ Stealth</InputLabel>
            </div>
            <div className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.intercept}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('intercept', e)
                }
              />
              <InputLabel>+ Intercept</InputLabel>
            </div>
            <div className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.aggravated}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('aggravated', e)
                }
              />
              <InputLabel>Aggravated</InputLabel>
            </div>

            <div className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.enter_combat}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('enter_combat', e)
                }
              />
              <InputLabel>Enter combat</InputLabel>
            </div>
          </div>
          <div className='prop__column'>
            <div className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.flight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('flight', e)
                }
              />
              <InputLabel>Flight</InputLabel>
            </div>
            <div className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.black_hand}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('black_hand', e)
                }
              />
              <InputLabel>Black Hand</InputLabel>
            </div>
            <div className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.red_list}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('red_list', e)
                }
              />
              <InputLabel>Red List</InputLabel>
            </div>
            <div className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.infernal}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('infernal', e)
                }
              />
              <InputLabel>Infernal</InputLabel>
            </div>
            <div className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.slave}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('slave', e)
                }
              />
              <InputLabel>Slave</InputLabel>
            </div>
            <div className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.blood_cost}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('blood_cost', e)
                }
              />
              <InputLabel>Blood Cost</InputLabel>
            </div>
            <div className='prop__pair'>
              <Checkbox
                size='small'
                checked={checked.pool_cost}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheck('pool_cost', e)
                }
              />
              <InputLabel>Pool Cost</InputLabel>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LibraryNavbarModal;
