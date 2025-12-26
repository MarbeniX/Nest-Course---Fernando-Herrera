import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonSearchTermType } from './types';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: PokemonSearchTermType) {
    let pokemon: Pokemon | null = null;

    switch (term.type) {
      case 'no':
        pokemon = await this.pokemonModel.findOne({ no: +term.value });
        break;

      case 'id':
        pokemon = await this.pokemonModel.findById(term.value);
        break;

      case 'name':
        pokemon = await this.pokemonModel.findOne({
          name: term.value,
        });
        break;
    }

    if (!pokemon) {
      throw new BadRequestException(
        `Pokemon not found using ${term.type}: ${term.value}`,
      );
    }

    return pokemon;
  }

  async update(
    term: PokemonSearchTermType,
    updatePokemonDto: UpdatePokemonDto,
  ) {
    try {
      const pokemon = await this.findOne(term);
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: string) {
    return await this.pokemonModel.findByIdAndDelete(id);
  }

  private handleErrors(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
      );
    } else {
      throw new BadRequestException(`Can't create Pokemon - Check server logs`);
    }
  }
}
