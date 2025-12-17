import axios from "axios";
import type { PokeapiResponse } from "../interfaces/pokeapi-response.interface";

export class Pokemon {
    // public id: number;
    // public name: string;
    get imageUrl(): string {
        return `http://pokemon.com/${this.id}.png`;
    }

    constructor(public readonly id: number, public name: string) {}

    public scream() {
        console.log(`${this.name.toUpperCase()}!!!!`);
    }

    public speak() {
        console.log(`${this.name}, ${this.name}`);
    }

    public async getMoves() {
        const { data } = await axios.get<PokeapiResponse>(
            `https://pokeapi.co/api/v2/pokemon/${this.id}`
        );
        return data;
    }
}

export const pikachu = new Pokemon(25, "Pikachu");

pikachu.scream();
pikachu.speak();
pikachu.getMoves().then((moves) => console.log(moves));
