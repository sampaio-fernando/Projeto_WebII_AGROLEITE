import { Body, Controller, Get, Post, Redirect, Render, Param, HttpCode } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { ValidationView } from 'nest-validation-view';
import { CreateCategoriaDto } from './dtos/create-categoria.dto';
import { UpdateCategoriaDto } from './dtos/update-categoria.dto';

@Controller('categoria')
export class CategoriaController {

    constructor(private categoriaService: CategoriaService) {}

    @Get()
    @Render('categoria/inicial')
    async inicial(): Promise<object> {
        const categoria = await this.categoriaService.findAll();
        return { titulo: 'Consulta de Categorias', categoria };
    }

    @Get('criar')
    @Render('categoria/formulario')
    formularioCriar(): object {
        return { titulo: 'Nova Categoria' };
    }

    @Post('criar')
    @Redirect('/categoria')
    @ValidationView('categoria/formulario', ({ request, errors }) => ({
        titulo: 'Nova Categoria',
        categoria: { ...request.body },
        errors,
    }))
    async formularioCriarSalvar(@Body() dados: CreateCategoriaDto): Promise<void> {
        await this.categoriaService.create(dados);
    }

    @Get(':id/editar')
    @Render('categoria/formulario')
    async formEditar(@Param('id') id: number): Promise<object> {
        const categoria = await this.categoriaService.findOne(id);
        if (!categoria) throw new Error('Categoria não encontrada!');
        return { titulo: 'Editar Categoria', categoria };
    }

    @Post(':id/editar')
    @Redirect('/categoria')
    @ValidationView('categoria/formulario', ({ request, errors }) => ({
        titulo: 'Editar Categoria',
        categoria: { id: request.params.id, ...request.body },
        errors,
    }))
    async formEditarSalvar(@Param('id') id: number, @Body() dados: UpdateCategoriaDto): Promise<void> {
        await this.categoriaService.update(id, dados);
    }

    @Post(':id/excluir')
    @HttpCode(204)
    @Redirect('/categoria')
    async formExcluirSalvar(@Param('id') id: number): Promise<void> {
        await this.categoriaService.remove(id);
    }
}