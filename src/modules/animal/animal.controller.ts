import { Controller, Get, Render, Post, Redirect, Body, Param } from "@nestjs/common";
import { AnimalService } from "./animal.service";
import { CategoriaService } from "../categoria/categoria.service";
import { PropriedadeService } from "../propriedade/propriedade.service";
import { CreateAnimalDto } from "./dto/create-animal";
import { ValidationView } from "nest-validation-view";
import { UpdateAnimalDto } from "./dto/update.animal";

@Controller('animais')
export class AnimalController {

    constructor(
        private animalService: AnimalService,
        private categoriService: CategoriaService,
        private propriedadeService: PropriedadeService
    ) {}

    @Get()
    @Render('animal/inicial')
    async inicial(): Promise<object> {
        const listaAnimais = await this.animalService.findAll();
    
        return {
            titulo: 'Consulta de Animais',
            produtos: listaAnimais
        }
    }

    @Get('criar')
    @Render('animal/formulario')
    async formularioCriar(): Promise<object> {
        const categorias = await this.categoriService.findAll();
        const propriedades = await this.propriedadeService.findAll();

        return {
            titulo: 'Novo animal',
            categorias,
            propriedades,
        };
    }

    @Post('criar')
    @Redirect('/animais')
    @ValidationView('animal/formulario', ({ request, errors }) => ({
        animal: {
            ...request.body
        },
        errors,
      }))
    async formularioCriarSalvar(@Body() dados: CreateAnimalDto): Promise<void> {
        await this.animalService.create(dados);
    }

    @Get(':id/editar')
    @Render('animal/formulario')
    async formEditar(@Param('id') id: number): Promise<object> {
        const animal = await this.animalService.findOne(id);
        const categorias = await this.categoriService.findAll();
        const propriedades = await this.propriedadeService.findAll();

    
        if(!animal) {
            throw new Error('Animal não encontrado!');            
        }
            
        return {
            titulo: 'Edição de Animal',
            subtitulo: `Atualização do animal: ${animal.identificacao}`,
            animal,
            categorias,
            propriedades,
        };
    }

    @Post(':id/editar')
    @Redirect('/animais')
    @ValidationView('animal/formulario', ({ request, errors }) => ({
        animal: {
            id: request.params.id,
            ...request.body
        },
        errors,
      }))
    async formEditarSalvar(@Param('id') id: number, @Body() dados: UpdateAnimalDto): Promise<void>{
        await this.animalService.update(id, dados);
    }

    @Get(':id/excluir')
    @Render('animal/remover')
    async formExcluir(@Param('id') id: number): Promise<object> {
        const animal = await this.animalService.findOne(id);

        if(!animal) {
            throw new Error('Animal não encontrado!');            
        }
        
        return {
            titulo: 'Exclusão de Animal',
            subtitulo: `Exclusão de animal: ${animal.identificacao}`,
            animal,
        };
    }

    @Post(':id/excluir')
    @Redirect('/animais')
    async formExcluirSalvar(@Param('id') id: number): Promise<void>{
        await this.animalService.remove(id);
    }
    
}
