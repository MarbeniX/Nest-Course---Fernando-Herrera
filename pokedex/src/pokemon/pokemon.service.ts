import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonSearchTermType } from './types';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

  findAll(paginatinoDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginatinoDto;
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
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
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }
    return;
  }

  async executeSeed(data: CreatePokemonDto[]) {
    const insertPromises = data.map((pokemon) => {
      return this.pokemonModel.create(pokemon);
    });
    await Promise.all(insertPromises);
    return 'Seed executed';
  }

  async clearDatabase() {
    await this.pokemonModel.deleteMany({});
    return 'Database cleared';
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
