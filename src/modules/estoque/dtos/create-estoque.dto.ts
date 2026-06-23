import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEstoqueDto {
  @IsNumber({}, { message: 'A quantidade deve ser um número' })
  @Transform(({ value }) => parseFloat(value))
  quantidade!: number;

  @IsNotEmpty({ message: 'A data de entrada é obrigatória' })
  dtEntrada!: string;

  dtValidade?: string;

  @IsNotEmpty({ message: 'O local de armazenamento é obrigatório' })
  localArmazenado!: string;

  @IsNumber({}, { message: 'Selecione um insumo' })
  @Transform(({ value }) => parseInt(value))
  insumo!: number;
}