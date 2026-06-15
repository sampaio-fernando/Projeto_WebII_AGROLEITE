import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePiqueteDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome!: string;

  @IsNumber({}, { message: 'Tamanho deve ser um número' })
  @Transform(({ value }) => parseFloat(value))
  @Min(0.01, { message: 'O tamanho deve ser maior que zero' })
  tamanho!: number;

  @IsNotEmpty({ message: 'O tipo de pastagem é obrigatório' })
  tipoPastagem!: string;

  @IsNumber({}, { message: 'Selecione uma propriedade' })
  @Transform(({ value }) => parseInt(value))
  propriedade!: number;
}