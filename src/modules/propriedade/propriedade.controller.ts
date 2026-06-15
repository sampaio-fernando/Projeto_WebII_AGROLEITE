import { Body, Controller, Get, HttpCode, Param, Post, Redirect, Render } from '@nestjs/common';
import { ValidationView } from 'nest-validation-view';
import { PropriedadeService } from './propriedade.service';
import { CreatePropriedadeDto } from './dtos/create-propriedade.dto';
import { UpdatePropriedadeDto } from './dtos/update-propriedade.dto';

@Controller('propriedades')
export class PropriedadeController {

    constructor(private propriedadeService: PropriedadeService) {}

    @Get()
    @Render('propriedade/inicial')
    async inicial(): Promise<object> {
        const propriedades = await this.propriedadeService.findAll();
        return { titulo: 'Consulta de Propriedades', propriedades };
    }

    @Get('criar')
    @Render('propriedade/formulario')
    formularioCriar(): object {
        return { titulo: 'Nova Propriedade' };
    }

    @Post('criar')
    @Redirect('/propriedades')
    @ValidationView('propriedade/formulario', ({ request, errors }) => ({
        propriedade: { ...request.body },
        errors,
    }))
    async formularioCriarSalvar(@Body() dados: CreatePropriedadeDto): Promise<void> {
        await this.propriedadeService.create(dados);
    }

    @Get(':id/editar')
    @Render('propriedade/formulario')
    async formEditar(@Param('id') id: number): Promise<object> {
        const propriedade = await this.propriedadeService.findOne(id);
        if (!propriedade) throw new Error('Propriedade não encontrada!');
        return { titulo: 'Editar Propriedade', propriedade };
    }

    @Post(':id/editar')
    @Redirect('/propriedades')
    @ValidationView('propriedade/formulario', ({ request, errors }) => ({
        propriedade: { id: request.params.id, ...request.body },
        errors,
    }))
    async formEditarSalvar(@Param('id') id: number, @Body() dados: UpdatePropriedadeDto): Promise<void> {
        await this.propriedadeService.update(id, dados);
    }

    @Post(':id/excluir')
    @HttpCode(204)
    @Redirect('/propriedades')
    async formExcluirSalvar(@Param('id') id: number): Promise<void> {
        await this.propriedadeService.remove(id);
    }
}