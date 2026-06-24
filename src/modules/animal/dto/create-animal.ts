import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsNumber } from "class-validator";


const toDecimalNumber = (value: unknown): unknown => {
  const normalizedValue: unknown = Array.isArray(value)
    ? (value as unknown[])[value.length - 1]
    : value;

  if (typeof normalizedValue === 'string') {
    return Number(normalizedValue.replace(',', '.'));
  }

  return normalizedValue;
};

export class CreateAnimalDto {

    @IsNotEmpty({ message: 'O campo identificação é obrigatório'})
      identificacao!: string;

    @IsNotEmpty({ message: 'O campo data de nascimento é obrigatório' })
    data_nascimento!: Date;

    @IsOptional()
    peso!: number;

    @IsNotEmpty({ message: 'O campo categoria é obrigatório'})
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    categoria!: number;

    @IsNotEmpty({ message: 'O campo propriedade é obrigatório'})
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    propriedade!: number;
}