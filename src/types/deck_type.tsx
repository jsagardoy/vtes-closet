export type Archetype =
  | 'toolbox'
  | 'undefined'
  | 'allies'
  | 'bleed'
  | 'block'
  | 'combat'
  | 'political'
  | 'evil';

export const getArchetype = (): Archetype[] => [
  'toolbox',
  'undefined',
  'allies',
  'bleed',
  'block',
  'combat',
  'political',
  'evil',
];
export interface DeckType {
  id: string;
  name: string;
  description: string;
  deckType: Archetype;
  crypt: {
    id: string;
    quantity: number;
  }[];
  library: { id: string; quantity: number }[];
}
