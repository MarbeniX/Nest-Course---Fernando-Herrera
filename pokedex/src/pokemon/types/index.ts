export type PokemonSearchTermType =
  | { type: 'no'; value: number }
  | { type: 'id'; value: string }
  | { type: 'name'; value: string };
