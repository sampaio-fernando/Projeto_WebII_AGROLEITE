import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProducaoMensalDto {
  @IsNotEmpty({ message: 'O mês de referência é obrigatório' })
  mesReferencia!: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'A quantidade deve ter no máximo 2 casas decimais' })
  @Transform(({ value }) => parseFloat(value))
  @Min(0.01, { message: 'A quantidade deve ser maior que zero' })
  qtdTotalLitros!: number;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O valor do litro deve ter no máximo 2 casas decimais' })
  @Transform(({ value }) => parseFloat(value))
  @Min(0.01, { message: 'O valor do litro deve ser maior que zero' })
  valorLitro!: number;
}