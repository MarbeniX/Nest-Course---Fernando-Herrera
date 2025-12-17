import { type Pokemon } from "./02-objects";

const bulbasaur: Pokemon = {
    id: 1,
    name: "Bulbasaur",
    age: 15,
};

const charmander: Pokemon = {
    id: 4,
    name: "Charmander",
};

export const pokemons: Pokemon[] = [bulbasaur, charmander];
