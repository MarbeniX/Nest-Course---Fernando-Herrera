import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParsePokemonSearchTermPipe } from './pipes/parse-pokemon-search-term/parse-pokemon-search-term.pipe';
import type { PokemonSearchTermType } from './types';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':term')
  findOne(
    @Param('term', ParsePokemonSearchTermPipe)
    term: PokemonSearchTermType,
  ) {
    return this.pokemonService.findOne(term);
  }

  @Patch(':term')
  update(
    @Param('term', ParsePokemonSearchTermPipe)
    term: PokemonSearchTermType,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseMongoIdPipe)
    id: string,
  ) {
    return this.pokemonService.remove(id);
  }
}
