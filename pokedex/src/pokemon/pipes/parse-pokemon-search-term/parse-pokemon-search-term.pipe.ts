import { Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { PokemonSearchTermType } from 'src/pokemon/types';

@Injectable()
export class ParsePokemonSearchTermPipe implements PipeTransform<
  string,
  PokemonSearchTermType
> {
  transform(value: string): PokemonSearchTermType {
    const term = value.trim();

    if (!isNaN(+term)) {
      return { type: 'no', value: +term };
    }

    if (isValidObjectId(term)) {
      return { type: 'id', value: term };
    }

    return { type: 'name', value: term.toLowerCase() };
  }
}
