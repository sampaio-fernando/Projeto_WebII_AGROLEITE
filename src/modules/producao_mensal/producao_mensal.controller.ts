import { Body, Controller, Get, HttpCode, Param, Post, Redirect, Render } from '@nestjs/common';
import { ValidationView } from 'nest-validation-view';
import { ProducaoMensalService } from './producao_mensal.service';
import { CreateProducaoMensalDto } from './dtos/create-producao_mensal.dto';
import { UpdateProducaoMensalDto } from './dtos/update-producao_mensal.dto';

@Controller('producoes-mensais')
export class ProducaoMensalController {

    constructor(private producaoMensalService: ProducaoMensalService) {}

    @Get()
    @Render('producao_mensal/inicial')
    async inicial(): Promise<object> {
        const producoesMensais = await this.producaoMensalService.findAll();
        return { titulo: 'Consulta de Produção Mensal', producoesMensais };
    }

    @Get('criar')
    @Render('producao_mensal/formulario')
    formularioCriar(): object {
        return { titulo: 'Nova Produção Mensal' };
    }

    @Post('criar')
    @Redirect('/producoes-mensais')
    @ValidationView('producao_mensal/formulario', ({ request, errors }) => ({
        titulo: 'Nova Produção Mensal',
        producaoMensal: { ...request.body },
        errors,
    }))
    async formularioCriarSalvar(@Body() dados: CreateProducaoMensalDto): Promise<void> {
        await this.producaoMensalService.create(dados);
    }

    @Get(':id/editar')
    @Render('producao_mensal/formulario')
    async formEditar(@Param('id') id: number): Promise<object> {
        const producaoMensal = await this.producaoMensalService.findOne(id);
        if (!producaoMensal) throw new Error('Produção Mensal não encontrada!');
        return { titulo: 'Editar Produção Mensal', producaoMensal };
    }

    @Post(':id/editar')
    @Redirect('/producoes-mensais')
    @ValidationView('producao_mensal/formulario', ({ request, errors }) => ({
        titulo: 'Editar Produção Mensal',
        producaoMensal: { id: request.params.id, ...request.body },
        errors,
    }))
    async formEditarSalvar(@Param('id') id: number, @Body() dados: UpdateProducaoMensalDto): Promise<void> {
        await this.producaoMensalService.update(id, dados);
    }

    @Get(':id/excluir')
    @Render('producao_mensal/remover')
    async formExcluir(@Param('id') id: number): Promise<object> {
        const producaoMensal = await this.producaoMensalService.findOne(id);
        if (!producaoMensal) throw new Error('Produção Mensal não encontrada!');
        return {
            titulo: 'Exclusão de Produção Mensal',
            subtitulo: `Exclusão de produção mensal: ${producaoMensal.mesReferencia}`,
            producaoMensal,
        };
    }

    @Post(':id/excluir')
    @Redirect('/producoes-mensais')
    async formExcluirSalvar(@Param('id') id: number): Promise<void> {
        await this.producaoMensalService.remove(id);
    }

    @Post(':id/remover')
    @HttpCode(204)
    async remove(@Param('id') id: number): Promise<void> {
        await this.producaoMensalService.remove(id);
    }
}