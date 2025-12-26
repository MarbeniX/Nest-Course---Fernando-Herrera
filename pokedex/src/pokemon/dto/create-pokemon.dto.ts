import { IsString, Min, MinLength } from 'class-validator';
import { IsNumber, IsPositive } from 'class-validator';

export class CreatePokemonDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  no: number;

  @MinLength(1)
  @IsString()
  name: string;
}
