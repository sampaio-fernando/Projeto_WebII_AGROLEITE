import { Body, Controller, Get, HttpCode, Param, Post, Redirect, Render } from '@nestjs/common';
import { ValidationView } from 'nest-validation-view';
import { PropriedadeService } from '../propriedade/propriedade.service';
import { PiqueteService } from './piquete.service';
import { CreatePiqueteDto } from './dtos/create-piquete.dto';
import { UpdatePiqueteDto } from './dtos/update-piquete.dto';

@Controller('piquetes')
export class PiqueteController {

    constructor(
        private piqueteService: PiqueteService,
        private propriedadeService: PropriedadeService,
    ) {}

    @Get()
    @Render('piquete/inicial')
    async inicial(): Promise<object> {
        const piquetes = await this.piqueteService.findAll();
        return { titulo: 'Consulta de Piquetes', piquetes };
    }

    @Get('criar')
    @Render('piquete/formulario')
    async formularioCriar(): Promise<object> {
        const propriedades = await this.propriedadeService.findAll();
        return { titulo: 'Novo Piquete', propriedades };
    }

    @Post('criar')
    @Redirect('/piquetes')
    @ValidationView('piquete/formulario', ({ request, errors }) => ({
        piquete: { ...request.body },
        errors,
    }))
    async formularioCriarSalvar(@Body() dados: CreatePiqueteDto): Promise<void> {
        await this.piqueteService.create(dados);
    }

    @Get(':id/editar')
    @Render('piquete/formulario')
    async formEditar(@Param('id') id: number): Promise<object> {
        const piquete = await this.piqueteService.findOne(id);
        const propriedades = await this.propriedadeService.findAll();
        if (!piquete) throw new Error('Piquete não encontrado!');
        return { titulo: 'Editar Piquete', piquete, propriedades };
    }

    @Post(':id/editar')
    @Redirect('/piquetes')
    @ValidationView('piquete/formulario', ({ request, errors }) => ({
        piquete: { id: request.params.id, ...request.body },
        errors,
    }))
    async formEditarSalvar(@Param('id') id: number, @Body() dados: UpdatePiqueteDto): Promise<void> {
        await this.piqueteService.update(id, dados);
    }

    @Post(':id/excluir')
    @HttpCode(204)
    @Redirect('/piquetes')
    async formExcluirSalvar(@Param('id') id: number): Promise<void> {
        await this.piqueteService.remove(id);
    }
}