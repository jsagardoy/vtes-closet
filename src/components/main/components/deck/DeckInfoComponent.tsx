import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react'
import { Archetype, DeckType, getArchetype } from '../../../../types/deck_type';

interface Props {
    handleChangeSelection:(elem:Archetype)=>void;
    deck: DeckType;
}
const DeckInfoComponent = (props: Props) => {
    const { deck, handleChangeSelection } = props;
    //TODO: handleChangefor name and description
    return (
        <Box>
            <FormControl className='info' fullWidth>
                <Typography sx={{ alignSelf: 'center' }} variant='h5'>
                    Deck Info
                </Typography>
                <TextField
                    sx={{  m: 1 }}
                    fullWidth
                    variant='standard'
                    label='Name'
                    placeholder='Deck name'
                    value={deck.name}
                />
                <TextField
                    sx={{ m: 1, width: '98%' }}
                    variant='standard'
                    label='Description'
                    placeholder='Description'
                    value={deck.description}
                />
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id='select-label'>Archetype</InputLabel>
                        <Select
                            sx={{
                                m: 1,
                                width: 'maxContent',
                                borderColor: 'darkcyan',
                                justifyContent: 'flex-end',
                                textTransform: 'capitalize',
                            }}
                            labelId='select-label'
                            id='select'
                            placeholder='Deck archetype'
                            value={deck.deckType}
                            label='Archetype'
                            onChange={(e) => handleChangeSelection(e.target.value as Archetype)}
                        >
                            {getArchetype().map((elem: Archetype) => (
                                <MenuItem className='menu__item' key={elem} value={elem}>
                                    {elem}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </FormControl>
        </Box>);
}
export default DeckInfoComponent;