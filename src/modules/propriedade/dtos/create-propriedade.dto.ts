import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePropriedadeDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome!: string;

  @IsNumber({}, { message: 'O tamanho deve ser um número' })
  @Transform(({ value }) => parseFloat(value))
  @Min(0.01, { message: 'O tamanho deve ser maior que zero' })
  tamanho!: number;

  @IsNotEmpty({ message: 'O número da linha é obrigatório' })
  linha!: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  cidade!: string;

  @IsNotEmpty({ message: 'O estado é obrigatório' })
  estado!: string;
}