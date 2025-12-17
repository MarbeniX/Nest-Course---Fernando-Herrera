export const pokemonIds = [1, 20, 30, 40, 50, 60];

export interface Pokemon {
    id: number;
    name: string;
    age?: number;
}

export const pokemon: Pokemon = {
    id: 1,
    name: "Bulbasaur",
    age: 15,
};
