import { Body, Controller, Get, HttpCode, Param, Post, Redirect, Render } from '@nestjs/common';
import { ValidationView } from 'nest-validation-view';
import { InsumoService } from '../insumo/insumo.service';
import { EstoqueService } from './estoque.service';
import { CreateEstoqueDto } from './dtos/create-estoque.dto';
import { UpdateEstoqueDto } from './dtos/update-estoque.dto';

@Controller('estoques')
export class EstoqueController {

    constructor(
        private estoqueService: EstoqueService,
        private insumoService: InsumoService,
    ) {}

    @Get()
    @Render('estoque/inicial')
    async inicial(): Promise<object> {
        const estoques = await this.estoqueService.findAll();
        return { titulo: 'Consulta de Estoque', estoques };
    }

    @Get('criar')
    @Render('estoque/formulario')
    async formularioCriar(): Promise<object> {
        const insumos = await this.insumoService.findAll();
        return { titulo: 'Novo Estoque', insumos };
    }

    @Post('criar')
    @Redirect('/estoque')
    @ValidationView('estoque/formulario', ({ request, errors }) => ({
        estoque: { ...request.body },
        errors,
    }))
    async formularioCriarSalvar(@Body() dados: CreateEstoqueDto): Promise<void> {
        await this.estoqueService.create(dados);
    }

    @Get(':id/editar')
    @Render('estoque/formulario')
    async formEditar(@Param('id') id: number): Promise<object> {
        const estoque = await this.estoqueService.findOne(id);
        const insumos = await this.insumoService.findAll();
        if (!estoque) throw new Error('Estoque não encontrado!');
        return { titulo: 'Editar Estoque', estoque, insumos };
    }

    @Post(':id/editar')
    @Redirect('/estoque')
    @ValidationView('estoque/formulario', ({ request, errors }) => ({
        estoque: { id: request.params.id, ...request.body },
        errors,
    }))
    async formEditarSalvar(@Param('id') id: number, @Body() dados: UpdateEstoqueDto): Promise<void> {
        await this.estoqueService.update(id, dados);
    }

    @Get(':id/excluir')
    @Render('estoque/remover')
    async formExcluir(@Param('id') id: number): Promise<object> {
        const estoque = await this.estoqueService.findOne(id);
        if (!estoque) throw new Error('Estoque não encontrado!');
        return {
            titulo: 'Exclusão de Estoque',
            subtitulo: `Exclusão de estoque: ${estoque.localArmazenado}`,
            estoque,
        };
    }

    @Post(':id/excluir')
    @Redirect('/estoque')
    async formExcluirSalvar(@Param('id') id: number): Promise<void> {
        await this.estoqueService.remove(id);
    }

    @Post(':id/remover')
    @HttpCode(204)
    async remove(@Param('id') id: number): Promise<void> {
        await this.estoqueService.remove(id);
    }
}