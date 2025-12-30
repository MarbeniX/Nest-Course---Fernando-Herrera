import { Injectable } from '@nestjs/common';

import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonService.clearDatabase();
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=2',
    );

    const pokemons: CreatePokemonDto[] = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      return { name, no };
    });

    await this.pokemonService.executeSeed(pokemons);
    return 'Seed executed';
  }
}
