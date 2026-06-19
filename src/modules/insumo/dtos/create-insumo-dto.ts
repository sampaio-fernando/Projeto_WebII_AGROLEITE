import { Type, Transform } from "class-transformer";
import { IsNotEmpty, MinLength, IsNumber, Min, IsOptional, IsString } from "class-validator";



const toDecimalNumber = (value: unknown): unknown => {
  const normalizedValue: unknown = Array.isArray(value)
    ? (value as unknown[])[value.length - 1]
    : value;

  if (typeof normalizedValue === 'string') {
    return Number(normalizedValue.replace(',', '.'));
  }

  return normalizedValue;
};

export class CreateInsumoDto {

  @IsNotEmpty({ message: 'O campo descrição é obrigatório'})
  @MinLength(5, { message: 'A descrição deve ter no mínimo 5 caracteres' })
  descricao!: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O valor deve ter no máximo 2 casas decimais' })
  @Transform(({ value }) => toDecimalNumber(value))
  @Min(0.01, { message: 'O preço deve no mínimo R$ 0,01'})
  valor_unit!: number;

}