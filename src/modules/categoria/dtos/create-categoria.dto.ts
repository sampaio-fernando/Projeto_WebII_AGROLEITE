import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  nome!: string;
}